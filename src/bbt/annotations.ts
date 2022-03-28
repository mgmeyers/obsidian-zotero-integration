import path from "path";
import { App, moment, htmlToMarkdown, Notice, TFile } from "obsidian";
import { exec } from "child_process";
import { Database, ExportFormat, ZoteroConnectorSettings } from "../types";
import {
	getBibFromCiteKey,
	getCiteKeys,
	getIssueDateFromCiteKey,
	getItemJSONFromCiteKeys,
} from "./cayw";
import { LoadingModal } from "./LoadingModal";
import { doesEXEExist, getExeName, getExeRoot, getVaultRoot } from "../helpers";
import escapePath from "escape-path-with-spaces";
import {
	appendExportDate,
	getExistingAnnotations,
	getLastExport,
	loadTemplate,
	removeStartingSlash,
	template,
	wrapAnnotationTemplate,
} from "./template.helpers";

interface ExportToMarkdownParams {
	settings: ZoteroConnectorSettings;
	database: Database;
	exportFormat: ExportFormat;
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

function processNote(note: any) {
	if (note.note) {
		note.note = htmlToMarkdown(note.note);
	}
	if (note.dateAdded) {
		note.dateAdded = moment(new Date(note.dateAdded));
	}

	if (note.dateModified) {
		note.dateModified = moment(new Date(note.dateModified));
	}
}

function processAttachment(attachment: any) {
	if (attachment.dateAdded) {
		attachment.dateAdded = moment(new Date(attachment.dateAdded));
	}

	if (attachment.dateModified) {
		attachment.dateModified = moment(new Date(attachment.dateModified));
	}

	if (attachment.uri) {
		attachment.itemKey = attachment.uri.split("/").pop();
		attachment.desktopURI = `zotero://select/library/items/${attachment.itemKey}`;
	}
}

function processAnnotation(
	annotation: any,
	attachment: any,
	imageRelativePath: any
) {
	annotation.date = moment(new Date(annotation.date));
	annotation.attachment = attachment;

	if (annotation.imagePath) {
		annotation.imageBaseName = path.basename(annotation.imagePath);
		annotation.imageExtension = path.extname(annotation.imagePath).slice(1);
		annotation.imageRelativePath = path.join(
			imageRelativePath,
			annotation.imageBaseName
		);
	}
}

async function processItem(
	item: any,
	exportDate: moment.Moment,
	database: Database
) {
	item.exportDate = exportDate;
	item.desktopURI = `zotero://select/library/items/${item.itemKey}`;

	if (item.accessDate) {
		item.accessDate = moment(new Date(item.accessDate));
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
		item.bibliography = await getBibFromCiteKey(item.citekey, database);
	} catch (e) {
		return false;
	}

	item.notes?.forEach(processNote);
	item.attachments?.forEach(processAttachment);
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

	const citeKeys: string[] = await getCiteKeys(database);
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

			const imageOutputPath = path.resolve(
				vaultRoot,
				exportFormat.imageOutputPathTemplate
					? removeStartingSlash(
							template.renderString(
								exportFormat.imageOutputPathTemplate,
								pathTemplateData
							)
					  )
					: "./"
			);

			const imageRelativePath = exportFormat.imageOutputPathTemplate
				? removeStartingSlash(
						template.renderString(
							exportFormat.imageOutputPathTemplate,
							pathTemplateData
						)
				  )
				: "";

			const imageBaseName = exportFormat.imageOutputPathTemplate
				? removeStartingSlash(
						template.renderString(
							exportFormat.imageBaseNameTemplate,
							pathTemplateData
						)
				  )
				: "image";

			const markdownPath = exportFormat.outputPathTemplate
				? removeStartingSlash(
						template.renderString(
							exportFormat.outputPathTemplate,
							pathTemplateData
						)
				  )
				: "./";

			const existingMarkdown =
				app.vault.getAbstractFileByPath(markdownPath);

			let lastExportDate = moment().set("year", 1970);
			let existingAnnotations = "";

			if (existingMarkdown) {
				const markdown = await app.vault.cachedRead(
					existingMarkdown as TFile
				);

				lastExportDate = getLastExport(markdown);
				existingAnnotations = getExistingAnnotations(markdown);
			}

			let annots: any;

			if (doesEXEExist()) {
				try {
					const res = await extractAnnotations(pdfInputPath, {
						imageBaseName: imageBaseName,
						imageDPI: settings.pdfExportImageDPI,
						imageFormat: settings.pdfExportImageFormat,
						imageOutputPath: imageOutputPath,
						imageQuality: settings.pdfExportImageQuality,
					});
					annots = JSON.parse(res);
				} catch (e) {
					return false;
				}

				annots.forEach((a: any) => {
					processAnnotation(a, attachments[j], imageRelativePath);
				});
				attachments[j].annotations = annots;
			}

			const templateData = {
				...itemData[i],
				lastExportDate,
			};

			if (annots) templateData.annotations = annots;

			let header = "";
			try {
				header = headerTemplate
					? template.renderString(headerTemplate, templateData)
					: "";
			} catch (e) {
				new Notice(
					`Error parsing template "${params.exportFormat.headerTemplatePath}": ${e.message}`,
					10000
				);
				return false;
			}

			let annotations = "";
			try {
				annotations = annotationTemplate
					? template.renderString(annotationTemplate, templateData)
					: "";
			} catch (e) {
				new Notice(
					`Error parsing template "${params.exportFormat.annotationTemplatePath}": ${e.message}`,
					10000
				);
				return false;
			}

			let footer = "";
			try {
				footer = footerTemplate
					? template.renderString(footerTemplate, templateData)
					: "";
			} catch (e) {
				new Notice(
					`Error parsing template "${params.exportFormat.footerTemplatePath}": ${e.message}`
				);
				return false;
			}

			const output: string[] = [];

			if (headerTemplate && header.trim()) {
				output.push(header);
			}

			if (
				annotationTemplate &&
				(existingAnnotations + annotations).trim()
			) {
				output.push(
					wrapAnnotationTemplate(existingAnnotations + annotations)
				);
			}

			if (footerTemplate && footer.trim()) {
				output.push(footer);
			}

			const combined = appendExportDate(output.join(""));

			if (existingMarkdown) {
				app.vault.modify(existingMarkdown as TFile, combined);
			} else {
				app.vault.create(markdownPath, combined);
			}
		}
	}

	return true;
}

export async function pdfDebugPrompt(settings: ZoteroConnectorSettings) {
	const citeKeys: string[] = await getCiteKeys(settings.database);
	let itemData: any;

	try {
		itemData = await getItemJSONFromCiteKeys(citeKeys, settings.database);
	} catch (e) {
		return null;
	}

	const exportDate = moment();

	for (let i = 0, len = itemData.length; i < len; i++) {
		await processItem(itemData[i], exportDate, settings.database);
	}

	if (doesEXEExist()) {
		const vaultRoot = getVaultRoot();

		for (let i = 0, len = itemData.length; i < len; i++) {
			const attachments = itemData[i].attachments;
			for (let j = 0, jLen = attachments.length; j < jLen; j++) {
				const pdfInputPath = attachments[j].path;
				if (!pdfInputPath.endsWith(".pdf")) continue;

				let annots: any;

				try {
					const res = await extractAnnotations(pdfInputPath, {
						noWrite: true,
						imageBaseName: "base_name",
						imageDPI: settings.pdfExportImageDPI,
						imageFormat: settings.pdfExportImageFormat,
						imageOutputPath: path.join(vaultRoot, "output_path"),
						imageQuality: settings.pdfExportImageQuality,
					});
					annots = JSON.parse(res);
				} catch (e) {
					return false;
				}

				annots.forEach((a: any) => {
					processAnnotation(a, attachments[j], "output_path");
				});

				attachments[j].annotations = annots;
			}
		}
	}

	itemData.forEach((data: any) => {
		const firstPDF = data.attachments.find((a: any) =>
			a.path?.endsWith(".pdf")
		);

		if (firstPDF.annotations) {
			data.annotations = firstPDF.annotations;
		}

		data.lastExportDate = moment();
	});

	return itemData;
}

interface ExtractParams {
	noWrite?: boolean;
	imageOutputPath?: string;
	imageBaseName?: string;
	imageFormat?: string;
	imageDPI?: number;
	imageQuality?: number;
	ignoreBefore?: string;
}

const paramMap: Record<keyof ExtractParams, string> = {
	noWrite: "w",
	imageOutputPath: "o",
	imageBaseName: "n",
	imageFormat: "f",
	imageDPI: "d",
	imageQuality: "q",
	ignoreBefore: "b",
};

export function extractAnnotations(input: string, params: ExtractParams) {
	const modal = new LoadingModal(
		(window as any).app,
		"Extracting annotations..."
	);
	modal.open();

	const p = Object.keys(params)
		.map((k) => {
			const val = params[k as keyof ExtractParams];

			if (val === "" || val === undefined) return "";

			const key = paramMap[k as keyof ExtractParams];

			return `-${key}${
				typeof val === "string"
					? escapePath(val)
					: typeof val === "boolean"
					? ""
					: val.toString()
			}`;
		})
		.filter((v) => v);

	return new Promise<string>((res, rej) => {
		exec(
			`./${getExeName()} ${escapePath(input) as string} ${p.join(" ")}`,
			{
				cwd: getExeRoot(),
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
					console.error(sterr);
					return new Notice(`Error processing PDF: ${sterr}`, 10000);
				}

				modal.close();
				res(stout);
			}
		);
	});
}
