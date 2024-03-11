<template>
  <div>
    <!-- This assumes restaurants is an array of IDs, not objects -->
    <div v-for="restaurantId in restaurants" :key="restaurantId" class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
      <FavRestaurant :restaurantId="restaurantId" />
    </div>
  </div>
</template>

<script>
import FavRestaurant from '@/components/Users_FavRestaurantCard.vue';

export default {
  name: "FavRestaurants",
  components: {
    FavRestaurant,
  },
  props: {
    restaurants: Array, // Array of restaurant IDs
  },
};
</script>
