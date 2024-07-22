import { getRandomBetween, getRandomHexColor } from '../utils/randoms';

interface BLOBFORM {
  SPEED: number;
  SPIKES: number;
  SPIKES2: number;
  SPIKES3: number;
  ENERGY: number;
  ENERGY2: number;
  ENEGRY3: number;
  TEXTURE: number;
  TEXTURE2: number;
  TEXTURE3: number;
  SKIN: string[];
}

export default function getBodySettings (): BLOBFORM {
  return {
    SPEED: getRandomBetween(10, 0, 100),
    SPIKES: getRandomBetween(0.2, 1.7),
    SPIKES2: getRandomBetween(0.2, 1.7),
    SPIKES3: getRandomBetween(0.2, 1.7),
    ENERGY: getRandomBetween(0.5, 1),
    ENERGY2: getRandomBetween(0.5, 1),
    ENEGRY3: getRandomBetween(0.5, 1),
    TEXTURE: getRandomBetween(-1, 50, 0),
    TEXTURE2: getRandomBetween(-1, 50, 0),
    TEXTURE3: getRandomBetween(-1, 50, 0),
    SKIN: getBodyColors()
  };
}

export function getBodyColors (): string[] {
  return [getRandomHexColor(), getRandomHexColor(), getRandomHexColor()];
}
