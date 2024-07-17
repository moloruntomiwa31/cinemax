import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/movies/show/:id",
            name: "show",
            component: () => import ("../views/ShowView.vue")
        },
        {
            path: "/search",
            name: "search",
            component:  () => import ("../views/SearchView.vue")
        },
        {
            path: "/:catchAll(.*)*",
            name: "notfound",
            component:  () => import ("../views/NotFound.vue")
        }
    ]
})

router.afterEach(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
})  

export default router