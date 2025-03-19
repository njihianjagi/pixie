uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  // Shimmer effect
  float shimmer = sin(vPosition.y * 10.0 + time) * 0.5 + 0.5;
  
  // Radial glow
  float radius = length(vUv - 0.5);
  float glow = 1.0 - smoothstep(0.0, 0.5, radius);
  
  // Combine effects
  vec3 color = mix(
    vec3(1.0, 0.7, 0.9), // Pink
    vec3(0.9, 0.9, 1.0), // White
    shimmer
  );
  
  gl_FragColor = vec4(color, glow * 0.8);
}