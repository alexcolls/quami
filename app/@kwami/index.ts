import KwamiBody from './core/body';

export default class Kwami {
  body: KwamiBody;
  mind: any;
  soul: any;
  constructor (canvas: HTMLCanvasElement) {
    this.body = new KwamiBody(canvas);
  }
}
