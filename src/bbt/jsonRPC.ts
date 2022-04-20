import { Notice, htmlToMarkdown, moment, request } from 'obsidian';

import { padNumber } from '../helpers';
import { Database } from '../types';
import { defaultHeaders, getPort } from './helpers';
import { LoadingModal } from './LoadingModal';

export async function getNotesFromCiteKeys(
  citeKeys: string[],
  database: Database
) {
  let res: string;

  const modal = new LoadingModal(
    (window as any).app,
    'Fetching notes from Zotero...'
  );
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.notes',
        params: [citeKeys],
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

export function getBibFromCiteKey(
  citeKey: string,
  database: Database,
  cslStyle?: string
) {
  return getBibFromCiteKeys([citeKey], database, cslStyle);
}

export async function getBibFromCiteKeys(
  citeKeys: string[],
  database: Database,
  cslStyle?: string
) {
  if (!citeKeys || !citeKeys.length) return null;

  let res: string;
  const modal = new LoadingModal(
    (window as any).app,
    'Fetching data from Zotero...'
  );
  modal.open();

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
      url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.bibliography',
        params: [citeKeys, params],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    modal.close();
    new Notice(`Error retrieving formatted bibliography: ${e.message}`, 10000);
    return null;
  }

  modal.close();

  try {
    return htmlToMarkdown(JSON.parse(res).result);
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
  citeKeys: string[],
  database: Database
) {
  let res: string;

  const modal = new LoadingModal(
    (window as any).app,
    'Fetching data from Zotero...'
  );
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.export',
        params: [citeKeys, '36a3b0b5-bad0-4a04-b79b-441c7cef77db'],
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
    return JSON.parse(JSON.parse(res).result[2]).items;
  } catch (e) {
    console.error(e);
    new Notice(`Error retrieving item data: ${e.message}`, 10000);
    return null;
  }
}

export async function getIssueDateFromCiteKey(
  citeKey: string,
  database: Database
) {
  let res: string;

  const modal = new LoadingModal(
    (window as any).app,
    'Fetching data from Zotero...'
  );
  modal.open();

  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'item.export',
        params: [[citeKey], 'f4b52ab0-f878-4556-85a0-c7aeedd09dfc'],
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
    const items = JSON.parse(JSON.parse(res).result[2]);
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
