import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SKY = 0x0d1626;

function flat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: 0.9,
    metalness: 0,
    ...opts,
  });
}

function makeTree() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.9, 6), flat(0x7a5230));
  trunk.position.y = 0.45;
  const leaves1 = new THREE.Mesh(new THREE.ConeGeometry(1.05, 1.5, 7), flat(0x1f9d4c));
  leaves1.position.y = 1.5;
  const leaves2 = new THREE.Mesh(new THREE.ConeGeometry(0.72, 1.1, 7), flat(0x27b562));
  leaves2.position.y = 2.35;
  g.add(trunk, leaves1, leaves2);
  return g;
}

function makeHouse() {
  const g = new THREE.Group();
  const walls = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 1.9), flat(0xe8d8b0));
  walls.position.y = 0.75;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.95, 1.25, 4), flat(0xb03a2e));
  roof.position.y = 2.1;
  roof.rotation.y = Math.PI / 4;
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.95, 0.08),
    flat(0x5a3a22)
  );
  door.position.set(0, 0.48, 0.97);
  const winMat = new THREE.MeshBasicMaterial({ color: 0xffec27 });
  const win1 = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), winMat);
  win1.position.set(-0.65, 0.95, 0.96);
  const win2 = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), winMat);
  win2.position.set(0.65, 0.95, 0.96);
  g.add(walls, roof, door, win1, win2);
  return g;
}

function makeKnight() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.85, 0.45), flat(0x29adff));
  body.position.y = 0.95;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.5), flat(0xf0c8a0));
  head.position.y = 1.65;
  const helm = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.28, 0.57), flat(0x8a8f9e));
  helm.position.y = 1.85;
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.06), new THREE.MeshBasicMaterial({ color: 0x101018 }));
  visor.position.set(0, 1.62, 0.26);
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.55, 0.35), flat(0x1d1d2b));
  legL.position.set(-0.19, 0.28, 0);
  const legR = legL.clone();
  legR.position.x = 0.19;
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.7, 0.3), flat(0x29adff));
  armL.position.set(-0.5, 0.95, 0);
  const armR = armL.clone();
  armR.position.x = 0.5;
  g.add(body, head, helm, visor, legL, legR, armL, armR);
  return g;
}

function makeCloud() {
  const g = new THREE.Group();
  const m = flat(0xe8ecf4);
  const b1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1, 1.4), m);
  const b2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.9, 1.2), m);
  b2.position.set(1.2, 0.35, 0.2);
  const b3 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.8, 1.1), m);
  b3.position.set(-1.2, 0.3, -0.15);
  g.add(b1, b2, b3);
  return g;
}

export default function WebGLScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(SKY, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(SKY, 20, 52);
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 140);

    scene.add(new THREE.HemisphereLight(0x9db8dd, 0x3a2c1e, 0.95));
    const sun = new THREE.DirectionalLight(0xfff2d8, 1.35);
    sun.position.set(10, 16, 8);
    scene.add(sun);

    /* ---------- stars ---------- */
    {
      const N = isMobile ? 250 : 600;
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const r = 45 + Math.random() * 40;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.random() * Math.PI * 0.48;
        pos[i * 3] = r * Math.cos(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) + 4;
        pos[i * 3 + 2] = r * Math.cos(ph) * Math.sin(th);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.35 })));
    }

    /* ---------- moon ---------- */
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 14, 12),
      new THREE.MeshBasicMaterial({ color: 0xf5f0d8 })
    );
    moon.position.set(-20, 15, -28);
    scene.add(moon);

    /* ---------- water ---------- */
    const waterGeo = new THREE.PlaneGeometry(130, 130, 22, 22);
    waterGeo.rotateX(-Math.PI / 2);
    const waterBase = waterGeo.attributes.position.array.slice();
    const water = new THREE.Mesh(waterGeo, flat(0x1d4e89, { roughness: 0.7 }));
    water.position.y = -3.6;
    scene.add(water);

    /* ---------- island ---------- */
    const island = new THREE.Group();
    const rock = new THREE.Mesh(new THREE.CylinderGeometry(6, 3.2, 4.4, 7), flat(0x6e5a44));
    rock.position.y = -1.6;
    const grass = new THREE.Mesh(new THREE.CylinderGeometry(6.25, 6, 1.3, 7), flat(0x2fa14f));
    grass.position.y = 0.75;
    island.add(rock, grass);

    const treeSpots = [
      [-3.4, -1.6], [3.6, -2.2], [-2.2, 3.1], [2.8, 2.6], [-4.4, 1.2], [4.3, 0.6], [0.4, -3.9],
    ];
    treeSpots.forEach(([x, z], i) => {
      const t = makeTree();
      t.position.set(x, 1.4, z);
      t.rotation.y = i * 1.3;
      const s = 0.85 + ((i * 37) % 10) / 22;
      t.scale.setScalar(s);
      island.add(t);
    });

    const house = makeHouse();
    house.position.set(1.4, 1.4, -1.1);
    house.rotation.y = -0.35;
    island.add(house);

    const knight = makeKnight();
    knight.position.set(-1.9, 1.4, 1.3);
    knight.rotation.y = 0.7;
    island.add(knight);

    /* flag with waving pennant */
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), flat(0x8a8f9e));
    pole.position.set(-3.9, 2.6, -2.9);
    island.add(pole);
    const flagGeo = new THREE.PlaneGeometry(1.25, 0.7, 6, 3);
    const flagBase = flagGeo.attributes.position.array.slice();
    const flag = new THREE.Mesh(flagGeo, new THREE.MeshBasicMaterial({ color: 0x00e436, side: THREE.DoubleSide }));
    flag.position.set(-3.2, 3.45, -2.9);
    island.add(flag);

    /* rocks */
    [[2.2, 3.4], [-0.6, -2.6]].forEach(([x, z]) => {
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), flat(0x8a8f9e));
      r.position.set(x, 1.6, z);
      island.add(r);
    });
    scene.add(island);

    /* ---------- coins orbit ---------- */
    const coins = [];
    const coinGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.09, 14);
    coinGeo.rotateX(Math.PI / 2);
    const coinMat = new THREE.MeshStandardMaterial({ color: 0xffc93c, metalness: 0.55, roughness: 0.35, flatShading: true });
    const COINS = isMobile ? 6 : 9;
    for (let i = 0; i < COINS; i++) {
      const c = new THREE.Mesh(coinGeo, coinMat);
      c.userData = { a: (i / COINS) * Math.PI * 2, r: 8.6, y: 2.6 + (i % 3) * 0.9, sp: 0.25 };
      coins.push(c);
      scene.add(c);
    }

    /* ---------- clouds ---------- */
    const clouds = [];
    for (let i = 0; i < 6; i++) {
      const c = makeCloud();
      c.position.set(-28 + i * 10 + Math.random() * 4, 9 + Math.random() * 5, -14 - Math.random() * 10);
      c.userData = { sp: 0.35 + Math.random() * 0.5 };
      clouds.push(c);
      scene.add(c);
    }

    /* ---------- fireflies ---------- */
    const FF = isMobile ? 20 : 42;
    const ffPos = new Float32Array(FF * 3);
    const ffSeed = [];
    for (let i = 0; i < FF; i++) {
      ffSeed.push({ x: (Math.random() - 0.5) * 12, y: 2 + Math.random() * 4, z: (Math.random() - 0.5) * 12, p: Math.random() * 6.28, s: 0.5 + Math.random() });
    }
    const ffGeo = new THREE.BufferGeometry();
    ffGeo.setAttribute('position', new THREE.BufferAttribute(ffPos, 3));
    scene.add(new THREE.Points(ffGeo, new THREE.PointsMaterial({ color: 0xffec27, size: 0.22 })));

    /* ---------- click coin fountain ---------- */
    const burstPool = [];
    for (let i = 0; i < 14; i++) {
      const c = new THREE.Mesh(coinGeo, coinMat.clone());
      c.visible = false;
      c.userData = { v: new THREE.Vector3(), life: 0 };
      burstPool.push(c);
      scene.add(c);
    }
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const planeY = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.4);

    /* ---------- state ---------- */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollP = 0;
    const onMouse = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onClick = (e) => {
      if (/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(e.target.tagName)) return;
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      if (!raycaster.ray.intersectPlane(planeY, hit)) return;
      let n = 0;
      for (const c of burstPool) {
        if (c.visible) continue;
        c.visible = true;
        c.position.copy(hit);
        c.userData.v.set((Math.random() - 0.5) * 6, 5 + Math.random() * 4, (Math.random() - 0.5) * 6);
        c.userData.life = 0;
        if (++n >= 6) break;
      }
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollP = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
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

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      /* water waves */
      const wp = waterGeo.attributes.position;
      for (let i = 0; i < wp.count; i++) {
        const x = waterBase[i * 3];
        const z = waterBase[i * 3 + 2];
        wp.setY(i, Math.sin(x * 0.28 + t * 1.1) * 0.16 + Math.cos(z * 0.24 + t * 1.4) * 0.16);
      }
      wp.needsUpdate = true;

      /* flag wave */
      const fp = flagGeo.attributes.position;
      for (let i = 0; i < fp.count; i++) {
        const x = flagBase[i * 3];
        fp.setZ(i, Math.sin(x * 4 + t * 7) * 0.12 * (x + 0.625));
      }
      fp.needsUpdate = true;

      /* knight idle bounce */
      knight.position.y = 1.4 + Math.abs(Math.sin(t * 2.4)) * 0.14;
      knight.rotation.y = 0.7 + Math.sin(t * 0.7) * 0.25;

      /* coins */
      for (const c of coins) {
        const u = c.userData;
        u.a += dt * u.sp;
        c.position.set(Math.cos(u.a) * u.r, u.y + Math.sin(t * 1.6 + u.a * 3) * 0.45, Math.sin(u.a) * u.r);
        c.rotation.y = t * 3;
      }

      /* clouds drift */
      for (const c of clouds) {
        c.position.x += dt * c.userData.sp;
        if (c.position.x > 34) c.position.x = -34;
      }

      /* fireflies */
      for (let i = 0; i < FF; i++) {
        const s = ffSeed[i];
        ffPos[i * 3] = s.x + Math.sin(t * s.s + s.p) * 1.4;
        ffPos[i * 3 + 1] = s.y + Math.sin(t * s.s * 1.3 + s.p * 2) * 0.8;
        ffPos[i * 3 + 2] = s.z + Math.cos(t * s.s * 0.8 + s.p) * 1.4;
      }
      ffGeo.attributes.position.needsUpdate = true;

      /* coin fountain physics */
      for (const c of burstPool) {
        if (!c.visible) continue;
        const u = c.userData;
        u.life += dt;
        u.v.y -= 12 * dt;
        c.position.addScaledVector(u.v, dt);
        c.rotation.y += dt * 9;
        c.rotation.x += dt * 4;
        if (u.life > 1.25 || c.position.y < -3) c.visible = false;
      }

      /* camera orbit */
      const ang = t * 0.07 + mouse.x * 0.35;
      const radius = 17.5 - scrollP * 4.5;
      const height = 7.6 + scrollP * 2.4 + mouse.y * 1.1;
      camera.position.set(Math.cos(ang) * radius, height, Math.sin(ang) * radius);
      camera.lookAt(0, 1.1, 0);

      renderer.render(scene, camera);
    }

    if (reduced) {
      camera.position.set(17.5, 7.6, 0);
      camera.lookAt(0, 1.1, 0);
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
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="webgl-vignette pointer-events-none absolute inset-0" />
    </div>
  );
}
