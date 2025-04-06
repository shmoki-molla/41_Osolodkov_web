import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import focusDirective from '@/directives/focus'

const app = createApp(App)
app.directive('focus', focusDirective)
app.use(createPinia())
app.use(router)
app.mount('#app')