import { useEffect, useId } from "react";

import {FAGBuilder} from "@7rs/fag"

export function AnimatedGradient() {
  const canvasId = useId();
  useEffect(() => {
    const builder = new FAGBuilder(canvasId);

    console.log("Ready canvas and WebGL2.");
  });

  return <canvas id={canvasId} className="fixed"></canvas>;
}
