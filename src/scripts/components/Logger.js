import '@styles/Logger.scss';

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

    this.messageList = [];

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.render = this.render.bind(this);
    this.buildView = this.buildView.bind(this);
    this.registerListener = this.registerListener.bind(this);

    this.registerListener();
  }

  show(message, type = 'error', time = 2000) {
    this.addMessage(message, type, time);

    this.rootElement.classList.add('log-message_show');
    this.render();
  }

  hide() {
    this.rootElement.classList.remove('log-message_show');
  }

  addMessage(message, type = 'error', time = 2000) {
    const id = (this.messageList[this.messageList.length - 1]?.id + 1) || 0;

    this.messageList = this.messageList.slice(-4);
    this.messageList.push({
      id,
      message,
      type: messageTypes.includes(type) ? type : 'default',
      timeoutId: setTimeout(() => {
        this.messageList = this.messageList.filter((value) => value.id !== id);
        !this.messageList.length && this.hide();
        this.render();
      }, time),
    });
  }

  render() {
    this.rootElement.innerHTML = this.buildView();
  }

  buildView() {
    return this.messageList.reduce((prev, next) => {
      return prev += `<div class="log-message__text-wrap log-message_type-${next.type}">
                        <div class="log-message__text"><div>${next.message}</div></div>
                      </div>`;
    }, '');
  }

  registerListener() {
    this.rootElement.addEventListener('click', this.hide);
  }
}

export default new LogMessage({
  rootElement: document.getElementById('log-message'),
});
