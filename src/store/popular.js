import { defineStore } from "pinia";
import axios from "axios"

export const usePopular = defineStore("popularMovies", {
    state: () => ({
        result: [],
        moviesWithGenres: [],
        isLoading: true,
        page: 1
    }),
    actions: {
        async getDetails() {
            try {
                const url = "https://api.themoviedb.org/3/movie/popular"
                const res = await axios.get(url, {
                    params: {
                        api_key: "ffb2861fdbc1b2981352fc6e6d3e5c8a",
                        page: this.page
                    }
                })
                const genres = await this.fetchGenre()
                this.result = res.data.results
                this.moviesWithGenres = this.result.map((movie) => ({
                    ...movie,
                    genres: movie.genre_ids.map((genreId) => genres[genreId]),
                }));
                console.log(res.data);
            } catch (e) { console.log(e) }
        },
        async fetchGenre () {
            const genreRes = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=ffb2861fdbc1b2981352fc6e6d3e5c8a`)
            const genreMap = {};
            genreRes.data.genres.forEach((genre) => {
                genreMap[genre.id] = genre.name;
            });
            return genreMap
        }
    }
})