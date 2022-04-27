import { Notice, request } from 'obsidian';

import { bringAppToFront } from '../helpers';
import { CitationFormat, Database } from '../types';
import { defaultHeaders, getPort } from './helpers';
import { getBibFromCiteKeys } from './jsonRPC';
import { LoadingModal } from './LoadingModal';

export async function isZoteroRunning(database: Database, silent?: boolean) {
  let modal: LoadingModal;
  if (!silent) {
    const modal = new LoadingModal(
      (window as any).app,
      'Fetching data from Zotero...'
    );
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
  if (!(await isZoteroRunning(database))) {
    return null;
  }

  const modal = new LoadingModal(
    (window as any).app,
    'Awaiting item selection from Zotero...'
  );
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

    bringAppToFront();
    modal.close();
    return res;
  } catch (e) {
    bringAppToFront();
    console.error(e);
    modal.close();
    new Notice(`Error processing citation: ${e.message}`, 10000);
    return null;
  }
}

export async function getCiteKeys(database: Database): Promise<string[]> {
  try {
    const json = await getCAYWJSON(database);

    if (!json) return [];

    const citeKeys = json
      .map((e: any) => {
        return e.citekey;
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
  if (!(await isZoteroRunning(database))) {
    return null;
  }

  const modal = new LoadingModal(
    (window as any).app,
    'Awaiting item selection from Zotero...'
  );
  modal.open();

  try {
    const res = await request({
      method: 'GET',
      url: `http://127.0.0.1:${getPort(
        database
      )}/better-bibtex/cayw?format=json`,
      headers: defaultHeaders,
    });

    bringAppToFront();

    modal.close();
    if (res) {
      return JSON.parse(res);
    } else {
      return null;
    }
  } catch (e) {
    bringAppToFront();
    console.error(e);
    modal.close();
    new Notice(`Error retrieving cite key: ${e.message}`, 10000);
    return null;
  }
}
