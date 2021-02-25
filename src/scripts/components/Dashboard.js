/* eslint-disable import/no-cycle */
import '@styles/Dashboard.scss';

import StatusService from '@services/StatusService';
import CardService from '@services/CardService';
import Table from '@components/./Table';
import Card from '@components/./Card';
import User from '@models/User';
import emitter from '@services/EventEmitter';

class Dashboard {
  constructor({ rootElement }) {
    this.rootElement = rootElement;
    this.tablesView = document.getElementById('dashboard__tables');
    this.signOutBtn = document.getElementById('sign-out');
    
    this.tables = [];

    this.signOut = this.signOut.bind(this);
    this.updateTables = this.updateTables.bind(this);
    
    this.render = this.render.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.buildView = this.buildView.bind(this);
    this.registerListener = this.registerListener.bind(this);

    this.registerListener();
  }

  async render() {
    if (User.token) {
      emitter.emit('showLoader');

      this.statuses = await StatusService.getStatuses();
      const allCards = await CardService.getCards();

      this.tablesView.innerHTML = this.buildView();

      this.updateTables(this.statuses, allCards);
      this.tables.forEach((table) => table.render());

      emitter.emit('hideLoader');
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.rootElement.classList.remove('hide');
  }

  hide() {
    this.rootElement.classList.add('hide');
  }

  updateTables(statuses, allCards) {
    this.tables = statuses.map((status) => {
      const cardsFiltered = allCards
        .filter((card) => card.status === status.value)
        .map((card) => new Card({
          id: card.id,
          status,
          title: card.title,
          description: card.description ? card.description : '-',
          createdAt: card.created_at,
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return new Table({
        rootElement: document.getElementById(`table-${status.id}`),
        status,
        cards: cardsFiltered,
      });
    });
  }

  signOut() {
    User.token = null;
    this.tables = [];

    this.hide();

    emitter.emit('authorized');
  }

  registerListener() {
    this.signOutBtn.addEventListener('click', this.signOut);
  }

  buildView() {
    return this.statuses.reduce((prev, next) => prev + `<div id="table-${next.id}" class="dashboard__table table"></div>`, '');
  }
}

export default new Dashboard({
  rootElement: document.getElementById('dashboard'),
});
