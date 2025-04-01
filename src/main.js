import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import axios from 'axios'
window.axios = axios;

import { 
    Space,
    Checkbox,
    Input,
    Select,
    Avatar,
    Table, 
    Card,
    Menu, 
    List, 
    Drawer, 
    Button,
    message 
} from 'ant-design-vue';
import App from './App.vue'

import './static/fontawesome-free-6.6.0-web/fontawesome-free-6.6.0-web/css/all.min.css'
import 'ant-design-vue/dist/reset.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Space);
app.use(Checkbox);
app.use(Input);
app.use(Select);
app.use(Avatar);
app.use(Table);
app.use(Card);
app.use(Menu);
app.use(List);
app.use(Drawer);
app.use(Button);
app.mount('#app');

app.config.globalProperties.$message = message;