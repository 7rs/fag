import type { FrameConfig, MetaballConfig } from "./generator.js";
import { BackgroundManager, type Background } from "./background.js";

interface ShaderLocations {
  quadPosition: WebGLUniformLocation;
  quadSize: WebGLUniformLocation;
  metaballPositions: WebGLUniformLocation;
  metaballStrengths: WebGLUniformLocation;
  metaballColors: WebGLUniformLocation;
  metaballCount: WebGLUniformLocation;
  time: WebGLUniformLocation;
}

export class Renderer {
  private ctx: WebGL2RenderingContext;
  private background: BackgroundManager;
  private quadVertexBuffer: WebGLBuffer;
  private quadIndexBuffer: WebGLBuffer;

  constructor(ctx: WebGL2RenderingContext, background?: Background) {
    this.ctx = ctx;
    this.background = new BackgroundManager(this.ctx, background);
    this.quadVertexBuffer = this.createVertexBuffer();
    this.quadIndexBuffer = this.createIndexBuffer();
  }

  render(shaderProgram: WebGLProgram, frames: FrameConfig[], time: number = 0): void {
    this.background.setBackground();
    this.setupBlending();
    this.bindShader(shaderProgram);
    const locations = this.setupAttributes(shaderProgram);
    this.renderFrames(frames, time, locations);
  }

  private setupBlending(): void {
    this.ctx.enable(this.ctx.BLEND);
    this.ctx.blendFunc(this.ctx.SRC_ALPHA, this.ctx.ONE_MINUS_SRC_ALPHA);
  }

  private bindShader(shaderProgram: WebGLProgram): void {
    this.ctx.useProgram(shaderProgram);
    this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, this.quadVertexBuffer);
    this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, this.quadIndexBuffer);
  }

  private setupAttributes(shaderProgram: WebGLProgram): ShaderLocations {
    const positionLocation = this.ctx.getAttribLocation(shaderProgram, "aPosition");
    const texCoordLocation = this.ctx.getAttribLocation(shaderProgram, "aTexCoord");

    this.ctx.enableVertexAttribArray(positionLocation);
    this.ctx.vertexAttribPointer(positionLocation, 2, this.ctx.FLOAT, false, 16, 0);

    this.ctx.enableVertexAttribArray(texCoordLocation);
    this.ctx.vertexAttribPointer(texCoordLocation, 2, this.ctx.FLOAT, false, 16, 8);

    return {
      quadPosition: this.getUniformLocation(shaderProgram, "uQuadPosition"),
      quadSize: this.getUniformLocation(shaderProgram, "uQuadSize"),
      metaballPositions: this.getUniformLocation(shaderProgram, "uMetaballPositions"),
      metaballStrengths: this.getUniformLocation(shaderProgram, "uMetaballStrengths"),
      metaballColors: this.getUniformLocation(shaderProgram, "uMetaballColors"),
      metaballCount: this.getUniformLocation(shaderProgram, "uMetaballCount"),
      time: this.getUniformLocation(shaderProgram, "uTime"),
    };
  }

  private getUniformLocation(shaderProgram: WebGLProgram, name: string): WebGLUniformLocation {
    const result = this.ctx.getUniformLocation(shaderProgram, name);
    if (result == null) {
      throw new Error(`Failed get: ${name}`);
    }

    return result;
  }

  private renderFrames(frames: FrameConfig[], time: number, locations: ShaderLocations): void {
    this.ctx.uniform1f(locations.time, time);

    for (const frame of frames) {
      this.renderSingleFrame(frame, locations);
    }
  }

  private renderSingleFrame(frame: FrameConfig, locations: ShaderLocations): void {
    const position = [frame.x, frame.y];
    const size = [frame.width, frame.height];

    this.ctx.uniform2fv(locations.quadPosition, position);
    this.ctx.uniform2fv(locations.quadSize, size);

    const metaballData = this.createMetaballData(frame.metaballs);

    this.ctx.uniform2fv(locations.metaballPositions, metaballData.positions);
    this.ctx.uniform1fv(locations.metaballStrengths, metaballData.strengths);
    this.ctx.uniform3fv(locations.metaballColors, metaballData.colors);
    this.ctx.uniform1i(locations.metaballCount, metaballData.count);

    this.ctx.drawElements(this.ctx.TRIANGLES, 6, this.ctx.UNSIGNED_SHORT, 0);
  }

  private createMetaballData(metaballs: MetaballConfig[]) {
    const positions: number[] = [];
    const strengths: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < Math.min(metaballs.length, 8); i++) {
      const metaball = metaballs[i];
      if (metaball) {
        positions.push(metaball.x, metaball.y);
        strengths.push(metaball.strength);
        colors.push(metaball.color[0], metaball.color[1], metaball.color[2]);
      }
    }

    // Pad arrays to size 8
    while (positions.length < 16) positions.push(0.0);
    while (strengths.length < 8) strengths.push(0.0);
    while (colors.length < 24) colors.push(1.0);

    return {
      positions,
      strengths,
      colors,
      count: Math.min(metaballs.length, 8),
    };
  }

  private createBudder(target: number, srcData: AllowSharedBufferSource, usage: GLenum): WebGLBuffer {
    const buffer = this.ctx.createBuffer();
    if (buffer == null) {
      throw new Error("Failed to create vertex buffer");
    }

    this.ctx.bindBuffer(target, buffer);
    this.ctx.bufferData(target, srcData, usage);

    return buffer;
  }

  private createVertexBuffer(): WebGLBuffer {
    const quadVertices = new Float32Array([
      -1.0, -1.0, 0.0, 0.0, 1.0, -1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 1.0,
    ]);

    return this.createBudder(this.ctx.ARRAY_BUFFER, quadVertices, this.ctx.STATIC_DRAW);
  }

  private createIndexBuffer(): WebGLBuffer {
    return this.createBudder(this.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), this.ctx.STATIC_DRAW);
  }
}
