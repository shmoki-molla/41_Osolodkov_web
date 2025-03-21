class Block {
  constructor() {
    if (new.target === Block) {
      throw new Error("Block is an abstract class and cannot be instantiated directly.");
    }
  }

  render() {
    throw new Error("Method 'render' must be implemented.");
  }
}

class HeaderBlock extends Block {
  constructor(name, title, photoUrl) {
    super();
    this.name = name;
    this.title = title;
    this.photoUrl = photoUrl; // Новое свойство для фото
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

class PhotoBlock extends Block {
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

class AboutBlock extends Block {
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

class SkillsBlock extends Block {
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

class AchievementsBlock extends Block {
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

class HobbiesBlock extends Block {
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

function buildSite() {
  const blocks = [
    new HeaderBlock(
      "Элеонора Кольцова",
      "Заведующий кафедрой (Кафедра информационных компьютерных технологий)",
      "img/эдна.jpg" 
    ),
    new PhotoBlock("img/Koltsova-E.M.jpg", [
      "📌 Москва, ул. Героев Панфиловцев, 20",
      "📞 +7 (495) 495-21-26",
      "📧 koltsova.e.m@muctr.ru",
      "🌐 https://www.muctr.ru",
      "🐦 www.twitter.com/ye",
      "👤 facebook.com/ye"
    ]),
    new AboutBlock([
      "Раньше я шила костюмы для суперсемейки, а потом мне прострелили колено...",
      "Доктор технических наук, профессор"
    ]),
    new SkillsBlock(["вязание", "кроссворды", "математика", "готовка", "деменция"]),
    new AchievementsBlock([
      "Построила завод)",
      "крышка реактора взорвалась("
    ]),
    new HobbiesBlock(["Вязание", "Вязание", "Симптомы Альцгеймера", "Вязание", "Симптомы Альцгеймера"])
  ];

  const body = document.body;
  const container = document.createElement("div");
  container.className = "container";

  blocks.forEach(block => {
    container.innerHTML += block.render();
  });

  body.appendChild(container);
}

window.onload = buildSite;