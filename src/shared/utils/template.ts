import { formatDate } from './date';

export function createReplacementTable(
  obj: Record<string, unknown>,
  parentKey?: string,
): Record<string, string> {
  return Object.entries(obj).reduce((obj, [key, value]) => {
    if (typeof value === 'function' || !value) return obj;
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (value instanceof Object) {
      if (value instanceof Date)
        return { ...obj, [fullKey]: formatDate(value.toISOString(), false, { zone: 'UTC' }) };
      return { ...obj, ...createReplacementTable(value as Record<string, unknown>, fullKey) };
    } else {
      return { ...obj, [fullKey]: String(value) };
    }
  }, {});
}
