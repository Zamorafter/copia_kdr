import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Componente de Carga 3D (Skill: 3d-web-experience validation)
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        background: 'rgba(9, 10, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          border: '2px solid #e1306c',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite'
        }}></div>
        Cargando modelo 3D... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// Geometría y Malla 3D procedural estilizada de la Camisa
function ShirtMesh({ shirt }) {
  const groupRef = useRef();
  const bodyRef = useRef();

  // Color primario del modelo 3D
  const shirtColor = shirt?.color3D || '#161824';
  const isLightShirt = shirtColor.toLowerCase() === '#f1f5f9';

  // Generamos una textura gráfica para la pechera según la camisa
  const printTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Fondo transparente
    ctx.clearRect(0, 0, 512, 512);

    // Dibujamos un diseño urbano según la camisa
    const textColor = isLightShirt ? '#0f172a' : '#ffffff';
    const accent = shirt?.accentColor || '#e1306c';

    // Gráfico de marca y tipografía urbana
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(256, 180, 70, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = '900 42px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('STREETWEAR', 256, 310);

    ctx.font = '700 24px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = accent;
    ctx.fillText('3D EDITION', 256, 350);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [shirt, isLightShirt]);

  // Rotación continua suave del modelo 3D
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.15}>
      {/* Torso de la camisa */}
      <mesh ref={bodyRef} castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.95, 2.1, 32]} />
        <meshStandardMaterial
          color={shirtColor}
          roughness={0.6}
          metalness={0.1}
          bumpScale={0.02}
        />
      </mesh>

      {/* Cuello de la camisa */}
      <mesh position={[0, 1.08, 0]} castShadow>
        <torusGeometry args={[0.42, 0.08, 16, 32]} />
        <meshStandardMaterial color={shirtColor} roughness={0.7} />
      </mesh>

      {/* Manga Izquierda */}
      <group position={[-1.1, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.42, 0.8, 24]} />
          <meshStandardMaterial color={shirtColor} roughness={0.65} />
        </mesh>
      </group>

      {/* Manga Derecha */}
      <group position={[1.1, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.42, 0.8, 24]} />
          <meshStandardMaterial color={shirtColor} roughness={0.65} />
        </mesh>
      </group>

      {/* Decal / Estampado gráfico frontal */}
      <mesh position={[0, 0.2, 0.91]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshBasicMaterial map={printTexture} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

// Componente principal de la Escena 3D
export default function Shirt3DViewer({ shirt, autoRotate = true }) {
  // Detección para limitar DPR en dispositivos móviles (Optimización Skill 3D)
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|Android/i.test(navigator.userAgent);

  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 2]}
      performance={{ min: 0.5 }}
      shadows
      style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.5, 4.2]} fov={45} />
      
      {/* Iluminación de estudio 3D */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#38bdf8" />
      <spotLight position={[0, 6, 2]} intensity={0.8} angle={0.6} penumbra={0.8} color="#e1306c" />

      {/* Suspensión con Loader para 3D */}
      <React.Suspense fallback={<Loader />}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <ShirtMesh shirt={shirt} />
        </Float>
      </React.Suspense>

      {/* Controles de órbita 360° táctiles e interactivos sin bloquear el scroll */}
      <OrbitControls
        enableZoom={true}
        minDistance={2.5}
        maxDistance={6.0}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
  );
}
