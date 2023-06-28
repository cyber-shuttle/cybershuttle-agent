import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { UserServiceGrpc } from './api/grpc/auth';
import { CyberShuttleServiceGrpc } from './api/grpc/appItems';
import App from './App.vue'
import router from './router'


const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
  })

const pinia = createPinia(app);
pinia.use(piniaPluginPersistedState)

app.provide("UserServiceKey", UserServiceGrpc);
app.provide("CyberShuttleServiceKey", CyberShuttleServiceGrpc);
app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount('#app');
