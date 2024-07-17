<template>
  <div>
    <button @click="previousPage">Previous Page</button>
    <button @click="nextPage">Next Page</button>
  </div>
</template>

<script setup>
import { useMovies } from "../store/movie";
const movieStore = useMovies();
const nextPage = () => {
  movieStore.page++;
  movieStore.getDetails();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const previousPage = () => {
  movieStore.page > 1 ? movieStore.page-- : movieStore.page;
  movieStore.getDetails();
  window.scrollTo({ top: 0, behavior: "smooth" });
};
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
