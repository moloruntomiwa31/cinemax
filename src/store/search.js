import { defineStore } from "pinia";
import axios from "axios";
import { usePopular } from "./popular";

export const useSearch = defineStore("searchData", {
  state: () => ({
    movieInput: "",
    searchArray: [],
    movieId: null,
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
        // ------getting each movie id
        this.movieId = this.searchArray.map(movie => movie.id)
        console.log(this.movieId);
        // -------catching runtime
        // const movieruntime = await this.addMovieRuntime()
        // console.log(movieruntime);
        //   -------
        this.moviesWithGenres = this.searchArray.map((movie) => ({
            ...movie,
            genres: movie.genre_ids.map((genreId) => genres[genreId]),
        }));
        localStorage.setItem('movies', JSON.stringify(this.moviesWithGenres));
        console.log(this.moviesWithGenres);
      } catch (e) {
        console.log(e);
      }
    },
    setMovie(movieInput) {
      this.movieInput = movieInput;
    }
    // -----trying to get runtime
    // async addMovieRuntime() {
    //   for (id of this.movieId) {
    //     const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ffb2861fdbc1b2981352fc6e6d3e5c8a`)
    //     console.log(res);
    //   }
    // }
  },
});
