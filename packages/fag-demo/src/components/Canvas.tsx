import { useEffect, useId } from "react";

import { FAG } from "@7rs/fag";
import vertex from "@7rs/fag/shaders/vertex.glsl?raw";
import fragment from "@7rs/fag/shaders/fragment.glsl?raw";

export function AnimatedGradient() {
  const canvasId = useId();

  useEffect(() => {
    FAG(canvasId, vertex, fragment).start();

    console.log("Ready canvas and WebGL2.");
  });

  return <canvas id={canvasId} width="1920" height="1080" className="z--1 fixed"></canvas>;
}
