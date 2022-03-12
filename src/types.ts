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

export type Database = 'Zotero' | 'Juris-M';

export interface ZoteroConnectorSettings {
	database: Database;
	noteImportFolder: string;
	formats: CitationFormat[];
}