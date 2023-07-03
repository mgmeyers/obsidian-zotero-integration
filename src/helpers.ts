import { execa } from 'execa';
import fs from 'fs';
import { FileSystemAdapter, Notice } from 'obsidian';
import os from 'os';
import path from 'path';

export function getCurrentWindow() {
  return require('electron').remote.BrowserWindow.getFocusedWindow();
}

export function padNumber(n: number): string {
  return n < 10 ? `0${n}` : n.toString();
}

export function getVaultRoot() {
  return (app.vault.adapter as FileSystemAdapter).getBasePath();
}

export function getExeRoot() {
  return path.join(
    getVaultRoot(),
    './.obsidian/plugins/obsidian-zotero-desktop-connector/'
  );
}

export function getExeName() {
  return os.platform() === 'win32' ? 'pdfannots2json.exe' : 'pdfannots2json';
}

export function getLegacyExeName() {
  return os.platform() === 'win32' ? 'pdf-annots2json.exe' : 'pdf-annots2json';
}

export function doesEXEExist(override?: string) {
  if (override) return fs.existsSync(override);
  return fs.existsSync(path.join(getExeRoot(), getExeName()));
}

export function doesLegacyEXEExist() {
  return fs.existsSync(path.join(getExeRoot(), getLegacyExeName()));
}

export function removeEXE() {
  fs.rmSync(path.join(getExeRoot(), getExeName()));
}

export function removeLegacyEXE() {
  fs.rmSync(path.join(getExeRoot(), getLegacyExeName()));
}

export async function checkEXEVersion(override?: string) {
  try {
    const result = await execa(
      override || path.join(getExeRoot(), getExeName()),
      ['-v']
    );

    if (result.stderr && !result.stderr.includes('warning')) {
      new Notice(`Error checking PDF utility version: ${result.stderr}`, 10000);
      throw new Error(result.stderr);
    }

    return result.stdout.trim();
  } catch (e) {
    console.error(e);
    new Notice(`Error checking PDF utility version: ${e.message}`, 10000);
    throw e;
  }
}
