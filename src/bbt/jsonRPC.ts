import { Notice, htmlToMarkdown, moment, request } from 'obsidian';

import { padNumber } from '../helpers';
import { DatabaseWithPort } from '../types';
import { LoadingModal } from './LoadingModal';
import { CiteKey, getCiteKeyFromAny } from './cayw';
import { defaultHeaders, getPort } from './helpers';

export async function getNotesFromCiteKeys(
  citeKeys: CiteKey[],
  database: DatabaseWithPort
) {
  let res: string;

  const modal = new LoadingModal(app, 'Fetching notes from Zotero...');
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.notes',
        params: [citeKeys.map((k) => k.key)],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving notes: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  try {
    return JSON.parse(res).result;
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving notes: ${e.message}`, 10000);
    return null;
  }
}

export async function getCollectionFromCiteKey(
  citeKey: CiteKey,
  database: DatabaseWithPort
) {
  let res: string;

  const modal = new LoadingModal(app, 'Fetching collections from Zotero...');
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.collections',
        params: [[citeKey.key], true],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving notes: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  try {
    const result = JSON.parse(res).result;
    const cols = result[citeKey.key];

    return cols.map((c: any) => {
      let pointer = c;
      const fullPath = [c.name];

      while (pointer.parentCollection) {
        fullPath.push(pointer.parentCollection.name);
        pointer = pointer.parentCollection;
      }

      return {
        key: c.key,
        name: c.name,
        fullPath: fullPath.reverse().join('/'),
      };
    });
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving notes: ${e.message}`, 10000);
    return null;
  }
}

export async function getAttachmentsFromCiteKey(
  citeKey: CiteKey,
  database: DatabaseWithPort
) {
  let res: string;

  const modal = new LoadingModal(app, 'Fetching collections from Zotero...');
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.attachments',
        params: [citeKey.key],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving notes: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  try {
    return JSON.parse(res).result;
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving notes: ${e.message}`, 10000);
    return null;
  }
}

let cachedLibs: any[] = null;
const cachedCiteKeys: Map<string, number> = new Map();

export async function getLibForCiteKey(
  citeKey: string,
  database: DatabaseWithPort
) {
  if (cachedCiteKeys.has(citeKey)) return cachedCiteKeys.get(citeKey);
  try {
    const searchResults = await execSearch(citeKey, database);
    if (!searchResults || searchResults.length === 0) {
      return null;
    }

    const match = searchResults.find((res: any) => res.citekey === citeKey);
    if (!match) return null;

    if (cachedLibs) {
      const lib = cachedLibs.find((p: any) => p.name === match.library);
      if (lib) {
        cachedCiteKeys.set(citeKey, lib.id);
        return lib.id;
      }

      return null;
    }

    const res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'user.groups',
      }),
      headers: defaultHeaders,
    });

    const parsed = JSON.parse(res);
    if (parsed.result?.length > 0) {
      cachedLibs = parsed.result;
      const lib = cachedLibs.find((p: any) => p.name === match.library);

      if (lib) {
        cachedCiteKeys.set(citeKey, lib.id);
        return lib.id;
      }

      return null;
    }
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving library id: ${e.message}`, 10000);
  }

  return null;
}

export function getBibFromCiteKey(
  citeKey: CiteKey,
  database: DatabaseWithPort,
  cslStyle?: string,
  format?: string,
  silent?: boolean
) {
  return getBibFromCiteKeys([citeKey], database, cslStyle, format, silent);
}

export async function getBibFromCiteKeys(
  citeKeys: CiteKey[],
  database: DatabaseWithPort,
  cslStyle?: string,
  format?: string,
  silent?: boolean
) {
  if (!citeKeys || !citeKeys.length) return null;

  let res: string;
  let modal: LoadingModal;
  if (!silent) {
    modal = new LoadingModal(app, 'Fetching data from Zotero...');
    modal.open();
  }

  try {
    const params: Record<string, any> = {
      quickCopy: true,
      contentType: 'html',
    };

    if (cslStyle) {
      delete params.quickCopy;
      params.id = cslStyle;
    }

    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.bibliography',
        params: [citeKeys.map((k) => k.key), params, citeKeys[0].library],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    !silent && modal.close();
    new Notice(`Error retrieving formatted bibliography: ${e.message}`, 10000);
    return null;
  }

  !silent && modal.close();

  try {
    const parsed = JSON.parse(res);
    if (parsed.error?.message) {
      throw new Error(parsed.error.message);
    }
    return format === 'html' ? parsed.result : htmlToMarkdown(parsed.result);
  } catch (e) {
    console.error(e);
    console.error(`Response from BBT: ${res}`);

    let message = `Error converting formatted bibliography to markdown: ${e.message}`;

    if ((e.message as string).includes('element/document/fragment')) {
      message = `Error: Received empty bibliography from Zotero. Ensure Zotero's quick copy settings are set and the selected citation style is installed.`;
    }

    new Notice(message, 10000);
    return null;
  }
}

export async function getItemJSONFromCiteKeys(
  citeKeys: CiteKey[],
  database: DatabaseWithPort,
  libraryID: number
) {
  let res: string;

  const modal = new LoadingModal(app, 'Fetching data from Zotero...');
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.export',
        params: [
          citeKeys.map((k) => k.key),
          '36a3b0b5-bad0-4a04-b79b-441c7cef77db',
          libraryID,
        ],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  try {
    const parsed = JSON.parse(res);
    if (parsed.error?.message) {
      throw new Error(parsed.error.message);
    }

    return JSON.parse(parsed.result[2]).items;
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }
}

export async function getItemJSONFromRelations(
  libraryID: number,
  relations: string[],
  database: DatabaseWithPort
) {
  let res: string;

  const modal = new LoadingModal(app, 'Fetching data from Zotero...');
  modal.open();

  const uriMap: Record<string, string> = {};
  const idOrder: string[] = [];

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.citationkey',
        params: [
          relations.map((r) => {
            const id = r.split('/').pop();
            idOrder.push(id);
            uriMap[id] = r;
            return `${libraryID}:${id}`;
          }),
        ],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  const idMap: Record<string, any> = {};
  const citekeys: CiteKey[] = [];

  try {
    const json = JSON.parse(res);

    Object.keys(json.result).forEach((k) => {
      const id = k.split(':').pop();
      if (json.result[k]) {
        citekeys.push({ key: json.result[k], library: libraryID });
        idMap[id] = { citekey: json.result[k], uri: uriMap[id] };
      } else {
        idMap[id] = { uri: uriMap[id] };
      }
    });
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }

  const items: any[] = citekeys.length
    ? await getItemJSONFromCiteKeys(citekeys, database, libraryID)
    : [];

  return idOrder.map((id) => {
    if (idMap[id].citekey) {
      const item = items.find(
        (item) => getCiteKeyFromAny(item)?.key === idMap[id].citekey
      );

      if (item) {
        return item;
      }
    }

    return idMap[id];
  });
}

export async function getIssueDateFromCiteKey(
  citeKey: CiteKey,
  database: DatabaseWithPort
) {
  let res: string;

  const modal = new LoadingModal(app, 'Fetching data from Zotero...');
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.export',
        params: [
          [citeKey.key],
          'f4b52ab0-f878-4556-85a0-c7aeedd09dfc',
          citeKey.library,
        ],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  try {
    const parsed = JSON.parse(res);
    if (parsed.error?.message) {
      throw new Error(parsed.error.message);
    }

    const items = JSON.parse(parsed.result[2]);
    const dates = items
      .map((i: any) => {
        const { issued } = i;
        if (!issued || !issued['date-parts']) return null;

        const dateParts = issued['date-parts'][0];

        if (!dateParts.length) return null;

        const date = moment(
          `${dateParts[0]}-${dateParts[1] ? padNumber(dateParts[1]) : '01'}-${
            dateParts[2] ? padNumber(dateParts[2]) : '01'
          }`,
          'YYYY-MM-DD'
        );

        return date;
      })
      .filter((d: any) => d);

    return dates[0] ? dates[0] : null;
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }
}

export async function execSearch(term: string, database: DatabaseWithPort) {
  let res: string;
  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.search',
        params: [term],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    new Notice(`Error searching: ${e.message}`, 10000);
    return null;
  }

  try {
    return JSON.parse(res).result;
  } catch (e) {
    console.error(e);
    new Notice(`Error searching: ${e.message}`, 10000);
    return null;
  }
}
