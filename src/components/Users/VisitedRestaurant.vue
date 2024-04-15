<template>
  <div v-if="loaded" class="rounded-4 p-3 shadow">
    <div class="d-flex gap-3 mb-2">
      <img
        :src="restaurant.pictures[0]"
        class="object-fit-cover rounded-4"
        style="aspect-ratio: 1/1; width: 6rem; cursor: pointer"
        alt="restaurant thumbnail"
        draggable="false"
        @click="
          this.$router.push({
            name: 'Restaurant',
            params: { restaurantId: restaurant.id },
          })
        "
      />
      <div class="d-flex flex-column justify-content-between">
        <h3 class="fs-5">{{ restaurant.name }}</h3>
        <Rating
          class="text-secondary"
          v-model="rating"
          :cancel="false"
          readonly
        >
          <template #onicon>
            <i class="fa-solid fa-star fa-lg" style="line-height: 25px"></i>
          </template>
          <template #officon>
            <i class="fa-regular fa-star fa-lg" style="line-height: 25px"></i>
          </template>
        </Rating>
        <span>{{ date }}</span>
      </div>
    </div>
    <p>
      {{ visit.comment }}
    </p>
  </div>
</template>

<script>
import { apiGetRestaurant } from "@/api/apiRestaurants.js";
import Rating from "primevue/rating";

export default {
  name: "VisitedRestaurant",
  components: { Rating },
  data() {
    return {
      restaurant: Object,

      loaded: false,
    };
  },
  props: {
    visit: Object,
    token: String,
  },
  async created() {
    try {
      this.restaurant = await apiGetRestaurant(
        this.visit.restaurant_id,
        this.token,
      );
      this.loaded = true;
    } catch (error) {
      console.error("Error while fetching restaurant", error);
    }
  },
  computed: {
    rating() {
      return this.visit.rating;
    },
    date() {
      return this.visit.date.split("T", 1)[0];
    },
  },
};
</script>

<style scoped>
p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
