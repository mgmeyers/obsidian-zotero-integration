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
  return os.platform() === 'win32'
    ? 'pdfannots2json.exe'
    : `pdfannots2json-${os.platform()}-${os.arch()}`;
}

export function scopeExe() {
  if (os.platform() === 'win32') {
    return;
  }

  fs.renameSync(
    path.join(getExeRoot(), getLegacyExeName()),
    path.join(getExeRoot(), getExeName())
  );
}

export function getLegacyExeName() {
  return os.platform() === 'win32' ? 'pdfannots2json.exe' : 'pdfannots2json';
}

export function getLegacyExeName2() {
  return os.platform() === 'win32' ? 'pdf-annots2json.exe' : 'pdf-annots2json';
}

export function doesEXEExist(override?: string) {
  if (override) return fs.existsSync(override);
  return fs.existsSync(path.join(getExeRoot(), getExeName()));
}

export function doesLegacyEXEExist(override?: string) {
  if (override) return fs.existsSync(override);
  return fs.existsSync(path.join(getExeRoot(), getLegacyExeName()));
}

export function doesLegacyEXEExist2() {
  return fs.existsSync(path.join(getExeRoot(), getLegacyExeName2()));
}

export function removeEXE() {
  fs.rmSync(path.join(getExeRoot(), getExeName()));
}

export function removeLegacyEXE() {
  fs.rmSync(path.join(getExeRoot(), getLegacyExeName()));
}

export function removeLegacyEXE2() {
  fs.rmSync(path.join(getExeRoot(), getLegacyExeName2()));
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

export function getExecutableMode(mode = 0) {
  return (
    mode | fs.constants.S_IXUSR | fs.constants.S_IXGRP | fs.constants.S_IXOTH
  );
}

function handleError(err: any) {
  console.error('Error: pdfannots2json not executable', err);

  if (err.code === 'ENOENT') {
    return false;
  } else {
    return undefined;
  }
}

export function ensureExecutableSync(override?: string) {
  const file = override || path.join(getExeRoot(), getExeName());

  try {
    fs.accessSync(file, fs.constants.X_OK);
    return true;
  } catch {
    //
  }

  try {
    const stats = fs.statSync(file);
    fs.chmodSync(file, getExecutableMode(stats.mode));
    return true;
  } catch (err) {
    return handleError(err);
  }
}
