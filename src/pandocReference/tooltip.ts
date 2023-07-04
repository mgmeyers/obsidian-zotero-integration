import { LRUCache } from 'lru-cache';
import { TFile } from 'obsidian';
import { getBibFromCiteKey, getLibForCiteKey } from 'src/bbt/jsonRPC';
import ZoteroConnector from 'src/main';

export class TooltipManager {
  tooltipDb = 0;
  win: Window;

  plugin: ZoteroConnector;
  tooltip: HTMLDivElement;
  cache: LRUCache<string, HTMLElement>;

  constructor(plugin: ZoteroConnector) {
    this.plugin = plugin;
    this.cache = new LRUCache({ max: 40 });

    plugin.register(this.initDelegatedEvents());
    plugin.register(() => {
      this.unbindScroll();
      this.hideTooltip();
    });
  }

  initDelegatedEvents() {
    const over = (e: PointerEvent) => {
      if (!this.plugin.settings.shouldShowCitekeyTooltips) return;

      if (e.target instanceof HTMLElement) {
        const target = e.target;

        clearTimeout(this.tooltipDb);
        this.tooltipDb = window.setTimeout(() => {
          this.showTooltip(target);
        }, this.plugin.settings.citekeyTooltipDelay ?? 500);
      }
    };

    const out = () => {
      if (!this.plugin.settings.shouldShowCitekeyTooltips) return;
      this.hideTooltip();
    };

    document.body.on('pointerover', '.pandoc-citation', over);
    document.body.on('pointerout', '.pandoc-citation', out);

    return () => {
      document.body.off('pointerover', '.pandoc-citation', over);
      document.body.off('pointerout', '.pandoc-citation', out);
    };
  }

  async showTooltip(el: HTMLSpanElement) {
    if (this.tooltip) {
      this.hideTooltip();
    }

    if (!el.dataset.citekey || !el.dataset.source) return;

    const file = app.vault.getAbstractFileByPath(el.dataset.source);
    if (!file && !(file instanceof TFile)) {
      return;
    }

    const citekey = el.dataset.citekey.slice(1);
    const database = {
      database: this.plugin.settings.database,
      port: this.plugin.settings.port,
    };
    const modClasses = this.plugin.settings.citekeyReferenceHideLinks
      ? ' collapsed-links'
      : '';
    const prev = el.previousElementSibling;
    const rect = prev?.hasClass('pandoc-citation')
      ? prev.getBoundingClientRect()
      : el.getBoundingClientRect();

    this.tooltip = document.body.createDiv(
      { cls: `pwc-tooltip${modClasses}` },
      (div) => {
        div
          .createSpan('zt-suggest-loading-wrapper')
          .createSpan('zt-suggest-loading');

        setTimeout(() => {
          const viewport = window.visualViewport;
          const divRect = div.getBoundingClientRect();

          div.style.left =
            rect.x + divRect.width + 10 > viewport.width
              ? `${rect.x - (rect.x + divRect.width + 10 - viewport.width)}px`
              : `${rect.x}px`;
          div.style.top =
            rect.bottom + divRect.height + 10 > viewport.height
              ? `${rect.y - divRect.height - 5}px`
              : `${rect.bottom + 5}px`;
        });
      }
    );

    if (this.cache.has(citekey)) {
      return this.populateTooltip(this.cache.get(citekey), rect, citekey);
    }

    const libraryID = await getLibForCiteKey(citekey, database);
    if (!this.tooltip) return;

    const content = await getBibFromCiteKey(
      { key: citekey, library: libraryID },
      database,
      this.plugin.settings.citekeyReferenceCslStyle,
      'html',
      true
    );

    if (!this.tooltip) return;
    if (!content) return this.hideTooltip();

    const parser = new DOMParser();
    const html = parser.parseFromString(content, 'text/html');
    const bib = html.body.find('.csl-entry');

    this.cache.set(citekey, bib);
    this.populateTooltip(bib, rect, citekey);
  }

  populateTooltip(bib: HTMLElement, rect: DOMRect, citekey: string) {
    const { tooltip } = this;
    tooltip.empty();

    if (this.plugin.settings.citekeyReferenceHideLinks) {
      tooltip.addClass('collapsed-links');
    }

    if (bib) {
      tooltip.append(bib);
    } else {
      tooltip.addClass('is-missing');
      tooltip.createEl('em', {
        text: 'No citation found for ' + citekey,
      });
    }

    setTimeout(() => {
      const viewport = window.visualViewport;
      const divRect = tooltip.getBoundingClientRect();

      tooltip.style.left =
        rect.x + divRect.width + 10 > viewport.width
          ? `${rect.x - (rect.x + divRect.width + 10 - viewport.width)}px`
          : `${rect.x}px`;
      tooltip.style.top =
        rect.bottom + divRect.height + 10 > viewport.height
          ? `${rect.y - divRect.height - 5}px`
          : `${rect.bottom + 5}px`;
    });

    this.win = activeWindow;
    this.win.addEventListener('scroll', this.scrollHandler, {
      capture: true,
    });
  }

  unbindScroll() {
    if (this.win) {
      this.win.removeEventListener('scroll', this.scrollHandler, {
        capture: true,
      });
      this.win = null;
    }
  }

  scrollHandler = () => {
    // Prevent dupe calls from quick scrolls
    if (this.win) {
      this.hideTooltip();
      this.unbindScroll();
    }
  };

  hideTooltip() {
    clearTimeout(this.tooltipDb);
    if (this.tooltip) {
      this.tooltip?.remove();
      this.tooltip = null;
    }
  }
}
