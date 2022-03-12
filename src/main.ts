import { Plugin } from "obsidian";
import { getCAYW } from "./cayw";
import { CitationFormat, ZoteroConnectorSettings } from "./types";
import { ZoteroConnectorSettingsTab } from "./settings";

import "./styles.css";
import {
	filesFromNotes,
	insertNotesIntoCurrentDoc,
	noteExportPrompt,
} from "./exportNotes";

const citationCommandIDPrefix = "zdc-";
const DEFAULT_SETTINGS: ZoteroConnectorSettings = {
	database: 'Zotero',
	noteImportFolder: "",
	formats: [],
};

export default class ZoteroConnector extends Plugin {
	settings: ZoteroConnectorSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ZoteroConnectorSettingsTab(this.app, this));
		this.settings.formats.forEach((f) => {
			this.addFormatCommand(f);
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
	}

	onunload() {
		this.settings.formats.forEach((f) => {
			this.removeFormatCommand(f);
		});
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
			`zotero-desktop-connector:${citationCommandIDPrefix}${format.name}`
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
}
