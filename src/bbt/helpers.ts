import { Database } from 'src/types';
import path from 'path';

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
