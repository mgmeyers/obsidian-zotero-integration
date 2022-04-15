import moment from 'moment';
import { filterBy, format } from '../template.helpers';

jest.mock(
  'obsidian',
  () => ({
    moment: require('moment'),
  }),
  { virtual: true }
);

describe('filter#filterBy', () => {
  const tests = [
    {
      a: {
        b: 'abcdefg',
      },
      b: 'dddd',
      date: moment('2022-04-04', 'YYYY-MM-DD'),
    },
    {
      a: {
        b: 'defghijk',
      },
      date: moment('2022-04-05', 'YYYY-MM-DD'),
    },
    {
      a: {
        b: 'abcxyz',
      },
      date: moment('2022-04-06', 'YYYY-MM-DD'),
    },
  ];

  it('handles empty props', () => {
    expect(filterBy(tests, '', 'endswith', 'yz')).toHaveLength(0);
  });

  it('filters by string that starts with string', () => {
    expect(filterBy(tests, 'a.b', 'startswith', 'ab')).toHaveLength(2);
    expect(filterBy(tests, 'a.b', 'startswith', 'ab')[0]).toBe(tests[0]);
    expect(filterBy(tests, 'a.b', 'startswith', 'ab')[1]).toBe(tests[2]);
  });

  it('filters by string that contains string', () => {
    expect(filterBy(tests, 'a.b', 'contains', 'bc')).toHaveLength(2);
    expect(filterBy(tests, 'a.b', 'contains', 'bc')[0]).toBe(tests[0]);
    expect(filterBy(tests, 'a.b', 'contains', 'bc')[1]).toBe(tests[2]);
  });

  it('filters by string that ends with string', () => {
    expect(filterBy(tests, 'a.b', 'endswith', 'yz')).toHaveLength(1);
    expect(filterBy(tests, 'a.b', 'endswith', 'yz')[0]).toBe(tests[2]);
  });

  it('returns empty array when date is not date', () => {
    expect(filterBy(tests, 'date', 'dateafter', 'yz')).toHaveLength(0);
  });

  it('filters by date that ends after date', () => {
    expect(
      filterBy(tests, 'date', 'dateafter', moment('2022-04-05', 'YYYY-MM-DD'))
    ).toHaveLength(1);
    expect(
      filterBy(
        tests,
        'date',
        'dateafter',
        moment('2022-04-05', 'YYYY-MM-DD')
      )[0]
    ).toBe(tests[2]);
  });

  it('filters by date that ends on or after date', () => {
    expect(
      filterBy(
        tests,
        'date',
        'dateonorafter',
        moment('2022-04-05', 'YYYY-MM-DD')
      )
    ).toHaveLength(2);
    expect(
      filterBy(
        tests,
        'date',
        'dateonorafter',
        moment('2022-04-05', 'YYYY-MM-DD')
      )[0]
    ).toBe(tests[1]);
    expect(
      filterBy(
        tests,
        'date',
        'dateonorafter',
        moment('2022-04-05', 'YYYY-MM-DD')
      )[1]
    ).toBe(tests[2]);
  });

  it('filters by date that ends before date', () => {
    expect(
      filterBy(tests, 'date', 'datebefore', moment('2022-04-05', 'YYYY-MM-DD'))
    ).toHaveLength(1);
    expect(
      filterBy(
        tests,
        'date',
        'datebefore',
        moment('2022-04-05', 'YYYY-MM-DD')
      )[0]
    ).toBe(tests[0]);
  });

  it('filters by date that ends on or before date', () => {
    expect(
      filterBy(
        tests,
        'date',
        'dateonorbefore',
        moment('2022-04-05', 'YYYY-MM-DD')
      )
    ).toHaveLength(2);
    expect(
      filterBy(
        tests,
        'date',
        'dateonorbefore',
        moment('2022-04-05', 'YYYY-MM-DD')
      )[0]
    ).toBe(tests[0]);
    expect(
      filterBy(
        tests,
        'date',
        'dateonorbefore',
        moment('2022-04-05', 'YYYY-MM-DD')
      )[1]
    ).toBe(tests[1]);
  });

  it('returns empty array when command not found', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(filterBy(tests, 'date', 'nope', 'yz')).toHaveLength(0);
  });
});

describe('filter#format()', () => {
  it('formats moment dates', () => {
    const d = moment();
    expect(format(d, 'YYYY-MM-DD')).toBe(d.format('YYYY-MM-DD'));
  });

  it('returns an error on non-date values', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(format('hi', 'YYYY-MM-DD')).toBe('Error: `format` can only be applied to dates. Tried for format string')
  });
});
