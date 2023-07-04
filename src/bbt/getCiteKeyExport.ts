import { request } from 'obsidian';
import { CiteKeyExport, DatabaseWithPort } from 'src/types';

import { isZoteroRunning } from './cayw';
import { defaultHeaders, getPort } from './helpers';

const translatorId = 'f4b52ab0-f878-4556-85a0-c7aeedd09dfc';
export async function getCiteKeyExport(
  database: DatabaseWithPort,
  groupId: string,
  groupName: string
) {
  try {
    const res = await request({
      method: 'GET',
      url: `http://127.0.0.1:${getPort(
        database.database,
        database.port
      )}/better-bibtex/export/library?/${groupId}/${groupName}.${translatorId}`,
      headers: defaultHeaders,
    });

    const entries = JSON.parse(res);

    return Array.isArray(entries)
      ? entries
          .map((e) => {
            const out: Record<string, any> = {
              libraryID: Number(groupId),
            };

            if (e['citation-key']) {
              out.citekey = e['citation-key'];
            } else {
              return null;
            }

            if (e['title']) {
              out.title = e['title'];
            } else {
              return null;
            }

            return out as { libraryID: number; citekey: string; title: string };
          })
          .filter((k) => !!k)
      : null;
  } catch (e) {
    return null;
  }
}

export async function getUserGroups(database: DatabaseWithPort) {
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
        method: 'user.groups',
        params: [],
      }),
      headers: defaultHeaders,
    });
  } catch (e) {
    console.error(e);
    return null;
  }

  try {
    return JSON.parse(res).result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

let cachedKeys: CiteKeyExport[] = [];
let lastCheck = 0;

export async function getAllCiteKeys(
  database: DatabaseWithPort,
  force?: boolean
) {
  if (!force && cachedKeys.length && Date.now() - lastCheck < 1000 * 60 * 60) {
    return { citekeys: cachedKeys, fromCache: true };
  }

  if (!(await isZoteroRunning(database, true))) {
    return { citekeys: cachedKeys, fromCache: true };
  }

  const allKeys: CiteKeyExport[] = [];
  const userGroups = await getUserGroups(database);

  if (!userGroups) {
    return { citekeys: cachedKeys, fromCache: true };
  }

  for (const group of userGroups) {
    const keys = await getCiteKeyExport(database, group.id, group.name);

    if (keys) {
      allKeys.push(...keys);
    }
  }

  cachedKeys = allKeys;
  lastCheck = Date.now();

  return { citekeys: allKeys, fromCache: false };
}
