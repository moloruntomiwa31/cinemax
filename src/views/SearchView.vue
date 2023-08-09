<template>
    <PreLoader v-if="isLoading" />
    <main v-else>
        <div class="header">
            <h1> Results - {{ searchData.moviesWithGenres.length }}</h1>
        </div>
        <div v-if="searchData.searchArray" class="container">
            <div class="movie" v-for="data in searchData.moviesWithGenres">
                <!-- <div class="blur"></div> -->
                <img :src="`https://image.tmdb.org/t/p/w500/` + data.poster_path" alt="Movie Image" class="img-fluid">
                <div class="movie-details">
                    <h1 class="title">{{ data.title }}</h1>
                    <p class="date"><span>Year: </span>{{ data.release_date.split("-")[0] }}</p>
                    <p class="genre">{{ data.genres.join("| ") }}</p>
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
    justify-content: center;
}

@mixin gridStyles {
    display: grid;
    place-items: center;
}

main {
    width: 100%;
    min-height: 100vh;

    .clickable {
        text-align: center;
        color: #ff722c;
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
            color: #ff722c;
        }

    }

    .container {
        min-width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

            .rating {display: flex;gap: 10px; align-items: center; color: white;}

            .movie-details {
                display: flex;
                align-items: center;
                flex-direction: column;
                text-align: center;
                padding: 10px;
                gap: 1rem;

                span {
                    font-weight: bold;
                    color: white;
                }
                .overview {
                    color: #ff722c;
                    text-align: left;
                }
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
                max-width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
    }
}
</style>