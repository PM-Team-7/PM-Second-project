import '@styles/Card.scss';

export default class Card {
  constructor(id, title, description, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;

    this.convertDate = this.convertDate.bind(this);
    this.buildView = this.buildView.bind(this);
  }

  convertDate() {
    const date = new Date(this.createdAt).toLocaleDateString();
    return date === 'Invalid Date' ? '' : date;
  }

  buildView() {
    return `<div class="dashboard__card">
                <div class="dashboard__card-heading">
                    <h3>${this.title}</h3>
                    
                    <div class="dashboard__card-icons">
                        <img src="assets/edit.svg" alt="edit">
                        <img src="assets/delete.svg" alt="delete">
                    </div>
                </div>

                <p class="dashboard__card-description">${this.description}</p>
                <p class="dashboard__card-date">${this.convertDate()}</p>
            </div>`;
  }
}
