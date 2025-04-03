<template>
  <div class="api-block weather-block">
    <h2>Погода в {{ weatherData?.city || '...' }}</h2>
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else-if="weatherData">
      <div class="weather-info">
        <img :src="`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`" :alt="weatherData.description">
        <div class="temp">{{ weatherData.temp }}°C</div>
      </div>
      <p>Ощущается как: {{ weatherData.feelsLike }}°C</p>
      <p>{{ weatherData.description }}</p>
      <p>Влажность: {{ weatherData.humidity }}%</p>
      <p>Ветер: {{ weatherData.wind }} м/с</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WeatherAPI from '@/api/WeatherAPI'

const weatherData = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    weatherData.value = await WeatherAPI.get('Москва')
  } catch (err) {
    error.value = 'Не удалось получить данные о погоде'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.weather-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 15px 0;
}

.weather-info img {
  width: 80px;
  height: 80px;
}

.temp {
  font-size: 2rem;
  font-weight: bold;
}

.loading, .error {
  text-align: center;
  padding: 20px;
}
</style>