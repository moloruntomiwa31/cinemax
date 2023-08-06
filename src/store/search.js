import { defineStore } from "pinia";
import axios from "axios";
import { usePopular } from "./popular";

export const useSearch = defineStore("searchData", {
  state: () => ({
    movieInput: "",
    searchArray: [],
    moviesWithGenres: [],
    isLoading: true
  }),
  actions: {
    async getMovie() {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            params: {
              query: this.movieInput,
              api_key: "ffb2861fdbc1b2981352fc6e6d3e5c8a",
            },
          }
        );  
        const popularMovies = usePopular()
        // fetch genre from different store
        const genres = await popularMovies.fetchGenre() 
        // data from this api request     
        this.searchArray = res.data.results;
        //   -------
        this.moviesWithGenres = this.searchArray.map((movie) => ({
            ...movie,
            genres: movie.genre_ids.map((genreId) => genres[genreId]),
        }));
        console.log(this.searchArray);
      } catch (e) {
        console.log(e);
      }
    },
    setMovie(movieInput) {
      this.movieInput = movieInput;
    }
  },
});
