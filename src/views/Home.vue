<template>
    <PreLoader v-if="popularStore.isLoading" />
    <main v-else>
        <div class="header">
            <h1>Popular Movies</h1>
        </div>
        <p class="clickable">Clickable cards</p>
        <div class="popular-movies">
            <div v-for="movie in popularStore.moviesWithGenres" class="movie"
                @click="router.push(`/movies/popular/${movie.id}`)">
                <p class="rating">{{ movie.vote_average }}</p>
                <img :src="`https://image.tmdb.org/t/p/w500/` + movie.poster_path" alt="Movie Image">
                <div class="movie-details">
                    <h1 class="title">{{ movie.title }}</h1>
                    <p class="date font-bold">{{ movie.release_date.split("-")[0] }}</p>
                    <p class="genre">Genres: {{ movie.genres.join(', ') }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePopular } from "../store/popular.js"
import PreLoader from "../components/PreLoader.vue"
const router = useRouter()
const popularStore = usePopular()

// preloads and getDeatails from store
onMounted(() => {
    setTimeout(() => {
        popularStore.isLoading = false;
    }, 1000);
    popularStore.getDetails()
});
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    min-height: 100vh;

    .clickable {
        text-align: center;
        color: #ff722c;
        font-weight: 500;
        animation: fade 2s 0.5s infinite;
    }

    @keyframes fade {
        0% {
            opacity: 0;
            transform: scale(1.3);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .header {

        position: relative;
        border: 1px solid gray;
        margin: 30px 0;

        h1 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 1rem;
            background-color: #353535;
            padding: 15px;
            font-weight: 700;
            color: #ff722c;
        }

    }

    .popular-movies {
        min-width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        padding: 2rem;

        .movie {
            margin: 20px;
            min-height: 100%;
            min-width: 100%;
            border-radius: 10px;
            box-shadow: 0px 1px 20px rgb(35, 35, 35);
            position: relative;
            cursor: pointer;

            .rating {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                background-color: white;
                padding: 20px;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                top: 10px;
                right: 20px;
                color: #b05500;
                box-shadow: 0px 1px 20px rgb(35, 35, 35);
                font-weight: 600;
            }

            .movie-details {
                display: flex;
                align-items: center;
                flex-direction: column-reverse;
                text-align: center;
                padding: 10px;
                gap: 1rem;

                .title {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .date {
                    color: #ff722c;
                }

                .genre {
                    color: rgb(196, 192, 192);
                }
            }

            img {
                border-radius: 10px 10px 0 0;
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
    }
}
</style>