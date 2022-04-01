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
