import path from 'path';

import { App, Notice, TFile, htmlToMarkdown, moment } from 'obsidian';

import { doesEXEExist, getVaultRoot } from '../helpers';
import {
  Database,
  ExportToMarkdownParams,
  ZoteroConnectorSettings,
} from '../types';
import { applyBasicTemplates } from './basicTemplates/applyBasicTemplates';
import { getCiteKeys } from './cayw';
import { processZoteroAnnotationNotes } from './exportNotes';
import { extractAnnotations } from './extractAnnotations';
import { mkMDDir, sanitizeFilePath } from './helpers';
import {
  getBibFromCiteKey,
  getIssueDateFromCiteKey,
  getItemJSONFromCiteKeys,
} from './jsonRPC';
import {
  appendExportDate,
  getExistingAnnotations,
  getLastExport,
  getTemplates,
  removeStartingSlash,
  template,
  wrapAnnotationTemplate,
} from './template.helpers';

function processNote(note: any) {
  if (note.note) {
    note.note = htmlToMarkdown(processZoteroAnnotationNotes(note.note));
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
    attachment.itemKey = attachment.uri.split('/').pop();
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
  database: Database,
  cslStyle?: string
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
  } catch {
    // We don't particularly care about this
  }

  try {
    item.bibliography = await getBibFromCiteKey(
      item.citekey,
      database,
      cslStyle
    );
  } catch {
    item.bibliography = 'Error generating bibliography';
  }

  item.notes?.forEach(processNote);
  item.attachments?.forEach(processAttachment);
}

function generateHelpfulTemplateError(e: Error, template: string) {
  const message = e.message;

  try {
    if (message) {
      const match = message.match(/\[Line (\d+), Column (\d+)]/);

      if (match) {
        const lines = template.split(/\n/g);
        const line = lines[Number(match[1]) - 1];
        const indicator = ' '.repeat(Number(match[2]) - 1) + '^';

        return `${message}\n\n${line}\n${indicator}`;
      }
    }
  } catch {
    //
  }

  return message;
}

function errorToHelpfulNotification(
  e: Error,
  templatePath: string,
  template: string
) {
  new Notice(
    createFragment((f) => {
      f.createSpan({
        text: `Error parsing template "${templatePath}": `,
      });
      f.createEl('code', {
        text: generateHelpfulTemplateError(e, template),
      });
    }),
    10000
  );
}

function errorToHelpfulError(e: Error, templatePath: string, template: string) {
  return new Error(
    `Error parsing template "${templatePath}": ${generateHelpfulTemplateError(
      e,
      template
    )}`
  );
}

export async function renderTemplates(
  app: App,
  params: ExportToMarkdownParams,
  templateData: Record<any, any>,
  existingAnnotations: string,
  shouldThrow?: boolean
) {
  const { headerTemplate, annotationTemplate, footerTemplate } =
    await getTemplates(app, params);

  if (!headerTemplate && !annotationTemplate && !footerTemplate) {
    throw new Error(
      `No templates found for export ${params.exportFormat.name}`
    );
  }

  let header = '';
  try {
    header = headerTemplate
      ? template.renderString(headerTemplate, templateData)
      : '';
  } catch (e) {
    if (shouldThrow) {
      throw errorToHelpfulError(
        e,
        params.exportFormat.headerTemplatePath,
        headerTemplate
      );
    } else {
      errorToHelpfulNotification(
        e,
        params.exportFormat.headerTemplatePath,
        headerTemplate
      );
      return false;
    }
  }

  let annotations = '';
  try {
    annotations = annotationTemplate
      ? template.renderString(annotationTemplate, templateData)
      : '';
  } catch (e) {
    if (shouldThrow) {
      throw errorToHelpfulError(
        e,
        params.exportFormat.annotationTemplatePath,
        annotationTemplate
      );
    } else {
      errorToHelpfulNotification(
        e,
        params.exportFormat.annotationTemplatePath,
        annotationTemplate
      );
      return false;
    }
  }

  let footer = '';
  try {
    footer = footerTemplate
      ? template.renderString(footerTemplate, templateData)
      : '';
  } catch (e) {
    if (shouldThrow) {
      throw errorToHelpfulError(
        e,
        params.exportFormat.footerTemplatePath,
        footerTemplate
      );
    } else {
      errorToHelpfulNotification(
        e,
        params.exportFormat.footerTemplatePath,
        footerTemplate
      );
      return false;
    }
  }

  const output: string[] = [];

  if (headerTemplate && header.trim()) {
    output.push(header);
  }

  const haveAnnotations =
    annotationTemplate && (existingAnnotations + annotations).trim();

  if (haveAnnotations) {
    output.push(wrapAnnotationTemplate(existingAnnotations + annotations));
  }

  if (footerTemplate && footer.trim()) {
    output.push(footer);
  }

  return haveAnnotations ? appendExportDate(output.join('')) : output.join('');
}

export async function exportToMarkdown(
  app: App,
  params: ExportToMarkdownParams
) {
  const exportDate = moment();
  const { database, exportFormat, settings } = params;

  const citeKeys: string[] = await getCiteKeys(database);

  if (!citeKeys.length) return false;

  let itemData: any;
  try {
    itemData = await getItemJSONFromCiteKeys(citeKeys, database);
  } catch (e) {
    return false;
  }

  for (let i = 0, len = itemData.length; i < len; i++) {
    await processItem(itemData[i], exportDate, database, exportFormat.cslStyle);
  }

  const vaultRoot = getVaultRoot();

  for (let i = 0, len = itemData.length; i < len; i++) {
    const attachments = itemData[i].attachments as any[];
    const hasPDF = attachments.some((a) => a.path?.endsWith('.pdf'));

    // Handle the case of an item with no PDF attachments
    if (!hasPDF) {
      const templateData = applyBasicTemplates({
        ...itemData[i],
        annotations: [],
      });

      const markdownPath = sanitizeFilePath(
        removeStartingSlash(
          template.renderString(exportFormat.outputPathTemplate, templateData)
        )
      );

      const existingMarkdown = app.vault.getAbstractFileByPath(markdownPath);
      const rendered = await renderTemplates(app, params, templateData, '');

      if (!rendered) return false;

      if (existingMarkdown) {
        app.vault.modify(existingMarkdown as TFile, rendered);
      } else {
        await mkMDDir(markdownPath);
        app.vault.create(markdownPath, rendered);
      }

      continue;
    }

    // Handle the case of an item WITH PDF attachments
    for (let j = 0, jLen = attachments.length; j < jLen; j++) {
      const pdfInputPath = attachments[j].path;
      if (!pdfInputPath?.endsWith('.pdf')) continue;

      const pathTemplateData = applyBasicTemplates({
        ...attachments[j],
        ...itemData[i],
      });

      const imageOutputPath = path.resolve(
        vaultRoot,
        exportFormat.imageOutputPathTemplate
          ? removeStartingSlash(
              template.renderString(
                exportFormat.imageOutputPathTemplate,
                pathTemplateData
              )
            )
          : './'
      );

      const imageRelativePath = exportFormat.imageOutputPathTemplate
        ? sanitizeFilePath(
            removeStartingSlash(
              template.renderString(
                exportFormat.imageOutputPathTemplate,
                pathTemplateData
              )
            )
          )
        : '';

      const imageBaseName = exportFormat.imageOutputPathTemplate
        ? sanitizeFilePath(
            removeStartingSlash(
              template.renderString(
                exportFormat.imageBaseNameTemplate,
                pathTemplateData
              )
            )
          )
        : 'image';

      const markdownPath = sanitizeFilePath(
        removeStartingSlash(
          template.renderString(
            exportFormat.outputPathTemplate,
            pathTemplateData
          )
        )
      );

      const existingMarkdown = app.vault.getAbstractFileByPath(markdownPath);

      let lastExportDate = moment(0);
      let existingAnnotations = '';

      if (existingMarkdown) {
        const markdown = await app.vault.cachedRead(existingMarkdown as TFile);

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
          annots.forEach((a: any) => {
            processAnnotation(a, attachments[j], imageRelativePath);
          });
          attachments[j].annotations = annots;
        } catch (e) {
          return false;
        }
      }

      const templateData: Record<any, any> = applyBasicTemplates({
        ...itemData[i],
        lastExportDate,
        annotations: annots ? annots : [],
      });

      const rendered = await renderTemplates(
        app,
        params,
        templateData,
        existingAnnotations
      );

      if (!rendered) return false;

      if (existingMarkdown) {
        app.vault.modify(existingMarkdown as TFile, rendered);
      } else {
        await mkMDDir(markdownPath);
        app.vault.create(markdownPath, rendered);
      }
    }
  }

  return true;
}

function getAStyle(settings: ZoteroConnectorSettings) {
  const exportStyle = settings.exportFormats.find((f) => !!f.cslStyle);

  if (exportStyle) {
    return exportStyle.cslStyle;
  }

  const citeStyle = settings.citeFormats.find((f) => !!f.cslStyle);

  if (citeStyle) {
    return citeStyle.cslStyle;
  }
}

export async function dataExplorerPrompt(settings: ZoteroConnectorSettings) {
  const citeKeys: string[] = await getCiteKeys(settings.database);

  if (!citeKeys.length) return null;

  let itemData: any;
  try {
    itemData = await getItemJSONFromCiteKeys(citeKeys, settings.database);
  } catch (e) {
    return null;
  }

  const exportDate = moment();
  const style = getAStyle(settings);

  for (let i = 0, len = itemData.length; i < len; i++) {
    await processItem(itemData[i], exportDate, settings.database, style);
  }

  if (doesEXEExist()) {
    const vaultRoot = getVaultRoot();

    for (let i = 0, len = itemData.length; i < len; i++) {
      const attachments = itemData[i].attachments;
      for (let j = 0, jLen = attachments.length; j < jLen; j++) {
        const pdfInputPath = attachments[j].path;
        if (!pdfInputPath?.endsWith('.pdf')) continue;

        let annots: any;

        try {
          const res = await extractAnnotations(pdfInputPath, {
            noWrite: true,
            imageBaseName: 'base_name',
            imageDPI: settings.pdfExportImageDPI,
            imageFormat: settings.pdfExportImageFormat,
            imageOutputPath: path.join(vaultRoot, 'output_path'),
            imageQuality: settings.pdfExportImageQuality,
          });
          annots = JSON.parse(res);
          annots.forEach((a: any) => {
            processAnnotation(a, attachments[j], 'output_path');
          });

          attachments[j].annotations = annots;
        } catch (e) {
          return false;
        }
      }
    }
  }

  itemData.forEach((data: any) => {
    const firstPDF = data.attachments.find((a: any) =>
      a.path?.endsWith('.pdf')
    );

    data.annotations = firstPDF?.annotations ? firstPDF.annotations : [];
    data.lastExportDate = moment(0);

    applyBasicTemplates(data);
  });

  return itemData;
}
