import axios from 'axios'

const API_KEY = '9dde149b1434441a8fcb3f338ebb4f46' // Замените на реальный ключ от NewsAPI
const BASE_URL = 'https://newsapi.org/v2/top-headlines'

export default {
  async getTechNews() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          country: 'ru',
          category: 'technology',
          apiKey: API_KEY,
          pageSize: 10
        }
      })
      return response.data.articles || this.getFallbackNews()
    } catch (error) {
      console.error('Error fetching news:', error)
      return this.getFallbackNews()
    }
  },
  getFallbackNews() {
    return [
      {
        title: "Не удалось загрузить новости",
        description: "Проверьте подключение к интернету и API ключ",
        url: "#",
        urlToImage: "https://via.placeholder.com/300",
        source: { name: "Системное уведомление" }
      }
    ]
  }
}