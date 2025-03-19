import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "react-three-fiber";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import * as THREE from "three";
import PlanePortal from "./PlanePortal";
import clamp from "lodash.clamp";

// References for tracking device orientation
const betaRef = { current: 0 };
const gammaRef = { current: 0 };

function MouseControls({ width, height }) {
  // Mouse controls for desktop testing
  const { viewport } = useThree();

  return useFrame((state) => {
    betaRef.current = -clamp(
      state.mouse.y * viewport.height * 200,
      -45 * height,
      45 * height
    );
    gammaRef.current = -clamp(
      state.mouse.x * viewport.width * 200,
      -45 * width,
      45 * width
    );

    state.camera.lookAt(0, 0, 0);

    state.camera.position.x = -gammaRef.current / 120;
    state.camera.position.y = betaRef.current / 120;
    state.camera.position.z =
      1 -
      0.5 *
        Math.min(
          Math.abs(state.camera.position.x) + Math.abs(state.camera.position.y),
          1
        );
  });
}

function DeviceControls() {
  // Device orientation controls for mobile
  const rotationRef = useRef(null);

  useEffect(() => {
    // Initialize device orientation controls
    rotationRef.current = new DeviceOrientationControls(
      new THREE.PerspectiveCamera()
    );

    return () => {
      if (rotationRef.current) {
        rotationRef.current.disconnect();
      }
    };
  }, []);

  useFrame(({ camera }) => {
    if (!rotationRef.current) return;

    rotationRef.current.update();

    if (!rotationRef.current?.deviceOrientation) return;

    const { beta, gamma } = rotationRef.current.deviceOrientation;

    if (!beta || !gamma) return;

    betaRef.current = clamp(beta, -45, 45);
    gammaRef.current = clamp(gamma, -45, 45);

    camera.lookAt(0, 0, 0);

    camera.position.x = -gammaRef.current / 90;
    camera.position.y = betaRef.current / 90;
    camera.position.z =
      1 -
      0.5 *
        Math.min(Math.abs(camera.position.x) + Math.abs(camera.position.y), 1);
  });

  return null;
}

// Main immersive experience component
function ImmersiveExperience({ avatarUrl, customization = {}, onBack }) {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Request device orientation permission on iOS
  const requestPermission = useCallback(async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        setPermissionGranted(permission === "granted");
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
        // Fall back to mouse controls
        setPermissionGranted(true);
      }
    } else {
      // No permission needed for non-iOS or older browsers
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    // Auto-request permission when component mounts
    if (!permissionGranted) {
      requestPermission();
    }
  }, [permissionGranted, requestPermission]);

  // Calculate aspect ratio based aspect
  const { width, height } = useMemo(() => {
    const aspect = window.innerWidth / window.innerHeight;

    return aspect > 1
      ? {
          width: 1,
          height: 1 / aspect,
        }
      : {
          width: aspect,
          height: 1,
        };
  }, []);

  if (!permissionGranted) {
    return (
      <div className="permission-screen">
        <h2>Enable Device Motion</h2>
        <p>
          This experience uses your device's motion sensors to create an
          immersive view.
        </p>
        <button onClick={requestPermission}>Enable Motion Sensors</button>
      </div>
    );
  }

  return (
    <div className="immersive-container">
      <Canvas
        concurrent
        shadowMap
        colorManagement
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ position: [0, 0, 1], far: 100, near: 0.1 }}
      >
        {isMobile ? (
          <DeviceControls />
        ) : (
          <MouseControls width={width} height={height} />
        )}

        <PlanePortal
          width={width}
          height={height}
          avatarUrl={avatarUrl}
          customization={customization}
        />
      </Canvas>

      {/* UI Controls for navigation */}
      <div className="overlay-controls">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="info-button">
          <span>?</span>
          <div className="tooltip">
            <p>Move your device to look around the hologram.</p>
            <p>The avatar will float and respond to your device's motion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImmersiveExperience;
