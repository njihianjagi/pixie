import { Object3D } from 'three';
import { PlaneProps, SphereProps as CannonSphereProps } from '@react-three/cannon';

export interface PhyPlaneProps extends Partial<PlaneProps> {
  rotation?: [number, number, number];
  plain?: boolean;
  rotate?: boolean;
  position?: [number, number, number];
}

// Define the correct args type for spheres
type SphereArgs = [radius: number];

export interface PhySphereProps extends Partial<Omit<CannonSphereProps, 'args'>> {
  mass?: number;
  position?: [number, number, number];
  args?: SphereArgs;  // Only allow tuple format [radius]
}

export interface MouseProps {
  width: number;
  height: number;
}

export interface DepthCubeProps {
  width: number;
  height: number;
}

export interface PlanePortalProps {
  width: number;
  height: number;
}

export interface DeviceOrientationState {
  beta: number | null;
  gamma: number | null;
}
