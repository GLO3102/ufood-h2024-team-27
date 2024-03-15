import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import Restaurantv2 from "../pages/Restaurantv2.vue";
import User from "../pages/User";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant/:restaurantId",
    name: "Restaurantv2",
    component: Restaurantv2,
    props: true,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {window.scrollTo(0, 0);}
});
