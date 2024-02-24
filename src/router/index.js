import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import User from "../pages/User";

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
});
