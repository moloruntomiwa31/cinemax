<template>
  <div class="pagination-container">
    <button @click="previousPage" class="pagination-button">
      Previous Page
    </button>
    <button @click="nextPage" class="pagination-button">Next Page</button>
  </div>
</template>

<script setup>
import { useMovies } from "../store/movie";
import { useRoute } from "vue-router";
const route = useRoute();
const movieStore = useMovies();
const nextPage = () => {
  movieStore.page++;
  movieStore.getDetails(
    route.query.type || "movie",
    route.query.option || "popular"
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const previousPage = () => {
  if (movieStore.page > 1) {
    movieStore.page--;
    movieStore.getDetails(
      route.query.type || "movie",
      route.query.option || "popular"
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  gap: 1rem;
}

.pagination-button {
  background-color: #ff722c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ffac78;
    transform: scale(1.05);
  }

  &:active {
    background-color: #e65c00;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
