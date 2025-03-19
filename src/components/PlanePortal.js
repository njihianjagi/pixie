import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame, createPortal } from "react-three-fiber";
import { Plane } from "drei";
import DepthCube from "./DepthCube";

function PlanePortal({ width, height, avatarUrl, customization }) {
  const planeRef = useRef();
  const [camera] = useState(new THREE.PerspectiveCamera());

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
    // Make the portal camera match the main camera position
    camera.position.copy(state.camera.position);
    camera.quaternion.copy(planeRef.current.quaternion);

    const portalPosition = new THREE.Vector3().copy(planeRef.current.position);

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

    // Render the scene to the target texture
    state.gl.render(scene, camera);
  }, 1);

  return (
    <>
      {/* Render the DepthCube inside the portal */}
      {createPortal(
        <DepthCube
          width={width}
          height={height}
          avatarUrl={avatarUrl}
          customization={customization}
        />,
        scene
      )}

      {/* The plane that displays the portal contents */}
      <Plane ref={planeRef}>
        <meshStandardMaterial attach="material" map={target.texture} />
      </Plane>
    </>
  );
}

export default PlanePortal;
