import path from "path";
import { App, moment, htmlToMarkdown, Notice, TFile } from "obsidian";
import {
	Database,
	ExportToMarkdownParams,
	ZoteroConnectorSettings,
} from "../types";

import { doesEXEExist, getVaultRoot } from "../helpers";
import {
	appendExportDate,
	getExistingAnnotations,
	getLastExport,
	getTemplates,
	removeStartingSlash,
	template,
	wrapAnnotationTemplate,
} from "./template.helpers";
import {
	getBibFromCiteKey,
	getIssueDateFromCiteKey,
	getItemJSONFromCiteKeys,
} from "./jsonRPC";
import { getCiteKeys } from "./cayw";
import { extractAnnotations } from "./extractAnnotations";

function processNote(note: any) {
	if (note.note) {
		note.note = htmlToMarkdown(note.note);
	}
	if (note.dateAdded) {
		note.dateAdded = moment(note.dateAdded);
	}

	if (note.dateModified) {
		note.dateModified = moment(note.dateModified);
	}
}

function processAttachment(attachment: any) {
	if (attachment.dateAdded) {
		attachment.dateAdded = moment(attachment.dateAdded);
	}

	if (attachment.dateModified) {
		attachment.dateModified = moment(attachment.dateModified);
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
	annotation.date = moment(annotation.date);
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
		item.accessDate = moment(item.accessDate);
	}

	if (item.dateAdded) {
		item.dateAdded = moment(item.dateAdded);
	}

	if (item.dateModified) {
		item.dateModified = moment(item.dateModified);
	}

	try {
		item.date = await getIssueDateFromCiteKey(item.citekey, database);
	} catch {}

	try {
		item.bibliography = await getBibFromCiteKey(item.citekey, database);
	} catch {
		item.bibliography = "Error generating bibliography";
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

	if (!citeKeys.length) return false;

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

	if (!citeKeys.length) return null;

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
