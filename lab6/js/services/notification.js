export function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;
    setTimeout(hideNotification, 3000);
  }
  
  export function hideNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
  }