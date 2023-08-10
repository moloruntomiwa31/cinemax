import router from "./router/index"
import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import "../style.css"
import { useSearch } from "./store/search"
import { usePopular } from "./store/popular"

const app = createApp(App)

app.use(router)
app.use(createPinia())

// -----storing items in store into LocalStorage
const savedMovies = localStorage.getItem('movies');
const savedPopularMovies = localStorage.getItem('popularMovies');
if (savedMovies ||  savedPopularMovies) {
    useSearch().moviesWithGenres = JSON.parse(savedMovies);
    usePopular().moviesWithGenres = JSON.parse(savedPopularMovies);
}

app.mount('#app')
