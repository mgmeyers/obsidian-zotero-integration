import { request } from 'obsidian';
import { Database } from 'src/types';
import { defaultHeaders, getPort } from './helpers';

export function latexToCiteKeys(ltx: string) {
  const split = ltx
    .replace(/^\\cite{/, '')
    .replace(/}$/, '')
    .split(/\s*,\s*/g);

  return split;
}

const translatorId = 'a515a220-6fef-45ea-9842-8025dfebcc8f';
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

    return latexToCiteKeys(res);
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
