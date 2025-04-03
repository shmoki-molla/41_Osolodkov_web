export default {
    async get() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error('TasksAPI error:', error);
        // Fallback to localStorage if API fails
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
      }
    },
  
    async add(title) {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          body: JSON.stringify({
            title,
            completed: false,
            userId: 1
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const newTask = await response.json();
        
        // Save to localStorage as backup
        const tasks = await this.get();
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        return newTask;
      } catch (error) {
        console.error('TasksAPI error:', error);
        // Fallback to localStorage
        const tasks = await this.get();
        const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        const newTask = { id: newId, title, completed: false };
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return newTask;
      }
    },
  
    async update(updatedTask) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedTask),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        
        // Update localStorage
        const tasks = await this.get();
        const index = tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          tasks[index] = updatedTask;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        return true;
      } catch (error) {
        console.error('TasksAPI error:', error);
        // Fallback to localStorage
        const tasks = await this.get();
        const index = tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          tasks[index] = updatedTask;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          return true;
        }
        return false;
      }
    },
  
    async delete(id) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE',
        });
        
        // Update localStorage
        const tasks = await this.get();
        const filteredTasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        
        return true;
      } catch (error) {
        console.error('TasksAPI error:', error);
        // Fallback to localStorage
        const tasks = await this.get();
        const filteredTasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(filteredTasks));
        return true;
      }
    }
  };