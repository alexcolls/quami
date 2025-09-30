import {
  Mesh,
  Scene,
  WebGLRenderer,
  Color,
  PerspectiveCamera
} from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import {
  getRandomBetween,
  getRandomBoolean,
  getRandomHexColor,
  genDNA
} from '../../../../utils/randoms';
import type KwamiAudio from '../../audio';
import setSkins, { type Skins } from './skins';
import { shaders } from './skins/Tricolor';
import setGeometry from './geometry';
import options from './options';
import events from './events';
import animation from './animation';

type State = 'normal' | 'speak' | 'listen' | 'think' | 'click';

export default class BodyBlob {
  events = events;
  options = options;
  skins = setSkins(options.skins) as any;
  skinOptions = ['tricolor', 'zebra'];
  skin = 'tricolor';
  geometry = setGeometry(options.resolution.default);
  renderer: WebGLRenderer;
  mesh: Mesh;
  scene: Scene;
  camera: PerspectiveCamera;
  state: State;
  audio: KwamiAudio;
  resolution = 0;
  colorX = '';
  colorY = '';
  colorZ = '';
  dna = '';

  audioEffect = {
    splitFreq: true,
    xFreq: 'low',
    yFreq: 'mid',
    zFreq: 'high',
    x: 0,
    y: 0,
    z: 0
  };

  spikes = {
    x: 0,
    y: 0,
    z: 0
  };

  time = {
    x: 0,
    y: 0,
    z: 0
  };

  isRotation = false;
  rotation = {
    x: 0,
    y: 0,
    z: 0
  };

  random = 0;

  constructor (
    skin: Skins,
    state: State,
    scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    audio: KwamiAudio
  ) {
    this.state = state;
    this.skinOptions = Object.keys(this.skins);
    this.mesh = new Mesh(
      this.geometry, this.skins[skin] ?? this.skins.tricolor);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.audio = audio;

    if (this.audio && this.audio.analyser) {
      const animate = () => {
        animation(
          this.mesh,
          this.audio.frequencyData,
          this.audio.analyser!,
          this.spikes.x,
          this.spikes.y,
          this.spikes.z,
          this.time.x,
          this.time.y,
          this.time.z
        );
        this.mesh.rotation.x += this.rotation.x;
        this.mesh.rotation.y += this.rotation.y;
        this.mesh.rotation.z += this.rotation.z;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(animate);
      };
      animate();
    }
    this.scene.add(this.mesh);
  }

  exportBlobGLTF () {
    this.mesh.userData = {
      vertexShader: shaders.vertexShader,
      fragmentShader: shaders.fragmentShader,
      uniforms: {
        lightPosition: this.skins.tricolor.uniforms.lightPosition.value,
        shininess: this.skins.tricolor.uniforms.shininess.value,
        specular_color: this.skins.tricolor.uniforms
          .specular_color.value.getHex(),
        _color1: this.skins.tricolor.uniforms._color1.value.getHex(),
        _color2: this.skins.tricolor.uniforms._color2.value.getHex(),
        _color3: this.skins.tricolor.uniforms._color3.value.getHex()
      }
    };
    const exporter = new GLTFExporter();
    exporter.parse(
      this.scene,
      (result) => {
        const json = this.scene.toJSON();
        const blob = new Blob(
          [JSON.stringify(json)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'bodyblob.json';
        link.click();
      },
      (error) => {
        console.error('An error occurred during the export:', error);
      },
      { binary: true }
    );
  }

  downloadBlob (blob: Blob, filename: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  vector (vec: string, value: number) {
    switch (vec.toLowerCase()) {
      case 'x':
        this.spikes.x = value;
        break;
      case 'y':
        this.spikes.y = value;
        break;
      case 'z':
        this.spikes.z = value;
        break;
    }
  }

  setSkin (skin: Skins) {
    this.skin = skin;
    this.mesh.material = this.skins[this.skin];
  }

  setShininess (value: number) {
    this.skins.tricolor.uniforms.shininess.value = value;
  }

  color (vec: string, value: number) {
    switch (vec.toLowerCase()) {
      case 'x':
        this.skins.tricolor.uniforms._color1.value = new Color(value);
        break;
      case 'y':
        this.skins.tricolor.uniforms._color2.value = new Color(value);
        break;
      case 'z':
        this.skins.tricolor.uniforms._color3.value = new Color(value);
        break;
    }
  }

  setColors (x: string, y: string, z: string) {
    this.skins.tricolor.uniforms._color1.value = new Color(x);
    this.colorX = x;
    this.skins.tricolor.uniforms._color2.value = new Color(y);
    this.colorY = y;
    this.skins.tricolor.uniforms._color3.value = new Color(z);
    this.colorZ = z;
  }

  setColor (vec: string, color: string) {
    switch (vec.toLowerCase()) {
      case 'x':
        this.colorX = color;
        this.skins.tricolor.uniforms._color1.value = new Color(color);
        break;
      case 'y':
        this.colorY = color;
        this.skins.tricolor.uniforms._color2.value = new Color(color);
        break;
      case 'z':
        this.colorZ = color;
        this.skins.tricolor.uniforms._color3.value = new Color(color);
        break;
    }
  }

  setRandomXYZColor () {
    this.colorX = getRandomHexColor();
    this.colorY = getRandomHexColor();
    this.colorZ = getRandomHexColor();
    this.setColors(this.colorX, this.colorY, this.colorZ);
  }

  setResolution (value: number) {
    this.resolution = value;
    this.options.resolution.default = value;
    this.geometry = setGeometry(value);
    this.mesh.geometry = this.geometry;
  }

  setRandomResolution () {
    const resolution = getRandomBetween(
      this.options.resolution.min,
      this.options.resolution.max
    );
    this.setResolution(resolution);
  }

  switchRotation () {
    if (!this.isRotation) {
      this.rotation.x = 0;
      this.rotation.y = 0;
      this.rotation.z = 0;
    } else {
      this.rotation.x = 0.01;
      this.rotation.y = 0.01;
      this.rotation.z = 0.01;
    }
  }

  setRotation (x: number, y: number, z: number) {
    this.rotation.x = x;
    this.rotation.y = y;
    this.rotation.z = z;
  }

  setWireframe (value: boolean) {
    this.skins.tricolor.wireframe = value;
  }

  setRandomDNA () {
    this.dna = genDNA();
  }

  setRandomBlob = () => {
    this.setRandomDNA();
    this.spikes.x = getRandomBetween(
      this.options.spikes.rMin,
      this.options.spikes.rMax,
      this.options.spikes.digits
    );
    this.spikes.y = getRandomBetween(
      this.options.spikes.rMin,
      this.options.spikes.rMax,
      this.options.spikes.digits
    );
    this.spikes.z = getRandomBetween(
      this.options.spikes.rMin,
      this.options.spikes.rMax,
      this.options.spikes.digits
    );
    this.time.x = getRandomBetween(0, 50, 1);
    this.time.y = getRandomBetween(0, 50, 1);
    this.time.z = getRandomBetween(0, 50, 1);
    this.setWireframe(getRandomBoolean());
    if (this.isRotation) {
      this.rotation.x = getRandomBetween(0, 0.01, 3);
      this.rotation.y = getRandomBetween(0, 0.01, 3);
      this.rotation.z = getRandomBetween(0, 0.01, 3);
    } else {
      this.rotation.x = 0;
      this.rotation.y = 0;
      this.rotation.z = 0;
    }
    this.setResolution(getRandomBetween(30, 300, 1));
    this.setShininess(getRandomBetween(0, 100000, 1));
    this.setWireframe(getRandomBoolean());
    this.colorX = getRandomHexColor();
    this.colorY = getRandomHexColor();
    this.colorZ = getRandomHexColor();
    this.setColors(this.colorX, this.colorY, this.colorZ);
  };

  on (event: string, callback?: () => boolean): void {
    if (callback) {
      this.events[event] = callback;
      callback();
      return;
    }
    switch (event.toLowerCase()) {
      case 'click':
        this.options.spikes.default = getRandomBetween(
          this.options.spikes.min,
          this.options.spikes.max
        );
        this.options.speed.default = getRandomBetween(
          this.options.speed.min,
          this.options.speed.max
        );
        this.options.processing.default = getRandomBetween(
          this.options.processing.min,
          this.options.processing.max
        );
        this.options.resolution.default = getRandomBetween(
          this.options.resolution.min,
          this.options.resolution.max
        );
        this.skins.tricolor.uniforms._color1.value = new Color(
          getRandomHexColor()
        );
        this.skins.tricolor.uniforms._color2.value = new Color(
          getRandomHexColor()
        );
        this.skins.tricolor.uniforms._color3.value = new Color(
          getRandomHexColor()
        );
        this.skins.tricolor.wireframe = getRandomBoolean(0.1);
        this.skins.tricolor.uniforms.shininess.value = 100000;
        break;
      case 'doubleclick':
        this.events.onDoubleClick();
        break;
      case 'hover':
        this.events.onHover();
        break;
      case 'press':
        this.events.onPress();
        break;
    }
  }
}
