/* eslint-disable import/no-cycle */
import '@styles/Table.scss';

import Modals from '@components/Modals';

import CardService from '@services/CardService';
import Card from '@components/Card';
import emitter from '@services/EventEmitter';

export default class Table {
  constructor({ rootElement, status, cards = [] }) {
    this.rootElement = rootElement;
    this.id = status.id;
    this.status = status;
    this.cards = cards;

    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.render = this.render.bind(this);
    this.buildView = this.buildView.bind(this);
    this.registerListener = this.registerListener.bind(this);
  }

  async addCard() {
    const data = await Modals.createCard();

    if (!data) return;

    const { newTitle, newDescription } = data;

    const response = await CardService.postCard({
      title: newTitle,
      description: newDescription,
      status: this.status.value,
    });

    if (response) {
      this.cards.unshift(new Card({
        id: response.id,
        status: this.status,
        title: response.title,
        description: response.description ? response.description : '-',
        createdAt: response.created_at,
      }));

      this.render();
    }
  }

  deleteCard(id) {
    this.cards = this.cards.filter((card) => card.id !== id);
  }

  render() {
    this.rootElement.innerHTML = this.buildView();

    this.addBtn = document.getElementById(`table-${this.id}-add-btn`);

    this.cards.forEach((card) => {
      card.rootElement = document.getElementById(`table-${this.id}-card-${card.id}`);
      card.render();
    });

    this.registerListener();
  }

  buildView() {
    const cardsHTML = this.cards.reduce((prev, next) => prev + `<div id="table-${this.id}-card-${next.id}" class="card"></div>`, '');

    return `<div class="table__heading">
              <h2>${this.status.title}</h2>
              <img id="table-${this.id}-add-btn" src="assets/add.svg" alt="add">
            </div>
            ${this.cards.length ? `<div class="table__cards">
                                      ${cardsHTML}
                                  </div>` : ''}`;
  }

  registerListener() {
    this.addBtn.addEventListener('click', this.addCard);
    this.cards.forEach((card) => card.registerListener());

    emitter.subscribe(`table-${this.status.id}:moveCard`, (card) => {
      emitter.emit(`table-${card.status.id}:deleteCard`, card.id);

      card.status = this.status;
      this.cards.unshift(card);
      this.render();
    });

    emitter.subscribe(`table-${this.status.id}:deleteCard`, (id) => {
      this.deleteCard(id);
      this.render();
    });
  }
}
