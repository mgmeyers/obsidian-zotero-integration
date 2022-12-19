export type Format =
  | 'latex'
  | 'biblatex'
  | 'pandoc'
  | 'formatted-citation'
  | 'formatted-bibliography'
  | 'template';

export interface CitationFormat {
  name: string;
  format: Format;
  command?: string;
  brackets?: boolean;
  cslStyle?: string;
  template?: string;
}

export type Database = 'Zotero' | 'Juris-M';

export type NotesToOpenAfterImport = 'first-imported-note' | 'last-imported-note' | 'all-imported-notes';

export interface CalloutDef {
  type: string;
  prefix: string;
}

export enum GroupingOptions {
  Tag = 'tag',
  AnnotationDate = 'annotation-date',
  ExportDate = 'export-date',
  Color = 'color',
}

export enum SortingOptions {
  Color = 'color',
  Date = 'date',
  Location = 'location',
}

export interface ExportFormat {
  name: string;
  outputPathTemplate: string;
  imageOutputPathTemplate: string;
  imageBaseNameTemplate: string;

  templatePath?: string;
  cslStyle?: string;

  // Deprecated
  headerTemplatePath?: string;
  annotationTemplatePath?: string;
  footerTemplatePath?: string;
}

export interface ExportToMarkdownParams {
  settings: ZoteroConnectorSettings;
  database: Database;
  exportFormat: ExportFormat;
}

export interface RenderCiteTemplateParams {
  database: Database;
  format: CitationFormat;
}

export interface ZoteroConnectorSettings {
  database: Database;
  noteImportFolder: string;
  openNoteAfterImport: boolean;
  whichNotesToOpenAfterImport: NotesToOpenAfterImport;
  citeFormats: CitationFormat[];
  exportFormats: ExportFormat[];
  pdfExportImageDPI?: number;
  pdfExportImageQuality?: number;
  pdfExportImageFormat?: string;
  pdfExportImageOCR?: boolean;
  pdfExportImageOCRLang?: string;
  pdfExportImageTesseractPath?: string;
  pdfExportImageTessDataDir?: string;
  exeVersion?: string;
  settingsVersion?: number;
  shouldShowCiteSuggest?: boolean;
  shouldConcat?: boolean;
}

export interface MarkdownFileKeyAndPath {
  key: string;
  path?: string;
}