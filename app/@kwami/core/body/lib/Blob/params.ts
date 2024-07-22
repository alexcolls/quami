import { getRandomHexColor, getRandomBoolean } from '../../../../utils/randoms';

export default {
  body: {
    spikes: {
      min: 0.2,
      max: 6,
      default: 1
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
      default: 120
    }
  },
  skins: {
    tricolor: {
      wireframe: getRandomBoolean(0.1),
      lightPosition: { x: 0, y: 500, z: 200 },
      shininess: 1000,
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
