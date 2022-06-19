import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { store } from './store'

let app = createApp(App);
app.use(store);
app.mount('#app')