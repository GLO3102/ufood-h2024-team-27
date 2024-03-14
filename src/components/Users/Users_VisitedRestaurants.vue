<template>
  <section class="py-3 py-md-5 py-xl-8">
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col" v-for="visit in visitedRestaurants" :key="visit.id">
          <VisitedRestaurant :visit="visit" />
        </div>
      </div>
    </div>
  </section>
  </template>

<script>
import VisitedRestaurant from "./Users_VisitedRestaurant.vue";
export default {
  name: "VisitedRestaurants",
  props: {
    visitedRestaurants: Array
  },
  components: {
    VisitedRestaurant,
  }
};
</script>
