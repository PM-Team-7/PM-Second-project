export default class Table {
  constructor(status, cards = []) {
    this.status = status;
    this.cards = cards;

    this.buildView = this.buildView.bind(this);
  }

  // addCard() {
  // }
  //
  // editCard() {
  // }
  //
  // removeCard() {
  // }

  buildView() {
    let cardsHTML = '';
    this.cards.forEach((card) => {
      cardsHTML += card.buildView();
    });

    return `<div class="dashboard__table">
                    <div class="dashboard__heading">
                        <h2>${this.status}</h2>
                        <img src="assets/add.svg" alt="add">
                    </div>
            
                    <div class="dashboard__cards">
                        ${cardsHTML}
                    </div>
                </div>`;
  }
}
