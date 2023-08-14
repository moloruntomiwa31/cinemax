<template>
    <PreLoader v-if="isLoading" />
    <main v-else>
        <div v-if="searchData.error || (!searchData.moviesWithGenres.length)" class="error">
            <p>404 Movie not Found</p>
        </div>
        <div v-else>
            <div class="header">
            <h1> Results - {{ searchData.moviesWithGenres.length }}</h1>
        </div>
        <div v-if="searchData.searchArray" class="container">
            <div class="movie" v-for="data in searchData.moviesWithGenres">
                <!-- <div class="blur"></div> -->
                <img :src="`https://image.tmdb.org/t/p/w500/` + data.poster_path" alt="Movie Image" class="img-fluid">
                <div class="movie-details">
                    <h1 class="title">{{ data.title }}</h1>
                    <h1 class="title" v-if="data.original_name">{{ data.original_name }}</h1>
                    <p class="date" v-if="data.release_date"><span>Year: </span>{{ data.release_date.split("-")[0] }}</p>
                    <p class="date" v-if="data.first_air_date"><span>First Air of Series: </span>{{ data.first_air_date }}
                    </p>
                    <p class="genre">{{ data.genres.join("| ") }}</p>
                    <p class="movieType">{{ data.media_type }}</p>
                    <p class="overview"><span>Overview: </span>{{ data.overview }}</p>
                    <div class="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15">
                            <path fill="#f97b22"
                                d="M7.948.779a.5.5 0 0 0-.896 0L5.005 4.926l-4.577.665a.5.5 0 0 0-.277.853l3.312 3.228l-.782 4.559a.5.5 0 0 0 .725.527L7.5 12.605l4.094 2.153a.5.5 0 0 0 .725-.527l-.782-4.56l3.312-3.227a.5.5 0 0 0-.277-.853l-4.577-.665L7.948.78Z" />
                        </svg>
                        <p>{{ Math.round(data.vote_average * 10) }}%</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </main>
</template>

<script setup>
import PreLoader from '../components/PreLoader.vue';
import { useSearch } from '../store/search';
const searchData = useSearch()
import { ref, onMounted } from 'vue';
const isLoading = ref(true)
onMounted(() => {
    setTimeout(() => { isLoading.value = false }, 2000)
})
</script>

<style lang="scss" scoped>
@mixin flexStyles {
    display: flex;
    align-items: center;
}

@mixin gridStyles {
    display: grid;
    place-items: center;
}

$main-color: #ff722c;
$main-text: white;

main {
    width: 100%;
    min-height: 100vh;

    .clickable {
        text-align: center;
        color: $main-color;
        font-weight: 500;
        animation: fade 2s 0.5s infinite;
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
            color: $main-color;
        }

    }

    .container {
        min-width: 100%;
        height: 100%;
        @include gridStyles;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        padding: 2rem;

        .movie {
            margin: 20px;
            min-height: 100%;
            max-width: 300px;
            border-radius: 10px;
            box-shadow: 0px 1px 20px rgb(35, 35, 35);
            position: relative;
            cursor: pointer;

            .rating {
                gap: 10px;
                @include flexStyles;
                color: $main-text;
            }

            .movie-details {
                @include flexStyles;
                flex-direction: column;
                text-align: center;
                padding: 10px;
                gap: 1rem;

                span {
                    font-weight: bold;
                    color: $main-text;
                }

                .overview {
                    color: $main-color;
                    text-align: left;
                    padding: 20px;
                }

                .title {
                    color: $main-text;
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .movieType {
                    color: $main-text;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    font-weight: bold;
                }

                .date {
                    color: $main-color;
                }

                .genre {
                    color: rgb(196, 192, 192);
                }
            }

            img {
                border-radius: 10px 10px 0 0;
                max-width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
    }
}

.error {
    @include gridStyles();
    color: red;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bolder;
    min-height: 50vh;
} 
@media screen and (max-width: 300px) {
    main {
        .container {
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }
    }
}
</style>