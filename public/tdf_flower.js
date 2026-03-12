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

        this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 1000);
        this.camera.position.set(0, 2, 12);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        container.appendChild(this.renderer.domElement);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), (params.bloomStrength ?? 50) / 100, 1, 0.1);
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
        const dpr = Math.min(window.devicePixelRatio, 2);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(dpr);
        this.composer.setSize(w, h);
        this.bloomPass.resolution.set(w, h);
    }

    _onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    update(params, isStatic) {
        this.isStatic = isStatic;
        this.bloomPass.strength = (params.bloomStrength ?? 50) / 100;
        this.renderer.setClearColor(params.backgroundColor || 0x000000, 0);
        this.flower.updateParams(params);
        this.flower.setScale((params.flowerScale || 100) / 100);
        if (this.isStatic) this.renderFrame(0, new THREE.Vector3(0, 0, 0));
    }

    renderFrame(t, hit) {
        this.flower.animate(t, hit);
        const orbitRadius = 12;
        this.camera.position.x = Math.sin(t * 0.12) * orbitRadius * 0.15;
        this.camera.position.z = orbitRadius;
        this.camera.position.y = 3 + Math.sin(t * 0.08) * 0.3;
        this.camera.lookAt(0, 1, 0);
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
        _define_property(this, "root", new THREE.Group());
        _define_property(this, "petals", []);
        _define_property(this, "stamen", void 0);
        _define_property(this, "stemMesh", void 0);
        _define_property(this, "scene", scene);
        _define_property(this, "headGroup", new THREE.Group());
        _define_property(this, "currentPetalCount", 8);

        scene.add(this.root);
        this.root.add(this.headGroup);

        const stemCurvePoints = [
            new THREE.Vector3(0, -6.5, 0),
            new THREE.Vector3(0.1, -5, 0.05),
            new THREE.Vector3(-0.05, -3.5, -0.03),
            new THREE.Vector3(0.08, -1.5, 0.02),
            new THREE.Vector3(0, 0.2, 0)
        ];
        this.stemCurve = new THREE.CatmullRomCurve3(stemCurvePoints);
        
        const stemGeo = new THREE.TubeGeometry(this.stemCurve, 64, 0.06, 8, false);
        const stemMat = new THREE.MeshBasicMaterial({ color: params.stemColor || "#1E1E1E", transparent: true, opacity: 0.5 });
        this.stemMesh = new THREE.Mesh(stemGeo, stemMat);
        this.root.add(this.stemMesh);

        this.stamen = new StamenCluster(this.headGroup, params.stamenColor || params.innerGlowColor);
        this.buildPetals(params);
        this.updateParams(params);
    }

    buildPetals(params) {
        this.petals.forEach(p => p.dispose());
        this.petals = [];
        const layers = 3;
        const perLayer = params.petalCount || 8;
        for (let layer = 0; layer < layers; layer++) {
            const countInLayer = perLayer - layer;
            for (let i = 0; i < countInLayer; i++) {
                const petal = new PetalUnit(this.headGroup, (i / countInLayer) * Math.PI * 2, 0.5, 0.8, layer, params);
                this.petals.push(petal);
            }
        }
    }

    animate(time, hit) {
        this.petals.forEach(p => p.animate(time, hit));
        this.stamen.animate(time);
        this.root.rotation.z = Math.sin(time * 0.4) * 0.05;
    }

    updateParams(params) {
        this.petals.forEach(p => p.updateProps(params));
        this.stamen.updateColor(params.stamenColor || params.innerGlowColor);
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
    constructor(parent, yaw, tilt, scale, layer, params) {
        this.pivot = new THREE.Group();
        this.pivot.rotation.y = yaw;
        this.pivot.rotation.x = -tilt;
        parent.add(this.pivot);

        const geo = new THREE.PlaneGeometry(1 * scale, 3.5 * scale, 12, 24);
        geo.translate(0, 1.75 * scale, 0);
        
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(params.petalColor) },
                uInnerColor: { value: new THREE.Color(params.innerGlowColor) },
                uTime: { value: 0 },
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

    animate(time, hit) {
        this.material.uniforms.uTime.value = time;
    }

    updateProps(params) {
        this.material.uniforms.uColor.value.set(params.petalColor);
        this.material.uniforms.uInnerColor.value.set(params.innerGlowColor);
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.material.dispose();
        this.pivot.parent?.remove(this.pivot);
    }
}

class StamenCluster {
    constructor(parent, color) {
        this.group = new THREE.Group();
        parent.add(this.group);
        this.fibers = [];
        const geo = new THREE.CapsuleGeometry(0.01, 0.5, 4, 8);
        for (let i = 0; i < 50; i++) {
            const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
            const m = new THREE.Mesh(geo, mat);
            const r = Math.sqrt(Math.random()) * 0.3;
            const a = Math.random() * Math.PI * 2;
            m.position.set(Math.cos(a) * r, Math.random() * 0.2, Math.sin(a) * r);
            this.fibers.push(m);
            this.group.add(m);
        }
    }
    animate(time) {
        this.group.rotation.y = time * 0.2;
    }
    updateColor(color) {
        this.fibers.forEach(f => f.material.color.set(color));
    }
    dispose() {
        this.fibers[0]?.geometry.dispose();
        this.fibers.forEach(f => f.material.dispose());
        this.group.parent?.remove(this.group);
    }
}

const PETAL_VERT = `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += pow(vUv.y, 2.0) * 0.5;
        pos.x += sin(uTime + pos.y) * 0.1 * vUv.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const PETAL_FRAG = `
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform vec3 uInnerColor;
    void main() {
        float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
        float alpha = vUv.y * edge;
        vec3 col = mix(uInnerColor, uColor, vUv.y);
        gl_FragColor = vec4(col, alpha * 0.8);
    }
`;

addPropertyControls(TDF_InteractiveFlower, {
    petalColor: { type: ControlType.Color, defaultValue: "#FF4D00" },
    innerGlowColor: { type: ControlType.Color, defaultValue: "#FF6A1A" },
    bloomStrength: { type: ControlType.Number, defaultValue: 50 }
});
