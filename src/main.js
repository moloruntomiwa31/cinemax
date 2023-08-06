import router from "./router/index"
import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import "../style.css"

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
