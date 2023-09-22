import { createApp } from 'vue';
import App from './App.vue';
import logger from './logger';
import router from './router';
import store from './store';

const app = createApp(App)
  .use(logger)
  .use(router)
  .use(store);

app.mount('#app');
