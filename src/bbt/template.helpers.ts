import nunjucks from "nunjucks";
import { App, moment, Notice, TFile } from "obsidian";
import { ExportToMarkdownParams } from "src/types";

export const template = new nunjucks.Environment();

template.addFilter("format", function (date: moment.Moment, format: string) {
	if (date instanceof moment) {
		return date.format(format);
	}

	return (
		"Error: `format` can only be applied to dates. Tried for format " +
		typeof date
	);
});

export async function getTemplates(app: App, params: ExportToMarkdownParams) {
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

export function getLastExport(md: string): moment.Moment {
	const match = md.match(/%% Export Date: (\S+) %%\n$/);

	if (match && match[1]) {
		return moment(new Date(match[1]));
	}

	return moment().set("year", 1970);
}

export function appendExportDate(md: string): string {
	return md + `\n\n%% Export Date: ${new Date().toISOString()} %%\n`;
}

export function getExistingAnnotations(md: string): string {
	const match = md.match(
		/%% Begin annotations %%([\w\W]+)%% End annotations %%/
	);

	if (match && match[1]) {
		return match[1].trim();
	}

	return "";
}

export function wrapAnnotationTemplate(str: string) {
	return `%% Begin annotations %%\n${str}\n%% End annotations %%`;
}

export function removeStartingSlash(str: string) {
	if (str.startsWith("/")) {
		return str.replace(/^\/+/, "");
	}

	return str;
}

export function sanitizeObsidianPath(str: string) {
	if (!str.endsWith(".md")) {
		str += ".md";
	}

	if (str.startsWith("/")) {
		str = removeStartingSlash(str);
	}

	return str;
}

export function loadTemplate(
	app: App,
	name: string,
	path: string
): Promise<string | null> {
	if (!path) return null;

	const headerTemplateFile = app.vault.getAbstractFileByPath(
		sanitizeObsidianPath(path)
	);

	if (!headerTemplateFile) {
		new Notice(`Error: ${name} template not found ${path}`);
		return null;
	}

	return app.vault.cachedRead(headerTemplateFile as TFile);
}
