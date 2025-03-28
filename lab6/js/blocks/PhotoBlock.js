import Block from './Block.js';

export default class PhotoBlock extends Block {
  constructor(photoUrl, contacts) {
    super();
    this.photoUrl = photoUrl;
    this.contacts = contacts;
  }

  render() {
    return `
      <div class="photo-block">
        <img src="${this.photoUrl}" alt="Фото">
        <div class="contacts">
          <h2>Контакты</h2>
          ${this.contacts.map(contact => `<p>${contact}</p>`).join('')}
        </div>
      </div>
    `;
  }
}