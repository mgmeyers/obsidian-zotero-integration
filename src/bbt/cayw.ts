import { Notice, request } from 'obsidian';

import { getCurrentWindow } from '../helpers';
import { CitationFormat, Database } from '../types';
import { LoadingModal } from './LoadingModal';
import { defaultHeaders, getPort } from './helpers';
import { getBibFromCiteKeys } from './jsonRPC';

export function getCiteKeyFromAny(item: any): CiteKey | null {
  if (!item.citekey && !item.citationKey) return null;

  return {
    key: item.citekey || item.citationKey,
    library: item.libraryID,
  };
}

export async function isZoteroRunning(database: Database, silent?: boolean) {
  let modal: LoadingModal;
  if (!silent) {
    modal = new LoadingModal(app, 'Fetching data from Zotero...');
    modal.open();
  }
  try {
    const res = await request({
      method: 'GET',
      url: `http://127.0.0.1:${getPort(
        database
      )}/better-bibtex/cayw?probe=true`,
      headers: defaultHeaders,
    });

    modal?.close();
    return res === 'ready';
  } catch (e) {
    modal?.close();
    !silent &&
      new Notice(
        'Cannot connect to Zotero. Please ensure it is running and the Better BibTeX plugin is installed',
        10000
      );
    return false;
  }
}

function getQueryParams(format: CitationFormat) {
  switch (format.format) {
    case 'formatted-bibliography':
      return 'format=formatted-bibliography';
    case 'formatted-citation':
      return `format=formatted-citation${
        format.cslStyle ? `&style=${format.cslStyle}` : ''
      }`;
    case 'pandoc':
      return `format=pandoc${format.brackets ? '&brackets=true' : ''}`;
    case 'latex':
      return `format=latex&command=${format.command || 'cite'}`;
    case 'biblatex':
      return `format=biblatex&command=${format.command || 'autocite'}`;
  }
}

export async function getCAYW(format: CitationFormat, database: Database) {
  const win = getCurrentWindow();
  if (!(await isZoteroRunning(database))) {
    return null;
  }

  const modal = new LoadingModal(app, 'Awaiting item selection from Zotero...');
  modal.open();

  try {
    if (format.format === 'formatted-bibliography') {
      modal.close();
      const citeKeys = await getCiteKeys(database);
      return await getBibFromCiteKeys(citeKeys, database, format.cslStyle);
    }

    const res = await request({
      method: 'GET',
      url: `http://127.0.0.1:${getPort(
        database
      )}/better-bibtex/cayw?${getQueryParams(format)}`,
      headers: defaultHeaders,
    });

    win.show();
    modal.close();
    return res;
  } catch (e) {
    win.show();
    console.error(e);
    modal.close();
    new Notice(`Error processing citation: ${e.message}`, 10000);
    return null;
  }
}

export interface CiteKey {
  key: string;
  library: number;
}

export async function getCiteKeys(database: Database): Promise<CiteKey[]> {
  try {
    const json = await getCAYWJSON(database);

    if (!json) return [];

    const citeKeys = json
      .map((e: any) => {
        return getCiteKeyFromAny(e);
      })
      .filter((e: any) => !!e);

    if (!citeKeys.length) {
      return [];
    }

    return citeKeys;
  } catch (e) {
    return [];
  }
}

export async function getCAYWJSON(database: Database) {
  const win = getCurrentWindow();
  if (!(await isZoteroRunning(database))) {
    return null;
  }

  const modal = new LoadingModal(app, 'Awaiting item selection from Zotero...');
  modal.open();

  try {
    const res = await request({
      method: 'GET',
      url: `http://127.0.0.1:${getPort(
        database
      )}/better-bibtex/cayw?format=translate&translator=36a3b0b5-bad0-4a04-b79b-441c7cef77db&exportNotes=false`,
      headers: defaultHeaders,
    });

    win.show();

    modal.close();
    if (res) {
      return JSON.parse(res).items || [];
    } else {
      return null;
    }
  } catch (e) {
    win.show();
    console.error(e);
    modal.close();
    new Notice(`Error retrieving cite key: ${e.message}`, 10000);
    return null;
  }
}
