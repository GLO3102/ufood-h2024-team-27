<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation,
  },
};
</script>

<style></style>
