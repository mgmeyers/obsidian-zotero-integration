export type Format =
	| "latex"
	| "biblatex"
	| "pandoc"
	| "formatted-citation"
	| "formatted-bibliography";

export interface CitationFormat {
	name: string;
	format: Format;
	command?: string;
	brackets?: boolean;
}

export type Database = "Zotero" | "Juris-M";

export interface CalloutDef {
	type: string;
	prefix: string;
}

export enum GroupingOptions {
	Tag = "tag",
	AnnotationDate = "annotation-date",
	ExportDate = "export-date",
	Color = "color",
}

export enum SortingOptions {
	Color = "color",
	Date = "date",
	Location = "location",
}

export interface ExportFormat {
	name: string;
	outputPathTemplate: string;
	assetOutputPathTemplate: string;
	assetBaseNameTemplate: string;

	headerTemplatePath?: string;
	annotationTemplatePath?: string;
	footerTemplatePath?: string;

	zoteroItemTypes: string[];
	isDefault: boolean;

	groupBy: GroupingOptions;
	sortBy: SortingOptions;
}

export interface ZoteroConnectorSettings {
	database: Database;
	noteImportFolder: string;
	citeFormats: CitationFormat[];
	exportFormats: ExportFormat[];
	pdfExportImageDPI?: number;
	pdfExportImageQuality?: number;
	pdfExportImageFormat?: string;
	pdfExportDateFormat?: string;
	pdfExportDateTimeFormat?: string;
	pdfExportCalloutPrefixes?: CalloutDef[];
	pdfExportConcatenationPrefix?: string;
}
