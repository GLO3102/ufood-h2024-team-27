<template>
  <div class="col-12">
    <div class="card rounded-5 p-3 py-2">
      <div class="card-body">
        <h2 class="card-title">Related Restaurants</h2>
      </div>

      <div
        class="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-2 justify-content-center"
      >
        <div
          class="col"
          v-for="restaurant in relatedRestaurants"
          :key="restaurant.id"
        >
          <div
            class="card rounded-4 p-2"
            style="cursor: pointer"
            @click="
              this.$router.push({
                name: 'Restaurant',
                params: { restaurantId: restaurant.id },
              })
            "
          >
            <img
              :src="restaurant.pictures[0]"
              class="card-img-top object-fit-cover rounded-4 position-relative"
              style="aspect-ratio: 1/1"
              alt="restaurant thumbnail"
              draggable="false"
            />
            <div class="card-body pt-1 pb-1 pe-1 ps-0 text-truncate">
              <div class="d-flex justify-content-between">
                <div class="text-truncate fw-bold" style="overflow: hidden">
                  <span>{{ restaurant.name }}</span>
                </div>
                <span class="ps-2" style="white-space: nowrap">
                  {{ roundRating(restaurant.rating) }}
                  <i class="fa-solid fa-star fa-sm"></i>
                </span>
              </div>

              <div class="d-flex justify-content-between">
                <div class="text-truncate" style="overflow: hidden">
                  {{
                    restaurant.genres
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(", ")
                  }}
                </div>
                <span class="ps-2" style="white-space: nowrap">
                  <i
                    v-for="icon in restaurant.price_range"
                    :key="icon"
                    class="fa-solid fa-dollar-sign"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetRestaurants } from "@/api/apiRestaurants";

export default {
  name: "RelatedRestaurants",
  props: ["genre", "currentRestaurantId"],
  data() {
    return {
      relatedRestaurants: [],
      relatedLoaded: false,
    };
  },
  async created() {
    await this.fetchRelatedRestaurants();
  },
  methods: {
    async fetchRelatedRestaurants() {
      const params = { genres: this.genre, limit: 6 };
      try {
        const response = await apiGetRestaurants(
          params,
          this.$cookies.get("user_cookie"),
        );
        this.relatedRestaurants = response.items;
        this.filterRestaurants();
        this.relatedLoaded = true;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des restaurants similaires : ",
          error,
        );
      }
    },
    filterRestaurants() {
      this.relatedRestaurants = this.relatedRestaurants.filter(
        (restaurant) => restaurant.id !== this.currentRestaurantId,
      );
    },
    roundRating(rating) {
      return Math.round(rating * 10) / 10;
    },
  },
};
</script>

<style scoped></style>
