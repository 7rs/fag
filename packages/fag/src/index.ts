import { FAGBuilder } from "./builder.js";
import { getColorPalette, type PaletteNames } from "./colors.js";
import { random } from "./utils.js";

export { FAGBuilder } from "./builder.js";
export { getColorPalette } from "./colors.js";
export type { FrameConfig, FrameConfigGenerationOptions, RandomRange, WebGLColor, RGBColor } from "./generator.js";
export { random } from "./utils.js";

const DEFAULT_COLORS_COUNT = 8;
const DEFAULT_STRENGTH_MIN_RANGE = 0.1;
const DEFAULT_STRENGTH_MAX_RANGE = 1.3;

export interface fragmentArguments {
  colorsCount?: number;
  strengthMinRange?: number;
  strengthMaxRange?: number;
}

function replaceFragment(fragment: string, args: fragmentArguments): string {
  fragment = fragment.replace(
    "#define METABALL_COUNT 0",
    `#define METABALL_COUNT ${args.colorsCount || DEFAULT_COLORS_COUNT}`,
  );
  fragment = fragment.replace(
    "#define STRENGTH_MIN_RANGE 0",
    `#define STRENGTH_MIN_RANGE ${args.strengthMinRange || DEFAULT_STRENGTH_MIN_RANGE}`,
  );
  fragment = fragment.replace(
    "#define STRENGTH_MAX_RANGE 0",
    `#define STRENGTH_MAX_RANGE ${args.strengthMinRange || DEFAULT_STRENGTH_MAX_RANGE}`,
  );

  return fragment;
}

export function FAG(
  canvasId: string,
  vertex: string,
  fragment: string,
  fragmentArgs: fragmentArguments = {},
  pallets: PaletteNames = "fag",
): FAGBuilder {
  const palette = getColorPalette(pallets);

  fragment = replaceFragment(fragment, fragmentArgs);

  return new FAGBuilder(
    canvasId,
    {
      fragmentShader: fragment,
      vertexShader: vertex,
    },
    { framesCount: 1, colorsCount: fragmentArgs.colorsCount || DEFAULT_COLORS_COUNT, pallets: palette },
    palette[random(0, palette.length)],
  );
}
