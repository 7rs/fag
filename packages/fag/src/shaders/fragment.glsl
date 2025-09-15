#version 300 es
precision highp float;

#define METABALL_COUNT 0
#define STRENGTH_MIN_RANGE 0
#define STRENGTH_MAX_RANGE 0

in vec2 vTexCoord;

uniform vec2 uMetaballPositions[METABALL_COUNT];
uniform float uMetaballStrengths[METABALL_COUNT];
uniform vec3 uMetaballColors[METABALL_COUNT];
uniform int uMetaballCount;
uniform float uTime;

out vec4 fragColor;

float getStrength(float baseStrength, float minRange, float maxRange, float time, float id) {
    float normalizedSin = (sin(time * 1.5 + id) + 1.0) * 0.5; // 0.0 ~ 1.0
    float scaleFactor = minRange + normalizedSin * (maxRange - minRange);
    return baseStrength * scaleFactor;
}

void main() {
    vec2 uv = vTexCoord * 2.0 - 1.0;

    float metaballValue = 0.0;
    vec3 blendedColor = vec3(0.0);
    float totalWeight = 0.0;

    for (int i = 0; i < METABALL_COUNT; i++) {
        if (i >= uMetaballCount) {
            break;
        };

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
        float animatedStrength = getStrength(baseStrength, STRENGTH_MIN_RANGE, STRENGTH_MAX_RANGE, uTime, id);

        float dist = length(uv - animatedPos);
        if (dist > 0.0) {
            float influence = animatedStrength / (dist * dist + 0.1);

            metaballValue += influence;
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
