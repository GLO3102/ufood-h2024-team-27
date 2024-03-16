<template>
  <section class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h2 class="card-title mb-4">
          <i class="fa-solid fa-map-pin"></i>
          Recently visited restaurants
        </h2>
        <PagesVisits :total-items="totalItems"
          :current-page="currentPage"
          :page-size="pageSize"
          @page-changed="this.$emit('page-changed', $event)">
        </PagesVisits>
      </div>
      <div class="row row-cols-1 row-cols-md-2 g-4 mb-4">
        <div class="col" v-for="visit in visitedRestaurants" :key="visit.id">
          <VisitedRestaurant :visit="visit" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VisitedRestaurant from "./Users_VisitedRestaurant.vue";
import PagesVisits from "./Users_PagesVisits.vue";

export default {
  name: "VisitedRestaurants",
  props: {
    visitedRestaurants: Array,
    totalItems: Number,
    currentPage: Number,
    pageSize: Number
  },
  components: {
    VisitedRestaurant, PagesVisits
  }
};
</script>
