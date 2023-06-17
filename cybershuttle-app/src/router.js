import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';



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

]
const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router;