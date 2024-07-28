import type {
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  AmbientLight,
  Scene
} from 'three';
import audioFiles from '../../assets/audio';
import setScene, {
  setRenderer,
  setCamera,
  setControls,
  setLights
} from './scene';
import KwamiAudio from './audio';
import Blob from './lib/Blob';

export default class KwamiBody {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  controls: any;
  lights: {
    top: DirectionalLight;
    bottom: DirectionalLight;
    ambient: AmbientLight;
  };

  public selected: Blob;
  public scene: Scene;
  public audio: KwamiAudio;

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const { renderer, camera, controls, lights, scene } = setScene(this.canvas);
    lights.top.position.set(0, 1000, 0);
    this.renderer = renderer;
    this.camera = camera;
    this.controls = controls;
    this.lights = lights;
    this.scene = scene;
    this.audio = new KwamiAudio(audioFiles);
    this.selected = new Blob(
      'tricolor',
      'normal',
      this.scene,
      this.camera,
      this.renderer,
      this.audio
    );
    this.scene.add(this.selected.mesh);
    this.resizeEvent();
  }

  resizeEvent () {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.domElement.width = window.innerWidth;
      this.renderer.domElement.height = window.innerHeight;
      this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    });
  }

  select (body: string, skin: string) {
    switch (body.toLowerCase()) {
      case 'spikyblob':
        this.selected = new Blob(
          'tricolor',
          'normal',
          this.scene,
          this.camera,
          this.renderer,
          this.audio
        );
        switch (skin) {
          case 'tricolor':
        }
    }
  }

  setCamera () {
    setCamera(this.canvas, 2, 5, 5);
  }
}
