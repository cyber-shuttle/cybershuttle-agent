import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import AppView from './components/AppView.vue';

const service = require('./protos/authorization_grpc_web_pb')
const auth = require('./protos/authorization_pb')
// const grpc = require('@grpc/grpc-js')


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/myapps',
        name: 'AppView',
        component: AppView
    },

]
const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router;