<template>
  <div class="block about-block">
    <h2>О себе</h2>
    <p v-for="(text, index) in items" :key="index">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.about-block {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1 1 300px;
}

.about-block h2 {
  color: #4a6fa5;
  margin-bottom: 15px;
  text-align: center;
}

.about-block p {
  margin-bottom: 8px;
  color: #333;
}
</style>