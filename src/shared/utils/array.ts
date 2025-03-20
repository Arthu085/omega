export function replaceItemAtIndex<T>(arr: Array<T>, index: number, newValue: T): Array<T> {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex<T>(arr: Array<T>, index: number): Array<T> {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function isArray(value: unknown): value is Array<unknown> {
  return Boolean(value) && Array.isArray(value);
}

export function isRepeatedArray<T>(value: Array<T>): boolean {
  return value.every((item) => value[0] === item);
}

export function generateArrayOfColors(baseColor: string, amount: number) {
  function hexToRGB(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;
    return [red, green, blue];
  }

  function RGBToHex(baseRGB: number[]) {
    const red = baseRGB[0];
    const green = baseRGB[1];
    const blue = baseRGB[2];
    return `#${(1 << 24 | red << 16 | green << 8 | blue).toString(16).slice(1)}`;
  }

  const baseRgb = hexToRGB(baseColor);
  const step = 360 / amount;
  const colors = [];

  for (let i = 0; i < amount; i++) {
    colors.push(RGBToHex(baseRgb));

    baseRgb[0] = (baseRgb[0] + step) % 256;
    baseRgb[1] = (baseRgb[1] + step) % 256;
    baseRgb[2] = (baseRgb[2] + step) % 256;
  }

  return colors;
}
