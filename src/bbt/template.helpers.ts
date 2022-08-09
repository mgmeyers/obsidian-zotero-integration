import { Notice, TFile, moment } from 'obsidian';

import { ExportToMarkdownParams } from 'src/types';

export function loadTemplate(
  name: string,
  path: string
): Promise<string | null> {
  if (!path) return null;

  const templateFile = app.vault.getAbstractFileByPath(
    sanitizeObsidianPath(path)
  );

  if (!templateFile) {
    new Notice(`Error: ${name} template not found ${path}`);
    return null;
  }

  return app.vault.cachedRead(templateFile as TFile);
}

export async function getTemplates(params: ExportToMarkdownParams) {
  const { exportFormat } = params;
  const noLegacyTemplates =
    !exportFormat.headerTemplatePath &&
    !exportFormat.annotationTemplatePath &&
    !exportFormat.footerTemplatePath;

  if (exportFormat.templatePath || noLegacyTemplates) {
    return {
      template: await loadTemplate('', exportFormat.templatePath),
    };
  }

  return {
    headerTemplate: await loadTemplate(
      'Header',
      exportFormat.headerTemplatePath
    ),
    annotationTemplate: await loadTemplate(
      'Annotation',
      exportFormat.annotationTemplatePath
    ),
    footerTemplate: await loadTemplate(
      'Footer',
      exportFormat.footerTemplatePath
    ),
  };
}

export function getLastExport(md: string): moment.Moment {
  let match = md.match(/%% Import Date: (\S+) %%\n$/);

  if (match && match[1]) {
    return moment(match[1]);
  }

  // Legacy
  match = md.match(/%% Export Date: (\S+) %%\n$/);

  if (match && match[1]) {
    return moment(match[1]);
  }

  return moment(0);
}

export function appendExportDate(md: string): string {
  return md + `\n\n%% Import Date: ${moment().toISOString(true)} %%\n`;
}

export function getExistingAnnotations(md: string): string {
  const match = md.match(
    /%% Begin annotations %%([\w\W]+)%% End annotations %%/
  );

  if (match && match[1]) {
    return match[1].trim();
  }

  return '';
}

export function wrapAnnotationTemplate(str: string) {
  return `\n%% Begin annotations %%\n${str}\n%% End annotations %%\n`;
}

export function removeStartingSlash(str: string) {
  if (str.startsWith('/')) {
    return str.replace(/^\/+/, '');
  }

  return str;
}

export function sanitizeObsidianPath(str: string) {
  if (!str.endsWith('.md')) {
    str += '.md';
  }

  if (str.startsWith('/')) {
    str = removeStartingSlash(str);
  }

  return str;
}
