<template>
    <PreLoader v-if="isLoading" />
    <div class="popularMovies" v-else>
        <div class="movie" v-if="movieResult">
            <div class="movie-image">
                <img :src="`https://image.tmdb.org/t/p/w500/` + movieResult.poster_path" alt="Movie Image">
            </div>
            <div class="movie-details">
                <h1 class="title">{{ movieResult.title }}</h1>
                <p class="date">{{ movieResult.release_date.split("-")[0] }}</p>
                <p class="genre overview"><span>Genres:</span> {{ movieResult.genres.join(', ') }}</p>
                <p class="overview"><span>Overview:</span> {{ movieResult.overview }}</p>
                <div class="rating">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15">
                        <path fill="#f97b22"
                            d="M7.948.779a.5.5 0 0 0-.896 0L5.005 4.926l-4.577.665a.5.5 0 0 0-.277.853l3.312 3.228l-.782 4.559a.5.5 0 0 0 .725.527L7.5 12.605l4.094 2.153a.5.5 0 0 0 .725-.527l-.782-4.56l3.312-3.227a.5.5 0 0 0-.277-.853l-4.577-.665L7.948.78Z" />
                    </svg>
                    <p>{{ Math.round(movieResult.vote_average * 10) }}%</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15">
                        <path fill="#f97b22"
                            d="M7.948.779a.5.5 0 0 0-.896 0L5.005 4.926l-4.577.665a.5.5 0 0 0-.277.853l3.312 3.228l-.782 4.559a.5.5 0 0 0 .725.527L7.5 12.605l4.094 2.153a.5.5 0 0 0 .725-.527l-.782-4.56l3.312-3.227a.5.5 0 0 0-.277-.853l-4.577-.665L7.948.78Z" />
                    </svg>
                </div>
                <iframe :src="videoKey" frameborder="0" class="img"></iframe>
                <div class="video">
                    <iframe :src="videoKey" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PreLoader from '../components/PreLoader.vue';
import { usePopular } from '../store/popular';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from "axios"
const route = useRoute()
const isLoading = ref(true)
const { id } = route.params
const movieResult = ref(null)
const popularStore = usePopular()
const videoKey = ref("https://www.youtube.com/embed/")
onMounted(() => {
    setTimeout(() => { isLoading.value = false }, 1000)
    getVideo()
    movieResult.value = popularStore.moviesWithGenres.find(m => m.id === parseInt(id))
})
const getVideo = async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ffb2861fdbc1b2981352fc6e6d3e5c8a`)
    videoKey.value += res.data.results[0].key
}
</script>

<style lang="scss" scoped>
$screen-width-small: 768px;

@mixin flexStyles {
    display: flex;
    align-items: center;
    justify-content: center;
}

@mixin gridStyles {
    display: grid;
    place-items: center;
}

.popularMovies {
    @include flexStyles;
    min-height: 100vh;
    min-width: 100%;

    .movie {
        min-width: 100%;
        min-height: 100%;
        padding: 2rem;
        @include gridStyles;

        .movie-image {
            min-width: 50%;
            max-width: 70%;

            img {
                border-radius: 2rem;
                box-shadow: 0px 1px 20px rgb(35, 35, 35);
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        .movie-details {
            padding: 20px 0;
            color: white;
            font-size: 1.3rem;
            background-color: #3E3939;
            padding: 20px;
            margin: 2rem 0;
            border-radius: 2rem;

            .title {
                font-weight: 700;
            }

            .overview {
                color: #FF7517;
            }

            span {
                font-weight: 700;
                color: white;
            }

            p {
                margin: 5px 0;
            }

            .rating {
                display: flex;
                align-items: center;
                gap: 5px;
            }

            .img {
                width: 80%;
            }

            .video {
                margin: 10px 0;
                width: 100%;
                height: 100%;
                box-shadow: 0px 1px 20px rgb(61, 61, 61);
                height: fit-content;
                position: relative;

                iframe {
                    border-radius: 4px;
                    width: 100%;
                    height: 300px;
                    position: fixed;
                    background: linear-gradient(to bottom,
                            rgba(0, 0, 0, 0.6) 0%,
                            rgba(0, 0, 0, 0.3) 50%,
                            rgba(0, 0, 0, 0.6) 100%);
                    ;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -2;
                    filter: blur(5px);
                }
            }
        }
    }
}

@media screen and (min-width: $screen-width-small) {
    .movie {
        grid-template-columns: 1fr 1fr;
    }

    .movie-details {
        width: 80%;
    }
}
</style>