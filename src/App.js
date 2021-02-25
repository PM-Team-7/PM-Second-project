import emitter from '@services/EventEmitter';

import loader from '@components/Loader';
import auth from '@components/Auth';
import dashboard from '@components/Dashboard';

export default class App {
  static init() {
    emitter.subscribe('authorized', auth.render);
    emitter.subscribe('dashboard', dashboard.render);

    emitter.subscribe('showLoader', loader.show);
    emitter.subscribe('hideLoader', loader.hide);

    auth.render();
  }
}
