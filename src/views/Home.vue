<template>
  <PreLoader v-if="movieStore.isLoading" />
  <main v-else>
    <div class="header">
      <SelectOption
        :options="dynamicOptions"
        :modelValue="selectedOption"
        @update:modelValue="updateMovieOption"
        class="content"
      />
      <SelectOption
        :options="['movie', 'tv']"
        :modelValue="selectedType"
        @update:modelValue="updateType"
      />
    </div>
    <p class="clickable">Clickable cards</p>
    <div class="popular-movies">
      <div
        v-for="movie in movieStore.moviesWithGenres"
        class="movie"
        @click="
          router.push({
            path: `/movies/show/${movie.id}`,
            query: { type: selectedType },
          })
        "
      >
        <p class="rating">{{ Math.round(movie.vote_average) }}</p>
        <img
          :src="`https://image.tmdb.org/t/p/w500/` + movie.poster_path"
          alt="Movie Image"
        />
        <div class="movie-details">
          <h1 class="title">
            {{ selectedType === "movie" ? movie.title : movie.name }}
          </h1>
          <p>{{ movie.runtime }}</p>
          <p class="date font-bold">
            {{
              selectedType == "movie"
                ? movie.release_date.split("-")[0]
                : movie.first_air_date.split("-")[0]
            }}
          </p>
          <p class="genre">Genres: {{ movie.genres.join(", ") }}</p>
        </div>
      </div>
    </div>
  </main>
  <HomePagination />
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useMovies } from "../store/movie.js";
import PreLoader from "../components/PreLoader.vue";
import HomePagination from "../components/HomePagination.vue";
import SelectOption from "../components/SelectOption.vue";
const router = useRouter();
const movieStore = useMovies();
//modifying options
const selectedOption = ref("popular");
const selectedType = ref("movie");
const updateMovieOption = (option) => {
  selectedOption.value = option;
  router.push({
    query: {
      ...router.currentRoute.value.query,
      type: selectedType.value,
      option: option,
    },
  });
};
const updateType = (type) => {
  selectedType.value = type;
  selectedOption.value = "popular";
  router.push({
    query: {
      ...router.currentRoute.value.query,
      type: selectedType.value,
      option: "popular",
    },
  });
};
const movieOptions = ref(["popular", "top_rated", "upcoming", "now_playing"]);
const seriesOptions = ref([
  "airing_today",
  "on_the_air",
  "popular",
  "top_rated",
]);
watch([selectedOption, selectedType], ([newOption, newType]) => {
  movieStore.getDetails(newType, newOption);
});
const dynamicOptions = computed(() => {
  return selectedType.value === "tv" ? seriesOptions.value : movieOptions.value;
});
// preloads and getDeatails from store
onMounted(() => {
  setTimeout(() => {
    movieStore.isLoading = false;
  }, 1000);
  const currentQuery = router.currentRoute.value.query;
  // Use query parameters if they exist, otherwise default to "movie" and "popular"
  const initialType = currentQuery.type || "movie";
  const initialOption = currentQuery.option || "popular";
  selectedType.value = initialType;
  selectedOption.value = initialOption;
  movieStore.getDetails(selectedType.value, selectedOption.value);
});
</script>

<style lang="scss" scoped>
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
    display: flex;
    align-items: center;
    justify-content: center;

    // position: relative;
    // border: 1px solid gray;
    // margin: 30px 0;
    // z-index: 50;

    // .content {
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     border-radius: 1rem;
    //     background-color: #353535;
    //     padding: 15px;
    //     font-weight: 700;
    //     color: $main-color;
    // }
  }

  .popular-movies {
    min-width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        background-color: $main-text;
        padding: 20px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        top: 10px;
        right: 20px;
        color: $main-color;
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
          color: $main-color;
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
