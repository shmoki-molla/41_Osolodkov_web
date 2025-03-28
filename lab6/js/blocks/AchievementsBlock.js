import Block from './Block.js';

export default class AchievementsBlock extends Block {
  constructor(achievements) {
    super();
    this.achievements = achievements;
  }

  render() {
    return `
      <div class="block achievements-block">
        <h2>Достижения</h2>
        <ul>
          ${this.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}