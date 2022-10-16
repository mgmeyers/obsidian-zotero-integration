import { Editor, Notice, htmlToMarkdown } from 'obsidian';

import { Database } from '../types';
import { getCiteKeys } from './cayw';
import { getNotesFromCiteKeys } from './jsonRPC';

export function processZoteroAnnotationNotes(noteStr: string) {
  const parsed = new DOMParser().parseFromString(noteStr, 'text/html');
  const annots = parsed.querySelectorAll('[data-annotation]');
  const cites = parsed.querySelectorAll('[data-citation]');

  annots.forEach((annot) => {
    try {
      const params = (annot as HTMLElement).dataset.annotation;
      const json = params ? JSON.parse(decodeURIComponent(params)) : null;

      if (!json) return;

      const attachmentKey = json.attachmentURI.split('/').pop();

      const isImage = annot instanceof HTMLImageElement
      annot.insertAdjacentElement(isImage ? 'afterend' : 'afterbegin', createEl('a', {
        text: 'Go to annotation',
        href: `zotero://open-pdf/library/items/${attachmentKey}?page=${json.pageLabel}&annotation=${json.annotationKey}`,
      }));
      annot.insertAdjacentElement(isImage ? 'afterend' : 'afterbegin', createSpan({ text: ' ' }));
    } catch (e) {
      console.error(e);
    }
  });

  cites.forEach((cite) => {
    try {
      const params = (cite as HTMLElement).dataset.citation;
      const json = params ? JSON.parse(decodeURIComponent(params)) : null;

      if (!json) return;

      const itemKey = json.citationItems[0].uris[0].split('/').pop();
      const citeSpan = cite.querySelector('span');

      if (!citeSpan) return;

      const text = citeSpan.innerText;

      citeSpan.empty();
      citeSpan.createEl('a', {
        text,
        href: `zotero://select/library/items/${itemKey}`,
      });
    } catch (e) {
      console.error(e);
    }
  });

  return parsed.body.innerHTML;
}

export async function noteExportPrompt(database: Database) {
  const citeKeys = await getCiteKeys(database);

  if (!citeKeys.length) return;

  const notes = await getNotesFromCiteKeys(citeKeys, database);

  if (!notes) {
    new Notice('No notes found for selected items', 7000);
    return;
  }

  const keys = Object.keys(notes);

  if (!keys.length) {
    new Notice('No notes found for selected items', 7000);
    return;
  }

  const notesMarkdown: Record<string, string> = {};

  keys.forEach((key) => {
    notesMarkdown[key] = notes[key]
      .map((n: string) => {
        return htmlToMarkdown(processZoteroAnnotationNotes(n));
      })
      .join('\n\n');
  });

  return notesMarkdown;
}

export function insertNotesIntoCurrentDoc(
  editor: Editor,
  notes: Record<string, string>
) {
  editor.replaceSelection(Object.values(notes).join('\n\n'));
}

export async function filesFromNotes(
  folder: string,
  notes: Record<string, string>
) {
  const keys = Object.keys(notes);

  for (let i = 0, len = keys.length; i < len; i++) {
    if (!(await newFile(folder, keys[i], notes[keys[i]]))) {
      break;
    }
  }
}

export async function newFile(
  folder: string,
  citeKey: string,
  content: string
) {
  const target = folder.replace(/(?:^\/|\/$)/g, '');

  if (!(await app.vault.adapter.exists(target))) {
    try {
      await app.vault.createFolder(target);
    } catch (e) {
      console.error(e);
      new Notice(`Error creating folder "${target}": ${e.message}`, 10000);
    }
  }

  try {
    return await app.vault.create(`${target}/${citeKey}.md`, content);
  } catch (e) {
    console.error(e);
    new Notice(
      `Error creating file "${target}${citeKey}.md": ${e.message}`,
      10000
    );
    return null;
  }
}
