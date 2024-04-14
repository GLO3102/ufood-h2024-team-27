import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import User from "../pages/User";
import Other_User from "../pages/Other_User.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant/:restaurantId",
    name: "Restaurant",
    component: Restaurant,
    props: true,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/user/:userId",
    name: "Other_User",
    component: Other_User,
    props: true,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});
