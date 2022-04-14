import {
  getPort,
  mkMDDir,
  replaceIllegalChars,
  sanitizeFilePath,
} from '../helpers';

describe('getPort()', () => {
  it('returns correct port for database', () => {
    expect(getPort('Juris-M')).toBe('24119');
    expect(getPort('Zotero')).toBe('23119');
  });
});

describe('mkMDDir()', () => {
  it('does not call createFolder if path exists', async () => {
    global.app = {
      vault: {
        adapter: {
          exists: async () => true,
        },
        createFolder: jest.fn(async () => {}),
      },
    } as any;

    await mkMDDir('mock');

    expect(global.app.vault.createFolder as jest.Mock).not.toBeCalled();
  });

  it('does call createFolder if path exists', async () => {
    global.app = {
      vault: {
        adapter: {
          exists: async () => false,
        },
        createFolder: jest.fn(async () => {}),
      },
    } as any;

    await mkMDDir('mock');

    expect(global.app.vault.createFolder as jest.Mock).toBeCalled();
  });
});

describe('replaceIllegalChars()', () => {
  it('replaces ? and * with spaces', () => {
    const chars = ['?', '*'];
    chars.forEach((c) => {
      expect(replaceIllegalChars(`Hello${c}  world`)).toBe('Hello world');
    });
  });

  it('replaces :"<>| with dash', () => {
    const chars = [':', '"', '<', '>', '|'];
    chars.forEach((c) => {
      expect(replaceIllegalChars(`Hello${c}  world`)).toBe('Hello - world');
    });
  });

  it('leaves no trailing or leading spaces', () => {
    expect(replaceIllegalChars('?')).toBe('');
    expect(replaceIllegalChars(':')).toBe('-');
    expect(replaceIllegalChars('*hello?')).toBe('hello');
  });
});

describe('sanitizeFilePath()', () => {
  it('keeps slashes', () => {
    expect(sanitizeFilePath('/hello/world.txt')).toBe('/hello/world.txt');
  });

  it('replaces ? and * with spaces', () => {
    const chars = ['?', '*'];
    chars.forEach((c) => {
      expect(sanitizeFilePath(`/hel${c} lo/${c}world${c}.txt`)).toBe(
        '/hel lo/world.txt'
      );
    });
  });

  it('replaces :"<>| with dash', () => {
    const chars = [':', '"', '<', '>', '|'];
    chars.forEach((c) => {
      expect(sanitizeFilePath(`/hel${c} lo/${c}world${c}.txt`)).toBe(
        '/hel - lo/- world -.txt'
      );
    });
  });

  it('leaves no trailing or leading spaces', () => {
    expect(replaceIllegalChars('?')).toBe('');
    expect(replaceIllegalChars(':')).toBe('-');
    expect(replaceIllegalChars('*hello?')).toBe('hello');
  });
});
