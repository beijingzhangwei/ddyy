import { createRouter, createWebHashHistory} from "vue-router";

import Posts from "@/views/Posts";
import Login from "@/views/Login";
import User from "@/views/User";

import store from "@/store";

const routes = [
    {
        path: "/",
        name: "Posts",
        component: Posts
    },{
        path: "/user/:username",
        name: "User",
        component: User,
        props: true,
        beforeEnter: (to, from, next) => {
            if (!store.getters["auth/isLoggedIn"]) {
                next({ name: "Login" });
            } else {
                next();
            }
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        //This is not needed right by now, because the store is  refreshed on page refresh... Will be needed!
        beforeEnter: (to, from, next) => {
            if (store.getters["auth/isLoggedIn"]) {
                next({ name: "Posts" });
            } else {
                next();
            }
        }
    }
];

const router = new createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;