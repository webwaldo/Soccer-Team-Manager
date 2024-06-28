import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')