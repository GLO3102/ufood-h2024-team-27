<template>
  <div v-if="restaurant" class="rounded-4 p-3 shadow" style="cursor: pointer">
    <div class="d-flex flex-column gap-3 mb-2">
      <img
        :src="restaurant.pictures[0]"
        class="object-fit-cover rounded-4"
        style="aspect-ratio: 1/1; width: 100%"
        alt="restaurant thumbnail"
        draggable="false"
        @click="
          this.$router.push({
            name: 'Restaurant',
            params: { restaurantId: this.restaurantId.id },
          })
        "
      />

      <div
        class="d-flex justify-content-between align-items-end"
        @click="
          this.$router.push({
            name: 'Restaurant',
            params: { restaurantId: this.restaurantId.id },
          })
        "
      >
        <div class="text-truncate fw-bold" style="overflow: hidden">
          <h3 class="fs-6">{{ restaurant.name }}</h3>
        </div>
        <span class="ps-2" style="white-space: nowrap">
          <BtnDeleteResto
            @deleteResto="$emit('deleteRestaurant', restaurantId.id)"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api.js";
import BtnDeleteResto from "./Users_DeleteBtnRestaurant.vue";

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
  methods: {},
};
</script>

<style></style>
