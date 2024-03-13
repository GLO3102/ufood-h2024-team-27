<template>
  <div>
    <div v-if="restaurant">
      <img
        :src="restaurant.pictures[0]"
        class="card-img-top object-fit-cover rounded-4 position-relative"
        style="aspect-ratio: 1/1"
        alt="restaurant thumbnail"
        draggable="false"
      />
      
      <div class="card-body pt-1 pe-1 ps-0 text-truncate">
        <div class="d-flex justify-content-between">
          <div class="text-truncate fw-bold" style="overflow: hidden">
            <span>{{ restaurant.name }}</span>
          </div>
          <span class="ps-2" style="white-space: nowrap">
            <BtnDeleteResto @deleteResto="$emit('deleteRestaurant', restaurantId.id)" />
          </span>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api.js";
import BtnDeleteResto from './Users_DeleteBtnRestaurant.vue';

export default {
  name: "FavRestaurant",
  props: {
    restaurantId: Object,
  },
  components: {
    BtnDeleteResto,
  },
  data() {
    return {
      restaurant: null,
    };
  },
  async created() {
    try {
      this.restaurant = await api.apiGetRestaurant(this.restaurantId.id);
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
    }
  },
  methods: {
    
  }
};
</script>

<style>
</style>
