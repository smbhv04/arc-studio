import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- SHADERS ---
// Key trick: bypass all camera/projection matrices in vertex shader
// so the plane maps EXACTLY to NDC and always fills the screen.
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;      // normalized [0..1]
uniform vec2 uResolution; // viewport in pixels
uniform vec3 uColor1;     // Amber/Orange
uniform vec3 uColor2;     // Deep Brown/Red
uniform vec3 uColor3;     // Black

// --- Simplex 2D noise ---
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// -------------------------

void main() {
  vec2 uv = vUv;

  // Enhance aspect ratio slightly to widen the noise (so horizontal doesn't feel squished)
  vec2 aspectUV = vec2(uv.x * (uResolution.x / uResolution.y), uv.y);

  // Slow organic noise layers
  float n1 = snoise(uv * 1.5  + uTime * 0.08); // Relaxed noise scale to make background bigger
  float n2 = snoise(uv * 2.0  - uTime * 0.06 + n1 * 0.4);
  float n3 = snoise(uv * 1.0  + uTime * 0.04 + n2 * 0.3);
  
  float n4 = snoise(uv * 1.5 + uTime * 0.08);

  // Mix colors smoothly through layers
  float mix1 = smoothstep(-0.4, 0.8, n2);
  float mix2 = smoothstep(-0.2, 1.0, n3 + n4 * 0.5);

  vec3 col = mix(uColor3, uColor2, mix1);
  col = mix(col, uColor1, mix2 * 0.9);

  // Vignette: darken edges to keep focus on center, but broadened to cover full background
  float vignette = 1.0 - smoothstep(0.2, 1.5, distance(uv, vec2(0.5)) * 1.2);
  col *= vignette;

  // Removed bright cursor dot
  // col += uColor1 * mouseStrength * 0.2;

  gl_FragColor = vec4(col, 1.0);
}
`;

// --- Inner Mesh Component ---
const ShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse:      { value: new THREE.Vector2(0.5, 0.5) },
      uColor1:     { value: new THREE.Color("#FF3300") }, // Hot sunset red-orange
      uColor2:     { value: new THREE.Color("#FF8C00") }, // Bright orange glow
      uColor3:     { value: new THREE.Color("#3D0C00") }, // Deep mahogany bounding the black
    }),
    []
  );

  useFrame((state) => {
    const mat = meshRef.current?.material as THREE.ShaderMaterial;
    if (!mat) return;
    
    mat.uniforms.uTime.value = state.clock.getElapsedTime();
    mat.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      {/* 2x2 plane in NDC covers exactly the full screen with our vertex bypass */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

// --- Public Component ---
interface AnimatedGradientBackgroundProps {
  containerClassName?: string;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  containerClassName = "",
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
      style={{ width: "100%", height: "100%" }}
    >
      <Canvas
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        gl={{
          antialias: false,
          stencil: false,
          depth: false,
          powerPreference: "high-performance",
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ShaderPlane />
      </Canvas>

      {/* Grain overlay for editorial texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ opacity: 0.04, mixBlendMode: "overlay" }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <filter id="shaderGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#shaderGrain)" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedGradientBackground;
