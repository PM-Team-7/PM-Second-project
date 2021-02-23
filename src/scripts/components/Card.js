class Card {
  constructor(id, title, status, description, createdAt) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.description = description;
    this.createdAt = createdAt;

    this.buildView = this.buildView.bind(this);
  }

  editCard() {
  }

  buildView() {
    return `<div class="dashboard__card">
                <div class="dashboard__card-heading">
                    <h3>${this.title}</h3>
                    <img src="assets/two-dots.svg" alt="add">
                </div>

                <p class="dashboard__card-description">${this.description}</p>
                <p class="dashboard__card-date">${this.createdAt}</p>
            </div>`;
  }
}
