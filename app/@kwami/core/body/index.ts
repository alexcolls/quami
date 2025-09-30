import type {
  WebGLRenderer,
  PerspectiveCamera,
  DirectionalLight,
  AmbientLight,
  Scene,
  ShaderMaterial,
  MeshStandardMaterial
} from 'three';
import {
  GLTFExporter
} from 'three/addons/exporters/GLTFExporter.js';
import audioFiles from '../../assets/audio';
import setScene, {
  // setRenderer,
  setCamera
  // setControls,
  // setLights
} from './scene';
import KwamiAudio from './audio';
import BodyBlob from './lib/Blob';

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

  public scene: Scene;
  public audio: KwamiAudio;
  public blob: BodyBlob;

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
    this.blob = new BodyBlob(
      'tricolor',
      'normal',
      this.scene,
      this.camera,
      this.renderer,
      this.audio
    );
    this.scene.add(this.blob.mesh);
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
        this.blob = new BodyBlob(
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

  exportGLB () {
    const exporter = new GLTFExporter();

    const originalMaterial = this.blob.mesh.material;
    // Save the original material

    // // Check if the material is a custom ShaderMaterial
    // if (originalMaterial instanceof ShaderMaterial) {
    //   // Optionally: Convert to a MeshStandardMaterial for export
    //   this.blob.mesh.material = new MeshStandardMaterial({
    //     color: originalMaterial.uniforms._color1.value,
    //     metalness: 0.5, // Customize as needed
    //     roughness: 0.5 // Customize as needed
    //   });
    // }

    // Export the scene
    exporter.parse(
      this.scene,
      (gltf) => {
        const blob = new Blob(
          [gltf as ArrayBuffer], { type: 'model/gltf-binary' });
        const link = document.createElement('a');
        this.blob.mesh.material = originalMaterial;
        link.href = URL.createObjectURL(blob);
        link.download = 'scene.glb';
        link.click();

        // Restore the original material after export
      },
      (error) => {
        console.error('An error occurred during the export:', error);
        // Restore the original material even if there is an error
        this.blob.mesh.material = originalMaterial;
      },
      { binary: true } // Export as GLB
    );
  }
}
