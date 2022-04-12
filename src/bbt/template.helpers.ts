import nunjucks from 'nunjucks';
import { App, Notice, TFile, moment } from 'obsidian';

import { ExportToMarkdownParams } from 'src/types';

export const template = new nunjucks.Environment(undefined, {
  autoescape: false,
});

function _prepareAttributeParts(attr: string) {
  if (!attr) {
    return [];
  }

  if (typeof attr === 'string') {
    return attr.split('.');
  }

  return [attr];
}

function hasOwnProp(obj: any, k: string) {
  return Object.prototype.hasOwnProperty.call(obj, k);
}

function getAttrGetter(attribute: string) {
  const parts = _prepareAttributeParts(attribute);

  return function attrGetter(item: any) {
    let _item = item;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // If item is not an object, and we still got parts to handle, it means
      // that something goes wrong. Just roll out to undefined in that case.
      if (hasOwnProp(_item, part)) {
        _item = _item[part];
      } else {
        return undefined;
      }
    }

    return _item;
  };
}

type FilterByCmd =
  | 'startswith'
  | 'endswith'
  | 'contains'
  | 'dateafter'
  | 'dateonorafter'
  | 'datebefore'
  | 'dateonorbefore';

template.addFilter(
  'filterby',
  function (arr: any[], prop: string, cmd: FilterByCmd, val: string) {
    const getter = getAttrGetter(prop);

    return arr.filter((v: any) => {
      let toTest: string = typeof v === 'string' ? v : getter(v);

      if (!toTest) return false;

      if (['startswith', 'endswith', 'contains'].includes(cmd)) {
        const testVal = val.toLocaleLowerCase();

        toTest = toTest.toString().toLocaleLowerCase();

        if (cmd === 'startswith') {
          return toTest.startsWith(testVal);
        }

        if (cmd === 'endswith') {
          return toTest.endsWith(testVal);
        }

        if (cmd === 'contains') {
          return toTest.contains(testVal);
        }
      }

      if (
        ['dateafter', 'dateonorafter', 'datebefore', 'dateonorbefore'].includes(
          cmd
        )
      ) {
        if (!moment.isMoment(toTest) || !moment.isMoment(val)) return false;

        switch (cmd) {
          case 'dateafter':
            return toTest.isAfter(val);
          case 'dateonorafter':
            return toTest.isSameOrAfter(val);
          case 'datebefore':
            return toTest.isBefore(val);
          case 'dateonorbefore':
            return toTest.isSameOrBefore(val);
        }
      }

      return false;
    });
  }
);

template.addFilter('format', function (date: moment.Moment, format: string) {
  if (date instanceof moment) {
    return date.format(format);
  }

  return (
    'Error: `format` can only be applied to dates. Tried for format ' +
    typeof date
  );
});

export async function getTemplates(app: App, params: ExportToMarkdownParams) {
  const { exportFormat } = params;

  return {
    headerTemplate: await loadTemplate(
      app,
      'Header',
      exportFormat.headerTemplatePath
    ),
    annotationTemplate: await loadTemplate(
      app,
      'Annotation',
      exportFormat.annotationTemplatePath
    ),
    footerTemplate: await loadTemplate(
      app,
      'Footer',
      exportFormat.footerTemplatePath
    ),
  };
}

export function getLastExport(md: string): moment.Moment {
  const match = md.match(/%% Export Date: (\S+) %%\n$/);

  if (match && match[1]) {
    return moment(new Date(match[1]));
  }

  return moment(0);
}

export function appendExportDate(md: string): string {
  return md + `\n\n%% Export Date: ${new Date().toISOString()} %%\n`;
}

export function getExistingAnnotations(md: string): string {
  const match = md.match(
    /%% Begin annotations %%([\w\W]+)%% End annotations %%/
  );

  if (match && match[1]) {
    return match[1].trim();
  }

  return '';
}

export function wrapAnnotationTemplate(str: string) {
  return `\n%% Begin annotations %%\n${str}\n%% End annotations %%\n`;
}

export function removeStartingSlash(str: string) {
  if (str.startsWith('/')) {
    return str.replace(/^\/+/, '');
  }

  return str;
}

export function sanitizeObsidianPath(str: string) {
  if (!str.endsWith('.md')) {
    str += '.md';
  }

  if (str.startsWith('/')) {
    str = removeStartingSlash(str);
  }

  return str;
}

export function loadTemplate(
  app: App,
  name: string,
  path: string
): Promise<string | null> {
  if (!path) return null;

  const templateFile = app.vault.getAbstractFileByPath(
    sanitizeObsidianPath(path)
  );

  if (!templateFile) {
    new Notice(`Error: ${name} template not found ${path}`);
    return null;
  }

  return app.vault.cachedRead(templateFile as TFile);
}
