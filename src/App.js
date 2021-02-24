import emitter from '@services/EventEmitter';
import loader from '@components/Loader';
import auth from './scripts/components/Auth';
import dashboard from './scripts/components/Dashboard';

export default class App {
  static init() {
    emitter.subscribe('authorized', auth.render);
    emitter.subscribe('dashboard', dashboard.render);

    emitter.subscribe('showLoader', loader.show);
    emitter.subscribe('hideLoader', loader.hide);

    auth.render();
    dashboard.render();
  }
}
