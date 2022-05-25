import fs from 'fs';
import os from 'os';
import path from 'path';

import { App, FileSystemAdapter } from 'obsidian';

export function bringAppToFront() {
  require('electron').remote.getCurrentWindow().show();
}

export function padNumber(n: number): string {
  return n < 10 ? `0${n}` : n.toString();
}

export function getVaultRoot() {
  return (
    ((window as any).app as App).vault.adapter as FileSystemAdapter
  ).getBasePath();
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

export function doesEXEExist() {
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
