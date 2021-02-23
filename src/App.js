import auth from './scripts/components/Auth';
import emitter from '@services/EventEmitter';

export default class App {
  static init() {
    auth.render();

    emitter.subscribe('authorized', auth.render);
  }
}
