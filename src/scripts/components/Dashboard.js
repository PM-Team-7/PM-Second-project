import StatusService from '@services/StatusService';
import CardService from '@services/CardService';
import Table from '@components/./Table';
import Card from '@components/./Card';

class Dashboard {
  constructor() {
    this.statuses = [];
    this.allCards = [];
    this.tables = [];

    this.dashboard = document.getElementById('dashboard');

    this.render = this.render.bind(this);
    this.initTables = this.initTables.bind(this);
    this.buildView = this.buildView.bind(this);
  }

  async render() {
    this.statuses = await StatusService.getStatuses();
    this.allCards = await CardService.getCards();

    this.initTables();

    this.dashboard.innerHTML = this.buildView();
  }

  initTables() {
    this.statuses.forEach((status) => {
      const cards = this.allCards.filter((card) => card.status === status.value);
      const cardArray = [];
      cards.forEach((card) => cardArray
        .push(new Card(card.id, card.title, card.description, card.created_at)));

      this.tables.push(new Table(status.title, cardArray));
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
