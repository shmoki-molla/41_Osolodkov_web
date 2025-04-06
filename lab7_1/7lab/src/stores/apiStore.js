import { defineStore } from 'pinia'
import weatherAPI from '@/api/weather'
import newsAPI from '@/api/news'
import taskAPI from '@/api/tasks'

export const useApiStore = defineStore('api', {
  state: () => ({
    weather: null,
    articles: [],
    tasks: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchWeather() {
      this.loading = true
      try {
        this.weather = await weatherAPI.getMoscowWeather()
      } catch (error) {
        this.error = 'Ошибка загрузки погоды'
      } finally {
        this.loading = false
      }
    },
    async fetchNews() {
      this.loading = true
      try {
        this.articles = await newsAPI.getTechNews()
      } catch (error) {
        this.error = 'Ошибка загрузки новостей'
        this.articles = newsAPI.getFallbackNews()
      } finally {
        this.loading = false
      }
    },
    async fetchTasks() {
      this.loading = true
      try {
        this.tasks = await taskAPI.getTasks()
      } catch (error) {
        this.error = 'Ошибка загрузки задач'
      } finally {
        this.loading = false
      }
    },
    async addTask(task) {
      try {
        const newTask = await taskAPI.addTask(task)
        this.tasks.unshift(newTask)
      } catch (error) {
        this.error = 'Ошибка добавления задачи'
      }
    },
    async updateTask(task) {
      try {
        await taskAPI.updateTask(task)
        const index = this.tasks.findIndex(t => t.id === task.id)
        this.tasks.splice(index, 1, task)
      } catch (error) {
        this.error = 'Ошибка обновления задачи'
      }
    },
    async deleteTask(id) {
      try {
        await taskAPI.deleteTask(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (error) {
        this.error = 'Ошибка удаления задачи'
      }
    }
  }
})