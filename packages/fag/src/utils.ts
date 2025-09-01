import type { RGBColor, WebGLColor } from "./generator.js";

export function convertRGBColor(red: number, green: number, blue: number): WebGLColor {
  for (const color of [red, green, blue]) {
    if (color < 0.0 || 255.0 < color) {
      throw new Error("Specify color 0 to 255");
    }
  }

  return [red / 255, green / 255, blue / 255];
}

export function convertHexColor(hex: string): WebGLColor {
  if (hex.startsWith("#")) {
    hex = hex.slice(1, hex.length);
  }

  return convertRGBColor(
    Number(`0x${hex.slice(0, 2)}`),
    Number(`0x${hex.slice(2, 4)}`),
    Number(`0x${hex.slice(4, 6)}`),
  );
}

export function convertColor(color: WebGLColor | RGBColor | string) {
  if (typeof color === "string") {
      return convertHexColor(color);
    } else if (color.length === 4) {
      return convertRGBColor(color[1], color[2], color[3]);
    }

    return color;
}

export function random(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min));
}
