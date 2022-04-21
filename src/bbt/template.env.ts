import nunjucks, { Callback, Extension, Loader, LoaderSource } from 'nunjucks';
import { moment } from 'obsidian';

export const template = new nunjucks.Environment(undefined, {
  autoescape: false,
});

function _prepareAttributeParts(attr: string) {
  if (!attr) {
    return [];
  }

  return attr.split('.');
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

      if (hasOwnProp(_item, part)) {
        _item = _item[part];
      } else {
        /* istanbul ignore next */
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

export function filterBy(
  arr: any[],
  prop: string,
  cmd: FilterByCmd,
  val: string | moment.Moment
) {
  const getter = getAttrGetter(prop);

  return arr.filter((v: any) => {
    let toTest: string = typeof v === 'string' ? v : getter(v);

    if (!toTest) return false;

    if (
      typeof val === 'string' &&
      ['startswith', 'endswith', 'contains'].includes(cmd)
    ) {
      const testVal = val.toLocaleLowerCase();

      toTest = toTest.toString().toLocaleLowerCase();

      if (cmd === 'startswith') {
        return toTest.startsWith(testVal);
      }

      if (cmd === 'endswith') {
        return toTest.endsWith(testVal);
      }

      if (cmd === 'contains') {
        return toTest.includes(testVal);
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

export function format(date: moment.Moment, format: string) {
  if (date instanceof moment) {
    return date.format(format);
  }

  return (
    'Error: `format` can only be applied to dates. Tried for format ' +
    typeof date
  );
}

interface WithRetained {
  _retained?: Record<string, string>;
}

export class PersistExtension implements Extension {
  static id: string = 'PersistExtension';
  tags: string[] = ['persist'];

  parse(parser: any, nodes: any) {
    // get the tag token
    const tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // parse the body and possibly the error block, which is optional
    const body = parser.parseUntilBlocks('endpersist');

    parser.advanceAfterBlockEnd();

    // See above for notes about CallExtension
    return new nodes.CallExtension(this, 'run', args, [body]);
  }

  run(context: any, id: string, body: any) {
    let retained = '';

    if (context?.ctx?._retained && context.ctx._retained[id]) {
      retained = context.ctx._retained[id];
    }

    return new nunjucks.runtime.SafeString(
      `%% begin ${id} %%${retained}${body()}%% end ${id} %%`
    );
  }

  static re = /%% begin (.+?) %%([\w\W]*?)%% end \1 %%/g;
  static prepareTemplateData<T>(templateData: T, md: string): T & WithRetained {
    const out: Record<string, string> = {};

    if (!md) return templateData;

    const matches = md.matchAll(this.re);
    for (const match of matches) {
      out[match[1]] = match[2];
    }

    return {
      ...templateData,
      _retained: out,
    };
  }
}

export class ObsidianMarkdownLoader extends Loader {
  sourceFile: string;

  async = true;
  wikiLinkRe = /^\[\[([^\]]+)\]\]$/;
  markdownLinkRe = /^\[[^\]]*\]\(([^)]+)\)$/;

  setSourceFile(path: string) {
    this.sourceFile = path;
  }

  getLinkPath(link: string) {
    let match = link.trim().match(this.wikiLinkRe);

    if (match) {
      return match[1];
    }

    match = link.trim().match(this.markdownLinkRe);

    if (match) {
      return match[1];
    }

    return null;
  }

  getSource(name: string, callback: Callback<Error, LoaderSource>): void {
    const linkPath = this.getLinkPath(name);

    if (!linkPath) {
      return callback(
        new Error('Cannot find file. Invalid markdown link: ' + name),
        null
      );
    }

    const file = app.metadataCache.getFirstLinkpathDest(
      linkPath,
      this.sourceFile || ''
    );

    if (!file) {
      return callback(
        new Error('Cannot find file. File not found: ' + name),
        null
      );
    }

    app.vault
      .cachedRead(file)
      .then((content) => {
        const src = {
          src: content,
          path: linkPath,
          noCache: true,
        };

        callback(null, src);
        this.emit('load', name, src);
      })
      .catch((e) => {
        callback(e, null);
      });
  }
}

template.addFilter('filterby', filterBy);
template.addFilter('format', format);
template.addExtension(PersistExtension.id, new PersistExtension());
