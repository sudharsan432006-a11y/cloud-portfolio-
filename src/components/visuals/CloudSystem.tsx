import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNodes() {
  const ref = useRef<THREE.Points>(null!);

  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const isReduced = useRef(false);

  useEffect(() => {
    isReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useFrame((state) => {
    if (isReduced.current) return;

    const time = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = time * 0.05;
      ref.current.rotation.y = time * 0.03;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function DataStreams() {
  const group = useRef<THREE.Group>(null!);

  const lineCount = 40;
  const lines = useMemo(() => {
    return Array.from({ length: lineCount }).map(() => {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      const end = start.clone().add(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ));
      return { start, end, speed: Math.random() * 0.2 + 0.05 };
    });
  }, []);

  const isReduced = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReduced.current = mediaQuery.matches;

    if (isReduced.current && group.current) {
      group.current.children.forEach((child) => {
        if (child instanceof THREE.Line && child.material instanceof THREE.LineBasicMaterial) {
          child.material.opacity = 0.1;
        }
      });
    }
  }, []);

  useFrame((state) => {
    if (isReduced.current) return;

    const time = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      if (child instanceof THREE.Line && child.material instanceof THREE.LineBasicMaterial) {
        child.position.y = Math.sin(time * lines[i].speed) * 2;
        child.material.opacity = (Math.sin(time + i) + 1) / 2;
      }
    });
  });

  return (
    <group ref={group}>
      {lines.map((line, i) => {
        const array = new Float32Array([...line.start.toArray(), ...line.end.toArray()]);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={array.length / 3}
                array={array}
                itemSize={3}
                args={[array, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00f2ff" transparent opacity={0.2} />
          </line>
        );
      })}
    </group>
  );
}

export default function CloudSystem() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
        <NetworkNodes />
        <DataStreams />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[5, 2, -10]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#00f2ff" wireframe />
          </mesh>
        </Float>
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[-8, -4, -15]}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#0088ff" wireframe />
          </mesh>
        </Float>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
    </div>
  );
}
