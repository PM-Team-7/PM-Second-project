import '@styles/LogMessage.scss';

const messageTypes = [
  'default',
  'error',
  'warning',
  'info',
];

class LogMessage {
  constructor({ rootElement }) {
    this.rootElement = rootElement;
    this.rootElement.classList.add('log-message');

    this.message = '';
    this.type = 'default';

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.render = this.render.bind(this);
    this.buildView = this.buildView.bind(this);
  }

  show(message, type = 'error', time = 2000) {
    this.message = message;
    this.type = type;

    this.render();

    this.rootElement.classList.add('log-message_show');

    setTimeout(this.hide, time);
  }

  hide() {
    this.rootElement.classList.remove('log-message_show');
  }

  render() {
    this.rootElement.innerHTML = this.buildView();
  }

  buildView() {
    return `<div class="log-message__text-wrap log-message_type-${messageTypes.includes(this.type) ? this.type : 'default'}">
              <div class="log-message__text"><div>${this.message}</div></div>
            </div>`;
  }
}

export default new LogMessage({
  rootElement: document.getElementById('log-message'),
})