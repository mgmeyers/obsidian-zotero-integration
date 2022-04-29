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
import ZoteroConnector from 'src/main';
import { isZoteroRunning } from 'src/bbt/cayw';
import { getAllCiteKeys } from 'src/bbt/getCiteKeyExport';

export class CiteSuggest extends EditorSuggest<Fuse.FuseResult<string>> {
  private plugin: ZoteroConnector;
  private app: App;
  private fuse: Fuse<string>;
  private lastCheck: number = 0;
  private citeKeys: string[] = [];

  limit: number = 20;

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
      includeMatches: true,
      threshold: 0.4,
    });

    this.getCiteKeys();
  }

  getCiteKeys() {
    // Check at most once every 30 seconds
    if (Date.now() - this.lastCheck < 30 * 1000) {
      return;
    }

    const database = this.plugin.settings.database;
    isZoteroRunning(database, true)
      .then((isRunning) => {
        if (isRunning) {
          getAllCiteKeys(database)
            .then((keys) => {
              this.lastCheck = Date.now();
              if (
                keys.length != this.citeKeys.length ||
                keys.some((value, index) => value !== this.citeKeys[index])
              ) {
                this.citeKeys = keys;
                this.fuse.setCollection(keys);
              }
            })
            .catch((e) => {
              console.error(e);
            });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  getSuggestions(context: EditorSuggestContext) {
    if (!context.query || context.query.includes(' ')) {
      return null;
    }

    const results = this.fuse.search(context.query);

    if (results && results.length) {
      return results;
    }

    return null;
  }

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

    if (precedingChar && !/[ .[;]/.test(precedingChar)) {
      return null;
    }

    this.getCiteKeys();

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
