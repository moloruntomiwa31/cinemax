<template>
    <header>
        <h1 class="title">Cinemax</h1>
        <nav>
            <input type="text" placeholder="Search...." @keyup.enter="sendData" v-model="searchData.movieInput">
            <button @click="sendData">Search</button>
        </nav>
    </header>
</template>

<script setup>
import { useSearch } from "../store/search"
import { useRouter } from 'vue-router';
const router = useRouter()
const searchData = useSearch()

// push to SearchView and getData
const sendData = async () => {
    router.push('/search')
    await searchData.getMovie()
    searchData.setMovie()
}
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 2rem;

    .title {
        font-weight: bold;
        color: white;
        font-size: 2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    nav {
        display: flex;
        align-items: center;
        gap: 2rem;

        input {
            border-radius: 10px;
            background: none;
            border: 1px solid #ff722c;
            padding: 10px;
            outline: none;
            color: white;
        }

        button {
            background-color: #ff722c;
            padding: 10px;
            border-radius: 10px;
            color: white;
        }
    }

    ::placeholder {
        font-style: italic;
    }
}
</style>