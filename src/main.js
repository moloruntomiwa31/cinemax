import router from "./router/index";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "../public/css/style.css";
import { useSearch } from "./store/search";
import { useMovies } from "./store/movie";

const app = createApp(App);

app.use(router);
app.use(createPinia());

// -----storing items in store into LocalStorage
const savedSearchedMovies = localStorage.getItem("searchedMovies");
const savedMovies = localStorage.getItem("movies");
if (savedMovies || savedSearchedMovies) {
  useSearch().moviesWithGenres = JSON.parse(savedSearchedMovies);
  useMovies().moviesWithGenres = JSON.parse(savedMovies);
}

app.mount("#app");
