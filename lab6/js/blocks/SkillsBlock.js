import Block from './Block.js';

export default class SkillsBlock extends Block {
  constructor(skills) {
    super();
    this.skills = skills;
  }

  render() {
    return `
      <div class="block skills-block">
        <h2>Навыки</h2>
        <ul>
          ${this.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}