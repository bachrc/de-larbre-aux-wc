import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { store } from './store'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true
})

let app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app')