const hexCharacters = 'a-f\\d';
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');

type ColorArrayType = [number, number, number, number];
type ColorStyleType = `rgb(${number} ${number} ${number}${string})`;
type ColorObjectType = {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
};

type ColorReturnType = ColorArrayType | ColorObjectType | ColorStyleType;

type ColorFormatType = 'array' | 'object' | 'style';

export function hexToRgb(
  hex: string,
  options?: { alpha?: number; format: 'array' }
): ColorArrayType;

export function hexToRgb(
  hex: string,
  options?: { alpha?: number; format: 'style' }
): ColorStyleType;

export function hexToRgb(
  hex: string,
  options?: { alpha?: number; format: 'object' }
): ColorObjectType;

export function hexToRgb(
  hex: string,
  options: { alpha?: number; format: ColorFormatType } = {
    alpha: 1,
    format: 'array',
  }
): ColorReturnType {
  if (
    typeof hex !== 'string' ||
    nonHexChars.test(hex) ||
    !validHexSize.test(hex)
  ) {
    throw new TypeError('Expected a valid hex string');
  }

  hex = hex.replace(/^#/, '');

  let alphaFromHex = 1;

  if (hex.length === 8) {
    alphaFromHex = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    alphaFromHex = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const number = parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  const alpha =
    typeof options.alpha === 'number' ? options.alpha : alphaFromHex;

  if (options.format === 'array') {
    return [red, green, blue, alpha];
  }

  if (options.format === 'style') {
    const alphaString = alpha === 1 ? '' : ` / ${+(alpha * 100).toFixed(2)}%`;
    return `rgb(${red} ${green} ${blue}${alphaString})`;
  }

  return { red, green, blue, alpha };
}

export function rgbToHex({ red, green, blue, alpha = 1 }: ColorObjectType) {
  const alphaString = alpha === 1 ? '' : ` / ${+(alpha * 100).toFixed(2)}%`;
  return `rgb(${red} ${green} ${blue}${alphaString})`;
}


export function setPaletteColor(property: string, value: string) {
  document.documentElement.style.setProperty(`--${property}`, value);
}