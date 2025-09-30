import {
  getRandomHexColor,
  getRandomBoolean
} from '../../../../utils/randoms';

export default {
  spikes: {
    min: 0,
    max: 20,
    step: 0.1,
    digits: 2,
    // Reduced random frequency range for smoother default blobs
    rMin: 0.02,
    rMax: 0.35,
    default: 0.2
  },
  speed: {
    min: 20,
    max: 50,
    default: 20
  },
  processing: {
    min: 0.4,
    max: 1,
    default: 0.5
  },
  resolution: {
    min: 120,
    max: 220,
    default: 180,
    step: 1
  },
  skins: {
    tricolor: {
      wireframe: getRandomBoolean(0.1),
      lightPosition: { x: 1000, y: 2500, z: 200 },
      shininess: 100,
      color1: getRandomHexColor(),
      color2: getRandomHexColor(),
      color3: getRandomHexColor()
    },
    zebra: {
      wireframe: false,
      lightPosition: { x: 0, y: 500, z: 200 },
      shininess: 1000
    }
  }
};
