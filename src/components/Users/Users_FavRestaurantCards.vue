<template>
  <div>
    <div class="row row-cols-1 row-cols-md-4 g-4 mb-1">
      <div v-for="restaurantId in restaurants" :key="restaurantId" class="col">
        <FavRestaurant :restaurantId="restaurantId" @deleteRestaurant="$emit('deleteRestaurant', restaurantId.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import FavRestaurant from './Users_FavRestaurantCard.vue';

export default {
  name: "FavRestaurants",
  components: {
    FavRestaurant,
  },
  props: {
    restaurants: Array,
  },
  methods: {
    
  },
  emits: ['deleteRestaurant']
};
</script>
