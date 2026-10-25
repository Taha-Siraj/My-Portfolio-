import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Zone layout: 6 monuments on a ring road, each a portfolio section */
export const ZONES = [
  { id: 'about', label: 'ABOUT', color: '#50cbff', angle: 90 },
  { id: 'skills', label: 'SKILLS', color: '#b6fe00', angle: 30 },
  { id: 'projects', label: 'PROJECTS', color: '#fa8005', angle: -30 },
  { id: 'journey', label: 'JOURNEY', color: '#f7d000', angle: -90 },
  { id: 'services', label: 'SERVICES', color: '#ff7b5f', angle: -150 },
  { id: 'contact', label: 'CONTACT', color: '#ff5fa2', angle: 150 },
];

const RING_R = 52;
const WORLD_R = 88;

function makeLabelSprite(text, bg) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.beginPath();
  g.roundRect(6, 14, 500, 100, 24);
  g.fill();
  g.lineWidth = 10; g.strokeStyle = '#101010';
  g.stroke();
  g.fillStyle = bg === '#b6fe00' || bg === '#f7d000' || bg === '#50cbff' ? '#101010' : '#ffffff';
  g.font = '900 64px "Arial Black", sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 256, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const spr = new THREE.Sprite(mat);
  spr.scale.set(16, 4, 1);
  return spr;
}

function box(w, h, d, color, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color })
  );
  m.position.set(x, y, z);
  return m;
}

export default function DriveWorld({ controlsRef, onZone }) {
  const mountRef = useRef(null);
  const zoneRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaee2ff);
    scene.fog = new THREE.Fog(0xaee2ff, 120, 220);

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 400);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x3d7a34, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(40, 80, 20);
    scene.add(sun);

    /* ---------- ground, road, plaza ---------- */
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(WORLD_R + 8, 64),
      new THREE.MeshLambertMaterial({ color: 0x6fbf5a })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const road = new THREE.Mesh(
      new THREE.RingGeometry(RING_R - 4, RING_R + 4, 64),
      new THREE.MeshLambertMaterial({ color: 0x2b2b2b })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.05;
    scene.add(road);

    const plaza = new THREE.Mesh(
      new THREE.CircleGeometry(16, 48),
      new THREE.MeshLambertMaterial({ color: 0xf5f0e6 })
    );
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.y = 0.06;
    scene.add(plaza);

    /* centre flag + TAHA sign */
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 12, 8),
      new THREE.MeshLambertMaterial({ color: 0x101010 })
    );
    pole.position.set(0, 6, 0);
    scene.add(pole);
    const flag = box(7, 4, 0.3, 0xb6fe00, 3.6, 10, 0);
    scene.add(flag);
    const tahaSign = makeLabelSprite('TAHA', '#013900');
    tahaSign.position.set(0, 17, 0);
    scene.add(tahaSign);

    /* ---------- zones ---------- */
    const colliders = []; // {x, z, r}
    const zonePos = {};
    ZONES.forEach((z) => {
      const rad = (z.angle * Math.PI) / 180;
      const x = Math.cos(rad) * RING_R;
      const zz = Math.sin(rad) * RING_R;
      zonePos[z.id] = { x, z: zz };
      const g = new THREE.Group();
      g.position.set(x, 0, zz);

      /* platform */
      const plat = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8.6, 0.8, 24),
        new THREE.MeshLambertMaterial({ color: 0xf5f0e6 })
      );
      plat.position.y = 0.4;
      g.add(plat);
      /* glowing ring */
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(8.6, 10, 32),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(z.color), side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.15;
      g.add(ring);

      /* monument per zone */
      if (z.id === 'about') {
        g.add(box(6, 4.5, 5, 0xffffff, 0, 2.65, 0));
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(4.6, 3, 4),
          new THREE.MeshLambertMaterial({ color: 0xfa8005 })
        );
        roof.position.y = 6.4; roof.rotation.y = Math.PI / 4;
        g.add(roof);
        g.add(box(1.6, 2.6, 0.3, 0x013900, 0, 2.1, 2.6));
      } else if (z.id === 'skills') {
        [3.5, 5.5, 7].forEach((h, i) => {
          g.add(box(1.8, h, 1.8, [0x50cbff, 0xb6fe00, 0xfa8005][i], (i - 1) * 2.6, h / 2 + 0.8, 0));
        });
      } else if (z.id === 'projects') {
        let y = 0.8;
        [0xb6fe00, 0x50cbff, 0xfa8005, 0xf7d000, 0xff7b5f].forEach((c) => {
          g.add(box(5, 1.6, 5, c, 0, y + 0.8, 0));
          y += 1.7;
        });
      } else if (z.id === 'journey') {
        for (let i = 0; i < 5; i++) {
          g.add(box(1.2, 2 + i * 0.9, 1.2, i % 2 ? 0xf7d000 : 0x013900, (i - 2) * 2.4, 1 + i * 0.45 + 0.8, 0));
        }
      } else if (z.id === 'services') {
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          g.add(box(1.8, 1.8, 1.8, [0x50cbff, 0xb6fe00, 0xfa8005, 0xf7d000, 0xff7b5f, 0xffffff][i], Math.cos(a) * 3.4, 1.7, Math.sin(a) * 3.4));
        }
      } else {
        g.add(box(6, 4, 4, 0xff5fa2, 0, 2.8, 0));
        g.add(box(4, 0.4, 4.4, 0xffffff, 0, 5, 0));
        g.add(box(0.4, 3, 0.4, 0x101010, 3.4, 6.2, 0));
      }

      const label = makeLabelSprite(z.label, z.color);
      label.position.y = 13.5;
      g.add(label);
      scene.add(g);
      colliders.push({ x, z: zz, r: 9 });
    });

    /* ---------- trees ---------- */
    let seed = 42;
    const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < 46; i++) {
      const a = rand() * Math.PI * 2;
      const r = 18 + rand() * 66;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (Math.abs(r - RING_R) < 9) continue;
      if (Math.hypot(x, z) < 20) continue;
      let nearZone = false;
      for (const zp of Object.values(zonePos)) if (Math.hypot(x - zp.x, z - zp.z) < 13) nearZone = true;
      if (nearZone) continue;
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.5, 2, 6),
        new THREE.MeshLambertMaterial({ color: 0x8a5a3b })
      );
      trunk.position.set(x, 1, z);
      const top = new THREE.Mesh(
        new THREE.ConeGeometry(2.2, 5, 8),
        new THREE.MeshLambertMaterial({ color: 0x2e7d32 })
      );
      top.position.set(x, 4.2, z);
      scene.add(trunk, top);
      colliders.push({ x, z, r: 1.4 });
    }

    /* ---------- clouds ---------- */
    const clouds = [];
    for (let i = 0; i < 7; i++) {
      const cg = new THREE.Group();
      for (let j = 0; j < 3; j++) {
        const s = new THREE.Mesh(
          new THREE.SphereGeometry(2.5 + j, 10, 10),
          new THREE.MeshLambertMaterial({ color: 0xffffff })
        );
        s.position.set(j * 3.2 - 3, j * 0.6, 0);
        cg.add(s);
      }
      cg.position.set(-90 + i * 28, 26 + (i % 3) * 5, -60 + (i % 4) * 30);
      scene.add(cg);
      clouds.push(cg);
    }

    /* ---------- the car ---------- */
    const car = new THREE.Group();
    const body = box(2.6, 0.9, 4.6, 0xff7b5f, 0, 0.75, 0);
    const cabin = box(2.1, 0.8, 2.4, 0x101010, 0, 1.55, -0.2);
    const stripe = box(2.7, 0.25, 4.7, 0xf7d000, 0, 1.05, 0);
    car.add(body, cabin, stripe);
    const wheels = [];
    [[-1.3, 1.5], [1.3, 1.5], [-1.3, -1.5], [1.3, -1.5]].forEach(([wx, wz]) => {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.4, 12),
        new THREE.MeshLambertMaterial({ color: 0x111111 })
      );
      w.rotation.z = Math.PI / 2;
      w.position.set(wx, 0.55, wz);
      car.add(w);
      wheels.push(w);
    });
    /* blob shadow */
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(3.4, 20),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.07;
    car.add(shadow);
    car.position.set(0, 0, 34);
    scene.add(car);

    /* ---------- input ---------- */
    const keys = {};
    const onKey = (down) => (e) => {
      const k = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault();
      keys[k] = down;
    };
    const kd = onKey(true), ku = onKey(false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    /* ---------- drive loop ---------- */
    const S = { pos: new THREE.Vector3(0, 0, 34), heading: 0, speed: 0 };
    const camPos = new THREE.Vector3(0, 14, 52);
    const fwd = new THREE.Vector3();
    let last = performance.now();
    let raf = 0;
    let disposed = false;

    const readInput = () => {
      const t = controlsRef?.current?.input || {};
      return {
        up: keys['w'] || keys['arrowup'] || !!t.up,
        down: keys['s'] || keys['arrowdown'] || !!t.down,
        left: keys['a'] || keys['arrowleft'] || !!t.left,
        right: keys['d'] || keys['arrowright'] || !!t.right,
      };
    };

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      /* teleport */
      const ctrl = controlsRef?.current;
      if (ctrl && ctrl.teleport) {
        const zp = zonePos[ctrl.teleport];
        if (zp) {
          const d = Math.hypot(zp.x, zp.z) || 1;
          S.pos.set((zp.x / d) * (RING_R - 14), 0, (zp.z / d) * (RING_R - 14));
          S.heading = Math.atan2(-zp.x, -zp.z);
          S.speed = 0;
        }
        ctrl.teleport = null;
      }

      const inp = readInput();
      const MAX_F = 30, MAX_R = -11, ACC = 34, BRK = 46;
      if (inp.up) S.speed += ACC * dt;
      if (inp.down) S.speed -= BRK * dt;
      if (!inp.up && !inp.down) S.speed *= Math.max(0, 1 - 1.4 * dt);
      S.speed = Math.max(MAX_R, Math.min(MAX_F, S.speed));
      if (Math.abs(S.speed) < 0.05) S.speed = 0;

      const steer = (inp.left ? 1 : 0) - (inp.right ? 1 : 0);
      if (steer !== 0 && S.speed !== 0) {
        S.heading += steer * (S.speed > 0 ? 1 : -1) * 1.9 * dt * Math.min(1, Math.abs(S.speed) / 12 + 0.25);
      }

      fwd.set(Math.sin(S.heading), 0, Math.cos(S.heading));
      S.pos.addScaledVector(fwd, S.speed * dt);

      /* world edge */
      const rr = Math.hypot(S.pos.x, S.pos.z);
      if (rr > WORLD_R) {
        S.pos.multiplyScalar(WORLD_R / rr);
        S.speed *= 0.5;
      }
      /* colliders: push out */
      for (const c of colliders) {
        const dx = S.pos.x - c.x, dz = S.pos.z - c.z;
        const d = Math.hypot(dx, dz);
        if (d < c.r + 1.6 && d > 0.001) {
          S.pos.x = c.x + (dx / d) * (c.r + 1.6);
          S.pos.z = c.z + (dz / d) * (c.r + 1.6);
          S.speed *= 0.6;
        }
      }

      car.position.copy(S.pos);
      car.rotation.y = S.heading;
      const spin = (S.speed * dt) / 0.55;
      wheels.forEach((w) => { w.rotation.x += spin; });

      /* clouds drift */
      clouds.forEach((c, i) => {
        c.position.x += dt * (0.6 + i * 0.15);
        if (c.position.x > 110) c.position.x = -110;
      });

      /* camera follow */
      const camTarget = new THREE.Vector3(
        S.pos.x - Math.sin(S.heading) * 17,
        13.5,
        S.pos.z - Math.cos(S.heading) * 17
      );
      camPos.lerp(camTarget, 1 - Math.exp(-4.5 * dt));
      camera.position.copy(camPos);
      camera.lookAt(S.pos.x + Math.sin(S.heading) * 5, 1.5, S.pos.z + Math.cos(S.heading) * 5);

      /* zone detection */
      let near = null;
      for (const z of ZONES) {
        const zp = zonePos[z.id];
        if (Math.hypot(S.pos.x - zp.x, S.pos.z - zp.z) < 15) { near = z.id; break; }
      }
      if (near !== zoneRef.current) {
        zoneRef.current = near;
        onZone && onZone(near);
      }
      if (ctrl) ctrl.speed = Math.abs(S.speed);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0" />;
}
