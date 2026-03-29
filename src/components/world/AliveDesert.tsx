"use client";
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, ContactShadows, Environment, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Monolith() {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = Math.sin(t / 2) / 4; // Slow, heavy hover
  });

  return (
    <mesh ref={mesh} position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[1, 2.5, 0.1]} />
      {/* This material makes it look like polished obsidian/glass */}
      <meshStandardMaterial 
        color="#050505" 
        roughness={0.05} 
        metalness={1} 
      />
    </mesh>
  );
}

export default function AliveDesert() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#111]">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 35 }}>
        <Suspense fallback={null}>
          {/* Realistic Atmosphere */}
          <Sky distance={450000} sunPosition={[10, 2, 10]} inclination={0} azimuth={0.25} />
          <Environment preset="sunset" />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} castShadow />
          
          <Monolith />

          {/* Ground Reflection - This makes it feel "4K Real" */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#151515"
              metalness={0.5}
            />
          </mesh>

          {/* Real-time Shadows */}
          <ContactShadows position={[0, -0.99, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          
          {/* Realistic Dust/Sand */}
          <points>
            <bufferGeometry>
              <bufferAttribute 
                attach="attributes-position" 
                count={2000} 
                array={new Float32Array(6000).map(() => (Math.random() - 0.5) * 30)} 
                itemSize={3} 
              />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#fff" transparent opacity={0.1} sizeAttenuation />
          </points>
        </Suspense>
      </Canvas>
    </div>
  );
}

