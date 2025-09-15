export const Palettes = {
  dracula: ["#FF5555", "#FFB86C", "#F1FA8C", "#50FA7B", "#8BE9FD", "#BD93F9", "#FF79C6"],
  monokai: ["#ff6188", "#fc9867", "#ffd866", "#a9dc76", "#78dce8", "#ab9df2"],
  tokyonight: [
    "#f7768e",
    "#ff9e64",
    "#e0af68",
    "#9ece6a",
    "#73daca",
    "#b4f9f8",
    "#2ac3de",
    "#7dcfff",
    "#7aa2f7",
    "#bb9af7",
    "#c0caf5",
    "#a9b1d6",
    "#9aa5ce",
  ],
  fag: ["#ffa080", "#ffb0d0", "#ffd0ff", "#b0d0ff", "#80ffd0", "#80ffa0"],
} as const;
export type Palettes = (typeof Palettes)[keyof typeof Palettes];
export type PaletteNames = keyof typeof Palettes;

export function getColorPalette(name: PaletteNames): string[] {
  return [...Palettes[name]];
}
