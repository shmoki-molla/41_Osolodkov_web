let tasks = [
  { id: 1, title: "Пример задачи 1", completed: false },
  { id: 2, title: "Пример задачи 2", completed: true }
]

export default {
  async getTasks() {
    return new Promise(resolve => {
      setTimeout(() => resolve([...tasks]), 300) 
    })
  },
  async addTask(task) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newTask = {
          id: Math.max(0, ...tasks.map(t => t.id)) + 1,
          title: task.title.trim(),
          completed: false
        }
        tasks.push(newTask)
        resolve(newTask)
      }, 300)
    })
  },
  async updateTask(updatedTask) {
    return new Promise(resolve => {
      setTimeout(() => {
        tasks = tasks.map(t => 
          t.id === updatedTask.id ? updatedTask : t
        )
        resolve(updatedTask)
      }, 300)
    })
  },
  async deleteTask(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id)
        resolve()
      }, 300)
    })
  }
}