import { ref } from 'vue';
import QuotesAPI from '@/api/QuotesAPI';
import TasksAPI from '@/api/TasksAPI';
import WeatherAPI from '@/api/WeatherAPI';

export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async (apiCall, ...args) => {
    loading.value = true;
    error.value = null;
    try {
      return await apiCall(...args);
    } catch (err) {
      error.value = err.message;
      console.error('API error:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    quotes: {
      get: () => fetchData(QuotesAPI.get),
      add: (quote) => fetchData(QuotesAPI.add, quote),
      update: (quote) => fetchData(QuotesAPI.update, quote),
      delete: (id) => fetchData(QuotesAPI.delete, id)
    },
    tasks: {
      get: () => fetchData(TasksAPI.get),
      add: (title) => fetchData(TasksAPI.add, title),
      update: (task) => fetchData(TasksAPI.update, task),
      delete: (id) => fetchData(TasksAPI.delete, id)
    },
    weather: {
      get: (city) => fetchData(WeatherAPI.get, city)
    }
  };
}