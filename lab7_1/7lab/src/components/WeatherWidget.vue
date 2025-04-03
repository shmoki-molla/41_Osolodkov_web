<template>
  <div class="weather-widget">
    <h2>Погода в Москве</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="weather">
      <div class="weather-info">
        <img :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" 
             :alt="weather.weather[0].description">
        <div>
          <p>Температура: {{ Math.round(weather.main.temp) }}°C</p>
          <p>Ощущается как: {{ Math.round(weather.main.feels_like) }}°C</p>
          <p>Погода: {{ weather.weather[0].description }}</p>
          <p>Влажность: {{ weather.main.humidity }}%</p>
          <p>Ветер: {{ weather.wind.speed }} м/с</p>
        </div>
      </div>
    </div>
    <div v-else>Не удалось загрузить данные о погоде</div>
  </div>
</template>

<script>
import weatherAPI from '../api/weather'

export default {
  data() {
    return {
      weather: null,
      loading: true
    }
  },
  async created() {
    this.weather = await weatherAPI.getMoscowWeather()
    this.loading = false
  }
}
</script>

<style scoped>
.weather-widget {
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
  max-width: 400px;
  margin: 0 auto;
}
.weather-info {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>