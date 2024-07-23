import { defineStore } from 'pinia'; // Ensure you have this import
import SpeechSynthesisRecorder from '~/@kwami/utils/recorder';

const useAudioStore = (audioFiles: string[]) => {
  return defineStore('audio', {
    state: () => ({
      instance: new Audio(audioFiles[0]) as HTMLAudioElement,
      frequencyData: new Uint8Array(),
      analyser: {} as AnalyserNode,
      file: 0,
      files: audioFiles
    }),
    actions: {
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
      },
      loadAudioSource (audioSrc: string): void {
        if (this.instance) {
          this.instance.src = audioSrc;
        }
      },
      loadAudioSourceFromBase64 (base64Audio: string): void {
        // Decode Base64 string to Uint8Array
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
      },
      initializeAudio (): void {
        if (!this.instance) { return; }
        const audioContext = new window.AudioContext();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        if (!this.analyser) {
          const sourceNode = audioContext.createMediaElementSource(
            this.instance);
          const analyser = audioContext.createAnalyser();
          sourceNode.connect(analyser);
          analyser.connect(audioContext.destination);
          this.analyser = analyser;
          this.frequencyData = new Uint8Array(analyser.frequencyBinCount);
        }
      },
      playAudio (): void {
        if (this.instance) {
          this.instance.play();
        }
      },
      pauseAudio (): void {
        if (this.instance) {
          this.instance.pause();
        }
      },
      getFrequencyData (): void {
        if (this.analyser && this.frequencyData) {
          this.analyser.getByteFrequencyData(this.frequencyData);
        }
      }
    }
  });
};

export default useAudioStore;
