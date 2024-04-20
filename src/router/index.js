import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Restaurant from "../pages/Restaurant.vue";
import User from "../pages/User.vue";
import OtherUser from "../pages/OtherUser.vue";
import Social from "../pages/Social.vue";
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
    name: "OtherUser",
    component: OtherUser,
    props: true,
  },
  {
    path: "/social",
    name: "Social",
    component: Social,
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
