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
    this.photoUrl = photoUrl;
  }

  render() {
    return `
      <div class="block header-block">
        <h1>${this.name}</h1>
        <p>${this.title}</p>
        ${this.photoUrl ? `<img src="${this.photoUrl}" alt="Фото" class="header-photo">` : ''}
        <button id="toggle-edit-mode">Включить редактирование</button>
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

const saveBlocks = () => {
  localStorage.setItem('blocks', JSON.stringify(blocks));
};


const loadBlocks = () => {
  const savedBlocks = localStorage.getItem('blocks');
  if (savedBlocks) {
    blocks = JSON.parse(savedBlocks);
  }
};

let editMode = false; 

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

  // Функция для перерисовки блоков
  const renderBlocks = () => {
    container.innerHTML = ''; 
    blocks.forEach((block, index) => {
      const blockHtml = block.render();
      const blockElement = document.createElement('div');
      blockElement.innerHTML = blockHtml;

      if (editMode) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => editBlock(index));
        blockElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteBlock(index));
        blockElement.appendChild(deleteButton);
      }

      container.appendChild(blockElement);
    });

    // Кнопка для добавления нового блока
    if (editMode) {
      const addBlockButton = document.createElement('button');
      addBlockButton.textContent = 'Добавить блок';
      addBlockButton.addEventListener('click', addNewBlock);
      container.appendChild(addBlockButton);
    }
  };

  // Функция для редактирования блока
  const editBlock = (index) => {
    const block = blocks[index];
    const newContent = prompt('Введите новое содержимое блока:', JSON.stringify(block));
    if (newContent) {
      Object.assign(block, JSON.parse(newContent));
      renderBlocks();
    }
  };

  // Функция для удаления блока
  const deleteBlock = (index) => {
    blocks.splice(index, 1);
    renderBlocks();
  };

  // Функция для добавления нового блока
  const addNewBlock = () => {
    const newBlock = new AboutBlock(['Новый блок']);
    blocks.push(newBlock);
    renderBlocks();
  };

  // Переключатель режима редактирования
  const toggleEditMode = () => {
    editMode = !editMode; 
    renderBlocks();

    const toggleButton = document.getElementById('toggle-edit-mode');
    if (toggleButton) {
      toggleButton.textContent = editMode ? 'Отключить редактирование' : 'Включить редактирование';
    }
  };

  renderBlocks();
  body.appendChild(container);

  document.addEventListener('click', (event) => {
    if (event.target.id === 'toggle-edit-mode') {
      toggleEditMode();
    }
  });
}

window.onload = buildSite;