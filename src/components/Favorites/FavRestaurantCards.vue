<template>
  <div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-1">
      <div v-for="restaurantId in restaurants" :key="restaurantId" class="col">
        <FavRestaurant
          :restaurantId="restaurantId"
          :token="token"
          :read-only="readOnly"
          @deleteRestaurant="$emit('deleteRestaurant', restaurantId.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FavRestaurant from "../Favorites/FavRestaurantCard.vue";

export default {
  name: "FavRestaurants",
  components: {
    FavRestaurant,
  },
  props: {
    restaurants: Array,
    token: String,
    readOnly: Boolean,
  },
  methods: {},
  emits: ["deleteRestaurant"],
};
</script>
