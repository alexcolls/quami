import { SphereGeometry } from 'three';

export default function setupGeometry (segments: number): SphereGeometry {
  return new SphereGeometry(1, segments, segments);
}
