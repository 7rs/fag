export class FAGBuilder {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;

  constructor(canvasId: string) {
    this.canvas = this.getCanvasElement(canvasId);
    this.ctx = this.getWebGLContext(this.canvas);
  }

  getCanvasElement(canvasId: string): HTMLCanvasElement {
    const _canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (_canvas == null) {
      throw new Error(`Coundn't found canvas element: ${canvasId}`);
    }

    return _canvas;
  }

  getWebGLContext(canvas: HTMLCanvasElement | null = null): WebGL2RenderingContext {
    if (canvas == null) {
      canvas = this.canvas;
    }

    const _ctx = canvas.getContext("webgl2");
    if (_ctx == null) {
      throw new Error("Browser can't use WebGL2.");
    }

    return _ctx;
  }
}
