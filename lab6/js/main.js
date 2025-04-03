import WeatherAPI from './api/WeatherAPI.js';
import QuotesAPI from './api/QuotesAPI.js';
import TasksAPI from './api/TasksAPI.js';
import { showNotification, hideNotification } from './services/notification.js';
import { setupQuotesHandlers } from './handlers/quotesHandlers.js';
import { setupTasksHandlers } from './handlers/tasksHandlers.js';
import HeaderBlock from './blocks/HeaderBlock.js';
import PhotoBlock from './blocks/PhotoBlock.js';
import AboutBlock from './blocks/AboutBlock.js';
import SkillsBlock from './blocks/SkillsBlock.js';
import AchievementsBlock from './blocks/AchievementsBlock.js';
import HobbiesBlock from './blocks/HobbiesBlock.js';

// Инициализация блоков профиля
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

// Функция показа профиля
function showProfile() {
  const container = document.querySelector('.container');
  container.innerHTML = blocks.map(block => block.render()).join('');
}

// Инициализация приложения
function initApp() {
  // Назначение обработчиков навигации
  document.getElementById('profile-btn').addEventListener('click', showProfile);
  
  document.getElementById('weather-btn').addEventListener('click', async () => {
    const container = document.querySelector('.container');
    container.innerHTML = await WeatherAPI.getFormatted();
  });

  document.getElementById('quotes-btn').addEventListener('click', async () => {
    const container = document.querySelector('.container');
    container.innerHTML = await QuotesAPI.getFormatted();
    setupQuotesHandlers(QuotesAPI);
  });

  document.getElementById('tasks-btn').addEventListener('click', async () => {
    const container = document.querySelector('.container');
    container.innerHTML = await TasksAPI.getFormatted();
    setupTasksHandlers(TasksAPI);
  });

  // Показ профиля по умолчанию
  showProfile();
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);