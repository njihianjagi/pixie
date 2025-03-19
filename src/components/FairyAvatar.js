import React, { useRef, useMemo } from "react";
import { useFrame } from "react-three-fiber";
import { useSphere } from "use-cannon";
import { Sparkles, useGLTF, Trail } from "drei";

export function FairyAvatar({ position = [0, 0, 0] }) {
  // Physics body for the fairy
  const [ref, api] = useSphere(() => ({
    mass: 0.1,
    position,
    args: 0.15, // Fairy collision sphere size
    linearDamping: 0.95, // Makes movement more floaty
  }));

  // Reference to the fairy model group for animation
  const groupRef = useRef();

  // Load the fairy model (placeholder URL - need to replace with actual model)
  const { scene } = useGLTF("/models/fairy.glb");
  const fairy = useMemo(() => scene.clone(), [scene]);

  // Fairy hovering animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle hovering motion
    groupRef.current.position.y += Math.sin(t * 2) * 0.001;

    // Subtle rotation
    groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={ref}>
      <group ref={groupRef}>
        {/* Fairy model */}
        <primitive object={fairy} scale={[0.15, 0.15, 0.15]} />

        {/* Magical particle effects */}
        <Sparkles
          count={50}
          scale={[0.4, 0.4, 0.4]}
          size={0.6}
          speed={0.4}
          color="#FFB6C1" // Light pink
        />

        {/* Trailing effect */}
        <Trail
          width={0.5}
          length={8}
          color="#FFB6C1"
          attenuation={(t) => t * t}
        />

        {/* Fairy glow */}
        <pointLight distance={2} intensity={2} color="#FFB6C1" />
      </group>
    </group>
  );
}
