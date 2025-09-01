import { useEffect, useId } from "react";

import { FAGBuilder, getColorPalette, random } from "@7rs/fag";
import vertex from "@7rs/fag/shaders/vertex.glsl?raw";
import fragment from "@7rs/fag/shaders/fragment.glsl?raw";

export function AnimatedGradient() {
  const canvasId = useId();

  const palette = getColorPalette("fag");
  useEffect(() => {
    const builder = new FAGBuilder(
      canvasId,
      {
        fragmentShader: fragment,
        vertexShader: vertex,
      },
      { framesCount: 1, colorsCount: 8, pallets: palette },
      palette[random(0, palette.length)],
    );
    builder.start();
    console.log("Ready canvas and WebGL2.");
  });

  return <canvas id={canvasId} width="1920" height="1080" className="z--1 fixed"></canvas>;
}
