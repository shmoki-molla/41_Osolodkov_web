export default {
    async get() {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      return await response.json();
    },
    
    async getFormatted() {
      const tasks = await this.get();
      return `
        <div class="api-block tasks-block">
          <h2>Задачи</h2>
          <ul class="tasks-list">
            ${tasks.map(task => `
              <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.title}</span>
                <button class="delete-task">Удалить</button>
              </li>
            `).join('')}
          </ul>
          <form id="add-task-form">
            <input type="text" placeholder="Новая задача" required>
            <button type="submit">Добавить</button>
          </form>
        </div>
      `;
    },
  
    async add(title) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          completed: false,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return await response.json();
    },
  
    async delete(id) {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      return true;
    }
  };