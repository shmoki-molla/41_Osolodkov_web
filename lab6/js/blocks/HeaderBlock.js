import Block from './Block.js';

export default class HeaderBlock extends Block {
  constructor(name, title, photoUrl) {
    super();
    this.name = name;
    this.title = title;
    this.photoUrl = photoUrl;
  }

  render() {
    return `
      <div class="block header-block">
        <h1>${this.name}</h1>
        <p>${this.title}</p>
        ${this.photoUrl ? `<img src="${this.photoUrl}" alt="Фото" class="header-photo">` : ''}
      </div>
    `;
  }
}