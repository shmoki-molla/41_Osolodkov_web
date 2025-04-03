<template>
  <div class="app">
    <AppNavigation @change-view="changeView" />
    <component :is="currentView" />
    <Notification :message="notification.message" :show="notification.show" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppNavigation from '@/components/AppNavigation.vue'
import Notification from '@/components/Notification.vue'
import ProfileView from '@/views/ProfileView.vue'
import WeatherView from '@/views/WeatherView.vue'
import QuotesView from '@/views/QuotesView.vue'
import TasksView from '@/views/TasksView.vue'

const currentView = ref(ProfileView)
const notification = ref({
  message: '',
  show: false
})

const changeView = (view) => {
  currentView.value = {
    'profile': ProfileView,
    'weather': WeatherView,
    'quotes': QuotesView,
    'tasks': TasksView
  }[view]
}

const showNotification = (message) => {
  notification.value = { message, show: true }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

defineExpose({ showNotification })
</script>

<style>
.app {
  background-image: url('@/assets/img/арбузы.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20px;
  color: #333;
  font-family: 'Arial', sans-serif;
}
</style>