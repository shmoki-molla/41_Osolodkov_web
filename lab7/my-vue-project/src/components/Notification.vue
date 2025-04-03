<template>
  <div class="notification" :class="{ show: show }">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
  show: Boolean
});
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4a6fa5;
  color: white;
  padding: 12px 24px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.notification.show {
  opacity: 1;
}
</style>