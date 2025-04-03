<template>
  <div class="block header-block">
    <h1>{{ name }}</h1>
    <p>{{ position }}</p>
    <img :src="getImageUrl(photo)" alt="Фото" class="header-photo">
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  name: String,
  position: String,
  photo: String
})

const getImageUrl = (name) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href
}
</script>

<style scoped>
.header-block {
  text-align: center;
  background: linear-gradient(135deg, rgba(74, 111, 165, 0.8), rgba(42, 82, 140, 0.8));
  color: white;
  flex: 1 1 100%;
}

.header-block h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.header-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 15px auto;
  border: 4px solid white;
  object-fit: cover;
}
</style>