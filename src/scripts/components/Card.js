import '@styles/Card.scss';

export default class Card {
  constructor(id, title, description, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;

    this.editCard = this.editCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.convertDate = this.convertDate.bind(this);
    this.buildView = this.buildView.bind(this);
    this.registerListener = this.registerListener.bind(this);

    this.registerListener();
  }

  editCard(e) {
    console.log(e);
  }

  deleteCard(e) {
    console.log(e);
  }

  convertDate() {
    const date = new Date(this.createdAt).toLocaleDateString();
    return date === 'Invalid Date' ? '' : date;
  }

  buildView() {
    return `<div class="card">
                <div class="card__heading">
                    <h3>${this.title}</h3>
                    
                    <div class="card__icons">
                        <img class="edit-icon" src="assets/edit.svg" alt="edit">
                        <img class="delete-icon" src="assets/delete.svg" alt="delete">
                    </div>
                </div>

                <p class="card__description">${this.description}</p>
                <p class="card__date">${this.convertDate()}</p>
            </div>`;
  }

  registerListener() {
    Array.from(document.getElementsByClassName('edit-icon')).forEach((item) => {
      item.addEventListener('click', this.editCard);
    });

    Array.from(document.getElementsByClassName('delete-icon')).forEach((item) => {
      item.addEventListener('click', this.deleteCard);
    });
  }
}
