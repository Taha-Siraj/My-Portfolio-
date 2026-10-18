import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Section palettes: [colorA, colorB] morphed as you scroll */
const PALETTES = [
  [0x22d3ee, 0x8b5cf6], // hero
  [0x8b5cf6, 0xff00ff], // about
  [0xff00ff, 0xff5fa2], // skills
  [0x22d3ee, 0x3b82f6], // experience
  [0xfbbf24, 0xff00ff], // projects
  [0x34d399, 0x22d3ee], // services
  [0x8b5cf6, 0x22d3ee], // education
  [0xff00ff, 0x22d3ee], // contact
];

const SNOISE = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
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
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
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
`;

const BLOB_VERT = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
uniform float uMorph;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
${SNOISE}
void main(){
  float n = snoise(position * 1.15 + vec3(0.0, uTime * 0.35, uTime * 0.15));
  float n2 = snoise(position * 3.2 - vec3(uTime * 0.25)) * 0.35;
  float disp = (n + n2 * (0.5 + uMorph)) * uIntensity;
  vec3 p = position + normal * disp;
  vDisp = disp;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const BLOB_FRAG = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisp;
void main(){
  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.2);
  float bands = 0.5 + 0.5 * sin(vDisp * 6.0 + uTime * 1.5);
  vec3 col = mix(uColorA, uColorB, clamp(vDisp * 0.5 + 0.5 + bands * 0.25, 0.0, 1.0));
  col += fres * vec3(1.0) * 0.55;
  gl_FragColor = vec4(col, 0.82 + fres * 0.18);
}
`;

const STAR_VERT = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float tw = 0.6 + 0.4 * sin(uTime * 1.8 + aPhase);
  float dist = clamp(1.0 - (-mv.z / 46.0), 0.15, 1.0);
  vAlpha = tw * dist;
  gl_PointSize = aSize * uPixelRatio * tw * (230.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const STAR_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float a = smoothstep(0.5, 0.06, d);
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

export default function WebGLScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setClearColor(0x030014, 1);
    const DPR = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75);
    renderer.setPixelRatio(DPR);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 9.5);

    /* ---------- starfield ---------- */
    const STAR_COUNT = isMobile ? 4500 : 10000;
    const pos = new Float32Array(STAR_COUNT * 3);
    const col = new Float32Array(STAR_COUNT * 3);
    const size = new Float32Array(STAR_COUNT);
    const phase = new Float32Array(STAR_COUNT);
    const starPalette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xff7ad9),
    ];
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 13 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 8;
      const c = starPalette[(Math.random() * starPalette.length) | 0];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      size[i] = 0.6 + Math.random() * 2.4;
      phase[i] = Math.random() * Math.PI * 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    starGeo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    starGeo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    const starMat = new THREE.ShaderMaterial({
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: DPR },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ---------- morphing energy blob ---------- */
    const blobGroup = new THREE.Group();
    const blobGeo = new THREE.IcosahedronGeometry(1.7, isMobile ? 48 : 64);
    const blobMat = new THREE.ShaderMaterial({
      vertexShader: BLOB_VERT,
      fragmentShader: BLOB_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0.42 },
        uMorph: { value: 0.5 },
        uColorA: { value: new THREE.Color(PALETTES[0][0]) },
        uColorB: { value: new THREE.Color(PALETTES[0][1]) },
      },
      transparent: true,
    });
    const blob = new THREE.Mesh(blobGeo, blobMat);
    blobGroup.add(blob);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wire = new THREE.Mesh(blobGeo, wireMat);
    wire.scale.setScalar(1.015);
    blobGroup.add(wire);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 24),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    blobGroup.add(core);

    /* orbiting rings */
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.015, 8, 128), ringMat);
    ring1.rotation.x = Math.PI / 2.4;
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.5, 0.012, 8, 128),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
      })
    );
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = 0.5;
    blobGroup.add(ring1, ring2);
    blobGroup.position.y = 0.35;
    scene.add(blobGroup);

    /* ---------- giant faint torus knot (ambient architecture) ---------- */
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(4.6, 1.15, 180, 20),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
      })
    );
    knot.position.z = -6;
    scene.add(knot);

    /* ---------- floating shards ---------- */
    const shardGeos = [
      new THREE.TetrahedronGeometry(0.28),
      new THREE.OctahedronGeometry(0.24),
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
    ];
    const shardColors = [0x22d3ee, 0xff00ff, 0x8b5cf6, 0xfbbf24];
    const shards = [];
    const SHARD_COUNT = isMobile ? 18 : 34;
    for (let i = 0; i < SHARD_COUNT; i++) {
      const m = new THREE.Mesh(
        shardGeos[i % shardGeos.length],
        new THREE.MeshBasicMaterial({
          color: shardColors[i % shardColors.length],
          wireframe: true,
          transparent: true,
          opacity: 0.32,
        })
      );
      const a = Math.random() * Math.PI * 2;
      const r = 5.5 + Math.random() * 8;
      m.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 9, -2 - Math.random() * 8);
      m.userData = {
        baseY: m.position.y,
        speed: 0.3 + Math.random() * 0.7,
        rot: 0.2 + Math.random() * 0.8,
        ph: Math.random() * Math.PI * 2,
      };
      shards.push(m);
      scene.add(m);
    }

    /* ---------- click shockwaves ---------- */
    const waves = [];
    for (let i = 0; i < 10; i++) {
      const w = new THREE.Mesh(
        new THREE.RingGeometry(0.92, 1.0, 64),
        new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      w.visible = false;
      w.userData = { t: 1 };
      waves.push(w);
      scene.add(w);
    }
    let waveIdx = 0;
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    /* ---------- interaction state ---------- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let paletteIdx = 0;
    const targetA = new THREE.Color(PALETTES[0][0]);
    const targetB = new THREE.Color(PALETTES[0][1]);
    let morphTarget = 0.5;
    let camZT = 9.5;
    let camYT = 0;

    const onMouse = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onClick = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const p = raycaster.ray.at(9, new THREE.Vector3());
      const w = waves[waveIdx++ % waves.length];
      w.position.copy(p);
      w.lookAt(camera.position);
      w.material.color.setHex(
        [0x22d3ee, 0xff00ff, 0x8b5cf6][(Math.random() * 3) | 0]
      );
      w.userData.t = 0;
      w.visible = true;
    };
    const onScroll = () => {
      const sections = document.querySelectorAll('main section[data-palette]');
      let idx = 0;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.55) {
          idx = parseInt(s.dataset.palette, 10) || 0;
        }
      });
      if (idx !== paletteIdx) {
        paletteIdx = idx;
        const p = PALETTES[Math.min(idx, PALETTES.length - 1)];
        targetA.setHex(p[0]);
        targetB.setHex(p[1]);
        morphTarget = idx % 2 === 0 ? 0.85 : 0.25;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pr = max > 0 ? window.scrollY / max : 0;
      camZT = 9.5 - pr * 3.4;
      camYT = -pr * 1.7;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('pointerdown', onClick, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduced) loop();
    };
    document.addEventListener('visibilitychange', onVis);

    function loop() {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      starMat.uniforms.uTime.value = t;
      stars.rotation.y = t * 0.012;

      blobMat.uniforms.uTime.value = t;
      const cu = blobMat.uniforms;
      cu.uColorA.value.lerp(targetA, 0.03);
      cu.uColorB.value.lerp(targetB, 0.03);
      cu.uMorph.value += (morphTarget - cu.uMorph.value) * 0.03;
      cu.uIntensity.value = 0.42 + Math.sin(t * 0.8) * 0.06;
      wireMat.color.copy(cu.uColorA.value);

      blobGroup.rotation.y = t * 0.14;
      blobGroup.rotation.x = Math.sin(t * 0.12) * 0.16 + mouse.y * 0.18;
      blobGroup.rotation.z = mouse.x * 0.1;
      blobGroup.position.x = mouse.x * 0.7;
      const coreS = 1 + Math.sin(t * 2.2) * 0.12;
      core.scale.setScalar(coreS);
      ring1.rotation.z = t * 0.25;
      ring2.rotation.z = -t * 0.18;

      knot.rotation.z = t * 0.03;
      knot.rotation.y = t * 0.02;

      for (const s of shards) {
        const u = s.userData;
        s.position.y = u.baseY + Math.sin(t * u.speed + u.ph) * 0.9;
        s.rotation.x += dt * u.rot;
        s.rotation.y += dt * u.rot * 0.7;
      }

      for (const w of waves) {
        if (!w.visible) continue;
        w.userData.t += dt * 1.15;
        const k = w.userData.t;
        if (k >= 1) {
          w.visible = false;
          continue;
        }
        w.scale.setScalar(0.3 + k * 7);
        w.material.opacity = 0.75 * (1 - k);
      }

      camera.position.x += (mouse.x * 1.25 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.85 + camYT - camera.position.y) * 0.04;
      camera.position.z += (camZT - camera.position.z) * 0.05;
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    }

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('pointerdown', onClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
            m.dispose()
          );
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="webgl-vignette pointer-events-none absolute inset-0" />
    </div>
  );
}
