export function setupQuotesHandlers(quotesAPI) {
    // Добавление цитаты
    document.getElementById('add-quote-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const [textInput, authorInput] = e.target.elements;
      const text = textInput.value.trim();
      const author = authorInput.value.trim();
      
      if (text && author) {
        const newQuote = await quotesAPI.add({ text, author });
        if (newQuote) {
          const quotesList = document.querySelector('.quotes-list');
          const quoteElement = createQuoteElement(newQuote);
          quotesList.appendChild(quoteElement);
          setupQuoteHandlers(quoteElement, quotesAPI);
          textInput.value = '';
          authorInput.value = '';
        }
      }
    });
  
    // Назначение обработчиков существующим цитатам
    document.querySelectorAll('.quote-item').forEach(item => {
      setupQuoteHandlers(item, quotesAPI);
    });
  }
  
  function setupQuoteHandlers(item, quotesAPI) {
    // Удаление
    item.querySelector('.delete-quote')?.addEventListener('click', async () => {
        const id = parseInt(item.dataset.id);
        item.style.transform = 'translateX(100%)';
        item.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 300));
        await quotesAPI.delete(id);
        item.remove();
      });
  
    // Редактирование
    item.querySelector('.edit-quote')?.addEventListener('click', async () => {
      const id = parseInt(item.dataset.id);
      const text = item.querySelector('p').textContent.slice(1, -1);
      const author = item.querySelector('small').textContent.slice(2);
      
      const newText = prompt('Новый текст:', text);
      if (newText === null) return;
      
      const newAuthor = prompt('Новый автор:', author);
      if (newAuthor === null) return;
  
      await quotesAPI.update({ id, text: newText, author: newAuthor });
      item.querySelector('p').textContent = `"${newText}"`;
      item.querySelector('small').textContent = `— ${newAuthor}`;
    });
  }
  
  function createQuoteElement(quote) {
    const div = document.createElement('div');
    div.className = 'quote-item';
    div.dataset.id = quote.id;
    div.innerHTML = `
      <p>"${quote.text}"</p>
      <small>— ${quote.author}</small>
      <div class="quote-actions">
        <button class="edit-quote">Изменить</button>
        <button class="delete-quote">Удалить</button>
      </div>
    `;
    return div;
  }