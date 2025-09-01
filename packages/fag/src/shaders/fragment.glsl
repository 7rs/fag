#version 300 es
precision highp float;

in vec2 vTexCoord;
uniform vec2 uMetaballPositions[8];
uniform float uMetaballStrengths[8];
uniform vec3 uMetaballColors[8];
uniform int uMetaballCount;
uniform float uTime;

out vec4 fragColor;

void main() {
    vec2 uv = vTexCoord * 2.0 - 1.0;
    
    float metaballValue = 0.0;
    vec3 blendedColor = vec3(0.0);
    float totalWeight = 0.0;
    
    for (int i = 0; i < 8; i++) {
        if (i >= uMetaballCount) break;
        
        vec2 basePos = uMetaballPositions[i];
        float baseStrength = uMetaballStrengths[i];
        vec3 ballColor = uMetaballColors[i];
        
        float id = float(i);
        // Animate position with circular motion
        vec2 animatedPos = basePos + vec2(
            sin(uTime * 0.8 + id * 2.0) * 0.2,
            cos(uTime * 0.6 + id * 1.5) * 0.15
        );
        
        // Animate strength with pulse effect
        float animatedStrength = baseStrength * (1.0 + sin(uTime * 1.5 + id) * 0.3);
        
        float dist = length(uv - animatedPos);
        if (dist > 0.0) {
            float influence = animatedStrength / (dist * dist);
            metaballValue += influence;
            
            // Blend colors weighted by influence
            blendedColor += ballColor * influence;
            totalWeight += influence;
        }
    }
    
    // Normalize color
    if (totalWeight > 0.0) {
        blendedColor /= totalWeight;
    }
    
    float threshold = 1.0;
    float alpha = smoothstep(threshold - 0.1, threshold + 0.1, metaballValue);
    
    fragColor = vec4(blendedColor, alpha);
}
