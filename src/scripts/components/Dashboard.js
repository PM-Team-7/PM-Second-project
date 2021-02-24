import '@styles/Dashboard.scss';

import StatusService from '@services/StatusService';
import CardService from '@services/CardService';
import Table from '@components/./Table';
import Card from '@components/./Card';
import User from '@models/User';
import emitter from "@services/EventEmitter";

class Dashboard {
  constructor() {
    this.dashboard = document.getElementById('dashboard');
    this.tables = [];

    this.render = this.render.bind(this);
    this.initTables = this.initTables.bind(this);
    this.buildView = this.buildView.bind(this);
  }

  async render() {
    if (User.token) {
      this.showDashboard();

      emitter.emit('showLoader');

      const statuses = await StatusService.getStatuses();
      const allCards = await CardService.getCards();

      this.initTables(statuses, allCards);

      emitter.emit('hideLoader');
      this.dashboard.innerHTML = this.buildView();
    } else {
      this.hideDashboard();
    }
  }

  showDashboard() {
    this.dashboard.classList.remove('hide');
  }

  hideDashboard() {
    this.dashboard.classList.add('hide');
  }

  initTables(statuses, allCards) {
    statuses.forEach((status) => {
      const cardsFiltered = allCards
        .filter((card) => card.status === status.value)
        .map((card) => new Card(card.id, card.title, card.description ? card.description : '-', card.created_at))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      this.tables.push(new Table(status.title, cardsFiltered));
    });
  }

  buildView() {
    let tablesHTML = '';
    this.tables.forEach((table) => {
      tablesHTML += table.buildView();
    });

    return tablesHTML;
  }
}

export default new Dashboard();
