/* eslint-disable import/no-cycle */
import '@styles/Card.scss';

import Modals from '@components/Modals';

import Dashboard from '@components/Dashboard';
import CardService from '@services/CardService';
import emitter from '@services/EventEmitter';

export default class Card {
  constructor({
    id,
    title,
    status,
    description,
    createdAt,
  }) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.description = description;
    this.createdAt = createdAt;

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);

    this.convertDate = this.convertDate.bind(this);
    this.render = this.render.bind(this);
    this.buildView = this.buildView.bind(this);
    this.registerListener = this.registerListener.bind(this);
  }

  async edit() {
    const { newTitle, newDescription, newStatus } = await Modals.editCard({
      title: this.title,
      description: this.description,
    });

    const response = await CardService.putCard(this.id, {
      title: newTitle,
      description: newDescription,
      status: newStatus,
    });

    if (response) {
      this.id = response.id;
      this.title = response.title;
      this.description = response.description;
      this.createdAt = response.created_at;

      if (this.status.value === newStatus) {
        this.render();
      } else {
        emitter.emit(`table-${Dashboard.statuses.find((status) => status.value === newStatus).id}:moveCard`, this);
      }
    }
  }

  async delete() {
    const response = CardService.deleteCard(this.id);

    if (response) {
      emitter.emit(`table-${this.status.id}:deleteCard`, this.id);
    }
  }

  convertDate() {
    const date = new Date(this.createdAt).toLocaleDateString();
    return date === 'Invalid Date' ? '' : date;
  }

  render() {
    if (this.rootElement) {
      this.rootElement.innerHTML = this.buildView();

      this.editBtn = this.rootElement.querySelector('.edit-icon');
      this.deleteBtn = this.rootElement.querySelector('.delete-icon');

      this.registerListener();
    }
  }

  buildView() {
    return `<div class="card__heading">
                <h3>${this.title}</h3>
                
                <div class="card__icons">
                    <img class="edit-icon" src="assets/edit.svg" alt="edit">
                    <img class="delete-icon" src="assets/delete.svg" alt="delete">
                </div>
            </div>

            <p class="card__description">${this.description}</p>
            <p class="card__date">${this.convertDate()}</p>`;
  }

  registerListener() {
    this.deleteBtn.addEventListener('click', this.delete);
    this.editBtn.addEventListener('click', this.edit);
  }
}
