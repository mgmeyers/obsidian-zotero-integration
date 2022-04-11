import path from 'path';

import { Database } from 'src/types';

export const defaultHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'obsidian/zotero',
  Accept: 'application/json',
  Connection: 'keep-alive',
};

export function getPort(database: Database) {
  return database === 'Zotero' ? '23119' : '24119';
}

export async function mkMDDir(mdPath: string) {
  const dir = path.dirname(mdPath);

  if (await app.vault.adapter.exists(dir)) return;

  await app.vault.createFolder(dir);
}

const toSpaceRegEx = /\s*[*?]+\s*/g;
const toDashRegEx = /[\\/:"<>|]+/g;

function replaceIllegalChars(str: string) {
  return str.replace(toSpaceRegEx, ' ').trim().replace(toDashRegEx, '-');
}

export function sanitizeFilePath(filePath: string) {
  const parsed = path.parse(filePath);
  const dir = replaceIllegalChars(parsed.dir);
  const name = replaceIllegalChars(parsed.name);

  return path.join(dir, `${name}${parsed.ext}`);
}
