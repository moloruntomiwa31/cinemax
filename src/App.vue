<template>
  <NavBar />
  <RouterView />
  <button v-if="showButton" @click="scrollToTop" class="up-button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        fill="#f97b22"
        d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3zm0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5zm0 3.875l-.72.72l-5.686 5.686L11 16.72l4-4V23h2V12.72l4 4l1.406-1.44l-5.687-5.686l-.72-.72z"
      />
    </svg>
  </button>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import { useSearch } from "./store/search";
const searchData = useSearch();
const showButton = ref(false);
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  setTimeout(() => {
    searchData.isLoading = false;
  }, 2000);
  const scrollHandler = () => {
    showButton.value = window.scrollY > 0;
  };

  // Add the scroll event listener
  window.addEventListener("scroll", scrollHandler);

  // Clean up the scroll event listener when the component is unmounted
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollHandler);
  });
});
</script>

<style lang="scss" scoped>
.up-button {
  position: fixed;
  bottom: 5%;
  right: 8%;
  width: 50px;
  height: 50px;
  z-index: 99;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 5px rgb(0, 0, 0);
}
</style>
