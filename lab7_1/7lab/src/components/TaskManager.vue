<template>
  <div class="task-manager">
    <h2>Менеджер задач</h2>
    
    <div class="task-form">
      <input 
        v-model="newTask.title" 
        placeholder="Новая задача"
        @keyup.enter="addTask"
      >
      <button @click="addTask" :disabled="!newTask.title.trim()">
        Добавить
      </button>
    </div>
    
    <div v-if="loading" class="loader">
      <div class="spinner"></div>
    </div>
    
    <div v-else>
      <div v-if="tasks.length === 0" class="empty-state">
        Нет задач. Добавьте первую!
      </div>
      
      <ul v-else class="task-list">
        <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <div class="task-content">
            <input 
              type="checkbox" 
              v-model="task.completed" 
              @change="updateTask(task)"
            >
            <span class="title">{{ task.title }}</span>
          </div>
          <div class="task-actions">
            <button @click="editTask(task)" class="edit-btn">
              ✏️
            </button>
            <button @click="deleteTask(task.id)" class="delete-btn">
              🗑️
            </button>
          </div>
        </li>
      </ul>
    </div>
    
    <div v-if="editingTask" class="edit-modal">
      <div class="modal-content">
        <h3>Редактирование задачи</h3>
        <input 
          v-model="editingTask.title" 
          ref="editInput"
          @keyup.enter="saveEdit"
        >
        <div class="modal-actions">
          <button @click="saveEdit" class="save-btn">Сохранить</button>
          <button @click="cancelEdit" class="cancel-btn">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import taskAPI from '../api/tasks'

export default {
  data() {
    return {
      tasks: [],
      newTask: { title: '', completed: false },
      loading: true,
      editingTask: null,
      error: null
    }
  },
  async created() {
    await this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await taskAPI.getTasks()
      } catch (error) {
        console.error('Ошибка загрузки задач:', error)
        this.error = 'Не удалось загрузить задачи'
      } finally {
        this.loading = false
      }
    },
    async addTask() {
      if (!this.newTask.title.trim()) return
      
      try {
        const task = await taskAPI.addTask(this.newTask)
        this.tasks.unshift(task)
        this.newTask.title = ''
      } catch (error) {
        console.error('Ошибка добавления:', error)
        alert('Не удалось добавить задачу')
      }
    },
    async updateTask(task) {
      try {
        await taskAPI.updateTask(task)
      } catch (error) {
        console.error('Ошибка обновления:', error)
        task.completed = !task.completed // Откатываем изменение
        alert('Не удалось обновить задачу')
      }
    },
    async deleteTask(id) {
      if (!confirm('Удалить задачу?')) return
      
      try {
        await taskAPI.deleteTask(id)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (error) {
        console.error('Ошибка удаления:', error)
        alert('Не удалось удалить задачу')
      }
    },
    editTask(task) {
      this.editingTask = { ...task }
      this.$nextTick(() => {
        this.$refs.editInput.focus()
      })
    },
    async saveEdit() {
      if (!this.editingTask.title.trim()) {
        alert('Название задачи не может быть пустым')
        return
      }
      
      try {
        await taskAPI.updateTask(this.editingTask)
        const index = this.tasks.findIndex(t => t.id === this.editingTask.id)
        this.tasks.splice(index, 1, this.editingTask)
        this.editingTask = null
      } catch (error) {
        console.error('Ошибка сохранения:', error)
        alert('Не удалось сохранить изменения')
      }
    },
    cancelEdit() {
      this.editingTask = null
    }
  }
}
</script>

<style scoped>
.task-manager {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
}

.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-form input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.task-form button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #666;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.task-list li:hover {
  background: #f9f9f9;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
}

.task-list li.completed .title {
  text-decoration: line-through;
  color: #888;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}

.delete-btn:hover {
  color: #ff4444;
}

.edit-btn:hover {
  color: #42b983;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content input {
  width: 100%;
  padding: 8px 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background: #42b983;
  color: white;
}

.cancel-btn {
  background: #f0f0f0;
}

.loader {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>