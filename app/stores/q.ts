import Kwami from '~/@kwami';

const useQStore = defineStore('q', {
  state: () => ({
    kwami: {} as Kwami,
    state: {
      blob: {
        vec: {
          x: 0,
          y: 0,
          z: 0
        },
        time: {
          x: 0,
          y: 0,
          z: 0
        },
        audio: {
          splitFreq: true,
          xFreq: 'low',
          yFreq: 'mid',
          zFreq: 'high',
          x: 0,
          y: 0,
          z: 0
        },
        color: {
          random: 0,
          x: '',
          y: '',
          z: ''
        }
      }
    }
  }),
  actions: {
    init (canvas: HTMLCanvasElement): void {
      this.kwami = new Kwami(canvas);
    }
  }
});

export default useQStore;
