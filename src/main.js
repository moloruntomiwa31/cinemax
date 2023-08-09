import router from "./router/index"
import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import "../style.css"
import { useSearch } from "./store/search"

const app = createApp(App)

app.use(router)
app.use(createPinia())

const savedMovies = localStorage.getItem('movies');
if (savedMovies) {
    useSearch().moviesWithGenres = JSON.parse(savedMovies);
}

app.mount('#app')
