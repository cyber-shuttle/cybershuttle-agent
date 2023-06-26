import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { UserServiceGrpc } from './api/grpc/auth';

import App from './App.vue'

import router from './router'


const app = createApp(App);

app.provide("UserServiceKey", UserServiceGrpc);
app.use(createPinia());
app.use(router);
app.mount('#app');
