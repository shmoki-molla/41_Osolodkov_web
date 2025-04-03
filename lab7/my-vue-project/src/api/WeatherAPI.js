export default {
    API_KEY: '536257e2a346953a4934cdf07eec4b5e',
  
    async get(city = 'Москва') {
      try {
        // Проверка localStorage для кэширования
        const cacheKey = `weather_${city}`;
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Используем кэш, если данные не старше 10 минут
          if (Date.now() - timestamp < 600000) {
            return data;
          }
        }
  
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric&lang=ru`
        );
        const data = await response.json();
        
        if (data.cod === 200) {
          const result = {
            city: data.name,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            wind: data.wind.speed
          };
          
          // Сохраняем в кэш
          localStorage.setItem(cacheKey, JSON.stringify({
            data: result,
            timestamp: Date.now()
          }));
          
          return result;
        }
        throw new Error(data.message);
      } catch (error) {
        console.error('WeatherAPI error:', error);
        return null;
      }
    }
  };