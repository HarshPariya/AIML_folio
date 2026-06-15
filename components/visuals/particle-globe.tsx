"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Fibonacci-sphere point cloud that gently rotates and reacts to the pointer. */
function GlobePoints({ count = 2600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const radius = 2.4;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr[i * 3] = Math.cos(theta) * r * radius;
      arr[i * 3 + 1] = y * radius;
      arr[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    const { x, y } = state.pointer;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, y * 0.35, 0.05);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, x * 0.15, 0.05);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#a78bfa"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function InnerCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.08;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export default function ParticleGlobe() {
  const [particleCount, setParticleCount] = useState(2600);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.6]);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Detect device capabilities and screen size for optimization
    const isMobile = window.innerWidth < 768;
    const isLowEndDevice =
      typeof navigator !== "undefined" && (navigator as any).deviceMemory
        ? (navigator as any).deviceMemory <= 4
        : false;

    if (isMobile) {
      setParticleCount(isLowEndDevice ? 600 : 1000);
      setDpr([1, 1.2]);
    } else if (isLowEndDevice) {
      setParticleCount(1200);
      setDpr([1, 1.4]);
    }

    // Delay mounting heavy WebGL to prevent blocking initial page load
    const timeout = setTimeout(() => {
      setShouldRender(true);
    }, isMobile ? 800 : 100);

    return () => clearTimeout(timeout);
  }, []);

  if (!shouldRender) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      performance={{ min: 0.5, max: 0.8 }}
    >
      <ambientLight intensity={0.6} />
      <GlobePoints count={particleCount} />
      <InnerCore />
    </Canvas>
  );
}
