import Block from './Block.js';

export default class AboutBlock extends Block {
  constructor(aboutText) {
    super();
    this.aboutText = aboutText;
  }

  render() {
    return `
      <div class="block about-block">
        <h2>О себе</h2>
        ${this.aboutText.map(text => `<p>${text}</p>`).join('')}
      </div>
    `;
  }
}