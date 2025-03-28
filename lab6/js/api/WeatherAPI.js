export default {
    API_KEY: '536257e2a346953a4934cdf07eec4b5e',
    
    async get(city = 'Москва') {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=ru`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
          return {
            city: data.name,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind: data.wind.speed
          };
        }
        throw new Error(data.message);
      } catch (error) {
        console.error('WeatherAPI error:', error);
        return null;
      }
    },
    
    async getFormatted(city) {
      const data = await this.get(city);
      if (!data) return '<div class="api-block"><p>Не удалось получить данные о погоде</p></div>';
      
      return `
        <div class="api-block weather-block">
          <h2>Погода в ${data.city}</h2>
          <div class="weather-info">
            <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">
            <div class="temp">${data.temp}°C</div>
          </div>
          <p>Ощущается как: ${data.feelsLike}°C</p>
          <p>${data.description}</p>
          <p>Влажность: ${data.humidity}%</p>
          <p>Ветер: ${data.wind} м/с</p>
        </div>
      `;
    }
  };