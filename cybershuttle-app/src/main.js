import { createApp } from 'vue'

import App from './App.vue'

import router from './router'

// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const app = createApp(App);

app.use(router);
app.mount('#app');
