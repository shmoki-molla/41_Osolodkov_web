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
    return JSON.parse(savedBlocks);
  }
  return null;
};

let editMode = false;
let blocks = [
  new HeaderBlock(
    "Элеонора Кольцова",
    "Заведующий кафедрой (Кафедра информационных компьютерных технологий)",
    "img/эдна.jpg"
  ),
  // ... (остальные блоки остаются без изменений) ...
];

// API сервисы
const apiServices = {
  // 1. Погода (OpenWeatherMap API)
  async getWeather(city = 'Москва') {
    showNotification('Загружаем данные о погоде...');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=536257e2a346953a4934cdf07eec4b5e&units=metric&lang=ru`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        return `
          <div class="api-block weather-block">
            <h2>Погода в ${data.name}</h2>
            <div class="weather-info">
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
              <div class="temp">${Math.round(data.main.temp)}°C</div>
            </div>
            <p>Ощущается как: ${Math.round(data.main.feels_like)}°C</p>
            <p>${data.weather[0].description}</p>
            <p>Влажность: ${data.main.humidity}%</p>
            <p>Ветер: ${data.wind.speed} м/с</p>
          </div>
        `;
      }
      throw new Error(data.message);
    } catch (error) {
      console.error('Ошибка получения погоды:', error);
      return '<div class="api-block"><p>Не удалось получить данные о погоде</p></div>';
    } finally {
      hideNotification();
    }
  },

  // 2. Цитаты (используем JSON Server для полного CRUD)
  async getQuotes() {
    showNotification('Загружаем цитаты...');
    try {
      // Получаем цитаты из localStorage
      const savedQuotes = localStorage.getItem('quotes');
      const quotes = savedQuotes ? JSON.parse(savedQuotes) : [
        {id: 1, text: "Жизнь — это то, что происходит, пока ты строишь планы.", author: "Джон Леннон"},
        {id: 2, text: "Будь самим собой, все остальные роли уже заняты.", author: "Оскар Уайльд"}
      ];
      
      return `
        <div class="api-block quotes-block">
          <h2>Цитаты</h2>
          <div class="quotes-list">
            ${quotes.map(quote => `
              <div class="quote-item" data-id="${quote.id}">
                <p>"${quote.text}"</p>
                <small>— ${quote.author}</small>
                <div class="quote-actions">
                  <button class="edit-quote">Изменить</button>
                  <button class="delete-quote">Удалить</button>
                </div>
              </div>
            `).join('')}
          </div>
          <form id="add-quote-form">
            <input type="text" placeholder="Текст цитаты" required>
            <input type="text" placeholder="Автор" required>
            <button type="submit">Добавить цитату</button>
          </form>
        </div>
      `;
    } catch (error) {
      console.error('Ошибка получения цитат:', error);
      return '<div class="api-block"><p>Не удалось загрузить цитаты</p></div>';
    } finally {
      hideNotification();
    }
  },

  async addQuote(newQuote) {
    showNotification('Добавляем цитату...');
    try {
      const savedQuotes = localStorage.getItem('quotes');
      const quotes = savedQuotes ? JSON.parse(savedQuotes) : [];
      const newId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1;
      const quoteToAdd = {id: newId, ...newQuote};
      quotes.push(quoteToAdd);
      localStorage.setItem('quotes', JSON.stringify(quotes));
      showNotification('Цитата добавлена!');
      return quoteToAdd;
    } catch (error) {
      console.error('Ошибка добавления цитаты:', error);
      showNotification('Ошибка при добавлении цитаты');
      return null;
    }
  },

  async updateQuote(updatedQuote) {
    showNotification('Обновляем цитату...');
    try {
      const savedQuotes = localStorage.getItem('quotes');
      const quotes = savedQuotes ? JSON.parse(savedQuotes) : [];
      const index = quotes.findIndex(q => q.id === updatedQuote.id);
      if (index !== -1) {
        quotes[index] = updatedQuote;
        localStorage.setItem('quotes', JSON.stringify(quotes));
        showNotification('Цитата обновлена!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Ошибка обновления цитаты:', error);
      showNotification('Ошибка при обновлении цитаты');
      return false;
    }
  },

  async deleteQuote(id) {
    showNotification('Удаляем цитату...');
    try {
      const savedQuotes = localStorage.getItem('quotes');
      const quotes = savedQuotes ? JSON.parse(savedQuotes) : [];
      const filteredQuotes = quotes.filter(q => q.id !== id);
      localStorage.setItem('quotes', JSON.stringify(filteredQuotes));
      showNotification('Цитата удалена!');
      return true;
    } catch (error) {
      console.error('Ошибка удаления цитаты:', error);
      showNotification('Ошибка при удалении цитаты');
      return false;
    }
  },

  // 3. Задачи (используем JSONPlaceholder для демонстрации)
  async getTasks() {
    showNotification('Загружаем задачи...');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      const tasks = await response.json();
      
      return `
        <div class="api-block tasks-block">
          <h2>Задачи</h2>
          <ul class="tasks-list">
            ${tasks.map(task => `
              <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.title}</span>
                <button class="delete-task">Удалить</button>
              </li>
            `).join('')}
          </ul>
          <form id="add-task-form">
            <input type="text" placeholder="Новая задача" required>
            <button type="submit">Добавить</button>
          </form>
        </div>
      `;
    } catch (error) {
      console.error('Ошибка получения задач:', error);
      return '<div class="api-block"><p>Не удалось загрузить задачи</p></div>';
    } finally {
      hideNotification();
    }
  },

  async addTask(title) {
    showNotification('Добавляем задачу...');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          completed: false,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const newTask = await response.json();
      showNotification('Задача добавлена!');
      return newTask;
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
      showNotification('Ошибка при добавлении задачи');
      return null;
    }
  },

  async deleteTask(id) {
    showNotification('Удаляем задачу...');
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      showNotification('Задача удалена!');
      return true;
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
      showNotification('Ошибка при удалении задачи');
      return false;
    }
  }
};

// Обновляем обработчики для задач
function setupTasksHandlers() {
  // Обработчик добавления задачи
  const addForm = document.getElementById('add-task-form');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = e.target.querySelector('input');
      const title = input.value.trim();
      
      if (title) {
        const newTask = await apiServices.addTask(title);
        if (newTask) {
          // Добавляем новую задачу в список (без перезагрузки)
          const tasksList = document.querySelector('.tasks-list');
          const newTaskElement = document.createElement('li');
          newTaskElement.className = '';
          newTaskElement.dataset.id = newTask.id;
          newTaskElement.innerHTML = `
            <input type="checkbox">
            <span>${newTask.title}</span>
            <button class="delete-task">Удалить</button>
          `;
          tasksList.appendChild(newTaskElement);
          
          // Добавляем обработчики для новой задачи
          newTaskElement.querySelector('.delete-task').addEventListener('click', deleteTaskHandler);
          newTaskElement.querySelector('input[type="checkbox"]').addEventListener('change', toggleTaskStatus);
        }
        input.value = '';
      }
    });
  }

  // Обработчик удаления задачи
  const deleteTaskHandler = async (e) => {
    const taskItem = e.target.closest('li');
    const taskId = taskItem.dataset.id;
    
    const success = await apiServices.deleteTask(taskId);
    if (success) {
      taskItem.remove();
    }
  };

  // Обработчик изменения статуса задачи
  const toggleTaskStatus = (e) => {
    const taskItem = e.target.closest('li');
    taskItem.classList.toggle('completed', e.target.checked);
  };

  // Назначаем обработчики для существующих задач
  document.querySelectorAll('.delete-task').forEach(button => {
    button.addEventListener('click', deleteTaskHandler);
  });

  document.querySelectorAll('.tasks-list input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', toggleTaskStatus);
  });
}

// Обработчики для цитат
function setupQuotesHandlers() {
  // Добавление новой цитаты
  document.getElementById('add-quote-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputs = e.target.elements;
    const text = inputs[0].value.trim();
    const author = inputs[1].value.trim();
    
    if (text && author) {
      const newQuote = await apiServices.addQuote({text, author});
      if (newQuote) {
        // Обновляем список без перезагрузки
        const quotesList = document.querySelector('.quotes-list');
        const quoteElement = document.createElement('div');
        quoteElement.className = 'quote-item';
        quoteElement.dataset.id = newQuote.id;
        quoteElement.innerHTML = `
          <p>"${newQuote.text}"</p>
          <small>— ${newQuote.author}</small>
          <div class="quote-actions">
            <button class="edit-quote">Изменить</button>
            <button class="delete-quote">Удалить</button>
          </div>
        `;
        quotesList.appendChild(quoteElement);
        setupQuoteItemHandlers(quoteElement);
        inputs[0].value = '';
        inputs[1].value = '';
      }
    }
  });

  // Назначаем обработчики для существующих цитат
  document.querySelectorAll('.quote-item').forEach(item => {
    setupQuoteItemHandlers(item);
  });
}

// Обработчики для отдельной цитаты
function setupQuoteItemHandlers(item) {
  // Удаление цитаты
  item.querySelector('.delete-quote')?.addEventListener('click', async () => {
    const id = parseInt(item.dataset.id);
    const success = await apiServices.deleteQuote(id);
    if (success) {
      item.remove();
    }
  });

  // Редактирование цитаты
  item.querySelector('.edit-quote')?.addEventListener('click', async () => {
    const id = parseInt(item.dataset.id);
    const text = item.querySelector('p').textContent.replace(/^"|"$/g, '');
    const author = item.querySelector('small').textContent.replace(/^— /, '');
    
    const newText = prompt('Текст цитаты:', text);
    if (newText === null) return;
    
    const newAuthor = prompt('Автор:', author);
    if (newAuthor === null) return;

    const success = await apiServices.updateQuote({
      id,
      text: newText,
      author: newAuthor
    });
    
    if (success) {
      item.querySelector('p').textContent = `"${newText}"`;
      item.querySelector('small').textContent = `— ${newAuthor}`;
    }
  });
}

// Уведомления
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
}

function hideNotification() {
  const notification = document.getElementById('notification');
  notification.classList.remove('show');
}

// Основная функция построения сайта
function buildSite() {
  const container = document.querySelector('.container');
  

  // Функция для отображения профиля
  const showProfile = () => {
    container.innerHTML = '';
    blocks.forEach(block => {
      container.innerHTML += block.render();
    });
    setupEditMode();
  };

  // Обработчики навигации
  document.getElementById('profile-btn').addEventListener('click', showProfile);
  document.getElementById('weather-btn').addEventListener('click', async () => {
    container.innerHTML = await apiServices.getWeather();
  });
  document.getElementById('quotes-btn').addEventListener('click', async () => {
    container.innerHTML = await apiServices.getQuotes();
    setupQuotesHandlers();
  });
  document.getElementById('tasks-btn').addEventListener('click', async () => {
    container.innerHTML = await apiServices.getTasks();
    setupTasksHandlers();
  });
  document.getElementById('tasks-btn').addEventListener('click', async () => {
    container.innerHTML = await apiServices.getTasks();
    setupTasksHandlers();
  });

  // Показываем профиль по умолчанию
  showProfile();
}

// Запуск при загрузке страницы
window.onload = buildSite;