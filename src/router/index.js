import { createRouter,createWebHashHistory} from "vue-router";

import Posts from "@/views/Posts";

const routes = [
    {
        path: "/",
        name: "Posts",
        component: Posts
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/UserAbout.vue")
    }
];

const router = new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;