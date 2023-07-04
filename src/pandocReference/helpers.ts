import { citekeyRegExp } from './regExps';

export function areSetsEqual<T>(as: Set<T>, bs: Set<T>) {
  if (as.size !== bs.size) return false;
  for (const a of as) if (!bs.has(a)) return false;
  return true;
}

export function extractCiteKeys(md: string): Set<string> {
  const matches = md.matchAll(citekeyRegExp);
  const output = new Set<string>();

  for (const match of matches) {
    const key = match[1]?.slice(1);
    if (!output.has(key)) {
      output.add(key);
    }
  }

  return output;
}
