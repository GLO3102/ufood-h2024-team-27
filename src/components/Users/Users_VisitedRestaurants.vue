<template>
<section class="py-3 py-md-5 py-xl-8">
  <div class="container overflow-hidden">
    <div
      v-for="visit in visitedRestaurants"
      :key="visit.id"
      class="row gy-3 gy-lg-4"
    >
      <VisitedRestaurant :visit="visit" />
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
