import { Plugin } from "obsidian";
import { getCAYW } from "./bbt/cayw";
import { CitationFormat, ExportFormat, ZoteroConnectorSettings } from "./types";
import { ZoteroConnectorSettingsTab } from "./settings/settings";

import "./styles.css";
import {
	filesFromNotes,
	insertNotesIntoCurrentDoc,
	noteExportPrompt,
} from "./bbt/exportNotes";
import { DebugView, viewType } from "./DebugView";
import { exportToMarkdown } from "./bbt/annotations";
import './bbt/template.helpers'

const citationCommandIDPrefix = "zdc-";
const exportCommandIDPrefix = "zdc-exp-";
const DEFAULT_SETTINGS: ZoteroConnectorSettings = {
	database: "Zotero",
	noteImportFolder: "",
	pdfExportImageDPI: 120,
	pdfExportImageFormat: "jpg",
	pdfExportImageQuality: 90,
	citeFormats: [],
	exportFormats: [],
};

export default class ZoteroConnector extends Plugin {
	settings: ZoteroConnectorSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new ZoteroConnectorSettingsTab(this.app, this));
		this.registerView(viewType, (leaf) => new DebugView(this, leaf));

		this.settings.citeFormats.forEach((f) => {
			this.addFormatCommand(f);
		});

		this.settings.exportFormats.forEach((f) => {
			this.addExportCommand(f);
		});

		this.addCommand({
			id: "zdc-insert-notes",
			name: "Insert notes into current document",
			editorCallback: (editor) => {
				noteExportPrompt(this.settings.database).then((notes) => {
					if (notes) {
						insertNotesIntoCurrentDoc(editor, notes);
					}
				});
			},
		});

		this.addCommand({
			id: "zdc-import-notes",
			name: "Import notes",
			callback: () => {
				noteExportPrompt(this.settings.database).then((notes) => {
					if (notes) {
						filesFromNotes(
							this.app,
							this.settings.noteImportFolder,
							notes
						);
					}
				});
			},
		});

		this.addCommand({
			id: "show-zotero-debug-view",
			name: "Data explorer",
			callback: () => {
				this.activateView();
			},
		});
	}

	onunload() {
		this.settings.citeFormats.forEach((f) => {
			this.removeFormatCommand(f);
		});

		this.settings.exportFormats.forEach((f) => {
			this.removeExportCommand(f);
		});

		this.app.workspace.detachLeavesOfType(viewType);
	}

	addFormatCommand(format: CitationFormat) {
		this.addCommand({
			id: `${citationCommandIDPrefix}${format.name}`,
			name: format.name,
			editorCallback: (editor) => {
				getCAYW(format, this.settings.database).then((res) => {
					if (typeof res === "string") {
						editor.replaceSelection(res);
					}
				});
			},
		});
	}

	removeFormatCommand(format: CitationFormat) {
		(this.app as any).commands.removeCommand(
			`obsidian-zotero-desktop-connector:${citationCommandIDPrefix}${format.name}`
		);
	}

	addExportCommand(format: ExportFormat) {
		this.addCommand({
			id: `${exportCommandIDPrefix}${format.name}`,
			name: format.name,
			callback: () => {
				exportToMarkdown(this.app, {
					settings: this.settings,
					database: this.settings.database,
					exportFormat: format,
				});
			},
		});
	}

	removeExportCommand(format: ExportFormat) {
		(this.app as any).commands.removeCommand(
			`zotero-desktop-connector:${exportCommandIDPrefix}${format.name}`
		);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	deactivateView() {
		this.app.workspace.detachLeavesOfType(viewType);
	}

	async activateView() {
		this.deactivateView();
		const leaf = this.app.workspace.createLeafBySplit(
			this.app.workspace.activeLeaf,
			"vertical"
		);

		await leaf.setViewState({
			type: viewType,
		});
	}
}
