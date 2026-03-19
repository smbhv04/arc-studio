function _define_property(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

// PATCH: Use the mock provided by the parent window/scope
const jsxRuntime = window.__REACT_JSX_RUNTIME__;
const _jsx = jsxRuntime.jsx || jsxRuntime._jsx;
const { addPropertyControls, ControlType, useIsStaticRenderer } = window.__FRAMER_MOCK__;
const { useEffect, useRef, useMemo } = window.__REACT__;
const THREE = window.__THREE__;
const { EffectComposer, RenderPass, UnrealBloomPass } = window.__THREE_POSTPROCESSING__;

export default function TDF_InteractiveFlower(props){
    const {petalColor,innerGlowColor,stamenColor,stemColor,backgroundColor,bloomStrength,petalCount,flowerScale,petalLength,stemLength,style} = props;
    const containerRef = useRef(null);
    const engineRef = useRef(null);
    const instanceId = useMemo(() => `tdf-${Math.random().toString(36).substr(2,9)}`, []);
    const isStatic = useIsStaticRenderer();

    useEffect(() => {
        if(!containerRef.current) return;
        const engine = new FlowerEngine(containerRef.current, props);
        engineRef.current = engine;
        engine.start(isStatic);
        return () => engine.dispose();
    }, []);

    useEffect(() => {
        if(engineRef.current) engineRef.current.update(props, isStatic);
    }, [petalColor, innerGlowColor, stamenColor, stemColor, backgroundColor, bloomStrength, petalCount, flowerScale, petalLength, stemLength, isStatic]);

    return _jsx("div", {
        ref: containerRef,
        id: instanceId,
        style: { ...style, width: "100%", height: "100%", background: backgroundColor, overflow: "hidden", touchAction: "none" }
    });
}

class FlowerEngine {
    constructor(container, params) {
        _define_property(this, "scene", new THREE.Scene());
        _define_property(this, "camera", void 0);
        _define_property(this, "renderer", void 0);
        _define_property(this, "composer", void 0);
        _define_property(this, "bloomPass", void 0);
        _define_property(this, "flower", void 0);
        _define_property(this, "container", container);
        _define_property(this, "clock", new THREE.Clock());
        _define_property(this, "rafId", 0);
        _define_property(this, "mouse", new THREE.Vector2(-99, -99));
        _define_property(this, "raycaster", new THREE.Raycaster());
        _define_property(this, "resizeObserver", void 0);
        _define_property(this, "isStatic", false);

        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
        this.camera.position.set(0, 2, 8);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        THREE.ColorManagement.enabled = true;
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.85; // Lowered further to prevent blowout
        container.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        // Calibrated bloom for sophisticated glow: even lower strength
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.25, 0.5, 0.9); 
        this.composer.addPass(this.bloomPass);

        this.flower = new FlowerGroup(this.scene, params);

        this._onResize = this._onResize.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this.resizeObserver = new ResizeObserver(() => this._onResize());
        this.resizeObserver.observe(container);
        container.addEventListener("mousemove", this._onMouseMove);
        
        setTimeout(() => this._onResize(), 100);
    }

    _onResize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (w === 0 || h === 0) return;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.composer.setSize(w, h);
        if (this.isStatic) this.renderFrame(this.clock.getElapsedTime(), new THREE.Vector3(0, 0, 0));
    }

    _onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    update(params, isStatic) {
        this.isStatic = isStatic;
        this.bloomPass.strength = (params.bloomStrength ?? 50) / 200;
        if (params.backgroundColor === "transparent") {
            this.renderer.setClearColor(0x000000, 0);
        } else {
            this.renderer.setClearColor(params.backgroundColor || 0x000000, 1);
        }
        this.flower.updateParams(params);
        this.flower.setScale((params.flowerScale || 100) / 100);
        if (this.isStatic) this.renderFrame(0, new THREE.Vector3(0, 0, 0));
    }

    renderFrame(t, hit) {
        this.flower.animate(t, hit);
        const orbitRadius = 9; // Slightly further back for better focus
        this.camera.position.x = Math.sin(t * 0.12) * orbitRadius * 0.15;
        this.camera.position.z = orbitRadius;
        this.camera.position.y = 1.2 + Math.sin(t * 0.08) * 0.25; 
        this.camera.lookAt(0, -0.2, 0); // Looking at the stamen/base
        this.composer.render();
    }

    start(isStatic) {
        this.isStatic = isStatic;
        if (this.isStatic) {
            this.renderFrame(0, new THREE.Vector3(0, 0, 0));
            return;
        }
        const tick = () => {
            const t = this.clock.getElapsedTime();
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const hit = new THREE.Vector3();
            this.raycaster.ray.intersectPlane(plane, hit);
            this.renderFrame(t, hit);
            this.rafId = requestAnimationFrame(tick);
        };
        this.rafId = requestAnimationFrame(tick);
    }

    dispose() {
        cancelAnimationFrame(this.rafId);
        this.resizeObserver.disconnect();
        this.container.removeEventListener("mousemove", this._onMouseMove);
        this.renderer.dispose();
        this.flower.dispose();
        if (this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
    }
}

class FlowerGroup {
    constructor(scene, params) {
        _define_property(this, "root", void 0);
        _define_property(this, "petals", []);
        _define_property(this, "stamen", void 0);
        _define_property(this, "stemMesh", void 0);
        _define_property(this, "stemCurvePoints", void 0);
        _define_property(this, "stemCurve", void 0);
        _define_property(this, "scene", void 0);
        _define_property(this, "headGroup", void 0);
        _define_property(this, "currentPetalCount", 8);

        this.scene = scene;
        this.currentPetalCount = params.petalCount || 8;
        this.root = new THREE.Group();
        scene.add(this.root);

        this.headGroup = new THREE.Group();
        this.root.add(this.headGroup);

        const stemColor = params.stemColor || "#1a1a1a"; // Darker, more organic
        this.stemCurvePoints = [
            new THREE.Vector3(0, -7.5, 0), // Base further down
            new THREE.Vector3(0.05, -5.5, 0.02),
            new THREE.Vector3(-0.03, -3.5, -0.01),
            new THREE.Vector3(0.04, -1.0, 0.02),
            new THREE.Vector3(0, 0.1, 0)
        ];
        this.stemCurve = new THREE.CatmullRomCurve3(this.stemCurvePoints);
        this.stemMesh = this.makeStem(stemColor);
        this.root.add(this.stemMesh);

        this.stamen = new StamenCluster(this.headGroup, "#FFD700"); // Yellow/Gold for stamen
        this.buildPetals(params);
        this.updateParams(params);
    }

    makeStem(color) {
        const geo = new THREE.TubeGeometry(this.stemCurve, 128, 0.06, 20, false);
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(color) },
                uTime: { value: 0 }
            },
            vertexShader: STEM_VERT,
            fragmentShader: STEM_FRAG,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        return new THREE.Mesh(geo, mat);
    }

    buildPetals(params) {
        this.petals.forEach(p => p.dispose());
        this.petals = [];
        const layers = 4;
        const perLayer = params.petalCount || 8;
        for (let layer = 0; layer < layers; layer++) {
            const countInLayer = perLayer - layer;
            const angleOffset = (layer * Math.PI) / perLayer;
            const tiltDeg = 25 + layer * 18;
            const tiltRad = (tiltDeg * Math.PI) / 180;
            const petalScale = 0.7 + layer * 0.25;
            for (let i = 0; i < countInLayer; i++) {
                const yawAngle = ((i / countInLayer) * Math.PI * 2) + angleOffset;
                const petal = new PetalUnit(this.headGroup, yawAngle, tiltRad, petalScale, layer, params);
                this.petals.push(petal);
            }
        }
    }

    animate(time, mouseWorld) {
        this.petals.forEach(p => p.animate(time, mouseWorld));
        this.stamen.animate(time);
        if (this.stemMesh.material instanceof THREE.ShaderMaterial) {
            this.stemMesh.material.uniforms.uTime.value = time;
        }
        this.root.rotation.z = Math.sin(time * 0.4) * 0.025;
        this.root.rotation.x = Math.cos(time * 0.3) * 0.015;
    }

    updateParams(params) {
        const newCount = params.petalCount || 8;
        if (newCount !== this.currentPetalCount) {
            this.currentPetalCount = newCount;
            this.buildPetals(params);
        }
        this.stamen.updateColor("#FFD700");
        this.petals.forEach(p => p.updateProps(params));

        const sLen = (params.stemLength ?? 100) / 100;
        this.stemMesh.scale.y = sLen;
        const totalHeight = 6.7;
        const newTipY = -6.5 + totalHeight * sLen;
        this.headGroup.position.set(0, newTipY, 0);

        if (this.stemMesh.material instanceof THREE.ShaderMaterial) {
            const sc = params.stemColor || "#1a1a1a";
            this.stemMesh.material.uniforms.uColor.value.set(sc);
        }
    }

    setScale(s) {
        this.root.scale.set(s, s, s);
    }

    dispose() {
        this.petals.forEach(p => p.dispose());
        this.stamen.dispose();
        this.scene.remove(this.root);
    }
}

class PetalUnit {
    constructor(parent, yawAngle, tiltRad, scale, layer, params) {
        _define_property(this, "mesh", void 0);
        _define_property(this, "pivot", void 0);
        _define_property(this, "material", void 0);
        _define_property(this, "phase", void 0);
        _define_property(this, "baseTilt", void 0);
        _define_property(this, "baseYaw", void 0);
        _define_property(this, "petalHeight", void 0);
        _define_property(this, "springTilt", 0);
        _define_property(this, "springTwist", 0);
        _define_property(this, "velTilt", 0);
        _define_property(this, "velTwist", 0);
        _define_property(this, "tipLocal", void 0);

        this.phase = Math.random() * Math.PI * 2;
        this.baseTilt = tiltRad;
        this.baseYaw = yawAngle;

        this.pivot = new THREE.Group();
        this.pivot.position.set(0, 0, 0);
        this.pivot.rotation.order = "YXZ";
        this.pivot.rotation.y = yawAngle;
        this.pivot.rotation.x = -tiltRad;
        parent.add(this.pivot);

        const petalWidth = 1 * scale;
        this.petalHeight = 3.5 * scale;
        const geo = new THREE.PlaneGeometry(petalWidth, this.petalHeight, 24, 48);
        geo.translate(0, this.petalHeight / 2, 0);
        this.tipLocal = new THREE.Vector3(0, this.petalHeight, 0);

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(params.petalColor) },
                uInnerColor: { value: new THREE.Color(params.innerGlowColor) },
                uTime: { value: 0 },
                uLayer: { value: layer },
                uSpring: { value: 0 }
            },
            vertexShader: PETAL_VERT,
            fragmentShader: PETAL_FRAG,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.mesh = new THREE.Mesh(geo, this.material);
        this.pivot.add(this.mesh);
    }

    animate(time, mouseWorld) {
        this.material.uniforms.uTime.value = time;

        const tipWorld = this.tipLocal.clone();
        this.mesh.localToWorld(tipWorld);

        const dx = tipWorld.x - mouseWorld.x;
        const dy = tipWorld.y - mouseWorld.y;
        const dz = tipWorld.z - mouseWorld.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const influence = Math.exp(-(dist * dist) / 12); // Increased radius from 6 to 12
        const pushX = dist > 0.01 ? dx / dist : 0;
        const pushY = dist > 0.01 ? dy / dist : 0;

        const maxPush = 0.4;
        const targetTilt = influence * pushY * maxPush;
        const targetTwist = influence * pushX * maxPush;

        const k = 0.085; // Momentum-based stiffness
        const damp = 0.88; 
        const influenceScale = 5.0; // Stronger influence for global feel

        this.velTilt += (targetTilt * influenceScale - this.springTilt) * k;
        this.velTilt *= damp;
        this.springTilt += this.velTilt;

        this.velTwist += (targetTwist * influenceScale - this.springTwist) * k;
        this.velTwist *= damp;
        this.springTwist += this.velTwist;

        const windSway = Math.sin(time * 0.7 + this.phase) * 0.04;
        this.pivot.rotation.x = -this.baseTilt + windSway + this.springTilt;
        this.pivot.rotation.z = this.springTwist;
        this.material.uniforms.uSpring.value = influence * 0.45;
    }

    updateProps(params) {
        this.material.uniforms.uColor.value.set(params.petalColor);
        this.material.uniforms.uInnerColor.value.set(params.innerGlowColor);
        const val = params.petalLength ?? 50;
        const L = 0.5 + val / 100;
        this.mesh.scale.y = L;
        this.tipLocal.set(0, this.petalHeight * L, 0);
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.material.dispose();
        this.pivot.parent?.remove(this.pivot);
    }
}

class StamenCluster {
    constructor(parent, color) {
        _define_property(this, "group", void 0);
        _define_property(this, "fibers", []);

        this.group = new THREE.Group();
        this.group.position.y = 0.1;
        parent.add(this.group);

        const count = 120; // Fewer, more deliberate fibers
        const geo = new THREE.CapsuleGeometry(0.005, 0.8, 4, 8);

        for (let i = 0; i < count; i++) {
            const mat = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.25, 
                blending: THREE.AdditiveBlending
            });
            const m = new THREE.Mesh(geo, mat);
            const a = i * 2.39996; // golden angle
            const r = Math.sqrt(i / count) * 0.35;
            m.position.set(Math.cos(a) * r, Math.random() * 0.25, Math.sin(a) * r);
            m.rotation.set((Math.random() - 0.5) * 0.3, a, (Math.random() - 0.5) * 0.3);
            this.fibers.push(m);
            this.group.add(m);
        }
    }

    animate(time) {
        this.fibers.forEach((f, i) => {
            f.scale.y = 1 + Math.sin(time * 4 + i * 0.08) * 0.35;
        });
    }

    updateColor(color) {
        this.fibers.forEach(f => f.material.color.set(color));
    }

    dispose() {
        if (this.fibers.length > 0) {
            this.fibers[0].geometry.dispose();
            this.fibers.forEach(f => f.material.dispose());
        }
        this.group.parent?.remove(this.group);
    }
}

const PETAL_VERT = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform float uTime;
    uniform float uLayer;
    uniform float uSpring;

    void main() {
        vUv = uv;
        vec3 pos = position;

        float curvature = 1.2 - float(uLayer) * 0.15;
        pos.z += pos.x * pos.x * curvature;
        pos.z += pow(vUv.y, 3.0) * 0.4;
        pos.z += uSpring * smoothstep(0.1, 0.9, vUv.y);
        pos.x += sin(uTime * 1.2 + pos.y * 2.0) * 0.02 * vUv.y;

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const PETAL_FRAG = `
    uniform vec3 uColor;
    uniform vec3 uInnerColor;
    uniform float uTime;
    uniform float uLayer;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;

    float petalSDF(vec2 p) {
        p.x = abs(p.x);
        float d1 = length(p - vec2(0.5, 0.45)) - 0.75; // Adjusted for more rounded tip
        float d2 = length(p - vec2(-0.5, 0.45)) - 0.75;
        return max(d1, d2);
    }

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
            mix(hash(i), hash(i + vec2(1,0)), u.x),
            mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
            u.y
        );
    }
    float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        float d = petalSDF(vUv - vec2(0.5, 0.0));
        if (d > 0.0) discard;

        vec2 fromBase = vUv - vec2(0.5, 0.0);
        float r = length(fromBase);
        float theta = atan(fromBase.y, fromBase.x);
        vec2 polar = vec2(theta * 8.0, r * 6.0);
        float vein = fbm(polar + 0.5 * fbm(polar * 1.5));
        vein = pow(vein, 2.0) * 0.6;

        float dotNV = dot(vNormal, vViewDir);
        float fresnel = pow(1.0 - abs(dotNV), 2.5);
        float xray = (1.0 - abs(dotNV)) * 1.2;

        // Blending logic for organic translucency: Stronger Fresnel
        vec3 col = mix(uInnerColor * 1.5, uColor, pow(vUv.y, 0.8)); 
        col += vein * uInnerColor * 0.4;
        col *= (fresnel * 4.5 + xray * 0.4 + 0.1); 

        float alpha = (fresnel * 2.2 + xray * 0.3);
        alpha *= smoothstep(0.0, -0.05, d);
        alpha *= smoothstep(0.0, 0.1, vUv.y);
        alpha = clamp(alpha, 0.0, 0.95);

        gl_FragColor = vec4(col, alpha);
    }
`;

const STEM_VERT = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying float vY;
    uniform float uTime;

    void main() {
        vUv = uv;
        vec3 pos = position;

        float sway = sin(uTime * 0.8 + pos.y * 0.5) * 0.15;
        float swayZ = cos(uTime * 0.6 + pos.y * 0.4) * 0.1;

        float influence = smoothstep(-6.5, 0.0, pos.y);
        pos.x += sway * influence;
        pos.z += swayZ * influence;

        vY = pos.y;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(cameraPosition - worldPos.xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const STEM_FRAG = `
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying float vY;

    void main() {
        float dotNV = dot(vNormal, vViewDir);
        float fresnel = pow(1.0 - abs(dotNV), 2.0);
        float light = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))) * 0.5 + 0.5;
        float fade = smoothstep(0.2, -0.3, vY);
        vec3 col = uColor * (light * 1.2 + fresnel * 0.6);
        float alpha = (0.7 + fresnel * 0.3) * fade;
        gl_FragColor = vec4(col, alpha);
    }
`;

addPropertyControls(TDF_InteractiveFlower, {
    petalColor: { type: ControlType.Color, defaultValue: "#3a64ff" },
    innerGlowColor: { type: ControlType.Color, defaultValue: "#ff82f3" },
    bloomStrength: { type: ControlType.Number, defaultValue: 50 }
});
