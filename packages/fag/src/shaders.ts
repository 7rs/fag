export interface Shaders {
  readonly vertexShader: string;
  readonly fragmentShader: string;
}

export class ShaderManager {
  private ctx: WebGL2RenderingContext;
  private shaders: Shaders;

  shaderProgram: WebGLProgram;

  constructor(ctx: WebGL2RenderingContext, shaders: Shaders) {
    this.ctx = ctx;
    this.shaders = shaders;
    this.shaderProgram = this.createShaderProgram();
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.ctx.createShader(type);
    if (shader == null) {
      throw new Error("Failed to create shader");
    }

    this.ctx.shaderSource(shader, source);
    this.ctx.compileShader(shader);

    if (!this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
      const error = this.ctx.getShaderInfoLog(shader);

      this.ctx.deleteShader(shader);

      throw new Error(`Shader compilation error: ${error}`);
    }

    return shader;
  }

  private createShaderProgram(): WebGLProgram {
    const vertexShader = this.createShader(this.ctx.VERTEX_SHADER, this.shaders.vertexShader);
    const fragmentShader = this.createShader(this.ctx.FRAGMENT_SHADER, this.shaders.fragmentShader);

    const program = this.ctx.createProgram();
    if (program == null) {
      throw new Error("Failed to create shader program");
    }

    this.ctx.attachShader(program, vertexShader);
    this.ctx.attachShader(program, fragmentShader);
    this.ctx.linkProgram(program);

    if (!this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)) {
      const error = this.ctx.getProgramInfoLog(program);

      this.ctx.deleteProgram(program);

      throw new Error(`Shader program link error: ${error}`);
    }

    this.ctx.deleteShader(vertexShader);
    this.ctx.deleteShader(fragmentShader);

    return program;
  }
}
