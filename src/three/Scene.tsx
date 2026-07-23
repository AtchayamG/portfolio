import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './scrollState';

const BASE = import.meta.env.BASE_URL;
const IMG_ASPECT = 2560 / 1080; // ~2.37 — matches the city renders

/* ══════════════════════════════════════════════════
   Texture helpers
══════════════════════════════════════════════════ */

// Load a texture without Suspense; missing files fall back gracefully to null.
function useOptionalTexture(url: string): THREE.Texture | null {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (t) => {
        if (!alive) return;
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.generateMipmaps = true;
        setTex(t);
      },
      undefined,
      () => {
        /* file not present — silently keep fallback */
      }
    );
    return () => {
      alive = false;
    };
  }, [url]);
  return tex;
}

// Soft radial sprite (bloom-like glow / particles), generated once on the canvas.
function useRadialTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const s = 128;
    const c = document.createElement('canvas');
    c.width = c.height = s;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.5, 'rgba(255,255,255,0.32)');
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [inner, outer]);
}

/* ══════════════════════════════════════════════════
   Camera rig — cinematic dive DEEP into the city
   (dollies toward the vanishing point + foreground rushes past)
══════════════════════════════════════════════════ */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0.6, -50));
  const pos = useRef(new THREE.Vector3(0, 0.9, 22));

  useFrame(({ clock }, delta) => {
    const lambda = 3.4;
    scrollState.smooth += (scrollState.progress - scrollState.smooth) * Math.min(1, lambda * delta);
    const t = reducedMotion ? 0 : scrollState.smooth;
    const time = clock.elapsedTime;

    const idleX = reducedMotion ? 0 : Math.sin(time * 0.22) * 0.4;
    const idleY = reducedMotion ? 0 : Math.sin(time * 0.3) * 0.18;

    // deep forward dolly toward the city core (z: 22 → -22, never reaches plane at -52)
    const z = 22 - t * 44;
    const y = 0.9 + t * 1.8 + Math.sin(t * Math.PI) * 0.5;
    const x = Math.sin(t * Math.PI * 1.15) * 1.9;

    const px = reducedMotion ? 0 : scrollState.pointerX * 0.7;
    const py = reducedMotion ? 0 : scrollState.pointerY * 0.4;

    pos.current.lerp(new THREE.Vector3(x + px + idleX, y - py + idleY, z), 0.06);
    camera.position.copy(pos.current);

    // look toward the centre of the skyline so the dolly reads as diving in
    look.current.lerp(new THREE.Vector3(x * 0.12 + px * 0.3, 0.6 + t * 0.9, -52), 0.06);
    camera.lookAt(look.current);
  });
  return null;
}

/* ══════════════════════════════════════════════════
   City — full-coverage cinematic backdrop (opaque, no seams)
══════════════════════════════════════════════════ */
function CityLayers() {
  const main = useOptionalTexture(`${BASE}assets/city-backdrop.webp`);

  // Sized to always cover the viewport (even 21:9 ultrawide) at the farthest camera distance.
  const H = 82;
  const W = H * IMG_ASPECT;

  if (!main) return null;

  return (
    <group>
      {/* main hero skyline — opaque, fully covers the frame, slightly dimmed for legibility */}
      <mesh position={[0, 0.5, -52]}>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={main} color={new THREE.Color(0.9, 0.93, 1.0)} depthWrite={false} fog={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════════════
   Volumetric fog sprites — drifting depth that rushes past
══════════════════════════════════════════════════ */
function FogField({ count }: { count: number }) {
  const glow = useRadialTexture('rgba(90,150,220,0.55)');
  const group = useRef<THREE.Group>(null);
  const data = useMemo(() => {
    const arr: { p: THREE.Vector3; s: number; sp: number; ph: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 80, Math.random() * 12 - 7, -Math.random() * 48 + 8),
        s: 14 + Math.random() * 26,
        sp: 0.1 + Math.random() * 0.25,
        ph: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const d = data[i];
      child.position.x = d.p.x + Math.sin(t * d.sp + d.ph) * 4;
      child.position.y = d.p.y + Math.cos(t * d.sp * 0.7 + d.ph) * 1.5;
    });
  });

  if (!glow) return null;
  return (
    <group ref={group}>
      {data.map((d, i) => (
        <sprite key={i} position={d.p.toArray()} scale={[d.s, d.s * 0.62, 1]}>
          <spriteMaterial map={glow} transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════════════
   Particle field — floating light dust + near bokeh
══════════════════════════════════════════════════ */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const dot = useRadialTexture();
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#dbe7ff'),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = Math.random() * 34 - 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90 + 4; // mostly in front of the city
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.01;
    const m = ref.current.material as THREE.PointsMaterial;
    m.opacity = 0.65 + Math.sin(clock.elapsedTime * 0.8) * 0.18;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.42}
        map={dot ?? undefined}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.01}
      />
    </points>
  );
}

/* ══════════════════════════════════════════════════
   Energy trails — career path as flowing light (in front of city)
══════════════════════════════════════════════════ */
function EnergyTrail({
  points,
  color,
  speed,
  width,
}: {
  points: [number, number, number][];
  color: string;
  speed: number;
  width: number;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const headRef = useRef<THREE.Sprite>(null);
  const dot = useRadialTexture();

  const { tube, curve } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    const tube = new THREE.TubeGeometry(curve, 240, width, 10, false);
    return { tube, curve };
  }, [points, width]);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * speed) % 1;
    if (headRef.current) {
      const p = curve.getPointAt(t);
      headRef.current.position.copy(p);
      const s = 1 + Math.sin(clock.elapsedTime * 4) * 0.25;
      headRef.current.scale.setScalar(s);
    }
    if (matRef.current) matRef.current.opacity = 0.4 + Math.sin(clock.elapsedTime * 1.6) * 0.14;
  });

  return (
    <group>
      <mesh geometry={tube}>
        <meshBasicMaterial ref={matRef} color={color} transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>
      <sprite ref={headRef} scale={[width * 22, width * 22, 1]}>
        <spriteMaterial map={dot ?? undefined} color={color} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  );
}

/* ══════════════════════════════════════════════════
   Holographic core — subtle energy signature behind name
══════════════════════════════════════════════════ */
function HoloCore() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const orbits = useRef<THREE.Points>(null);
  const glow = useRadialTexture('rgba(120,220,255,1)');

  const orbitData = useMemo(() => {
    const n = 50;
    const positions = new Float32Array(n * 3);
    const radii = new Float32Array(n);
    const angs = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      radii[i] = 1.9 + Math.random() * 0.9;
      angs[i] = Math.random() * Math.PI * 2;
    }
    return { n, positions, radii, angs };
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.y = 2.0 + Math.sin(t * 0.8) * 0.15;
    if (ring1.current) ring1.current.rotation.z = t * 0.3;
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.5;
      ring2.current.rotation.y = t * 0.25;
    }
    if (ring3.current) {
      ring3.current.rotation.y = -t * 0.4;
      ring3.current.rotation.x = Math.PI / 2.4;
    }
    if (orbits.current) {
      const posAttr = orbits.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < orbitData.n; i++) {
        const a = orbitData.angs[i] + t * (0.4 + (i % 5) * 0.05);
        const r = orbitData.radii[i];
        posAttr.setXYZ(i, Math.cos(a) * r, Math.sin(a * 1.3) * 0.5, Math.sin(a) * r);
      }
      posAttr.needsUpdate = true;
    }

    // fade out quickly as the journey begins so it never fights the hero copy
    const vis = Math.max(0, 1 - scrollState.smooth * 6);
    group.current.scale.setScalar(vis);
    group.current.visible = vis > 0.02;
  });

  return (
    <group ref={group} position={[0, 2.0, -9]}>
      {glow && (
        <sprite scale={[7, 7, 1]}>
          <spriteMaterial map={glow} transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      )}
      <mesh>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial color="#bff4ff" transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.9, 0.01, 12, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.35, 0.009, 12, 120]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.8, 0.007, 12, 120]} />
        <meshBasicMaterial color="#2f6bff" transparent opacity={0.4} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <points ref={orbits}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[orbitData.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#dbe7ff" transparent opacity={0.75} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} map={glow ?? undefined} alphaTest={0.01} />
      </points>
    </group>
  );
}

/* ══════════════════════════════════════════════════
   Sky craft — flying vehicles drifting across the skyline
══════════════════════════════════════════════════ */
function SkyCraft({ count }: { count: number }) {
  const glow = useRadialTexture('rgba(180,230,255,1)');
  const group = useRef<THREE.Group>(null);
  const data = useMemo(() => {
    const colors = ['#22d3ee', '#8b5cf6', '#7dd3fc', '#c4b5fd'];
    return Array.from({ length: count }, (_, i) => ({
      y: 5 + Math.random() * 9,
      z: -18 - Math.random() * 42,
      dir: Math.random() < 0.5 ? 1 : -1,
      speed: 1.6 + Math.random() * 2.2,
      offset: Math.random() * 110,
      scale: 0.6 + Math.random() * 0.8,
      color: colors[i % colors.length],
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    const boost = 1 + scrollState.smooth * 1.2;
    const span = 110;
    group.current.children.forEach((child, i) => {
      const d = data[i];
      let x = (d.offset + t * d.speed * boost) % span;
      if (x < 0) x += span;
      child.position.set(d.dir > 0 ? x - span / 2 : span / 2 - x, d.y + Math.sin(t * 0.5 + i) * 0.25, d.z);
    });
  });

  if (!glow) return null;
  return (
    <group ref={group}>
      {data.map((d, i) => (
        <group key={i}>
          <sprite scale={[3.2 * d.scale, 0.16 * d.scale, 1]} position={[-d.dir * 0.9 * d.scale, 0, 0]}>
            <spriteMaterial map={glow} color={d.color} transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
          <sprite scale={[0.5 * d.scale, 0.5 * d.scale, 1]}>
            <spriteMaterial map={glow} color="#eaf6ff" transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
          </sprite>
        </group>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════════════
   Scene root
══════════════════════════════════════════════════ */
export default function Scene({ reducedMotion, isMobile }: { reducedMotion: boolean; isMobile: boolean }) {
  const particleCount = isMobile ? 380 : 1000;
  const fogCount = isMobile ? 10 : 20;
  const craftCount = reducedMotion ? 0 : isMobile ? 3 : 6;

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.6 : 2]}
        camera={{ fov: 52, position: [0, 0.9, 22], near: 0.1, far: 220 }}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance', alpha: false }}
      >
        <color attach="background" args={['#04060e']} />
        <fog attach="fog" args={['#04060e', 30, 150]} />

        <ambientLight intensity={0.6} />

        <CameraRig reducedMotion={reducedMotion} />
        <CityLayers />
        <FogField count={fogCount} />
        <SkyCraft count={craftCount} />
        <Particles count={particleCount} />
        <HoloCore />

        <EnergyTrail points={[[-11, -6, 12], [-8, -5.5, -6], [-4, -5, -22], [-9, -5.5, -38], [-3, -5, -48]]} color="#22d3ee" speed={0.05} width={0.05} />
        <EnergyTrail points={[[12, -6.5, 10], [8, -6, -10], [4, -5.5, -28], [9, -6, -42], [3, -5.5, -50]]} color="#2f6bff" speed={0.04} width={0.06} />
        <EnergyTrail points={[[0, -7, 8], [-3, -6.5, -16], [2, -6, -34], [-1, -6.5, -48]]} color="#8b5cf6" speed={0.06} width={0.04} />
      </Canvas>

      {/* readability wash — dims the city just enough so text is always legible while neon still glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 105% 85% at 50% 44%, rgba(4,6,14,0.32) 0%, rgba(4,6,14,0.55) 62%, rgba(4,6,14,0.82) 100%), linear-gradient(180deg, rgba(4,6,14,0.6) 0%, rgba(4,6,14,0.28) 16%, rgba(4,6,14,0.32) 55%, rgba(4,6,14,0.8) 100%)',
        }}
      />
    </div>
  );
}
