export function capitalize(value: string): string {
  const parts = value.toLowerCase().trim().split(' ');

  return parts.map((part) => part[0].toUpperCase() + part.substring(1)).join(' ');
}

export function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function removeNonNumericCharacters(value: string): string {
  return value.replace(/\D/g, '');
}

export function removeSpecialCharacters(value: string): string {
  return value.replace(/[^a-zA-Z0-9 ]/g, '');
}

export function abbreviate(value: string, limit: number): string {
  return value.length <= limit ? value : value.slice(0, limit) + '...';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function numberToString(num: number, fixed: number = 2): string {
  return num % 1 === 0 ? num.toString() : num.toFixed(fixed);
}
