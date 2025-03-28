export function setupTasksHandlers(tasksAPI) {
    // Добавление задачи
    document.getElementById('add-task-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = e.target.querySelector('input');
      const title = input.value.trim();
      
      if (title) {
        const newTask = await tasksAPI.add(title);
        if (newTask) {
          const tasksList = document.querySelector('.tasks-list');
          const taskElement = createTaskElement(newTask);
          tasksList.appendChild(taskElement);
          setupTaskHandlers(taskElement, tasksAPI);
          input.value = '';
        }
      }
    });
  
    // Назначение обработчиков существующим задачам
    document.querySelectorAll('.tasks-list li').forEach(item => {
      setupTaskHandlers(item, tasksAPI);
    });
  }
  
  function setupTaskHandlers(item, tasksAPI) {
    // Удаление
    item.querySelector('.delete-task')?.addEventListener('click', async () => {
        const id = parseInt(item.dataset.id);
        item.style.transform = 'scale(0.9)';
        item.style.opacity = '0.5';
        await new Promise(resolve => setTimeout(resolve, 200));
        await tasksAPI.delete(id);
        item.style.transition = 'all 0.3s ease';
        item.style.height = '0';
        item.style.margin = '0';
        item.style.padding = '0';
        await new Promise(resolve => setTimeout(resolve, 300));
        item.remove();
      });
  
    // Изменение статуса
    item.querySelector('input[type="checkbox"]')?.addEventListener('change', (e) => {
      item.classList.toggle('completed', e.target.checked);
    });
    
  }
  
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.title}</span>
      <button class="delete-task">Удалить</button>
    `;
    return li;
  }