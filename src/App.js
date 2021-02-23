import emitter from '@services/EventEmitter';
import auth from './scripts/components/Auth';
import dashboard from './scripts/components/Dashboard';

export default class App {
  static init() {
    auth.render();
    dashboard.render();

    emitter.subscribe('authorized', auth.render);
    emitter.subscribe('dashboard', dashboard.render);
  }
}
