import Kwami from '~/@kwami/core/body';

const useQStore = defineStore('q', {
  persist: false,
  state: () => ({
    body: {} as Kwami,
    kwamiBackup: null as Kwami | null,
    isInit: false
  }),
  actions: {
    init (canvas: HTMLCanvasElement): void {
      if (this.kwamiBackup) {
        this.body = { ...this.kwamiBackup };
        return;
      }
      this.body = new Kwami(canvas);
      this.kwamiBackup = { ...this.body };
    }
  }
});

export default useQStore;
