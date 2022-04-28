import os from 'os';
import Fuse from 'fuse.js';
import {
  App,
  Editor,
  EditorPosition,
  EditorSuggest,
  EditorSuggestContext,
  EditorSuggestTriggerInfo,
  MarkdownView,
} from 'obsidian';
import pDebounce from 'p-debounce';
import { execSearch } from 'src/bbt/jsonRPC';
import ZoteroConnector from 'src/main';
import { isZoteroRunning } from 'src/bbt/cayw';

export class CiteSuggest extends EditorSuggest<Fuse.FuseResult<string>> {
  private plugin: ZoteroConnector;
  private app: App;
  private fuse: Fuse<string>;
  private suggestionCache: Fuse.FuseResult<string>[] = [];
  private lastExec: number = 0;
  private isZoteroRunning = false;

  constructor(app: App, plugin: ZoteroConnector) {
    super(app);
    this.app = app;
    this.plugin = plugin;

    const isMac = os.platform();

    (this as any).scope.register(['Mod'], 'Enter', (evt: KeyboardEvent) => {
      (this as any).suggestions.useSelectedItem(evt);
      return false;
    });

    this.setInstructions([
      {
        command: isMac === 'darwin' ? 'cmd ↵' : 'ctrl ↵',
        purpose: 'Wrap cite key with brackets',
      },
    ]);

    this.fuse = new Fuse([] as string[], {
      minMatchCharLength: 2,
      includeMatches: true,
    });

    this.checkIsZoteroRunning();
  }

  checkIsZoteroRunning() {
    isZoteroRunning(this.plugin.settings.database, true).then((isRunning) => {
      this.isZoteroRunning = isRunning;
    });
  }

  async getSuggestions(
    context: EditorSuggestContext
  ): Promise<Fuse.FuseResult<string>[]> {
    this.lastExec = Date.now();

    await this.getCiteKeySuggestions(context, this.lastExec);

    if (this.suggestionCache.length) {
      return this.suggestionCache;
    }

    return null;
  }

  getCiteKeySuggestions = pDebounce(
    async (
      context: EditorSuggestContext,
      timeStamp: number
    ): Promise<EditorSuggestContext> => {
      if (!context.query) return;

      try {
        const res = await execSearch(
          context.query,
          this.plugin.settings.database
        );

        if (timeStamp === this.lastExec) {
          this.fuse.setCollection(res.map((r: any) => r.citekey));
          this.suggestionCache = this.fuse.search(context.query);
        }
      } catch {
        this.checkIsZoteroRunning();
      }
    },
    300
  );

  renderSuggestion(suggestion: Fuse.FuseResult<string>, el: HTMLElement): void {
    const item = suggestion.item;

    if (!suggestion.matches || !suggestion.matches.length) {
      return el.setText(item);
    }

    const frag = createFragment();

    frag.appendText('@');

    let prevIndex = 0;

    suggestion.matches.forEach((m) => {
      m.indices.forEach((indices) => {
        const start = indices[0];
        const stop = indices[1] + 1;

        frag.appendText(item.substring(prevIndex, start));
        frag.append(
          createEl('strong', {
            text: item.substring(start, stop),
          })
        );
        prevIndex = stop;
      });
    });

    frag.appendText(item.substring(prevIndex));

    el.setText(frag);
  }

  selectSuggestion(
    suggestion: Fuse.FuseResult<string>,
    event: KeyboardEvent | MouseEvent
  ): void {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView) {
      return;
    }

    activeView.editor.replaceRange(
      event.metaKey || event.ctrlKey
        ? `[@${suggestion.item}]`
        : `@${suggestion.item}`,
      this.context.start,
      this.context.end
    );

    this.close();
  }

  close(): void {
    super.close();
    this.context = null;
    this.suggestionCache = [];
    this.fuse.setCollection([]);
  }

  checkDb = 0;
  onTrigger(cursor: EditorPosition, editor: Editor): EditorSuggestTriggerInfo {
    if (!this.plugin.settings.shouldShowCiteSuggest) {
      return null;
    }

    const triggerPhrase = '@';
    const startPos = this.context?.start || {
      line: cursor.line,
      ch: cursor.ch - triggerPhrase.length,
    };

    if (!editor.getRange(startPos, cursor).startsWith(triggerPhrase)) {
      return null;
    }

    if (!this.isZoteroRunning) {
      clearTimeout(this.checkDb);
      this.checkDb = window.setTimeout(() => {
        this.checkIsZoteroRunning();
      }, 300);

      if (this.context) {
        this.close();
      }

      return null;
    }

    const precedingChar = editor.getRange(
      {
        line: startPos.line,
        ch: startPos.ch - 1,
      },
      startPos
    );

    if (precedingChar && !/[ .[;]/.test(precedingChar)) {
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
