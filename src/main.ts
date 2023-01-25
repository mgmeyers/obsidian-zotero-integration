import './styles.css';
import './bbt/template.helpers';

import { Plugin, TFile, TFolder, Events, EventRef, Notice, FuzzySuggestModal, Modal, App, Setting } from 'obsidian';

import { getCAYW } from './bbt/cayw';
import { doTheActualExport, exportToMarkdown, renderCiteTemplate } from './bbt/export';
import {
  filesFromNotes,
  insertNotesIntoCurrentDoc,
  noteExportPrompt,
} from './bbt/exportNotes';
import { LoadingModal } from './bbt/LoadingModal';
import { DataExplorerView, viewType } from './DataExplorerView';
import { Emitter, createEmitter } from './emitter';
import { currentVersion, downloadAndExtract } from './settings/AssetDownloader';
import { ZoteroConnectorSettingsTab } from './settings/settings';
import { CitationFormat, ExportFormat, ZoteroConnectorSettings } from './types';
import { CiteSuggest } from './citeSuggest/citeSuggest';

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
};

interface ViewEvents {
  settingsUpdated: () => void;
  fileUpdated: (file: TFile) => void;
}

class FormatModal extends FuzzySuggestModal<ExportFormat> {
  items: ExportFormat[]
  constructor(app: any, items: ExportFormat[], callback: (item: ExportFormat) => void) {
    super(app)
    this.items = items
    this.onChooseItem = callback
  }

  getItems(): ExportFormat[] {
    return this.items;
  }

  getItemText(format: ExportFormat): string {
    return format.name;
  }
}

export class UseSuggestedFormatModal extends Modal {
  format: ExportFormat
  useFormat: () => void

  constructor(app: App, format: ExportFormat, useFormat: (useFormat) => void) {
    super(app);
    this.format = format
    this.useFormat = useFormat
  }

  onOpen() {
    let { contentEl } = this;
    contentEl.createEl("h3", {text: "Do you want to use the detected format: "+this.format.name})

    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText("Yes").setCta().onClick(() => {
        this.close();
        this.useFormat(true)
      })
    );
  
    new Setting(contentEl).addButton((btn) =>
      btn.setButtonText("No, selected other template").setCta().onClick(() => {
          this.close();
          this.useFormat(false)
      })
    );
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
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

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, selectedFile) => {  
        menu.addItem((item) => {
          item.setTitle("Update from Zotero").setIcon("document").onClick(async () => {
             // Function to export file
              const exportFile = (file: any, format: ExportFormat) => {
                doTheActualExport(
                  [file.basename],
                  { settings: this.settings,
                  database: this.settings.database,
                  exportFormat: format},
                  this.importEvents)
              }

              const exportFileOrFolder = (fileorfolder: any, format: ExportFormat) => {
                if (selectedFile instanceof TFile) {
                  exportFile(selectedFile, format)
                } else if (selectedFile instanceof TFolder) {
                  selectedFile.children.forEach(file => exportFile(file, format))
                }
              }

              const selectFormatAndImport = () => {
                new FormatModal(this.app, this.settings.exportFormats, (selectedFormat) => {
                  exportFileOrFolder(selectedFile, selectedFormat)
                }).open()
              }
              const inCorrectPath = this.settings.exportFormats.filter(format => format.outputPathTemplate.contains(selectedFile.name))
              if(inCorrectPath.length == 1) {
                new UseSuggestedFormatModal(this.app, inCorrectPath[0], (useFormat) => {
                  if(!useFormat) {
                    selectFormatAndImport()
                  } else {
                    exportFileOrFolder(selectedFile, inCorrectPath[0])
                  }
                }).open()
              } else {
                selectFormatAndImport()
              }
              
              new Notice(selectedFile.path);
            });
        });
      })
    );
    

    // When an import is completed, proceed to open the crated or updated notes if the setting is enabled
    this.importEventsRef = this.importEvents.on("import-complete", (createdOrUpdatedMarkdownFilesPaths) => {
      if(this.settings.openNoteAfterImport) {
        let pathOfNotesToOpen: string[] = [];

        // Depending on the choice, retreive the paths of the first, the last or all imported notes
        switch(this.settings.whichNotesToOpenAfterImport) {
          case 'first-imported-note': {
            pathOfNotesToOpen.push(createdOrUpdatedMarkdownFilesPaths[0]);
            break;
          }
          case 'last-imported-note': {
            pathOfNotesToOpen.push(createdOrUpdatedMarkdownFilesPaths[createdOrUpdatedMarkdownFilesPaths.length - 1]);
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
        exportToMarkdown({
          settings: this.settings,
          database: this.settings.database,
          exportFormat: format},
          this.importEvents,
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
      for(var path of pathOfNotesToOpen) {

        let note = this.app.vault.getAbstractFileByPath(path);

        if(note instanceof TFile) {
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
