<template>
    <header>
        <div class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><mask id="ipSMovie0"><g fill="none" stroke-width="4"><path fill="#fff" stroke="#fff" stroke-linejoin="round" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"/><path fill="#000" stroke="#000" stroke-linejoin="round" d="M24 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-9-9a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm18 0a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"/><path stroke="#fff" stroke-linecap="round" d="M24 44h20"/></g></mask><path fill="#ff722c" d="M0 0h48v48H0z" mask="url(#ipSMovie0)"/></svg>
            <h1 class="title">Cinemax</h1>
        </div>
        <nav>
            <input type="text" placeholder="Search...." @keyup.enter="sendData" v-model="searchData.movieInput">
            <button @click="sendData">Search</button>
        </nav>
        <nav>
            <button class="light" @click="addLight">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7" />
                </svg> </button>
        </nav>
    </header>
</template>

<script setup>
import { useSearch } from "../store/search"
import { useRouter } from 'vue-router';
const router = useRouter()
const searchData = useSearch()

const addLight = () => {
    const element = document.body
    element.classList.toggle("lightmode")
}

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

    .logo {display: flex; gap: 10px; align-items: center;}

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
            box-shadow: 0px 1px 5px rgb(0, 0, 0, 0.3);
        }
    }

    ::placeholder {
        font-style: italic;
    }
}

@media screen and (min-width: 768px) {
    header {
        flex-direction: row;
        justify-content: space-around;
    }
}</style>