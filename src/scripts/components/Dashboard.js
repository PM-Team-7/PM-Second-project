import StatusService from '@services/StatusService';
import CardService from '@services/CardService';
import Table from '@components/./Table';

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
    this.initTables();

    this.allCards = await CardService.getCards();

    this.dashboard.innerHTML = this.buildView();
  }

  initTables() {
    this.statuses.forEach((status) => {
      this.tables.push(new Table(status.title));
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
