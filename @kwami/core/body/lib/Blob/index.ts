import {
  Mesh,
  Scene,
  WebGLRenderer,
  Color,
  PerspectiveCamera
} from 'three';
import {
  getRandomBetween,
  getRandomBoolean,
  getRandomHexColor
} from '../../../../utils/randoms';
import type KwamiAudio from '../../audio';
import { type Skins } from './skins/interface';
import setSkins from './skins';
import setGeometry from './geometry';
import params from './params';
import events from './events';
import blobAnimation from './animation';

type State = 'normal' | 'speak' | 'listen' | 'think' | 'click';

export default class Blob {
  events = events;
  params = params;
  skins = setSkins(params.skins);
  skinOptions = ['tricolor', 'zebra'];
  skin = 'tricolor';
  geometry = setGeometry(params.body.resolution.default);
  renderer: WebGLRenderer;
  mesh: Mesh;
  scene: Scene;
  camera: PerspectiveCamera;
  state: State;
  audio: KwamiAudio;
  resolution: number = 500;
  // id: string;

  audioEffect = {
    splitFreq: true,
    xFreq: 'low',
    yFreq: 'mid',
    zFreq: 'high',
    x: 0,
    y: 0,
    z: 0
  };

  vec = {
    x: 0,
    y: 0,
    z: 0
  };

  time = {
    x: 0,
    y: 0,
    z: 0
  };

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
    this.mesh = new Mesh(this.geometry, this.skins[skin]);
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.audio = audio;
    if (this.audio && this.audio.analyser) {
      const animate = () => {
        blobAnimation(
          this.mesh,
          this.audio.frequencyData,
          this.audio.analyser!,
          this.vec.x,
          this.vec.y,
          this.vec.z,
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

  vector (vec: string, value: number) {
    switch (vec.toLowerCase()) {
      case 'x':
        this.vec.x = value;
        break;
      case 'y':
        this.vec.y = value;
        break;
      case 'z':
        this.vec.z = value;
        break;
    }
  }

  setSkin (skin: string) {
    this.skin = skin;
    // this.mesh.material = this.skins[this.skin];
    // this.mesh.material.needsUpdate = true;
  }

  shininess (value: number) {
    this.skins.tricolor.uniforms.shininess.value = value;
  }

  color (vec: string, value: number) {
    switch (vec.toLowerCase()) {
      case 'x':
        this.skins.tricolor.uniforms.color1.value = new Color(value);
        break;
      case 'y':
        this.skins.tricolor.uniforms.color2.value = new Color(value);
        break;
      case 'z':
        this.skins.tricolor.uniforms.color3.value = new Color(value);
        break;
    }
  }

  setColors (x: string, y: string, z: string) {
    this.skins.tricolor.uniforms.color1.value = new Color(x);
    this.skins.tricolor.uniforms.color2.value = new Color(y);
    this.skins.tricolor.uniforms.color3.value = new Color(z);
  }

  setResolution (value: number) {
    this.resolution = value;
    this.params.body.resolution.default = value;
    this.geometry = setGeometry(value);
    this.mesh.geometry = this.geometry;
  }

  on (event: string, callback?: () => boolean): void {
    if (callback) {
      this.events[event] = callback;
      callback();
      return;
    }
    switch (event.toLowerCase()) {
      case 'click':
        this.params.body.spikes.default = getRandomBetween(
          this.params.body.spikes.min,
          this.params.body.spikes.max
        );
        this.params.body.speed.default = getRandomBetween(
          this.params.body.speed.min,
          this.params.body.speed.max
        );
        this.params.body.processing.default = getRandomBetween(
          this.params.body.processing.min,
          this.params.body.processing.max
        );
        this.params.body.resolution.default = getRandomBetween(
          this.params.body.resolution.min,
          this.params.body.resolution.max
        );
        this.skins.tricolor.uniforms.color1.value = new Color(
          getRandomHexColor()
        );
        this.skins.tricolor.uniforms.color2.value = new Color(
          getRandomHexColor()
        );
        this.skins.tricolor.uniforms.color3.value = new Color(
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
