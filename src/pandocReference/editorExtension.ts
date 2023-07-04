import { syntaxTree } from '@codemirror/language';
import { tokenClassNodeProp } from '@codemirror/language';
import { RangeSetBuilder, StateEffect, StateField } from '@codemirror/state';
import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { Tree } from '@lezer/common';
import { editorViewField } from 'obsidian';

import { DocCache, ViewManager } from './ViewManager';
import { citeRegExp, multiCiteRegExp } from './regExps';

const ignoreListRegEx = /code|math|templater|hashtag/;

const citeMark = (
  citekey: string,
  sourceFile: string | undefined,
  isPrefix: boolean
) => {
  const cls = ['cm-pandoc-citation', 'pandoc-citation'];

  if (isPrefix) cls.push('pandoc-citation-at');
  return Decoration.mark({
    class: cls.join(' '),
    attributes: {
      'data-citekey': citekey,
      'data-source': sourceFile || '',
    },
  });
};

const citeMarkFormatting = Decoration.mark({
  class: 'cm-pandoc-citation-formatting',
});

const citeMarkExtra = Decoration.mark({
  class: 'cm-pandoc-citation-extra',
});

export const citeKeyPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = this.mkDeco(view);
    }
    update(update: ViewUpdate) {
      if (
        update.viewportChanged ||
        update.docChanged ||
        update.transactions.some((tr) =>
          tr.effects.some((e) => e.is(setCiteKeyCache))
        )
      ) {
        this.decorations = this.mkDeco(update.view);
      }
    }
    mkDeco(view: EditorView) {
      const b = new RangeSetBuilder<Decoration>();
      const obsView = view.state.field(editorViewField);

      // Don't get the syntax tree until we have to
      let tree: Tree;

      for (const { from, to } of view.visibleRanges) {
        const range = view.state.sliceDoc(from, to);
        let match;

        while ((match = citeRegExp.exec(range))) {
          let pos = from + match.index;

          if (!tree) tree = syntaxTree(view.state);

          const nodeProps = tree
            .resolveInner(pos, 1)
            .type.prop(tokenClassNodeProp);

          if (nodeProps && ignoreListRegEx.test(nodeProps)) {
            continue;
          }

          // Loop through the 10 possible groups
          for (let i = 1; i <= 10; i++) {
            switch (i) {
              case 3:
                // Break up multicite matches
                if (match[i]) {
                  const multiCite = match[i];
                  let m2;
                  while ((m2 = multiCiteRegExp.exec(multiCite))) {
                    b.add(
                      pos,
                      pos + 1,
                      citeMark(m2[1], obsView?.file.path, true)
                    );

                    const withoutPrefix = m2[1].slice(1);
                    b.add(
                      pos + 1,
                      pos + 1 + withoutPrefix.length,
                      citeMark(m2[1], obsView?.file.path, false)
                    );
                    pos += m2[1].length;

                    if (m2[2]) {
                      b.add(pos, pos + m2[2].length, citeMarkFormatting);
                      pos += m2[2].length;
                    }
                  }
                }
                continue;
              case 6:
                if (match[i]) {
                  b.add(
                    pos,
                    pos + 1,
                    citeMark(match[i], obsView?.file.path, true)
                  );

                  const withoutPrefix = match[i].slice(1);
                  b.add(
                    pos + 1,
                    pos + 1 + withoutPrefix.length,
                    citeMark(match[i], obsView?.file.path, false)
                  );
                  pos += match[i].length;
                }
                continue;
              case 1:
              case 5:
              case 8:
              case 10:
                if (match[i]) {
                  b.add(pos, pos + match[i].length, citeMarkFormatting);
                  pos += match[i].length;
                }
                continue;
              case 2:
              case 4:
              case 7:
              case 9:
                if (match[i]) {
                  b.add(pos, pos + match[i].length, citeMarkExtra);
                  pos += match[i].length;
                }
                continue;
            }
          }
        }
      }

      return b.finish();
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

export const setCiteKeyCache = StateEffect.define<DocCache>();
export const citeKeyCacheField = StateField.define<DocCache>({
  create(state) {
    const obsView = state.field(editorViewField);
    const viewManager = state.field(viewManagerField);

    if (obsView?.file && viewManager?.cache.has(obsView.file)) {
      return viewManager.cache.get(obsView.file);
    }

    return null;
  },
  update(state, tr) {
    for (const e of tr.effects) {
      if (e.is(setCiteKeyCache)) {
        state = e.value;
      }
    }

    return state;
  },
});

export const viewManagerField = StateField.define<ViewManager>({
  create() {
    return null;
  },
  update(state) {
    return state;
  },
});
