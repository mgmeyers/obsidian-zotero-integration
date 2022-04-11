import path from 'path';

import { execa } from 'execa';
import { Notice } from 'obsidian';

import { getExeName, getExeRoot } from 'src/helpers';

import { LoadingModal } from './LoadingModal';

interface ExtractParams {
  noWrite?: boolean;
  imageOutputPath?: string;
  imageBaseName?: string;
  imageFormat?: string;
  imageDPI?: number;
  imageQuality?: number;
  ignoreBefore?: string;
}

const paramMap: Record<keyof ExtractParams, string> = {
  noWrite: 'w',
  imageOutputPath: 'o',
  imageBaseName: 'n',
  imageFormat: 'f',
  imageDPI: 'd',
  imageQuality: 'q',
  ignoreBefore: 'b',
};

export async function extractAnnotations(input: string, params: ExtractParams) {
  const modal = new LoadingModal(
    (window as any).app,
    'Extracting annotations...'
  );
  modal.open();

  const args = [input];

  Object.keys(params).forEach((k) => {
    const val = params[k as keyof ExtractParams];

    if (val === '' || val === undefined) return '';

    const key = paramMap[k as keyof ExtractParams];

    if (typeof val === 'boolean') {
      if (val) {
        args.push(`-${key}`);
      }
    } else {
      args.push(`-${key}`);
      args.push(val.toString());
    }
  });

  try {
    const result = await execa(`./${getExeName()}`, args, {
      cwd: getExeRoot(),
    });

    modal.close();

    if (result.stderr.toLowerCase().includes('password')) {
      new Notice(
        `Error opening ${path.basename(input)}: PDF is password protected`,
        10000
      );
      return '[]';
    }

    if (result.stderr.includes('ENOENT')) {
      new Notice(
        `Error opening ${path.basename(input)}: File not found`,
        10000
      );
      return '[]';
    }

    if (result.stderr && !result.stderr.includes('warning')) {
      new Notice(`Error processing PDF: ${result.stderr}`, 10000);
      throw new Error(result.stderr);
    }

    return result.stdout;
  } catch (e) {
    modal.close();

    if (e.message.toLowerCase().includes('password')) {
      new Notice(
        `Error opening ${path.basename(input)}: PDF is password protected`,
        10000
      );
      return '[]';
    }

    if (e.message.includes('ENOENT')) {
      new Notice(
        `Error opening ${path.basename(input)}: File not found`,
        10000
      );
      return '[]';
    }

    console.error(e);
    new Notice(`Error processing PDF: ${e.message}`, 10000);
    throw e;
  }
}
