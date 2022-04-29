import { latexToCiteKeys } from '../getCiteKeyExport';

jest.mock('obsidian', () => ({}), { virtual: true });

describe('latexToCiteKeys', () => {
  it('parses latex citekey export and converts to an array of strings', () => {
    const input =
      '\\cite{2016, 2018, aamft, agarwal2020, agren2014, agrenetal2012, agrenetal2017, alberthorowitz2009}';
    const expected = [
      '2016',
      '2018',
      'aamft',
      'agarwal2020',
      'agren2014',
      'agrenetal2012',
      'agrenetal2017',
      'alberthorowitz2009',
    ];

    expect(latexToCiteKeys(input)).toEqual(expected);
  });
});
