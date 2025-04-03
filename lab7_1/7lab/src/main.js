import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'  // Импорт роутера

const app = createApp(App)
app.use(createPinia())
app.use(router)  // Подключение роутера
app.mount('#app')