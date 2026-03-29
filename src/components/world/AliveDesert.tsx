// components/world/AliveDesert.tsx
"use client";
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Sky, PositionalAudio, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Alive Inhabitant: Walking Camel
function Camel() {
  const group = useRef<THREE.Group>();
  const { scene, animations } = useGLTF('/models/camel_walk.glb');
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    actions['walk']?.play(); // Seamless walk cycle from Mixamo
  }, [actions]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.x += delta * 0.15; // Realistic desert pace
      if (group.current.position.x > 15) group.current.position.x = -15;
    }
  });

  return <primitive ref={group} object={scene} scale={0.4} position={[-10, -1.8, -6]} />;
}

// 2. Interactive Sand Repulsion Shader
const SandMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying float vDist;
    void main() {
      vec3 pos = position;
      float dist = distance(pos.xy, uMouse);
      vDist = dist;
      if (dist < 0.4) {
        float force = (0.4 - dist) * 4.0;
        pos.z += force * sin(uTime * 4.0); // Sand 'flies' toward viewer
        pos.xy += normalize(pos.xy - uMouse) * force * 0.1;
      }
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = 2.0;
    }
  `,
  fragmentShader: `
    varying float vDist;
    void main() {
      float alpha = smoothstep(0.4, 0.0, vDist);
      gl_FragColor = vec4(0.89, 0.78, 0.54, 0.6 + alpha * 0.4);
    }
  `
};

export default function AliveDesert() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#f2e2ba]">
      <Canvas camera={{ position: , fov: 45 }}>
        <Suspense fallback={null}>
          <Sky sunPosition={} turbidity={8} rayleigh={3} />
          <ambientLight intensity={0.6} />
          <Camel />
          <points onPointerMove={(e) => (SandMaterial.uniforms.uMouse.value = e.point)}>
            <bufferGeometry>
              <bufferAttribute 
                attach="attributes-position" 
                count={15000} 
                array={new Float32Array(45000).map(() => (Math.random() - 0.5) * 20)} 
                itemSize={3} 
              />
            </bufferGeometry>
            <shaderMaterial args={} transparent />
          </points>
          <PositionalAudio url="/audio/desert_wind.mp3" distance={10} loop autoplay />
        </Suspense>
      </Canvas>
    </div>
  );
            }
            
