import { defineStore } from "pinia";
import axios from "axios";
import { useMovies } from "./movie";

export const useSearch = defineStore("searchData", {
  state: () => ({
    movieInput: "",
    searchArray: [],
    movieId: null,
    moviesWithGenres: [],
    isLoading: true,
    error: false,
  }),
  actions: {
    async getMovie() {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/multi",
          {
            params: {
              query: this.movieInput,
              api_key: "ffb2861fdbc1b2981352fc6e6d3e5c8a",
            },
          }
        );
        const movies = useMovies();
        // fetch genre from different store
        const genres = await movies.fetchGenre();
        // data from this api request
        this.searchArray = res.data.results;
        // ------getting each movie id
        this.movieId = this.searchArray.map((movie) => movie.id);
        //   -------get genres
        this.moviesWithGenres = this.searchArray.map((movie) => ({
          ...movie,
          genres: movie.genre_ids.map((genreId) => genres[genreId]),
        }));

        //store data in localStorage
        localStorage.setItem(
          "searchedMovies",
          JSON.stringify(this.moviesWithGenres)
        );
      } catch (e) {
        this.error = true;
        console.log(e);
      }
    },
  },
});
