import React, { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { Plane, Html, Box, Icosahedron, useGLTF } from "drei";
import { Physics, useBox, usePlane, useSphere } from "use-cannon";
import clamp from "lodash.clamp";

// Reference for device orientation controls
const betaRef = { current: 0 };
const gammaRef = { current: 0 };

// Avatar model component loaded from Ready Player Me URL
function Avatar({ url, materialProps = {}, position = [0, 0, 0] }) {
  const group = useRef();
  const { scene } = useGLTF(url);

  // Apply any custom material properties
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Apply magical glow effect
        child.material.emissive = new THREE.Color(
          materialProps.emissive || 0x002244
        );
        child.material.emissiveIntensity =
          materialProps.emissiveIntensity || 0.2;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, materialProps]);

  // Apply floating animation
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime()) * 0.05;
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  // Apply physics to avatar
  const [ref, api] = useSphere(() => ({
    mass: 0.5,
    position,
    args: 0.5,
    linearDamping: 0.95,
  }));

  // Update physics body position based on device orientation
  useFrame(() => {
    if (betaRef.current && gammaRef.current) {
      api.applyForce(
        [gammaRef.current * 0.0005, betaRef.current * -0.0005, 0],
        [0, 0, 0]
      );
    }
  });

  return (
    <group ref={group}>
      <group ref={ref} scale={[0.5, 0.5, 0.5]} position={position}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// Magical particle effects
function ParticleEffects() {
  const particlesCount = 300;
  const positionsArray = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      // Random positions in a sphere around the avatar
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 0.5 + Math.random() * 0.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const particlesRef = useRef();

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Create swirling motion
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        const angle = time * 0.2 + (i / particlesCount) * Math.PI * 2;
        const distance = Math.sqrt(x * x + y * y + z * z);

        positions[i3] = x * Math.cos(angle * 0.1) - y * Math.sin(angle * 0.1);
        positions[i3 + 1] =
          x * Math.sin(angle * 0.1) + y * Math.cos(angle * 0.1);

        // Breathing effect
        const breatheFactor = Math.sin(time * 0.5) * 0.05;
        positions[i3] *= 1 + breatheFactor;
        positions[i3 + 1] *= 1 + breatheFactor;
        positions[i3 + 2] *= 1 + breatheFactor;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={particlesCount}
          array={positionsArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#88ccff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Plane with physics for the depth box boundaries
function PhyPlane({ rotate, rotation = [0, 0, 0], ...props }) {
  const [ref, api] = usePlane(() => ({ ...props, rotation }));

  useFrame(() => {
    if (!rotate) return;
    api.rotation.set(
      clamp(betaRef.current, -10, 10) / 120,
      clamp(gammaRef.current, -10, 10) / 120,
      0
    );
  });

  return <mesh ref={ref} />;
}

// Main DepthCube component
function DepthCube({ width, height, avatarUrl, customization = {} }) {
  // Load textures for the box
  const [carbon] = useLoader(THREE.TextureLoader, ["/carbon.jpeg"]);

  // Material props for the avatar
  const avatarMaterialProps = {
    emissive: customization.tint || 0x002244,
    emissiveIntensity: customization.brightness || 0.2,
  };

  // Box material props
  const materialProps = {
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: [1.4, 1.4],
    normalMap: carbon,
    roughness: 0.2,
    metalness: 0.2,
    side: THREE.BackSide,
    color: "black",
  };

  return (
    <group>
      <Physics gravity={[0, 0, -30]}>
        {/* Planes to create the depth box boundaries */}
        <PhyPlane rotate position={[0, 0, -0.25]} />
        <PhyPlane
          position={[-0.5 * width, 0, -0.25]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <PhyPlane
          position={[0.5 * width, 0, -0.25]}
          rotation={[0, -(Math.PI / 2), 0]}
        />
        <PhyPlane
          position={[0, 0.5 * height, -0.25]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <PhyPlane
          position={[0, -0.5 * height, -0.25]}
          rotation={[-(Math.PI / 2), 0, 0]}
        />

        <Suspense
          fallback={
            <Html center>
              <div style={{ color: "white", fontFamily: "Fredoka One" }}>
                Loading Avatar...
              </div>
            </Html>
          }
        >
          {/* Avatar component */}
          <Avatar
            url={avatarUrl}
            materialProps={avatarMaterialProps}
            position={[0, 0, 0]}
          />

          {/* Particle effects for magical ambiance */}
          <ParticleEffects />
        </Suspense>
      </Physics>

      {/* Depth box */}
      <Box args={[width, height, 0.5]} receiveShadow>
        <meshPhysicalMaterial {...materialProps} attachArray="material" />
        <meshPhysicalMaterial {...materialProps} attachArray="material" />
        <meshPhysicalMaterial {...materialProps} attachArray="material" />
        <meshPhysicalMaterial {...materialProps} attachArray="material" />
        <meshPhysicalMaterial
          transparent
          opacity={0}
          side={THREE.BackSide}
          attachArray="material"
        />
        <meshPhysicalMaterial {...materialProps} attachArray="material" />
      </Box>

      {/* Lighting */}
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[-1, -1, 1]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[1, 1, 1]} intensity={0.3} />
    </group>
  );
}

export default DepthCube;
