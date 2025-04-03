import { ref } from 'vue';

export function useNotification() {
  const message = ref('');
  const show = ref(false);

  const notify = (msg) => {
    message.value = msg;
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 3000);
  };

  return { message, show, notify };
}