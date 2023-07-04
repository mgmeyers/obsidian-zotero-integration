import {
  ItemView,
  MarkdownView,
  WorkspaceLeaf,
  htmlToMarkdown,
  setIcon,
} from 'obsidian';
import { isZoteroRunning } from 'src/bbt/cayw';
import ZoteroConnector from 'src/main';

import { ViewManager } from './ViewManager';

export const viewType = 'ZIReferenceListView';

export function copyElToClipboard(el: HTMLElement) {
  require('electron').clipboard.write({
    html: el.outerHTML,
    text: htmlToMarkdown(el.outerHTML),
  });
}

export class ReferenceListView extends ItemView {
  plugin: ZoteroConnector;
  activeMarkdownLeaf: MarkdownView;
  viewManager: ViewManager;
  loader: HTMLElement;

  async onClose() {
    this.viewManager.cache.clear();
    this.plugin.emitter.off('settingsUpdated', this.handleSettingsUpdate);
    return super.onClose();
  }

  constructor(plugin: ZoteroConnector, leaf: WorkspaceLeaf) {
    super(leaf);

    this.plugin = plugin;
    this.viewManager = new ViewManager(plugin);

    this.registerEvent(
      app.metadataCache.on('changed', (file) => {
        const activeView = app.workspace.getActiveViewOfType(MarkdownView);
        if (activeView && file === activeView.file) {
          this.processReferences();
        }
      })
    );

    this.registerEvent(
      app.workspace.on('active-leaf-change', (leaf) => {
        if (leaf) {
          app.workspace.iterateRootLeaves((rootLeaf) => {
            if (rootLeaf === leaf) {
              if (leaf.view instanceof MarkdownView) {
                this.processReferences();
              } else {
                this.setNoContentMessage();
              }
            }
          });
        }
      })
    );

    this.plugin.emitter.on('settingsUpdated', this.handleSettingsUpdate);
    this.contentEl.addClass('pwc-reference-list');
    this.contentEl.toggleClass(
      'collapsed-links',
      !!this.plugin.settings.citekeyReferenceHideLinks
    );

    this.loader = this.contentEl.createSpan(
      'zt-suggest-loading-wrapper',
      (el) => {
        el.createSpan('zt-suggest-loading');
      }
    );

    activeWindow.setTimeout(() => {
      this.processReferences();
    }, 100);
  }

  handleSettingsUpdate = () => {
    this.contentEl.toggleClass(
      'collapsed-links',
      !!this.plugin.settings.citekeyReferenceHideLinks
    );

    this.processReferences();
  };

  processReferences = async () => {
    const isRunning = await isZoteroRunning(
      {
        database: this.plugin.settings.database,
        port: this.plugin.settings.port,
      },
      true
    );
    if (!isRunning) {
      return this.setMessage(
        'Cannot connect to Zotero. Please ensure it is running and the Better BibTeX plugin is installed'
      );
    }

    const activeView = app.workspace.getActiveViewOfType(MarkdownView);

    if (activeView) {
      try {
        const title = this.contentEl.find('.pwc-reference-list__title-text');

        if (title) {
          if (this.loader) this.loader.detach();
          this.loader = title.createSpan('zt-suggest-loading-wrapper', (el) => {
            el.createSpan('zt-suggest-loading');
          });
        }

        const fileContent = await app.vault.cachedRead(activeView.file);
        const bib = await this.viewManager.getReferenceList(
          activeView.file,
          fileContent
        );
        this.setViewContent(bib);
      } catch (e) {
        console.error(e);
      }
    } else {
      this.setNoContentMessage();
    }
  };

  setViewContent(bib: HTMLElement) {
    if (bib && this.contentEl.firstChild !== bib) {
      if (this.plugin.settings.citekeyReferenceHideLinks) {
        bib.findAll('a').forEach((l) => {
          l.setAttribute('aria-label', l.innerText);
        });
      }

      bib.findAll('.csl-entry').forEach((e) => {
        e.setAttribute('aria-label', 'Click to copy');
        e.onClickEvent(() => copyElToClipboard(e));

        const leafRoot = this.leaf.getRoot();
        if (leafRoot) {
          const tooltipPos =
            (leafRoot as any).side === 'right' ? 'left' : 'right';
          e.setAttribute('aria-label-position', tooltipPos);
        }
      });

      this.contentEl.empty();
      this.contentEl.createDiv(
        {
          cls: 'pwc-reference-list__title',
        },
        (div) => {
          div.createDiv({
            cls: 'pwc-reference-list__title-text',
            text: this.getDisplayText(),
          });
          div.createDiv(
            {
              cls: 'pwc-copy-list',
              attr: {
                'aria-label': 'Copy list',
              },
            },
            (btn) => {
              setIcon(btn, 'select-all-text');
              btn.onClickEvent(() => copyElToClipboard(bib));
            }
          );
        }
      );
      this.contentEl.append(bib);
    } else if (!bib) {
      this.setNoContentMessage();
    }
  }

  setNoContentMessage() {
    this.setMessage('No citations found in the active document.');
  }

  setMessage(message: string) {
    this.contentEl.empty();
    this.contentEl.createDiv({
      cls: 'pwc-no-content',
      text: message,
    });
    this.contentEl
      .createDiv('pwc-btn-wrapper')
      .createEl('button', { text: 'Refresh' }, (btn) => {
        btn.addEventListener('click', () => {
          this.contentEl.empty();
          this.loader = this.contentEl.createSpan(
            'zt-suggest-loading-wrapper',
            (el) => {
              el.createSpan('zt-suggest-loading');
            }
          );
          activeWindow.setTimeout(() => {
            this.processReferences();
          }, 200);
        });
      });
  }

  getViewType() {
    return viewType;
  }

  getDisplayText() {
    return 'References';
  }

  getIcon() {
    return 'quote-glyph';
  }
}
