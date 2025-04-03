<template>
  <nav class="main-nav">
    <button @click="$emit('change-view', 'profile')">Профиль</button>
    <button @click="$emit('change-view', 'weather')">Погода</button>
    <button @click="$emit('change-view', 'quotes')">Цитаты</button>
    <button @click="$emit('change-view', 'tasks')">Задачи</button>
  </nav>
</template>

<script setup>
defineEmits(['change-view'])
</script>

<style scoped>
.main-nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-nav button {
  padding: 10px 20px;
  background-color: #4a6fa5;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.main-nav button:hover {
  background-color: #3a5a8a;
  transform: translateY(-2px);
}
</style>