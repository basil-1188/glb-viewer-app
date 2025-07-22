import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  
  // Reset position and rotation
  scene.position.set(0, 0, 0);
  scene.rotation.set(0, 0, 0);
  
  return <primitive object={scene} />;
}

function ModelViewer({ modelId }) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: '#f0f0f0' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model url={`http://localhost:5000/api/models/${modelId}`} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          minDistance={1}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}

export default ModelViewer;