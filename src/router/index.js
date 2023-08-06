import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"
import PopularView from "../views/PopularView.vue"
import SearchView from "../views/SearchView.vue"
import NotFound from "../views/NotFound.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/movies/popular/:id",
            name: "popular",
            component: PopularView
        },
        {
            path: "/search",
            name: "search",
            component: SearchView
        },
        {
            path: "/:catchAll(.*)*",
            name: "notfound",
            component: NotFound
        }
    ]
})

export default router