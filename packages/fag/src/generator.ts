import type { Themes } from "./colors.js";
import { random, convertRGBColor, convertHexColor } from "./utils.js";

export type RGBColor = [1, number, number, number];

export type WebGLColor = [number, number, number];

export interface MetaballConfig {
  x: number;
  y: number;
  strength: number;
  color: WebGLColor;
}

export interface FrameConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  metaballs: MetaballConfig[];
}

export interface RandomRange {
  min: number;
  max: number;
}

export interface FrameConfigGenerationOptions {
  framesCount: number;
  colorsCount?: number | RandomRange;
  disableColorsPair?: boolean;
  pallets?: WebGLColor[] | RGBColor[] | string[] | Themes[];
}

const DEFAULT_FRAMES_COUNT = 1;
const DEFAULT_COLORS_MIN = 6;
const DEFAULT_COLORS_MAX = 10;

function createRandomWebGLColor(): WebGLColor {
  return [Math.random(), Math.random(), Math.random()];
}

function createRandomColors(colorsCount: number, disableColorsPair?: boolean): WebGLColor[] {
  let prevColor: WebGLColor;

  return Array.from({ length: colorsCount }).map((_, i) => {
    if (disableColorsPair) {
      return createRandomWebGLColor();
    }

    if (i / 2 === Math.floor(i / 2)) {
      prevColor = createRandomWebGLColor();
      return prevColor;
    }

    return prevColor;
  });
}

function createRandomColorsFromPallets(
  _pallets: WebGLColor[] | RGBColor[] | string[] | Themes[],
  colorsCount: number,
  disableColorsPair?: boolean,
): WebGLColor[] {
  const pallets = _pallets.map((color) => {
    if (typeof color === "string") {
      return convertHexColor(color);
    } else if (color.length === 4) {
      return convertRGBColor(color[1], color[2], color[3]);
    }

    return color;
  });

  let tempPallets = [...pallets];
  let prevColor: WebGLColor;
  return Array.from({ length: colorsCount }).map((_, i) => {
    const index = random(0, tempPallets.length - 1);
    const selected = tempPallets[index] as WebGLColor;

    tempPallets = tempPallets.filter((_, i) => i !== index);
    if (tempPallets.length <= 0) {
      tempPallets = [...pallets];
    }

    if (disableColorsPair) {
      return selected;
    }

    if (i / 2 === Math.floor(i / 2)) {
      prevColor = selected;
      return prevColor;
    }

    return prevColor;
  });
}

export function createFrameConfigsWithOptions(options?: FrameConfigGenerationOptions): FrameConfig[] {
  if (options == null) {
    options = {
      framesCount: DEFAULT_FRAMES_COUNT,
      colorsCount: { min: DEFAULT_COLORS_MIN, max: DEFAULT_COLORS_MAX },
      disableColorsPair: false,
    };
  }

  let colors: WebGLColor[] = [];
  let colorsCount = 0;

  if (typeof options.colorsCount !== "number") {
    const min = options.colorsCount?.min || DEFAULT_COLORS_MIN;
    const max = options.colorsCount?.max || DEFAULT_COLORS_MAX;
    colorsCount = random(min, max);
  } else {
    colorsCount = options.colorsCount;
  }

  if (options.pallets == null) {
    colors = createRandomColors(colorsCount, options.disableColorsPair);
  } else {
    colors = createRandomColorsFromPallets(options.pallets, colorsCount, options.disableColorsPair);
  }

  return createFrameConfigArray(options.framesCount, colors);
}

export function createFrameConfigArray(
  framesCount: number = DEFAULT_FRAMES_COUNT,
  colors: WebGLColor[],
): FrameConfig[] {
  return Array.from({ length: framesCount }).map((_) => {
    const metaballs: MetaballConfig[] = colors.map((color) => {
      return {
        x: Math.random() * 2.0 - 1.0,
        y: Math.random() * 2.0 - 1.0,
        strength: 0.1 + Math.random() * 0.4,
        color: color,
      };
    });

    return {
      x: -1.0,
      y: -1.0,
      width: 2.0,
      height: 2.0,
      metaballs,
    };
  });
}
