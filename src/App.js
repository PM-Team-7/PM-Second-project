import emitter from '@services/EventEmitter';

import auth from '@components/Auth';
import dashboard from '@components/Dashboard';

export default class App {
  static init() {
    auth.render();
    dashboard.render();

    emitter.subscribe('authorized', auth.render);
    emitter.subscribe('dashboard', dashboard.render);
  }
}
