import { LRUCache } from 'lru-cache';
import { TFile } from 'obsidian';
import { getAllCiteKeys } from 'src/bbt/getCiteKeyExport';
import { getBibFromCiteKeys } from 'src/bbt/jsonRPC';
import ZoteroConnector from 'src/main';

import { areSetsEqual, extractCiteKeys } from './helpers';

export interface DocCache {
  keys: Set<string>;
  bib: HTMLElement;
}

export class ViewManager {
  plugin: ZoteroConnector;
  cache: LRUCache<TFile, DocCache>;

  constructor(plugin: ZoteroConnector) {
    this.plugin = plugin;
    this.cache = new LRUCache({ max: 20 });
  }

  lastStyle: string = null;
  lastLinks: boolean = null;

  async getReferenceList(file: TFile, content: string) {
    const citeKeys = extractCiteKeys(content);

    if (citeKeys.size === 0) {
      return null;
    }

    const cachedDoc = this.cache.has(file) ? this.cache.get(file) : null;
    const {
      citekeyReferenceCslStyle,
      citekeyReferenceHideLinks,
      database,
      port,
    } = this.plugin.settings;

    if (
      !cachedDoc ||
      !areSetsEqual(cachedDoc.keys, citeKeys) ||
      citekeyReferenceCslStyle !== this.lastStyle ||
      citekeyReferenceHideLinks !== this.lastLinks
    ) {
      this.lastStyle = citekeyReferenceCslStyle;
      this.lastLinks = citekeyReferenceHideLinks;

      const setNull = (): null => {
        const result = {
          keys: citeKeys,
          bib: null as HTMLElement,
        };

        this.cache.set(file, result);

        return null;
      };

      try {
        const keys = Array.from(citeKeys);
        const db = {
          database: database,
          port: port,
        };

        const { citekeys } = await getAllCiteKeys(db);
        const match = citekeys.find((c) => c.citekey === keys[0]);

        if (!match) return setNull();

        const htmlStr = await getBibFromCiteKeys(
          keys.map((k) => ({ key: k, library: match.libraryID })),
          db,
          citekeyReferenceCslStyle,
          'html',
          true
        );

        if (!htmlStr) return setNull();

        const parser = new DOMParser();
        const html = parser.parseFromString(htmlStr, 'text/html');
        const entries = html.body.findAll('.csl-entry');
        const bib = createDiv({}, (el) => {
          el.append(...entries);
        });

        const result = {
          keys: citeKeys,
          bib,
        };

        this.cache.set(file, result);

        return result.bib;
      } catch (e) {
        if (!e.message.includes('references container not found')) {
          console.error(e);
        }
        return null;
      }
    }

    return cachedDoc.bib;
  }

  getReferenceListForSource(filePath: string) {
    const file = app.vault.getAbstractFileByPath(filePath);
    if (file && file instanceof TFile && this.cache.has(file)) {
      return this.cache.get(file).bib;
    }
  }
}
