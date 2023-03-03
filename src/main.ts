import './styles.css';
import './bbt/template.helpers';

import { EventRef, Events, Plugin, TFile } from 'obsidian';

import { getCAYW } from './bbt/cayw';
import { exportToMarkdown, renderCiteTemplate } from './bbt/export';
import {
  filesFromNotes,
  insertNotesIntoCurrentDoc,
  noteExportPrompt,
} from './bbt/exportNotes';
import { LoadingModal } from './bbt/LoadingModal';
import { CiteSuggest } from './citeSuggest/citeSuggest';
import { DataExplorerView, viewType } from './DataExplorerView';
import { Emitter, createEmitter } from './emitter';
import { currentVersion, downloadAndExtract } from './settings/AssetDownloader';
import { ZoteroConnectorSettingsTab } from './settings/settings';
import { CitationFormat, ExportFormat, ZoteroConnectorSettings } from './types';

const commandPrefix = 'obsidian-zotero-desktop-connector:';
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
  citeSuggestTemplate: '[[{{citekey}}]]',
};

interface ViewEvents {
  settingsUpdated: () => void;
  fileUpdated: (file: TFile) => void;
}

export default class ZoteroConnector extends Plugin {
  settings: ZoteroConnectorSettings;
  emitter: Emitter<ViewEvents>;
  private importEvents = new Events();
  private importEventsRef: EventRef;

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

    // When an import is completed, proceed to open the crated or updated notes if the setting is enabled
    this.importEventsRef = this.importEvents.on(
      'import-complete',
      (createdOrUpdatedMarkdownFilesPaths) => {
        if (this.settings.openNoteAfterImport) {
          let pathOfNotesToOpen: string[] = [];

          // Depending on the choice, retreive the paths of the first, the last or all imported notes
          switch (this.settings.whichNotesToOpenAfterImport) {
            case 'first-imported-note': {
              pathOfNotesToOpen.push(createdOrUpdatedMarkdownFilesPaths[0]);
              break;
            }
            case 'last-imported-note': {
              pathOfNotesToOpen.push(
                createdOrUpdatedMarkdownFilesPaths[
                  createdOrUpdatedMarkdownFilesPaths.length - 1
                ]
              );
              break;
            }
            case 'all-imported-notes': {
              pathOfNotesToOpen.push(...createdOrUpdatedMarkdownFilesPaths);
              break;
            }
          }
          // Force a 1s delay after importing the files to make sure that notes are created before attempting to open them.
          // A better solution could surely be found to refresh the vault, but I am not sure how to proceed!
          setTimeout(() => this.openNotes(pathOfNotesToOpen), 1000);
        }
      }
    );

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
            filesFromNotes(this.settings.noteImportFolder, notes);
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

    this.registerEditorSuggest(new CiteSuggest(this.app, this));
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
        if (format.format === 'template' && format.template.trim()) {
          renderCiteTemplate({
            database: this.settings.database,
            format,
          }).then((res) => {
            if (typeof res === 'string') {
              editor.replaceSelection(res);
            }
          });
        } else {
          getCAYW(format, this.settings.database).then((res) => {
            if (typeof res === 'string') {
              editor.replaceSelection(res);
            }
          });
        }
      },
    });
  }

  removeFormatCommand(format: CitationFormat) {
    (this.app as any).commands.removeCommand(
      `${commandPrefix}${citationCommandIDPrefix}${format.name}`
    );
  }

  addExportCommand(format: ExportFormat) {
    this.addCommand({
      id: `${exportCommandIDPrefix}${format.name}`,
      name: format.name,
      callback: () => {
        exportToMarkdown(
          {
            settings: this.settings,
            database: this.settings.database,
            exportFormat: format,
          },
          this.importEvents
        );
      },
    });
  }

  removeExportCommand(format: ExportFormat) {
    (this.app as any).commands.removeCommand(
      `${commandPrefix}${exportCommandIDPrefix}${format.name}`
    );
  }

  async openNotes(pathOfNotesToOpen: Array<string>) {
    for (var path of pathOfNotesToOpen) {
      let note = this.app.vault.getAbstractFileByPath(path);

      if (note instanceof TFile) {
        await this.app.workspace.getLeaf(true).openFile(note);
      }
    }
  }

  async loadSettings() {
    const loadedSettings = await this.loadData();

    this.settings = {
      ...DEFAULT_SETTINGS,
      ...loadedSettings,
    };
  }

  async saveSettings() {
    if (this.emitter?.events.settingsUpdated?.length) {
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
    if (
      this.settings.exeVersion &&
      this.settings.exeVersion !== currentVersion
    ) {
      const modal = new LoadingModal(
        app,
        'Updating Obsidian Zotero Integration PDF Utility...'
      );
      modal.open();

      try {
        const success = await downloadAndExtract();

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
