export function getEnumKeyFromEnumValue<T extends Record<string, any>>(
  enumObj: T,
  valor?: string
): keyof T | null {
  const key = Object.keys(enumObj).find((key) => enumObj[key] === valor);
  return key as keyof T | null;
}
