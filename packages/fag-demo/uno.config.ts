import { defineConfig } from "unocss";
import presetWind4 from "@unocss/preset-wind4";
import { presetDaisy } from "@ameinhardt/unocss-preset-daisy";

export default defineConfig({
  content: {
    pipeline: {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
    },
  },
  presets: [presetDaisy(), presetWind4()],
});