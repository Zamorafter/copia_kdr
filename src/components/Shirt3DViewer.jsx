import React, { useRef, useMemo, useState, useEffect, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Función para verificar si WebGL está disponible en el navegador
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// Error Boundary para capturar fallos de renderizado 3D sin congelar ni dejar en blanco la web
class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Fallback 3D activado debido a error de WebGL:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Malla 3D estilizada de la Camisa
function ShirtMesh({ shirt }) {
  const groupRef = useRef();
  const shirtColor = shirt?.color3D || '#161824';
  const isLightShirt = shirtColor.toLowerCase() === '#f1f5f9';

  // Textura gráfica para el estampado frontal de la camisa
  const printTexture = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      if (!ctx) return null;

      ctx.clearRect(0, 0, 512, 512);

      const textColor = isLightShirt ? '#0f172a' : '#ffffff';
      const accent = shirt?.accentColor || '#e1306c';

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(256, 180, 70, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = textColor;
      ctx.font = '900 42px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STREETWEAR', 256, 310);

      ctx.font = '700 24px sans-serif';
      ctx.fillStyle = accent;
      ctx.fillText('3D EDITION', 256, 350);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    } catch (e) {
      return null;
    }
  }, [shirt, isLightShirt]);

  // Rotación suave del modelo 3D
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.15}>
      {/* Torso de la camisa */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.95, 2.1, 32]} />
        <meshStandardMaterial
          color={shirtColor}
          roughness={0.6}
          metalness={0.1}
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

      {/* Estampado frontal */}
      {printTexture && (
        <mesh position={[0, 0.2, 0.91]}>
          <planeGeometry args={[1.0, 1.0]} />
          <meshBasicMaterial map={printTexture} transparent depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

// Vista previa de respaldo estática (Fallback 2D cuando WebGL no está disponible)
function ImageFallback({ shirt }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'radial-gradient(circle at center, #1b2030 0%, #0d0e15 100%)'
    }}>
      <img
        src={shirt?.image}
        alt={shirt?.name || 'Camisa'}
        style={{
          maxHeight: '85%',
          maxWidth: '85%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))'
        }}
      />
    </div>
  );
}

export default function Shirt3DViewer({ shirt, autoRotate = true }) {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  if (!hasWebGL) {
    return <ImageFallback shirt={shirt} />;
  }

  const fallbackUI = <ImageFallback shirt={shirt} />;

  return (
    <ThreeErrorBoundary fallback={fallbackUI}>
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        shadows
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        gl={{ powerPreference: 'high-performance', antialias: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 4.2]} fov={45} />
        
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} color="#38bdf8" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <ShirtMesh shirt={shirt} />
        </Float>

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
    </ThreeErrorBoundary>
  );
}
