import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { title: "Home - Cinemax" },
    },
    {
      path: "/movies/show/:id",
      name: "show",
      component: () => import("../views/ShowView.vue"),
      meta: { title: "Movie Details - Cinemax" },
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
      meta: { title: "Search - Cinemax" },
    },
    {
      path: "/:catchAll(.*)*",
      name: "notfound",
      component: () => import("../views/NotFound.vue"),
      meta: { title: "404 Not Found - Cinemax" },
    },
  ],
});

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

export default router;
