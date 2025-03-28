export default {
    async get() {
      const savedQuotes = localStorage.getItem('quotes');
      return savedQuotes ? JSON.parse(savedQuotes) : [
        {id: 1, text: "Жизнь — это то, что происходит, пока ты строишь планы.", author: "Джон Леннон"},
        {id: 2, text: "Будь самим собой, все остальные роли уже заняты.", author: "Оскар Уайльд"}
      ];
    },
    
    async getFormatted() {
      const quotes = await this.get();
      return `
        <div class="api-block quotes-block">
          <h2>Цитаты</h2>
          <div class="quotes-list">
            ${quotes.map(quote => `
              <div class="quote-item" data-id="${quote.id}">
                <p>"${quote.text}"</p>
                <small>— ${quote.author}</small>
                <div class="quote-actions">
                  <button class="edit-quote">Изменить</button>
                  <button class="delete-quote">Удалить</button>
                </div>
              </div>
            `).join('')}
          </div>
          <form id="add-quote-form">
            <input type="text" placeholder="Текст цитаты" required>
            <input type="text" placeholder="Автор" required>
            <button type="submit">Добавить цитату</button>
          </form>
        </div>
      `;
    },
  
    async add(newQuote) {
      const quotes = await this.get();
      const newId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1;
      const quoteToAdd = {id: newId, ...newQuote};
      quotes.push(quoteToAdd);
      localStorage.setItem('quotes', JSON.stringify(quotes));
      return quoteToAdd;
    },
  
    async update(updatedQuote) {
      const quotes = await this.get();
      const index = quotes.findIndex(q => q.id === updatedQuote.id);
      if (index !== -1) {
        quotes[index] = updatedQuote;
        localStorage.setItem('quotes', JSON.stringify(quotes));
        return true;
      }
      return false;
    },
  
    async delete(id) {
      const quotes = await this.get();
      const filteredQuotes = quotes.filter(q => q.id !== id);
      localStorage.setItem('quotes', JSON.stringify(filteredQuotes));
      return true;
    }
  };