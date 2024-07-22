export function getRandomBetween (min = 0, max = 1, digits = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(digits));
}

export function getRandomHexColor (): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + randomColor.padStart(6, '0');
}

export function getRandomBoolean (trueProbability = 0.5): boolean {
  return Math.random() < trueProbability;
}
