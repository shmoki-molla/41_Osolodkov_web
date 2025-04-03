<template>
  <div class="api-block tasks-block">
    <h2>Задачи</h2>
    <form @submit.prevent="addTask" class="add-task-form">
      <input v-model="newTaskTitle" placeholder="Новая задача" required>
      <button type="submit">Добавить задачу</button>
    </form>
    
    <ul class="tasks-list">
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <div class="task-content">
          <input 
            type="checkbox" 
            v-model="task.completed"
            @change="toggleTask(task)"
          >
          <span>{{ task.title }}</span>
        </div>
        <button @click="deleteTask(task.id)" class="delete-task">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TasksAPI from '@/api/TasksAPI'

const tasks = ref([])
const newTaskTitle = ref('')

const loadTasks = async () => {
  tasks.value = await TasksAPI.get()
}

const addTask = async () => {
  const created = await TasksAPI.add(newTaskTitle.value)
  if (created) {
    tasks.value.push(created)
    newTaskTitle.value = ''
  }
}

const toggleTask = async (task) => {
  await TasksAPI.update({
    id: task.id,
    completed: task.completed
  })
}

const deleteTask = async (id) => {
  if (confirm('Удалить задачу?')) {
    await TasksAPI.delete(id)
    tasks.value = tasks.value.filter(t => t.id !== id)
  }
}

onMounted(loadTasks)
</script>

<style scoped>
.tasks-list {
  margin: 20px 0;
}

.tasks-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.tasks-list li:hover {
  transform: translateX(3px);
}

.tasks-list li.completed {
  position: relative;
  text-decoration: line-through;
  opacity: 0.7;
}

.tasks-list li.completed::after {
  content: "";
  position: absolute;
  left: 30px;
  right: 100px;
  top: 50%;
  height: 1px;
  background: #4a6fa5;
}

.task-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.tasks-list input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  cursor: pointer;
}

.add-task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.add-task-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-task-form button {
  padding: 10px;
  background-color: #4a6fa5;
  color: white;
  border-radius: 4px;
  border: none;
}

.add-task-form button:hover {
  background-color: #3a5a8a;
}
</style>