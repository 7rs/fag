import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-oxc";
import unocss from "unocss/vite";

import type { MapLike } from "typescript";
import type { AliasOptions } from "vite";
import tsconfig from "./tsconfig.json" with { type: "json" };

export function getAliases(paths: MapLike<string[]>, alias: AliasOptions = {}): AliasOptions {
  let aliasesArray: AliasOptions = alias;

  for (const [_alias, _targetPath] of Object.entries(paths)) {
    if (_targetPath.length <= 0) {
      continue;
    }
    const aliases = {
      [_alias.slice(0, _alias.length - 2)]: `/${_targetPath[0].slice(0, _targetPath[0].length - 1)}`,
    };

    aliasesArray = {
      ...aliasesArray,
      ...aliases,
    };
  }

  return aliasesArray;
}

export default defineConfig({
  plugins: [react(), unocss()],

  resolve: {
    alias: getAliases(tsconfig.compilerOptions.paths),
  },
});
