import './styles.css';
import './bbt/template.helpers';

import { Plugin, TFile } from 'obsidian';

import { getCAYW } from './bbt/cayw';
import { exportToMarkdown } from './bbt/export';
import {
  filesFromNotes,
  insertNotesIntoCurrentDoc,
  noteExportPrompt,
} from './bbt/exportNotes';
import { DataExplorerView, viewType } from './DataExplorerView';
import { ZoteroConnectorSettingsTab } from './settings/settings';
import { CitationFormat, ExportFormat, ZoteroConnectorSettings } from './types';
import { createEmitter, Emitter } from './emitter';
import { currentVersion, downloadAndExtract } from './settings/AssetDownloader';
import { LoadingModal } from './bbt/LoadingModal';

const citationCommandIDPrefix = 'zdc-';
const exportCommandIDPrefix = 'zdc-exp-';
const DEFAULT_SETTINGS: ZoteroConnectorSettings = {
  database: 'Zotero',
  noteImportFolder: '',
  pdfExportImageDPI: 120,
  pdfExportImageFormat: 'jpg',
  pdfExportImageQuality: 90,
  citeFormats: [],
  exportFormats: [],
};

interface ViewEvents {
  settingsUpdated: () => void;
  fileUpdated: (file: TFile) => void;
}

export default class ZoteroConnector extends Plugin {
  settings: ZoteroConnectorSettings;
  emitter: Emitter<ViewEvents>;

  async onload() {
    await this.loadSettings();
    this.emitter = createEmitter();

    this.updatePDFUtility();
    this.addSettingTab(new ZoteroConnectorSettingsTab(this.app, this));
    this.registerView(viewType, (leaf) => new DataExplorerView(this, leaf));

    this.settings.citeFormats.forEach((f) => {
      this.addFormatCommand(f);
    });

    this.settings.exportFormats.forEach((f) => {
      this.addExportCommand(f);
    });

    this.registerEvent(
      this.app.vault.on('modify', (file) => {
        if (file instanceof TFile && this.emitter.events.fileUpdated?.length) {
          this.emitter.emit('fileUpdated', file);
        }
      })
    );

    this.addCommand({
      id: 'zdc-insert-notes',
      name: 'Insert notes into current document',
      editorCallback: (editor) => {
        noteExportPrompt(this.settings.database).then((notes) => {
          if (notes) {
            insertNotesIntoCurrentDoc(editor, notes);
          }
        });
      },
    });

    this.addCommand({
      id: 'zdc-import-notes',
      name: 'Import notes',
      callback: () => {
        noteExportPrompt(this.settings.database).then((notes) => {
          if (notes) {
            filesFromNotes(this.app, this.settings.noteImportFolder, notes);
          }
        });
      },
    });

    this.addCommand({
      id: 'show-zotero-debug-view',
      name: 'Data explorer',
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
          if (typeof res === 'string') {
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
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    if (this.emitter.events.settingsUpdated?.length) {
      this.emitter.emit('settingsUpdated', undefined);
    }
    await this.saveData(this.settings);
  }

  deactivateView() {
    this.app.workspace.detachLeavesOfType(viewType);
  }

  async activateView() {
    this.deactivateView();
    const leaf = this.app.workspace.createLeafBySplit(
      this.app.workspace.activeLeaf,
      'vertical'
    );

    await leaf.setViewState({
      type: viewType,
    });
  }

  async updatePDFUtility() {
    if (this.settings.exeVersion && this.settings.exeVersion !== currentVersion) {
      const modal = new LoadingModal(
        (window as any).app,
        'Updating Zotero Desktop Connector PDF Utility...'
      );
      modal.open();

      try {  
        const success = await downloadAndExtract()

        if (success) {
          this.settings.exeVersion = currentVersion;
          this.saveSettings();
        }
      } catch {
        //
      }

      modal.close();
    }
  }
}
