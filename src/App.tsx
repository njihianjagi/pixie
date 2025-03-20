import React, {
  useRef,
  useMemo,
  createRef,
  useState,
  useCallback,
  Suspense,
  MutableRefObject,
  useEffect,
} from "react";
import * as THREE from "three";
import { BufferGeometry, Material, Vector2 } from "three";
import {
  Canvas,
  createPortal,
  useFrame,
  useThree,
  useLoader,
  extend,
} from "@react-three/fiber";
import { Plane, Html, Box, Icosahedron } from "@react-three/drei";
import { Physics, useBox, usePlane, useSphere } from "@react-three/cannon";
import clamp from "lodash.clamp";
import create from "zustand";
import COLOR from "nice-color-palettes";
import { DeviceOrientationControls } from "three-stdlib";

import "./styles.css";

// Type definitions
interface MouseProps {
  width: number;
  height: number;
}

interface PhyPlaneProps {
  rotation?: [number, number, number];
  rotate?: boolean;
  position?: [number, number, number];
  [key: string]: any;
}

interface InstancedMeshProps {
  ref: MutableRefObject<THREE.InstancedMesh | null>;
  args: [BufferGeometry | undefined, Material | undefined, number];
}

interface SphereProps {
  index: number;
}

interface InstancedBoxesProps {
  number?: number;
}

interface BoxesProps {
  width: number;
  height: number;
}

interface DepthCubeProps {
  width: number;
  height: number;
}

interface PlanePortalProps {
  width: number;
  height: number;
}

interface InteractionManagerProps {
  [key: string]: any;
}

interface StoreState {
  count: number;
  increase: () => void;
}

extend({ InstancedMesh: THREE.InstancedMesh })

// Create refs outside component to persist across renders
const rotation = { current: null as DeviceOrientationControls | null };
const betaRef = { current: 0 };
const gammaRef = { current: 0 };

const useStore = create<StoreState>((set) => ({
  count: 1,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

function Mouse({ width, height }: MouseProps) {
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

function InstancedBoxes({ number = 15 }: InstancedBoxesProps) {
  const carbon = useLoader(THREE.TextureLoader, "/carbon.jpeg");
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const _positions: [number, number, number][] = [];

    // =) generator lol
    for (let index = 0; index <= number - 5; index++) {
      _positions.push([
        0.15 * Math.cos((Math.PI * index) / (number - 5)),
        -0.1 - 0.15 * Math.sin((Math.PI * index) / (number - 5)),
        -0.25,
      ]);
    }

    _positions.push([-0.08, 0.1, -0.25]);
    _positions.push([0.08, 0.1, -0.25]);
    _positions.push([-0.08, 0.15, -0.25]);
    _positions.push([0.08, 0.15, -0.25]);

    return _positions;
  }, [number]);

  const [, api] = useBox<THREE.InstancedMesh>((index) => ({
    position: positions[index],
    args: [0.06, 0.06, 0.06],
  }));

  // Apply physics to the instanced mesh after it's created
  useEffect(() => {
    if (meshRef.current) {
      // Apply physics to each instance
      for (let i = 0; i < number; i++) {
        const position = positions[i];
        const matrix = new THREE.Matrix4().makeTranslation(
          position[0],
          position[1],
          position[2]
        );
        meshRef.current.setMatrixAt(i, matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [number, positions]);

  return (
    <instancedMesh
      ref={meshRef}
      castShadow
      receiveShadow
      args={[undefined, undefined, number]}
    >
      <boxGeometry args={[0.06, 0.06, 0.06]} />
      <meshPhysicalMaterial
        clearcoat={1}
        clearcoatRoughness={0.1}
        normalScale={new Vector2(1.4, 1.4)}
        normalMap={carbon}
        roughness={0.2}
        metalness={0.2}
        color="black"
      />
    </instancedMesh>
  );
}

function PhyPlane({ rotation = [0, 0, 0], rotate = false, ...props }: PhyPlaneProps) {
  const [ref, api] = usePlane<THREE.Mesh>(() => ({ ...props, rotation }));

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

function Sphere({ index }: SphereProps) {
  const [map, normal] = useLoader(THREE.TextureLoader, [
    "/vortex.jpg",
    "/flakes.png",
  ]);

  const [ref] = useSphere<THREE.Group>(() => ({
    mass: 1,
    position: [0, 0, 1],
    args: [0.05] as [number], // Properly typed as [radius]
  }));

  const _materialProps = {
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    metalness: 0.1,
    roughness: 0.3,
    map: map,
    normalMap: normal,
    normalScale: new Vector2(0.3, 0.3),
    alphaMap: map,
    transmission: 0.5,
    transparent: true,
  } as const;

  return (
    <group ref={ref}>
      <Icosahedron receiveShadow castShadow args={[0.05, 4, 4]}>
        <meshPhysicalMaterial
          {..._materialProps}
          color={COLOR[index][0]}
          side={THREE.BackSide}
        />
      </Icosahedron>
      <Icosahedron args={[0.05, 4]}>
        <meshPhysicalMaterial
          {..._materialProps}
          color={COLOR[index][4]}
          transmission={0.2}
        />
      </Icosahedron>
    </group>
  );
}

function Boxes({ width, height }: BoxesProps) {
  const [carbon] = useLoader(THREE.TextureLoader, ["/carbon.jpeg"]);

  const materialProps = {
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: new Vector2(1.4, 1.4),
    normalMap: carbon,
    roughness: 0.2,
    metalness: 0.2,
    side: THREE.BackSide,
    color: "orange",
  } as const;

  return (
    <group>
      <Box args={[width, height, 0.5]} receiveShadow>
        {[...Array(6)].map((_, index) => (
          <meshPhysicalMaterial 
            key={index} 
            {...(index === 4 
              ? { transparent: true, opacity: 0, side: THREE.BackSide }
              : materialProps
            )} 
            attach={`material-${index}`}
          />
        ))}
      </Box>
    </group>
  );
}

function DepthCube({ width, height }: DepthCubeProps) {
  const count = useStore((s) => s.count);

  return (
    <group>
      <Physics gravity={[0, 0, -30]}>
        <PhyPlane rotate plain position={[0, 0, -0.25]} />
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

        <Suspense fallback={null}>
          {new Array(count).fill(0).map((_, index) => (
            <Sphere key={`0${index}`} index={index} />
          ))} 
           <InstancedBoxes />
          <Boxes width={width} height={height} />
        </Suspense>
      </Physics>

      {/* <Mouse width={width} height={height} /> for desktop testing */}
      <hemisphereLight intensity={0.75} />
      <spotLight
        position={[-1, -1, 1]}
        angle={0.3}
        penumbra={1}
        intensity={12}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[1, 1, 1]} intensity={0.3} />
    </group>
  );
}

function PlanePortal({ width, height }: PlanePortalProps) {
  const planeRef = useRef<THREE.Mesh>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const [camera] = useState<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera());

  const increase = useStore((s) => s.increase);

  const { near, scene, target, portalHalfWidth, portalHalfHeight } =
    useMemo(() => {
      const target = new THREE.WebGLRenderTarget(1024, 1024);
      const scene = new THREE.Scene();

      scene.fog = new THREE.Fog(0x000000, 0.5, 2.5);
      scene.background = new THREE.Color(0x000000);

      const near = 0.1;
      const portalHalfWidth = width / 2;
      const portalHalfHeight = height / 2;

      return { near, scene, target, portalHalfWidth, portalHalfHeight };
    }, [width, height]);

  useFrame((state) => {
    camera.position.copy(state.camera.position);
    camera.quaternion.copy(planeRef.current?.quaternion ?? new THREE.Quaternion());

    const portalPosition = new THREE.Vector3().copy(planeRef.current?.position ?? new THREE.Vector3());

    camera.updateMatrixWorld();
    camera.worldToLocal(portalPosition);

    const left = portalPosition.x - portalHalfWidth;
    const right = portalPosition.x + portalHalfWidth;
    const top = portalPosition.y + portalHalfHeight;
    const bottom = portalPosition.y - portalHalfHeight;

    const distance = Math.abs(portalPosition.z);
    const scale = near / distance;

    const scaledLeft = left * scale;
    const scaledRight = right * scale;
    const scaledTop = top * scale;
    const scaledBottom = bottom * scale;

    camera.projectionMatrix.makePerspective(
      scaledLeft,
      scaledRight,
      scaledTop,
      scaledBottom,
      near,
      100
    );

    state.gl.render(scene, camera);
  }, 1);

  return (
    <>
      {createPortal(<DepthCube width={width} height={height} />, scene)}
      <Plane ref={planeRef} onClick={increase}>
        <meshStandardMaterial attach="material" map={target.texture} />
      </Plane>
    </>
  );
}

function InteractionManager(props: InteractionManagerProps) {
  const state = useThree();
  const aspect = state.viewport.aspect;

  const { width, height } = useMemo(
    () =>
      aspect > 1
        ? {
            width: 1,
            height: 1 / aspect,
          }
        : {
            width: aspect,
            height: 1,
          },
    [aspect]
  );

  const [clicked, setClicked] = useState(false);

  const initializeOrientation = useCallback(() => {
    console.log('init')
    setClicked(true);
    if (state.camera) {
      rotation.current = new DeviceOrientationControls(state.camera);
      rotation.current.connect();
    }
  }, [state.camera]);

  const handleClick = useCallback(async () => {
    console.log('clicked')
    // Check if the browser supports device orientation
    if ('DeviceOrientationEvent' in window) {
      // Check if we need to request permission (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            initializeOrientation();
          } else {
            console.error('Permission not granted');
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
        }
      } else {
        // No permission needed (Android, older iOS)
        initializeOrientation();
      }
    } else {
      console.error('Device orientation not supported');
    }
  }, [initializeOrientation]);

  useFrame(({ camera }) => {
    if (!rotation.current || !clicked) return;

    rotation.current.update();

    if (!rotation.current.deviceOrientation) return;

    const { beta, gamma } = rotation.current.deviceOrientation;

    if (beta === null || gamma === null) return;

    betaRef.current = clamp(beta, -45 * height, 45 * height);
    gammaRef.current = clamp(gamma, -45 * width, 45 * width);

    camera.lookAt(0, 0, 0);

    camera.position.x = -gammaRef.current / 90;
    camera.position.y = betaRef.current / 90;
    camera.position.z =
      1 -
      0.5 *
        Math.min(Math.abs(camera.position.x) + Math.abs(camera.position.y), 1);
  });

  return clicked ? (
    <PlanePortal width={width} height={height} />
  ) : (
    <PlanePortal width={width} height={height} />

    // <Plane material-transparent material-opacity={0} onClick={handleClick}>
    //   <Html center>
    //     <div style={{ 
    //       color: "black", 
    //       fontFamily: "Fredoka One",
    //       transform: 'scale(10)',
    //       cursor: 'pointer',
    //       userSelect: 'none'
    //     }}>
    //       Click Here
    //     </div>
    //   </Html>
    // </Plane>
  );
}

export default function App() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        gl={{ 
          pixelRatio: Math.min(2, isMobile ? window.devicePixelRatio : 1),
          antialias: true,
          alpha: true
        }}
        camera={{ 
          position: [0, 0, 1], 
          far: 100, 
          near: 0.1,
          fov: 75
        }}
        style={{
          background: 'transparent'
        }}
      >
        <color attach="background" args={['#ffffff']} />
        <Suspense fallback={null}>
          <Physics>
            <InteractionManager />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
