import { request } from 'obsidian';

import { Database } from 'src/types';

import { defaultHeaders, getPort } from './helpers';

const translatorId = 'f4b52ab0-f878-4556-85a0-c7aeedd09dfc';
export async function getCiteKeyExport(
  database: Database,
  groupId: string,
  groupName: string
) {
  try {
    const res = await request({
      method: 'GET',
      url: `http://127.0.0.1:${getPort(
        database
      )}/better-bibtex/export/library?/${groupId}/${groupName}.${translatorId}`,
      headers: defaultHeaders,
    });

    const entries = JSON.parse(res);

    return Array.isArray(entries)
      ? entries.map((e) => e['citation-key']).filter((k) => !!k)
      : null;
  } catch (e) {
    return null;
  }
}

export async function getUserGroups(database: Database) {
  let res: string;
  try {
    res = await request({
      method: 'POST',
      url: `http://127.0.0.1:${getPort(database)}/better-bibtex/json-rpc`,
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

export async function getAllCiteKeys(database: Database) {
  const allKeys: string[] = [];
  const userGroups = await getUserGroups(database);

  if (!userGroups) return allKeys;

  for (const group of userGroups) {
    const keys = await getCiteKeyExport(database, group.id, group.name);

    if (keys) {
      allKeys.push(...keys);
    }
  }

  return allKeys;
}
