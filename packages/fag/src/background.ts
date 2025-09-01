export interface Color {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number;
}

export interface Background {
  width?: number;
  height?: number;
  color: Color;
}

export class BackgroundManager {
  private ctx: WebGL2RenderingContext;
  private background: Background;

  constructor(ctx: WebGL2RenderingContext, background: Background = { color: {} }) {
      this.ctx = ctx;
      this.background = background;
  }

  setBackground(background?: Background) {
    // Background size
    this.ctx.viewport(
      0,
      0,
      background?.width || this.background.width ||  this.ctx.canvas.width,
      background?.height || this.background.height || this.ctx.canvas.height,
    );

    // Background color
    this.ctx.clearColor(
      background?.color.red || this.background.color.red || 0,
      background?.color.green || this.background.color.green || 0,
      background?.color.blue || this.background.color.blue || 0,
      background?.color.alpha || this.background.color.alpha || 1,
    );

    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
  }
}
