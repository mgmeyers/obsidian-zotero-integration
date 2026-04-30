jest.mock(
  'obsidian',
  () => ({
    moment: require('moment'),
    normalizePath: (p: string) => p.replace(/\\/g, '/'),
    htmlToMarkdown: (s: string) => s,
    request: jest.fn(),
    debounce: (fn: any) => fn,
    Notice: class {},
    TFile: class {},
    FileSystemAdapter: class {},
    App: class {},
    Modal: class {},
    Plugin: class {},
    PluginSettingTab: class {},
    Setting: class {},
    ItemView: class {},
    EditableFileView: class {},
    Events: class {},
    FuzzySuggestModal: class {},
    SuggestModal: class {},
    AbstractInputSuggest: class {},
    Component: class {},
  }),
  { virtual: true }
);

jest.mock('execa', () => ({ execa: jest.fn() }), { virtual: true });

import { convertNativeAnnotation } from '../export';

const baseAnnotation = {
  key: 'ANNKEY1',
  dateModified: '2024-01-01T00:00:00Z',
  annotationType: 'highlight',
  annotationColor: '#ffd400',
  annotationText: 'some highlighted text',
};

describe('convertNativeAnnotation()', () => {
  describe('PDF attachment', () => {
    const attachment = {
      uri: 'http://zotero.org/users/123/items/PDFITEM',
      path: '/library/storage/abc/paper.pdf',
    };

    it('sets pageLabel and desktopURI with page= query', () => {
      const annot = convertNativeAnnotation(
        {
          ...baseAnnotation,
          annotationPageLabel: '42',
          annotationPosition: { pageIndex: 41, rects: [[10, 20, 30, 40]] },
        },
        attachment,
        '',
        '',
        'image'
      );

      expect(annot.pageLabel).toBe('42');
      expect(annot.desktopURI).toBe(
        'zotero://open-pdf/library/items/PDFITEM?annotation=ANNKEY1&page=42'
      );
      expect(annot.page).toBe(42);
    });
  });

  describe('EPUB attachment', () => {
    const attachment = {
      uri: 'http://zotero.org/users/123/items/EPUBITEM',
      path: '/library/storage/xyz/book.epub',
    };

    it('sets pageLabel and desktopURI (regression: was dropped by .pdf gate)', () => {
      const annot = convertNativeAnnotation(
        {
          ...baseAnnotation,
          annotationPageLabel: '7',
          annotationPosition: { cfi: '/6/12!/4/2/4' },
        },
        attachment,
        '',
        '',
        'image'
      );

      expect(annot.pageLabel).toBe('7');
      expect(annot.desktopURI).toBe(
        'zotero://open-pdf/library/items/EPUBITEM?annotation=ANNKEY1&page=7'
      );
      // EPUB position has no pageIndex/rects — page/x/y stay undefined, no crash
      expect(annot.page).toBeUndefined();
      expect(annot.x).toBeUndefined();
    });

    it('omits page= from URI when annotationPageLabel is missing', () => {
      const annot = convertNativeAnnotation(
        {
          ...baseAnnotation,
          annotationPosition: { cfi: '/6/12!/4/2/4' },
        },
        attachment,
        '',
        '',
        'image'
      );

      expect(annot.desktopURI).toBe(
        'zotero://open-pdf/library/items/EPUBITEM?annotation=ANNKEY1'
      );
    });
  });
});
