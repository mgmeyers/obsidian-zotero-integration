import { ItemView, WorkspaceLeaf, moment } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';
import { JSONTree } from 'react-json-tree';

import { pdfDebugPrompt } from './bbt/export';
import ZoteroConnector from './main';

export const viewType = 'zdc-debug';

const tomorrowLight = {
  scheme: 'Tomorrow',
  author: 'Chris Kempson (http://chriskempson.com)',
  base00: '#ffffff',
  base01: '#e0e0e0',
  base02: '#d6d6d6',
  base03: '#8e908c',
  base04: '#969896',
  base05: '#4d4d4c',
  base06: '#282a2e',
  base07: '#1d1f21',
  base08: '#c82829',
  base09: '#f5871f',
  base0A: '#eab700',
  base0B: '#718c00',
  base0C: '#3e999f',
  base0D: '#4271ae',
  base0E: '#8959a8',
  base0F: '#a3685a',
};

const tomorrowDark = {
  scheme: 'Tomorrow Night',
  author: 'Chris Kempson (http://chriskempson.com)',
  base00: '#1d1f21',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#cc6666',
  base09: '#de935f',
  base0A: '#f0c674',
  base0B: '#b5bd68',
  base0C: '#8abeb7',
  base0D: '#81a2be',
  base0E: '#b294bb',
  base0F: '#a3685a',
};

export class DataExplorerView extends ItemView {
  plugin: ZoteroConnector;
  wrapper: HTMLDivElement;
  btn: HTMLButtonElement;

  constructor(plugin: ZoteroConnector, leaf: WorkspaceLeaf) {
    super(leaf);
    this.plugin = plugin;
    this.btn = this.contentEl.createEl(
      'button',
      { text: 'Prompt For Selection' },
      (btn) => {
        btn.onClickEvent((e) => {
          pdfDebugPrompt(this.plugin.settings).then((res) => {
            if (!res || res.length === 0) {
              this.wrapper.innerText = 'No data retrieved';
            } else {
              this.mountJsonViewer(res[0]);
            }
          });
        });
      }
    );
    this.wrapper = this.contentEl.createDiv({
      cls: 'zt-json-viewer',
    });
  }

  getViewType() {
    return viewType;
  }

  getIcon() {
    return 'gear';
  }

  getDisplayText() {
    return 'Zotero Data Explorer';
  }

  mountJsonViewer(json: any) {
    ReactDOM.unmountComponentAtNode(this.wrapper);
    ReactDOM.render(
      <JSONTree
        data={json}
        sortObjectKeys={(a: string, b: string) => a.localeCompare(b)}
        isCustomNode={(v) => v instanceof moment}
        valueRenderer={(v) => {
          if (v instanceof moment) {
            return `moment(${(v as moment.Moment).toLocaleString()})`;
          }
          return v;
        }}
        theme={
          document.body.hasClass('theme-dark') ? tomorrowDark : tomorrowLight
        }
        invertTheme={false}
        hideRoot
      />,
      this.wrapper
    );
  }

  unmountJsonViewer() {
    ReactDOM.unmountComponentAtNode(this.wrapper);
  }

  async onClose() {
    this.unmountJsonViewer();
  }
}
