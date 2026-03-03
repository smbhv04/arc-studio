import { useRef, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import Button from '../components/Button';

/* ── Cursor tracker (lives inside Canvas) ── */
const CursorTracker = ({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    mouseRef.current.x = pointer.x * (viewport.width / 2);
    mouseRef.current.y = pointer.y * (viewport.height / 2);
  });

  return null;
};

/* ── Responsive sphere position — offset right on desktop, centred on mobile ── */
const ResponsiveSphere = ({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const { viewport } = useThree();

  // On wide viewports push sphere to the right 30% of viewport width
  // On narrow viewports (mobile), centre it
  const isMobile = viewport.width < 8; // ~768px at default camera
  const xOffset = isMobile ? 0 : viewport.width * 0.28;
  const yOffset = isMobile ? viewport.height * 0.15 : 0;
  const scale = isMobile ? 0.65 : 1;

  return (
    <group position={[xOffset, yOffset, 0]} scale={scale}>
      <MorphSphere mouseRef={mouseRef} />
    </group>
  );
};

/* ── 3D Morphing Sphere ── */
const MorphSphere = ({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const smoothMouse = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color('#FF4D00') },
      uColor2: { value: new THREE.Color('#1A1A18') },
      uColor3: { value: new THREE.Color('#F2F0ED') },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vNormal;

    // Simplex 3D Noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 1.0/7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normal;

      // Base layered noise displacement
      float noise1 = snoise(position * 0.8 + uTime * 0.15) * 0.22;
      float noise2 = snoise(position * 1.6 + uTime * 0.25) * 0.10;
      float noise3 = snoise(position * 3.2 + uTime * 0.1) * 0.04;

      float displacement = noise1 + noise2 + noise3;

      // Mouse proximity: increase displacement on the side facing the cursor
      vec3 mouseDir = normalize(vec3(uMouse, 0.0));
      float mouseDot = dot(normal, mouseDir);
      float mouseInfluence = smoothstep(-0.2, 1.0, mouseDot) * length(uMouse) * 0.15;
      displacement += mouseInfluence;

      displacement *= (1.0 + uHover * 0.3);
      vDisplacement = displacement;

      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vDisplacement;
    varying vec3 vNormal;

    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);

      vec3 color = mix(uColor2, uColor1, vDisplacement * 1.8 + 0.3);
      color = mix(color, uColor3, fresnel * 0.6);

      // Subtle mouse-direction tint
      vec3 mouseDir = normalize(vec3(uMouse, 0.5));
      float mouseFacing = max(dot(vNormal, mouseDir), 0.0);
      color = mix(color, uColor1, mouseFacing * 0.12 * uHover);

      float alpha = 0.88 + fresnel * 0.12;

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const lerpFactor = 0.06;
    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * lerpFactor;
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * lerpFactor;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uMouse.value.set(
        smoothMouse.current.x,
        smoothMouse.current.y
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.04 + smoothMouse.current.x * 0.15;
      meshRef.current.rotation.x =
        Math.sin(t * 0.03) * 0.08 + smoothMouse.current.y * -0.12;
    }
  });

  const handlePointerEnter = useCallback(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current.uniforms.uHover, {
        value: 1,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (materialRef.current) {
      gsap.to(materialRef.current.uniforms.uHover, {
        value: 0,
        duration: 1.2,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <icosahedronGeometry args={[1.5, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/* ── Hero Section ── */
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.1 },
          '-=0.4'
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          canvasWrapRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
          '-=1.0'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center"
      style={{ paddingTop: 'clamp(6rem, 12vh, 10rem)', paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}
    >
      {/* ── Full-section Canvas layer — NO container, NO clipping ── */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 2]}
          style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-3, -3, 2]} intensity={0.3} color="#FF4D00" />
          <CursorTracker mouseRef={mouseRef} />
          <ResponsiveSphere mouseRef={mouseRef} />
        </Canvas>
      </div>

      {/* ── Text content layer — sits on top of the canvas ── */}
      <div className="grid-editorial w-full items-center relative z-10">
        {/* LEFT — 7 columns: Content */}
        <div className="grid-7 flex flex-col items-start py-8 md:py-12 lg:py-0 order-2 md:order-1">
          {/* Status indicator */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-3 px-4 py-2 bg-primary/[0.03] border border-primary/[0.06] rounded-full mb-8 md:mb-10"
            style={{ opacity: 0 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-[11px] font-medium text-primary/60 uppercase tracking-[0.1em]">
              Accepting 1 new project
            </span>
          </div>

          {/* Display Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-primary leading-[1.02] tracking-[-0.03em] max-w-[680px]"
            style={{ opacity: 0 }}
          >
            We <em className="italic">design</em> &amp;{' '}
            <em className="italic">build</em> digital
            experiences that{' '}
            <span className="text-accent">convert</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subRef}
            className="mt-6 md:mt-8 text-[clamp(0.9375rem,1vw+0.5rem,1.125rem)] leading-[1.75] text-text-secondary max-w-[460px]"
            style={{ opacity: 0 }}
          >
            High-performance websites and web applications for{' '}
            <strong className="font-semibold text-primary">growing brands</strong> and{' '}
            <strong className="font-semibold text-primary">early-stage products</strong> that need clarity, speed, and business results.
          </p>

          {/* CTA Group */}
          <div ref={ctaRef} className="mt-8 md:mt-10 flex flex-col gap-4 items-start" style={{ opacity: 0 }}>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button size="lg" variant="primary">
                Get my free strategy call
              </Button>
              <Button size="lg" variant="outline">
                See how we build
              </Button>
            </div>
            <span className="text-[11px] text-text-muted uppercase tracking-[0.12em] font-medium">
              No commitment · 15-minute call
            </span>
          </div>
        </div>

        {/* RIGHT — 5 columns: empty spacer for layout (sphere is in the canvas layer) */}
        <div className="grid-5 order-1 md:order-2 min-h-[300px] sm:min-h-[380px] md:min-h-[500px]" />
      </div>

      {/* Subtle background radial */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_25%_50%,rgba(242,240,237,0.6),transparent)]" />
    </section>
  );
};

export default Hero;
