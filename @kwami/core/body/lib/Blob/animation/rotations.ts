import { Scene, Camera } from 'three';

export function rotateCamera (scene: Scene, camera: Camera, rotation: number) {
  const cameraPosition = camera.position;
  const angle = (rotation * Math.PI) / 180;
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const newX = cameraPosition.x * cosAngle - cameraPosition.z * sinAngle;
  const newZ = cameraPosition.x * sinAngle + cameraPosition.z * cosAngle;
  camera.position.set(newX, cameraPosition.y, newZ);
  camera.lookAt(scene.position);
}
