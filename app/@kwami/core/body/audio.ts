import SpeechSynthesisRecorder from '~/@kwami/utils/recorder';

export default class KwamiAudio {
  instance: HTMLAudioElement;
  files: string[];
  file = 0;
  frequencyData = new Uint8Array();
  analyser: AnalyserNode | undefined;

  constructor (audioFiles: string[]) {
    this.instance = new Audio(audioFiles[this.file]);
    this.files = audioFiles;
    this.initializeAudio();
  }

  nextAudio (): void {
    this.file++;
    if (this.file >= this.files.length) {
      this.file = 0;
    }
    this.instance.src = this.files[this.file];
    this.instance.play();
  }

  prevAudio (): void {
    this.file--;
    if (this.file < 0) {
      this.file = this.files.length - 1;
    }
    this.instance.src = this.files[this.file];
    this.instance.play();
  }

  async setSpokenLanguage (text: string): Promise<void> {
    const recorder = new SpeechSynthesisRecorder({
      text,
      utteranceOptions: { lang: 'en-US' }
    });
    await recorder.start();
    const { data } = await recorder.blob();
    const audioURL = URL.createObjectURL(data);
    this.loadAudioSource(audioURL);
    if (this.instance) {
      this.instance.play();
    }
  }

  loadAudioSource (audioSrc: string): void {
    if (this.instance) {
      this.instance.src = audioSrc;
    }
  }

  loadAudioSourceFromBase64 (base64Audio: string): void {
    const byteCharacters = atob(base64Audio);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });
    const audioURL = URL.createObjectURL(blob);
    if (this.instance) {
      this.instance.src = audioURL;
    }
  }

  initializeAudio (): void {
    if (!this.instance || this.analyser) {
      return;
    }
    const audioContext = new window.AudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    const sourceNode = audioContext.createMediaElementSource(this.instance);
    const analyser = audioContext.createAnalyser();
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    this.analyser = analyser;
    this.frequencyData = new Uint8Array(analyser.frequencyBinCount);
  }

  playAudio (): void {
    if (this.instance) {
      this.instance.play();
    }
  }

  pauseAudio (): void {
    if (this.instance) {
      this.instance.pause();
    }
  }

  getFrequencyData (): Uint8Array {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.frequencyData);
    }
    return this.frequencyData;
  }
}
