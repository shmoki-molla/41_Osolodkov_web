<template>
  <div class="api-block quotes-block">
    <h2>Цитаты</h2>
    <form @submit.prevent="addQuote" class="add-quote-form">
      <input v-model="newQuote.text" placeholder="Текст цитаты" required>
      <input v-model="newQuote.author" placeholder="Автор" required>
      <button type="submit">Добавить цитату</button>
    </form>
    
    <div class="quotes-list">
      <div v-for="quote in quotes" :key="quote.id" class="quote-item">
        <p>"{{ quote.text }}"</p>
        <small>— {{ quote.author }}</small>
        <div class="quote-actions">
          <button @click="editQuote(quote)" class="edit-quote">Изменить</button>
          <button @click="deleteQuote(quote.id)" class="delete-quote">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QuotesAPI from '@/api/QuotesAPI'

const quotes = ref([])
const newQuote = ref({ text: '', author: '' })

const loadQuotes = async () => {
  quotes.value = await QuotesAPI.get()
}

const addQuote = async () => {
  const created = await QuotesAPI.add(newQuote.value)
  if (created) {
    quotes.value.push(created)
    newQuote.value = { text: '', author: '' }
  }
}

const editQuote = async (quote) => {
  const newText = prompt('Новый текст:', quote.text)
  if (!newText) return
  
  const newAuthor = prompt('Новый автор:', quote.author)
  if (!newAuthor) return

  const updated = await QuotesAPI.update({
    id: quote.id,
    text: newText,
    author: newAuthor
  })
  
  if (updated) {
    const index = quotes.value.findIndex(q => q.id === quote.id)
    if (index !== -1) {
      quotes.value[index] = { ...quote, text: newText, author: newAuthor }
    }
  }
}

const deleteQuote = async (id) => {
  if (confirm('Удалить цитату?')) {
    await QuotesAPI.delete(id)
    quotes.value = quotes.value.filter(q => q.id !== id)
  }
}

onMounted(loadQuotes)
</script>

<style scoped>
.quotes-list {
  margin: 20px 0;
}

.quote-item {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #4a6fa5;
  border-radius: 4px;
  transition: transform 0.2s ease;
}

.quote-item:hover {
  transform: translateX(3px);
}

.quote-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.add-quote-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.add-quote-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-quote-form button {
  padding: 10px;
  background-color: #4a6fa5;
  color: white;
  border-radius: 4px;
  border: none;
}

.add-quote-form button:hover {
  background-color: #3a5a8a;
}
</style>