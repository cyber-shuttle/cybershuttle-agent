import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import { UserServiceGrpc } from './api/grpc/auth';

import App from './App.vue'

import router from './router'


const app = createApp(App);

const pinia = createPinia(app);
pinia.use(piniaPluginPersistedState)

app.provide("UserServiceKey", UserServiceGrpc);
app.use(pinia);
app.use(router);
app.mount('#app');
