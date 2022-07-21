import path from 'path';

import { Notice, TFile, htmlToMarkdown, moment, normalizePath } from 'obsidian';

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
import { getColorCategory, mkMDDir, sanitizeFilePath } from './helpers';
import {
  getAttachmentsFromCiteKey,
  getBibFromCiteKey,
  getCollectionFromCiteKey,
  getIssueDateFromCiteKey,
  getItemJSONFromCiteKeys,
} from './jsonRPC';
import { PersistExtension, renderTemplate } from './template.env';
import {
  appendExportDate,
  getExistingAnnotations,
  getLastExport,
  getTemplates,
  removeStartingSlash,
  wrapAnnotationTemplate,
} from './template.helpers';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

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
    annotation.imageRelativePath = normalizePath(
      path.join(imageRelativePath, annotation.imageBaseName)
    );
  }
}

function convertNativeAnnotation(
  annotation: any,
  attachment: any,
  imageOutputPath: string,
  imageRelativePath: string,
  copy: boolean = false
) {
  const rect = annotation.annotationPosition.rects[0];

  const annot: Record<string, any> = {
    date: moment(annotation.dateModified),
    attachment,
    page: annotation.annotationPosition.pageIndex + 1,
    id: annotation.key,
    type: annotation.annotationType,
    x: rect[0],
    y: rect[1],
    color: annotation.annotationColor,
    colorCategory: getColorCategory(annotation.annotationColor),
  };

  if (annotation.annotationText) {
    annot.annotatedText = annotation.annotationText;
  }

  if (annotation.annotationComment) {
    annot.comment = annotation.annotationComment;
  }

  if (annotation.annotationImagePath) {
    const parsed = path.parse(annotation.annotationImagePath);

    annot.imageBaseName = `${annotation.key}${parsed.ext}`;
    annot.imageRelativePath = normalizePath(
      path.join(imageRelativePath, annot.imageBaseName)
    );
    annot.imageExtension = parsed.ext.slice(1);

    const imagePath = path.join(imageOutputPath, annot.imageBaseName);

    if (copy) {
      if (!existsSync(imageOutputPath)) {
        mkdirSync(imageOutputPath, { recursive: true });
      }

      copyFileSync(path.join(parsed.dir, annot.imageBaseName), imagePath);
    }

    annot.imagePath = imagePath;
  }

  return annot;
}

function concatAnnotations(annots: Array<Record<string, any>>) {
  const output: Array<Record<string, any>> = [];
  const re = /^\+\s*/;

  annots.forEach((a) => {
    if (typeof a.comment === 'string' && re.test(a.comment)) {
      a.comment = a.comment.replace(re, '');

      const last = output[output.length - 1];

      if (last) {
        last.annotatedText = last.annotatedText
          ? last.annotatedText + '...' + a.annotatedText
          : a.annotatedText;
        last.comment = last.comment
          ? last.comment + '...' + a.comment
          : a.comment;

        return;
      }
    }

    output.push(a);
  });

  return output;
}

async function processItem(
  item: any,
  importDate: moment.Moment,
  database: Database,
  cslStyle?: string
) {
  item.importDate = importDate;
  // legacy
  item.exportDate = importDate;
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
    item.collections = await getCollectionFromCiteKey(item.citekey, database);
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
  params: ExportToMarkdownParams,
  templateData: Record<any, any>,
  existingAnnotations: string,
  shouldThrow?: boolean
) {
  const { template, headerTemplate, annotationTemplate, footerTemplate } =
    await getTemplates(params);

  if (!template && !headerTemplate && !annotationTemplate && !footerTemplate) {
    throw new Error(
      `No templates found for export ${params.exportFormat.name}`
    );
  }

  let main = '';

  if (template) {
    try {
      main = template
        ? await renderTemplate(
            params.exportFormat.templatePath,
            template,
            templateData
          )
        : '';
    } catch (e) {
      if (shouldThrow) {
        throw errorToHelpfulError(
          e,
          params.exportFormat.templatePath,
          template
        );
      } else {
        errorToHelpfulNotification(
          e,
          params.exportFormat.templatePath,
          template
        );
        return false;
      }
    }

    return appendExportDate(main);
  }

  // Legacy templates
  let header = '';
  let annotations = '';
  let footer = '';

  try {
    header = headerTemplate
      ? await renderTemplate(
          params.exportFormat.headerTemplatePath,
          headerTemplate,
          templateData
        )
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

  try {
    annotations = annotationTemplate
      ? await renderTemplate(
          params.exportFormat.annotationTemplatePath,
          annotationTemplate,
          templateData
        )
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

  try {
    footer = footerTemplate
      ? await renderTemplate(
          params.exportFormat.footerTemplatePath,
          footerTemplate,
          templateData
        )
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

export function getATemplatePath({ exportFormat }: ExportToMarkdownParams) {
  return (
    exportFormat.templatePath ||
    exportFormat.headerTemplatePath ||
    exportFormat.annotationTemplatePath ||
    exportFormat.footerTemplatePath ||
    ''
  );
}

export async function exportToMarkdown(params: ExportToMarkdownParams) {
  const importDate = moment();
  const { database, exportFormat, settings } = params;
  const sourcePath = getATemplatePath(params);
  const canExtract = doesEXEExist();

  const citeKeys: string[] = await getCiteKeys(database);

  if (!citeKeys.length) return false;

  let itemData: any;
  try {
    itemData = await getItemJSONFromCiteKeys(citeKeys, database);
  } catch (e) {
    return false;
  }

  for (let i = 0, len = itemData.length; i < len; i++) {
    await processItem(itemData[i], importDate, database, exportFormat.cslStyle);
  }

  const vaultRoot = getVaultRoot();

  for (let i = 0, len = itemData.length; i < len; i++) {
    const attachments = itemData[i].attachments as any[];
    const hasPDF = attachments.some((a) => a.path?.endsWith('.pdf'));

    // Handle the case of an item with no PDF attachments
    if (!hasPDF) {
      const templateData = await applyBasicTemplates(sourcePath, {
        ...itemData[i],
        annotations: [],
      });

      const markdownPath = sanitizeFilePath(
        removeStartingSlash(
          await renderTemplate(
            sourcePath,
            exportFormat.outputPathTemplate,
            templateData
          )
        )
      );

      const existingMarkdownFile =
        app.vault.getAbstractFileByPath(markdownPath);
      let existingMarkdown = '';

      if (existingMarkdownFile) {
        existingMarkdown = await app.vault.cachedRead(
          existingMarkdownFile as TFile
        );
      }

      const rendered = await renderTemplates(
        params,
        PersistExtension.prepareTemplateData(templateData, existingMarkdown),
        ''
      );

      if (!rendered) return false;

      if (existingMarkdown) {
        app.vault.modify(existingMarkdownFile as TFile, rendered);
      } else {
        await mkMDDir(markdownPath);
        app.vault.create(markdownPath, rendered);
      }

      continue;
    }

    let mappedAttachments: Record<string, any> = {};

    try {
      const fullAttachmentData = await getAttachmentsFromCiteKey(
        itemData[i].citekey,
        database
      );

      mappedAttachments = (fullAttachmentData as any[]).reduce<
        Record<string, any>
      >((col, a) => {
        col[a.path] = a;
        return col;
      }, {});
    } catch {
      //
    }

    // Handle the case of an item WITH PDF attachments
    for (let j = 0, jLen = attachments.length; j < jLen; j++) {
      const pdfInputPath = attachments[j].path;
      if (!pdfInputPath?.endsWith('.pdf')) continue;

      const pathTemplateData = await applyBasicTemplates(sourcePath, {
        ...attachments[j],
        ...itemData[i],
      });

      const imageRelativePath = exportFormat.imageOutputPathTemplate
        ? sanitizeFilePath(
            removeStartingSlash(
              await renderTemplate(
                sourcePath,
                exportFormat.imageOutputPathTemplate,
                pathTemplateData
              )
            )
          )
        : '';

      const imageOutputPath = path.resolve(vaultRoot, imageRelativePath);

      const imageBaseName = exportFormat.imageOutputPathTemplate
        ? sanitizeFilePath(
            removeStartingSlash(
              await renderTemplate(
                sourcePath,
                exportFormat.imageBaseNameTemplate,
                pathTemplateData
              )
            )
          )
        : 'image';

      const markdownPath = sanitizeFilePath(
        removeStartingSlash(
          await renderTemplate(
            sourcePath,
            exportFormat.outputPathTemplate,
            pathTemplateData
          )
        )
      );

      const existingMarkdownFile =
        app.vault.getAbstractFileByPath(markdownPath);

      let existingMarkdown = '';
      let lastImportDate = moment(0);
      let existingAnnotations = '';

      if (existingMarkdownFile) {
        existingMarkdown = await app.vault.cachedRead(
          existingMarkdownFile as TFile
        );

        lastImportDate = getLastExport(existingMarkdown);
        existingAnnotations = getExistingAnnotations(existingMarkdown);
      }

      let annots: any[] = [];

      mappedAttachments[attachments[j].path]?.annotations?.forEach(
        (annot: any) => {
          annots.push(
            convertNativeAnnotation(
              annot,
              attachments[j],
              imageOutputPath,
              imageRelativePath,
              true
            )
          );
        }
      );

      if (settings.shouldConcat && annots.length) {
        annots = concatAnnotations(annots);
      }

      if (canExtract) {
        try {
          const res = await extractAnnotations(pdfInputPath, {
            imageBaseName: imageBaseName,
            imageDPI: settings.pdfExportImageDPI,
            imageFormat: settings.pdfExportImageFormat,
            imageOutputPath: imageOutputPath,
            imageQuality: settings.pdfExportImageQuality,
            attemptOCR: settings.pdfExportImageOCR,
            ocrLang: settings.pdfExportImageOCRLang,
            tesseractPath: settings.pdfExportImageTesseractPath,
            tessDataDir: settings.pdfExportImageTessDataDir,
          });

          let extracted = JSON.parse(res);

          extracted.forEach((a: any) => {
            processAnnotation(a, attachments[j], imageRelativePath);
          });

          if (settings.shouldConcat && extracted.length) {
            extracted = concatAnnotations(extracted);
          }

          annots.push(...extracted);
        } catch (e) {
          return false;
        }
      }

      if (annots.length) {
        attachments[j].annotations = annots;
      }

      const templateData: Record<any, any> = await applyBasicTemplates(
        markdownPath,
        {
          ...itemData[i],
          lastImportDate,
          annotations: annots ? annots : [],

          // legacy
          lastExportDate: lastImportDate,
        }
      );

      const rendered = await renderTemplates(
        params,
        PersistExtension.prepareTemplateData(templateData, existingMarkdown),
        existingAnnotations
      );

      if (!rendered) return false;

      if (existingMarkdownFile) {
        app.vault.modify(existingMarkdownFile as TFile, rendered);
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
  const canExtract = doesEXEExist();

  if (!citeKeys.length) return null;

  let itemData: any;
  try {
    itemData = await getItemJSONFromCiteKeys(citeKeys, settings.database);
  } catch (e) {
    return null;
  }

  const importDate = moment();
  const style = getAStyle(settings);

  for (let i = 0, len = itemData.length; i < len; i++) {
    await processItem(itemData[i], importDate, settings.database, style);
  }

  const vaultRoot = getVaultRoot();

  for (let i = 0, len = itemData.length; i < len; i++) {
    const attachments = itemData[i].attachments;

    let mappedAttachments: Record<string, any> = {};

    try {
      const fullAttachmentData = await getAttachmentsFromCiteKey(
        itemData[i].citekey,
        settings.database
      );

      mappedAttachments = (fullAttachmentData as any[]).reduce<
        Record<string, any>
      >((col, a) => {
        col[a.path] = a;
        return col;
      }, {});
    } catch (e) {
      console.error(e);
    }

    for (let j = 0, jLen = attachments.length; j < jLen; j++) {
      const pdfInputPath = attachments[j].path;
      if (!pdfInputPath?.endsWith('.pdf')) continue;

      let annots: any[] = [];

      mappedAttachments[attachments[j].path]?.annotations?.forEach(
        (annot: any) => {
          annots.push(
            convertNativeAnnotation(
              annot,
              attachments[j],
              path.join(vaultRoot, 'output_path'),
              'output_path'
            )
          );
        }
      );

      if (settings.shouldConcat && annots.length) {
        annots = concatAnnotations(annots);
      }

      if (canExtract) {
        try {
          const res = await extractAnnotations(pdfInputPath, {
            noWrite: true,
            imageBaseName: 'base_name',
            imageDPI: settings.pdfExportImageDPI,
            imageFormat: settings.pdfExportImageFormat,
            imageOutputPath: path.join(vaultRoot, 'output_path'),
            imageQuality: settings.pdfExportImageQuality,
            attemptOCR: settings.pdfExportImageOCR,
            ocrLang: settings.pdfExportImageOCRLang,
            tesseractPath: settings.pdfExportImageTesseractPath,
            tessDataDir: settings.pdfExportImageTessDataDir,
          });

          let extracted = JSON.parse(res);

          extracted.forEach((a: any) => {
            processAnnotation(a, attachments[j], 'output_path');
          });

          if (settings.shouldConcat && extracted.length) {
            extracted = concatAnnotations(extracted);
          }

          annots.push(...extracted);
        } catch (e) {
          return false;
        }
      }

      if (annots.length) {
        attachments[j].annotations = annots;
      }
    }
  }

  await Promise.all(
    itemData.map(async (data: any) => {
      const firstPDF = data.attachments.find((a: any) =>
        a.path?.endsWith('.pdf')
      );

      data.annotations = firstPDF?.annotations ? firstPDF.annotations : [];
      data.lastExportDate = moment(0);

      await applyBasicTemplates('', data);
    })
  );

  return itemData;
}
