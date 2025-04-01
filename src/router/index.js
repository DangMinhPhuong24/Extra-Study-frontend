import { createRouter, createWebHistory } from 'vue-router'
import admin  from './admin.js'
import student  from './student.js'
import login  from './login.js'

const routes = [...login, ...admin, ...student];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;