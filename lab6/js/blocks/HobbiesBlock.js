import Block from './Block.js';

export default class HobbiesBlock extends Block {
  constructor(hobbies) {
    super();
    this.hobbies = hobbies;
  }

  render() {
    return `
      <div class="block hobbies-block">
        <h2>Увлечения</h2>
        <ul>
          ${this.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}