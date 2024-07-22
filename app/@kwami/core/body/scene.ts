import {
  WebGLRenderer,
  PCFSoftShadowMap,
  DirectionalLight,
  AmbientLight,
  PerspectiveCamera,
  Scene
} from 'three';
import type { Camera } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export default function setupScene (canvas: HTMLCanvasElement) {
  const renderer = setupRenderer(canvas);
  const camera = setupCamera(canvas);
  const controls = setupControls(camera, renderer);
  const lights = setupLights(0.7, 0.25, 1);
  const scene = new Scene();
  scene.add(lights.top);
  scene.add(lights.bottom);
  scene.add(lights.ambient);
  return { renderer, camera, controls, lights, scene };
}

function setupRenderer (canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext('webgl2')!,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  return renderer;
}

function setupCamera (canvas: HTMLCanvasElement) {
  const camera = new PerspectiveCamera(
    55,
    canvas.width / canvas.height,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 6;
  camera.position.z = 0;
  return camera;
}

function setupControls (camera: Camera, renderer: WebGLRenderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotate_speed = 0.7;
  controls.enableZoom = false;
  controls.target.set(0, 0, 0);
  controls.update();
  return controls;
}

function setupLights (
  topIntensity: number,
  bottomIntensity: number,
  ambientIntensity: number
) {
  const lights = {
    top: new DirectionalLight(0xFFFFFF, topIntensity),
    bottom: new DirectionalLight(0xFFFFFF, bottomIntensity),
    ambient: new AmbientLight(0x798296, ambientIntensity)
  };
  lights.top.position.set(0, 500, 200);
  lights.top.castShadow = true;
  lights.top.shadow.mapSize.width = 4048;
  lights.top.shadow.mapSize.height = 4048;
  lights.top.shadow.camera.near = 0;
  lights.top.shadow.camera.far = 1000;
  lights.top.shadow.camera.left = -200;
  lights.top.shadow.camera.right = 200;
  lights.top.shadow.camera.top = 200;
  lights.top.shadow.camera.bottom = -200;
  lights.bottom.position.set(0, -500, 400);
  lights.bottom.castShadow = true;
  lights.bottom.shadow.mapSize.width = 5048;
  lights.bottom.shadow.mapSize.height = 5048;
  lights.bottom.shadow.camera.near = 0.5;
  lights.bottom.shadow.camera.far = 1000;
  lights.bottom.shadow.camera.left = -200;
  lights.bottom.shadow.camera.right = 200;
  lights.bottom.shadow.camera.top = 200;
  lights.bottom.shadow.camera.bottom = -200;
  return lights;
}
