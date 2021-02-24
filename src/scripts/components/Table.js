import '@styles/Table.scss';

export default class Table {
  constructor(status, cards = []) {
    this.status = status;
    this.cards = cards;

    this.buildView = this.buildView.bind(this);
  }

  buildView() {
    const cardsHTML = this.cards.reduce((prev, next) => prev + next.buildView(), '');

    return `<div class="dashboard__table table">
                    <div class="table__heading">
                        <h2>${this.status}</h2>
                        <img src="assets/add.svg" alt="add">
                    </div>
                    ${this.cards.length ? `<div class="table__cards">
                                              ${cardsHTML}
                                          </div>` : ''}
                </div>`;
  }
}
