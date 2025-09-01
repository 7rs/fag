#version 300 es
precision highp float;

in vec2 aPosition;
in vec2 aTexCoord;

uniform vec2 uQuadPosition;
uniform vec2 uQuadSize;

out vec2 vTexCoord;

void main() {
    vec2 position = aPosition.xy * uQuadSize + uQuadPosition;
    gl_Position = vec4(position, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
