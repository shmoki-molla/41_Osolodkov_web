<template>
  <div class="news-feed">
    <h2>Последние новости технологий</h2>
    
    <!-- Статус загрузки -->
    <div v-if="apiStore.loading" class="loader">
      <div class="spinner"></div>
      <p>Загрузка новостей...</p>
    </div>
    
    <!-- Ошибка загрузки -->
    <div v-else-if="apiStore.error" class="error-message">
      Ошибка: {{ apiStore.error }}
    </div>
    
    <!-- Проверка наличия данных в хранилище -->
    <div v-else-if="!hasArticles" class="no-data">
      Новости не найдены. Попробуйте обновить страницу.
    </div>
    
    <!-- Проверка валидности полученных данных -->
    <div v-else class="news-grid">
      <div v-for="(article, index) in validArticles" :key="index" class="news-card">
        <h3>{{ article.title || 'Без названия' }}</h3>
        <img 
          v-if="article.urlToImage" 
          :src="article.urlToImage" 
          :alt="article.title"
          @error="handleImageError"
        >
        <img v-else src="https://via.placeholder.com/300x200?text=No+Image" alt="Нет изображения">
        <div class="content">
          <p>{{ article.description || 'Нет описания' }}</p>
          <div class="footer">
            <a 
              v-if="article.url" 
              :href="article.url" 
              target="_blank" 
              rel="noopener"
            >
              Читать далее
            </a>
            <span v-else>Ссылка недоступна</span>
            <span class="source">
              {{ article.source?.name || 'Источник неизвестен' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useApiStore } from '@/stores/apiStore'
import { computed } from 'vue'

export default {
  methods: {
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
    }
  },
  setup() {
    const apiStore = useApiStore()
    
    // Загружаем новости при создании компонента
    if (!apiStore.articles.length) {
      apiStore.fetchNews()
    }

    // Проверяем наличие данных в хранилище
    const hasArticles = computed(() => {
      return apiStore.articles?.length > 0
    })

    // Фильтруем только статьи с минимально необходимыми данными
    const validArticles = computed(() => {
      return apiStore.articles.filter(article => {
        return article && (article.title || article.description)
      })
    })

    return { 
      apiStore,
      hasArticles,
      validArticles
    }
  }
}
</script>


<style scoped>
/* Стили остаются без изменений */
.news-feed {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 40px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.news-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.content {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
}

.news-card a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.news-card a:hover {
  text-decoration: underline;
}

.source {
  font-size: 0.8em;
  color: #666;
}
</style>