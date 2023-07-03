import Fuse from 'fuse.js';
import nunjucks from 'nunjucks';
import {
  App,
  Editor,
  EditorPosition,
  EditorSuggest,
  EditorSuggestContext,
  EditorSuggestTriggerInfo,
  MarkdownView,
  Platform,
  debounce,
} from 'obsidian';
import { execSearch } from 'src/bbt/jsonRPC';
import ZoteroConnector from 'src/main';

export class CiteSuggest extends EditorSuggest<Record<string, any>> {
  private plugin: ZoteroConnector;
  private app: App;
  private fuse: Fuse<Record<string, any>>;

  limit: number = 20;

  constructor(app: App, plugin: ZoteroConnector) {
    super(app);

    this.app = app;
    this.plugin = plugin;

    (this as any).scope.register(['Mod'], 'Enter', (evt: KeyboardEvent) => {
      (this as any).suggestions.useSelectedItem(evt);
      return false;
    });

    (this as any).scope.register(['Alt'], 'Enter', (evt: KeyboardEvent) => {
      (this as any).suggestions.useSelectedItem(evt);
      return false;
    });

    this.setInstructions([
      {
        command: Platform.isMacOS ? '⌘ ↵' : 'ctrl ↵',
        purpose: 'Wrap cite key with brackets',
      },
      {
        command: Platform.isMacOS ? '⌥ ↵' : 'alt ↵',
        purpose: 'Insert using template',
      },
    ]);

    this.fuse = new Fuse([] as Record<string, any>[], {
      includeMatches: true,
      threshold: 0.35,
      keys: [
        { name: 'citekey', weight: 0.7 },
        { name: 'title', weight: 0.3 },
      ],
    });
  }

  handleSearch = debounce(async () => {
    if (this.context === null) return;

    const context = this.context;
    const searchResults = await execSearch(context.query, {
      database: this.plugin.settings.database,
      port: this.plugin.settings.port,
    });

    if (context !== this.context) return;

    this.fuse.setCollection(searchResults);
    const results = this.fuse.search(context.query, { limit: this.limit });

    (this as any).showSuggestions(results);
  }, 200);

  getSuggestions(context: EditorSuggestContext) {
    if (!context.query || context.query.includes(' ')) {
      return null;
    }

    this.handleSearch();

    return [{ loading: true }];
  }

  renderSuggestion(
    suggestion: Fuse.FuseResult<Record<string, any>> | { loading: boolean },
    el: HTMLElement
  ): void {
    const frag = createFragment();

    if ((suggestion as { loading: boolean }).loading) {
      frag.createSpan({cls: 'zt-suggest-loading-wrapper' }).createSpan({ cls: 'zt-suggest-loading' });
      el.setText(frag);
      return;
    }

    const sugg = suggestion as Fuse.FuseResult<Record<string, any>>;
    const item = sugg.item;

    if (!sugg.matches || !sugg.matches.length) {
      frag.createSpan({ text: `@${item.citekey}` });
      frag.createSpan({ text: item.title, cls: 'zt-suggest-title' });
      return el.setText(frag);
    }

    const citekey = frag.createSpan({ text: '@' });
    const title = frag.createSpan('zt-suggest-title');

    let prevTitleIndex = 0;
    let prevCiteIndex = 0;

    sugg.matches.forEach((m) => {
      m.indices.forEach((indices) => {
        const start = indices[0];
        const stop = indices[1] + 1;

        const target = m.key === 'title' ? title : citekey;
        const prev = m.key === 'title' ? prevTitleIndex : prevCiteIndex;

        target.appendText(m.value.substring(prev, start));
        target.append(
          createEl('strong', {
            text: m.value.substring(start, stop),
          })
        );

        if (m.key === 'title') {
          prevTitleIndex = stop;
        } else {
          prevCiteIndex = stop;
        }
      });
    });

    title.appendText(item.title.substring(prevTitleIndex));
    citekey.appendText(item.citekey.substring(prevCiteIndex));

    el.setText(frag);
  }

  selectSuggestion(
    suggestion: Fuse.FuseResult<Record<string, any>>,
    event: KeyboardEvent | MouseEvent
  ): void {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView) {
      return;
    }

    let replaceStr = '';
    if (event.metaKey || event.ctrlKey) {
      replaceStr = `[@${suggestion.item.citekey}]`;
    } else if (event.altKey) {
      const template = this.plugin.settings.citeSuggestTemplate;
      replaceStr = nunjucks.renderString(template, {
        citekey: suggestion.item.citekey,
      });
    } else {
      replaceStr = `@${suggestion.item.citekey}`;
    }

    activeView.editor.replaceRange(
      replaceStr,
      this.context.start,
      this.context.end
    );

    this.close();
  }

  onTrigger(cursor: EditorPosition, editor: Editor): EditorSuggestTriggerInfo {
    if (!this.plugin.settings.shouldShowCiteSuggest) {
      return null;
    }

    const triggerPhrase = '@';
    let startPos = this.context?.start || {
      line: cursor.line,
      ch: cursor.ch - triggerPhrase.length,
    };

    if (!editor.getRange(startPos, cursor).startsWith(triggerPhrase)) {
      const restartPos = {
        line: cursor.line,
        ch: cursor.ch - (triggerPhrase.length + 1),
      };

      if (
        this.context ||
        !editor.getRange(restartPos, cursor).startsWith(triggerPhrase)
      ) {
        return null;
      }

      startPos = restartPos;
    }

    const precedingChar = editor.getRange(
      {
        line: startPos.line,
        ch: startPos.ch - 1,
      },
      startPos
    );

    if (precedingChar && !/[ .[;-]/.test(precedingChar)) {
      return null;
    }

    const query = editor
      .getRange(startPos, cursor)
      .substring(triggerPhrase.length);

    return {
      start: startPos,
      end: cursor,
      query,
    };
  }
}
