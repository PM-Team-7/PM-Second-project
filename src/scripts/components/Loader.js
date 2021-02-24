import '@styles/Loader.scss';

class Loader {
  constructor() {
    this.loader = document.getElementById('loader');

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.loader.classList.remove('hide');
  }

  hide() {
    this.loader.classList.add('hide');
  }
}

export default new Loader();
