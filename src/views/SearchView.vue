<template>
    <PreLoader v-if="isLoading" />
    <main v-else>
        <div class="header">
            <h1> Results - {{ searchData.searchArray.length }}</h1>
        </div>
        <div v-if="searchData.searchArray" class="container">
            <div class="movie" v-for="data in searchData.moviesWithGenres"
                :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})` }">
                <div class="movieDetails-wrapper">
                    <div class="blur"></div>
                    <h1>{{ data.title }}</h1>
                    <img :src="`https://image.tmdb.org/t/p/w500/` + data.poster_path" alt="Movie Image" class="img-fluid">
                    <div class="movie-details">
                        <p class="date"><span>Year: </span>{{ data.release_date.split("-")[0] }}</p>
                        <p class="genre"><span>Genre: </span>{{ data.genres.join(",") }}</p>
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
    setTimeout(() => {isLoading.value = false}, 2000)
})
</script>

<style lang="scss" scoped>
@mixin flexStyles {
    display: flex;
    align-items: center;
    justify-content: center;
}

@mixin gridStyles {
    display: grid;
    place-items: center;
}
.header {

    position: relative;
    border-radius: 50px;
    border: 1px solid gray;
    margin: 30px 0;

    h1 {
        border-radius: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #353535;
        padding: 10px;
        font-weight: 700;
        color: #ff722c;
        font-size: 1.2rem;
    }

}

.container {
    min-width: 100%;
    height: 100%;
    @include gridStyles;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 5rem;
    padding: 4rem;

    .movie {
        margin: 20px;
        min-height: 100%;
        min-width: 100%;
        box-shadow: 0px 1px 20px rgb(35, 35, 35);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        border-radius: 2rem;
        position: relative;
        z-index: -2;
        padding: 2rem;
        margin: 1rem 0;
        @include gridStyles;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

        .movieDetails-wrapper {
            @include flexStyles;
            flex-direction: column;
        }

        .blur {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(8px);
            z-index: -1;
            border-radius: 2rem;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))
        }

        .movie-details {
            color: white;

            span {
                font-weight: 700;
                color: #ff722c;
            }

            p {
                margin: 10px 0;
                color: rgb(223, 217, 217);
            }

            .rating {
                display: flex;
                align-items: center;
                gap: 1rem;
                font-weight: bold;
            }
        }

        h1 {
            color: white;
            font-weight: 700;
            font-size: 1.6rem;
            margin: 1rem 0;
        }

        .img-fluid {
            width: 100%;
            border-radius: 1rem;
            box-shadow: 0px 1px 5px rgb(0, 0, 0);
        }
    }
}
</style>