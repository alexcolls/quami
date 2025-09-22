export interface AudioData {
  analyser: AnalyserNode;
  frequencyData: Uint8Array;
}

export function getFrequencyData (
  audioInstance: HTMLAudioElement
): AudioData | undefined {
  if (audioInstance) { return; }
  const audioContext = new window.AudioContext();
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  const sourceNode = audioContext.createMediaElementSource(audioInstance);
  const analyser = audioContext.createAnalyser();
  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
  const frequencyData = new Uint8Array(analyser.frequencyBinCount);
  return {
    analyser,
    frequencyData
  };
}
