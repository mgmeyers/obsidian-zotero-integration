import path from "path";
import nunjucks from "nunjucks";
import { App, moment, htmlToMarkdown, Notice, TFile } from "obsidian";
import { exec } from "child_process";
import { Database, ExportFormat, ZoteroConnectorSettings } from "./types";
import {
	getBibFromCiteKey,
	getCAYWJSON,
	getIssueDateFromCiteKey,
	getItemJSONFromCiteKeys,
} from "./cayw";
import { LoadingModal } from "./LoadingModal";
import { getVaultRoot } from "./helpers";
import escapePath from "escape-path-with-spaces";

interface ExportToMarkdownParams {
	settings: ZoteroConnectorSettings;
	database: Database;
	exportFormat: ExportFormat;
}

function getLastExport(md: string): string {
	const match = md.match(/%% Export Date: (\S+) %%\n$/);

	if (match && match[1]) {
		return new Date(match[1]).toISOString();
	}

	return "";
}

function appendExportDate(md: string): string {
	return md + `\n\n%% Export Date: ${new Date().toISOString()} %%\n`;
}

function getExistingAnnotations(md: string): string {
	const match = md.match(
		/%% Begin annotations %%([\w\W]+)%% End annotations %%/
	);

	if (match && match[1]) {
		return match[1].trim();
	}

	return "";
}

function wrapAnnotationTemplate(str: string) {
	return `%% Begin annotations %%\n\n${str}\n\n%% End annotations %%`;
}

function removeStartingSlash(str: string) {
	if (str.startsWith("/")) {
		return str.replace(/^\/+/, "");
	}

	return str;
}

function sanitizeObsidianPath(str: string) {
	if (!str.endsWith(".md")) {
		str += ".md";
	}

	if (str.startsWith("/")) {
		str = removeStartingSlash(str);
	}

	return str;
}

function loadTemplate(
	app: App,
	name: string,
	path: string
): Promise<string | null> {
	const headerTemplateFile = app.vault.getAbstractFileByPath(
		sanitizeObsidianPath(path)
	);

	if (!headerTemplateFile) {
		new Notice(`Error: ${name} template not found ${path}`);
		return null;
	}

	return app.vault.cachedRead(headerTemplateFile as TFile);
}

async function getTemplates(app: App, params: ExportToMarkdownParams) {
	const { exportFormat } = params;

	return {
		headerTemplate: await loadTemplate(
			app,
			"Header",
			exportFormat.headerTemplatePath
		),
		annotationTemplate: await loadTemplate(
			app,
			"Annotation",
			exportFormat.annotationTemplatePath
		),
		footerTemplate: await loadTemplate(
			app,
			"Footer",
			exportFormat.footerTemplatePath
		),
	};
}

async function processItem(
	item: any,
	exportDate: moment.Moment,
	database: Database
) {
	item.exportDate = exportDate;
	item.desktopURI = `zotero://select/library/items/${item.itemKey}`;

	if (item.accessDate) {
		item.accessDate = moment(item.accessDate);
	}

	if (item.dateAdded) {
		item.dateAdded = moment(new Date(item.dateAdded));
	}

	if (item.dateModified) {
		item.dateModified = moment(new Date(item.dateModified));
	}

	try {
		item.date = await getIssueDateFromCiteKey(item.citekey, database);
	} catch (e) {
		return false;
	}

	try {
		item.bibliography = htmlToMarkdown(
			await getBibFromCiteKey(item.citekey, database)
		);
	} catch (e) {
		return false;
	}

	item.notes?.forEach((note: any) => {
		if (note.note) {
			note.note = htmlToMarkdown(note.note);
		}
		if (note.dateAdded) {
			note.dateAdded = moment(new Date(note.dateAdded));
		}

		if (note.dateModified) {
			note.dateModified = moment(new Date(note.dateModified));
		}
	});

	item.attachments.forEach((a: any) => {
		if (a.dateAdded) {
			a.dateAdded = moment(new Date(a.dateAdded));
		}

		if (a.dateModified) {
			a.dateModified = moment(new Date(a.dateModified));
		}

		if (a.uri) {
			a.itemKey = a.uri.split("/").pop();
			a.desktopURI = `zotero://select/library/items/${a.itemKey}`;
		}
	});
}

export async function exportToMarkdown(
	app: App,
	params: ExportToMarkdownParams
) {
	const exportDate = moment();
	const { database, exportFormat, settings } = params;
	const { headerTemplate, annotationTemplate, footerTemplate } =
		await getTemplates(app, params);

	if (!headerTemplate && !annotationTemplate && !footerTemplate) {
		new Notice(`Error: No templates found for export`, 10000);
		return;
	}

	let citeKeys: string[] = [];

	try {
		const json = await getCAYWJSON(database);

		if (!json) return;

		citeKeys = json
			.map((e: any) => {
				return e.citekey;
			})
			.filter((e: any) => !!e);

		if (!citeKeys.length) {
			return false;
		}
	} catch (e) {
		return false;
	}

	let itemData: any;

	try {
		itemData = await getItemJSONFromCiteKeys(citeKeys, database);
	} catch (e) {
		return false;
	}

	for (let i = 0, len = itemData.length; i < len; i++) {
		await processItem(itemData[i], exportDate, database);
	}

	const vaultRoot = getVaultRoot();

	for (let i = 0, len = itemData.length; i < len; i++) {
		const attachments = itemData[i].attachments;
		for (let j = 0, jLen = attachments.length; j < jLen; j++) {
			const pdfInputPath = attachments[j].path;
			if (!pdfInputPath.endsWith(".pdf")) continue;

			const pathTemplateData = {
				...itemData[i],
				...attachments[j],
			};

			const assetOutputPath = path.resolve(
				vaultRoot,
				exportFormat.assetOutputPathTemplate
					? removeStartingSlash(
							Handlebars.compile(
								exportFormat.assetOutputPathTemplate
							)(pathTemplateData)
					  )
					: "./"
			);

			const markdownPath = exportFormat.outputPathTemplate
				? removeStartingSlash(
						Handlebars.compile(exportFormat.outputPathTemplate)(
							pathTemplateData
						)
				  )
				: "./";

			const existingMarkdown =
				app.vault.getAbstractFileByPath(markdownPath);

			let lastExportDate = "";
			let existingAnnotations = "";

			if (existingMarkdown) {
				const markdown = await app.vault.cachedRead(
					existingMarkdown as TFile
				);

				lastExportDate = getLastExport(markdown);
				existingAnnotations = getExistingAnnotations(markdown);
			}

			let annots: any;

			try {
				const res = await extractAnnotations(pdfInputPath, {
					ignoreBefore: lastExportDate,
					imageBaseName: "test",
					imageDPI: settings.pdfExportImageDPI,
					imageFormat: settings.pdfExportImageFormat,
					imageOutputPath: assetOutputPath,
					imageQuality: settings.pdfExportImageQuality,
				});
				annots = JSON.parse(res);
			} catch (e) {
				return false;
			}

			annots.forEach((a: any) => (a.date = moment(new Date(a.date))));
			attachments[j].annotations = annots;

			const header = headerTemplate ? headerTemplate(itemData[i]) : "";

			const annotations = annotationTemplate
				? wrapAnnotationTemplate(
						annotationTemplate({
							...itemData[i],
							annotations: annots,
						})
				  )
				: "";

			const footer = footerTemplate ? footerTemplate(itemData[i]) : "";

			const output: string[] = [];

			if (headerTemplate && header) {
				output.push(header);
			}
			if (annotationTemplate && (existingAnnotations || annotations)) {
				output.push(existingAnnotations + annotations);
			}
			if (footerTemplate && footer) {
				output.push(footer);
			}

			const combined = appendExportDate(output.join(" "));

			if (existingMarkdown) {
				app.vault.modify(existingMarkdown as TFile, combined);
			} else {
				app.vault.create(markdownPath, combined);
			}
		}
	}

	return true;
}

export async function pdfDebugPrompt(database: Database) {
	let citeKeys: string[] = [];

	try {
		const json = await getCAYWJSON(database);

		if (!json) return;

		citeKeys = json
			.map((e: any) => {
				return e.citekey;
			})
			.filter((e: any) => !!e);

		if (!citeKeys.length) {
			return null;
		}
	} catch (e) {
		return null;
	}

	let itemData: any;

	try {
		itemData = await getItemJSONFromCiteKeys(citeKeys, database);
	} catch (e) {
		return null;
	}

	const exportDate = moment();

	for (let i = 0, len = itemData.length; i < len; i++) {
		await processItem(itemData[i], exportDate, database);
	}

	for (let i = 0, len = itemData.length; i < len; i++) {
		const attachments = itemData[i].attachments;
		for (let j = 0, jLen = attachments.length; j < jLen; j++) {
			const pdfInputPath = attachments[j].path;
			if (!pdfInputPath.endsWith(".pdf")) continue;

			let annots: any;

			try {
				const res = await extractAnnotations(pdfInputPath, {});
				annots = JSON.parse(res);
			} catch (e) {
				return false;
			}

			annots.forEach((a: any) => (a.date = moment(new Date(a.date))));

			attachments[j].annotations = annots;
		}
	}

	itemData.forEach((data: any) => {
		const firstPDF = data.attachments.find((a: any) =>
			a.path?.endsWith(".pdf")
		);
		data.annotations = firstPDF.annotations;
	});

	return itemData;
}

interface ExtractParams {
	imageOutputPath?: string;
	imageBaseName?: string;
	imageFormat?: string;
	imageDPI?: number;
	imageQuality?: number;
	ignoreBefore?: string;
}

const paramMap: Record<keyof ExtractParams, string> = {
	imageOutputPath: "o",
	imageBaseName: "n",
	imageFormat: "f",
	imageDPI: "d",
	imageQuality: "q",
	ignoreBefore: "b",
};

export function extractAnnotations(input: string, params: ExtractParams) {
	const vRoot = getVaultRoot();
	const modal = new LoadingModal(
		(window as any).app,
		"Extracting annotations..."
	);
	modal.open();

	const p = Object.keys(params)
		.map((k) => {
			const val = params[k as keyof ExtractParams];

			if (!val) return "";

			const key = paramMap[k as keyof ExtractParams];

			return `-${key}${typeof val === "string" ? escapePath(val) : val}`;
		})
		.filter((v) => v);

	return new Promise<string>((res, rej) => {
		exec(
			`./pdf-annots2json ${escapePath(input) as string} ${p.join(" ")}`,
			{
				cwd: `${vRoot}/.obsidian/plugins/obsidian-zotero-desktop-connector/`,
			},
			(err, stout, sterr) => {
				if (err) {
					modal.close();
					console.error(err);
					return new Notice(
						`Error processing PDF: ${err.message}`,
						10000
					);
				}

				if (sterr) {
					modal.close();
					return new Notice(`Error processing PDF: ${sterr}`, 10000);
				}

				modal.close();
				res(stout.split(/Permission:.*\n/).pop());
			}
		);
	});
}
