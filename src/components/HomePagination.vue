<template>
    <div>
        <button @click="previousPage">Previous Page</button>
        <button @click="nextPage">Next Page</button>
    </div>
</template>

<script setup>
import { usePopular } from '../store/popular';
const popularStore = usePopular()
const nextPage = () => {
    popularStore.page++
    popularStore.getDetails()
}
const previousPage = () => {
    popularStore.page--
    popularStore.getDetails()
}
</script>

<style lang="scss" scoped>
    div {
        display: flex; 
        align-items: center;
        justify-content: space-around;
        padding-bottom: 1rem;

        button {
            color: white;
            z-index: 99;

            &:hover {
                color: #ffac78;
            }
        }
    }
</style>