import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { store } from './store'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faPenToSquare, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true
})

library.add(faTrash)
library.add(faPenToSquare)
library.add(faMinusSquare)
library.add(faPlusSquare)


let app = createApp(App);
app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')