import React, { useState, useRef, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { useGLTF, OrbitControls, Html } from "drei";
import * as THREE from "three";

// Model loader component
const AvatarModel = ({ url, materialProps }) => {
  const { scene } = useGLTF(url);

  // Apply material modifications if needed
  if (materialProps) {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Apply custom properties to materials
        Object.keys(materialProps).forEach((prop) => {
          if (child.material[prop] !== undefined) {
            child.material[prop] = materialProps[prop];
          }
        });

        // Force material update
        child.material.needsUpdate = true;
      }
    });
  }

  return (
    <primitive object={scene} scale={[0.8, 0.8, 0.8]} position={[0, -0.8, 0]} />
  );
};

const AvatarPreview = ({ avatarUrl, onConfirm, onRegenerate }) => {
  const [brightness, setBrightness] = useState(1);
  const [tint, setTint] = useState("#ffffff");
  const canvasRef = useRef();

  // Material properties to be applied to the avatar
  const materialProps = {
    emissiveIntensity: brightness,
    emissive: new THREE.Color(tint),
  };

  const handleConfirm = () => {
    onConfirm(avatarUrl, { brightness, tint });
  };

  const resetCustomization = () => {
    setBrightness(1);
    setTint("#ffffff");
  };

  return (
    <div className="preview-container">
      <h2>Preview Your 3D Avatar</h2>

      <div className="canvas-container">
        <Canvas
          ref={canvasRef}
          colorManagement
          shadowMap
          camera={{ position: [0, 0, 2], fov: 50 }}
        >
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} />

          <Suspense
            fallback={
              <Html center>
                <div className="loading">Loading 3D model...</div>
              </Html>
            }
          >
            <AvatarModel url={avatarUrl} materialProps={materialProps} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={1.5}
            maxDistance={4}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        </Canvas>
      </div>

      <div className="customization-controls">
        <div className="control-group">
          <label>Brightness</label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>Color Tint</label>
          <input
            type="color"
            value={tint}
            onChange={(e) => setTint(e.target.value)}
          />
        </div>

        <button className="reset-btn" onClick={resetCustomization}>
          Reset
        </button>
      </div>

      <div className="action-buttons">
        <button className="regenerate-btn" onClick={onRegenerate}>
          Re-generate
        </button>

        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm & Save
        </button>
      </div>
    </div>
  );
};

export default AvatarPreview;
