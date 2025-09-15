import { ShaderManager, type Shaders } from "./shaders.js";
import { Renderer } from "./renderer.js";
import {
  createFrameConfigsWithOptions,
  type FrameConfig,
  type FrameConfigGenerationOptions,
  type RGBColor,
  type WebGLColor,
} from "./generator.js";
import { convertColor } from "./utils.js";

export class FAGBuilder {
  canvas: HTMLCanvasElement;
  ctx: WebGL2RenderingContext;
  configs: FrameConfig[] | FrameConfigGenerationOptions | undefined;
  background: WebGLColor | RGBColor | string | undefined;

  private frames: FrameConfig[] = [];
  private shaderManager: ShaderManager;
  private renderer: Renderer;
  private animated: boolean = false;

  constructor(
    canvasId: string,
    shaders: Shaders,
    configs?: FrameConfig[] | FrameConfigGenerationOptions,
    background?: WebGLColor | RGBColor | string,
  ) {
    this.canvas = this.getCanvasElement(canvasId);
    this.setupCanvasSize();
    this.ctx = this.getWebGLContext();
    this.shaderManager = new ShaderManager(this.ctx, shaders);
    this.background = background;
    const color = convertColor(background || "#000000");
    this.renderer = new Renderer(this.ctx, { color: { red: color[0], green: color[1], blue: color[2] } });

    this.configs = configs;
    if (Array.isArray(configs)) {
      this.frames = configs;
    } else {
      this.frames = createFrameConfigsWithOptions(configs);
    }
  }

  render(): void {
    const shaderProgram = this.shaderManager.shaderProgram;
    const time = performance.now() * 0.001; // Convert to seconds
    this.renderer.render(shaderProgram, this.frames, time);
  }

  start(): void {
    this.animated = true;
    const renderLoop = () => {
      if (!this.animated) {
        return;
      }

      this.render();
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  private getCanvasElement(canvasId: string): HTMLCanvasElement {
    const _canvas = window.document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (_canvas == null) {
      throw new Error(`Coundn't found canvas element: ${canvasId}`);
    }

    return _canvas;
  }

  private getWebGLContext(): WebGL2RenderingContext {
    const _ctx = this.canvas.getContext("webgl2");
    if (_ctx == null) {
      throw new Error("Browser can't use WebGL2.");
    }

    return _ctx;
  }

  private setupCanvasSize(): void {
    const width = this.canvas.getAttribute("width");
    const height = this.canvas.getAttribute("height");

    if (width && height) {
      this.canvas.width = parseInt(width, 10);
      this.canvas.height = parseInt(height, 10);
    }
  }
}
