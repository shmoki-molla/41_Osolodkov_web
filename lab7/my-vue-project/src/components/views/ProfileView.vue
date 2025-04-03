<template>
  <div class="container">
    <HeaderBlock
      name="Элеонора Кольцова"
      position="Заведующий кафедрой (Кафедра информационных компьютерных технологий)"
      photo="эдна.jpg"
    />
    <PhotoBlock
      photo="Koltsova-E.M.jpg"
      :contacts="contacts"
    />
    <AboutBlock :items="aboutItems" />
    <SkillsBlock :skills="skills" />
    <AchievementsBlock :items="achievements" />
    <HobbiesBlock :items="hobbies" />
  </div>
</template>

<script setup>
import HeaderBlock from '@/components/blocks/HeaderBlock.vue'
import PhotoBlock from '@/components/blocks/PhotoBlock.vue'
import AboutBlock from '@/components/blocks/AboutBlock.vue'
import SkillsBlock from '@/components/blocks/SkillsBlock.vue'
import AchievementsBlock from '@/components/blocks/AchievementsBlock.vue'
import HobbiesBlock from '@/components/blocks/HobbiesBlock.vue'

const contacts = [
  "📌 Москва, ул. Героев Панфиловцев, 20",
  "📞 +7 (495) 495-21-26",
  "📧 koltsova.e.m@muctr.ru",
  "🌐 https://www.muctr.ru",
  "🐦 www.twitter.com/ye",
  "👤 facebook.com/ye"
]

const aboutItems = [
  "Раньше я шила костюмы для суперсемейки, а потом мне прострелили колено...",
  "Доктор технических наук, профессор"
]

const skills = ["вязание", "кроссворды", "математика", "готовка", "деменция"]

const achievements = [
  "Построила завод)",
  "крышка реактора взорвалась("
]

const hobbies = ["Вязание", "Вязание", "Симптомы Альцгеймера", "Вязание", "Симптомы Альцгеймера"]
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>