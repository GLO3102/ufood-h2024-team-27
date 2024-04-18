<template>
  <div class="container">
    <div class="card rounded-5 p-3 py-2">
      <div class="card-body">
        <h2 class="card-title">Related Restaurants</h2>
      </div>
      <div
        class="col-md-4"
        v-for="restaurant in relatedRestaurants"
        :key="restaurant.id"
      >
        <div class="card rounded-5 p-3 py-2">
          <img
            :src="restaurant.pictures[0]"
            class="card-img-top"
            alt="Image du restaurant"
          />
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <p class="card-text">{{ restaurant.description }}</p>
            <router-link
              :to="`/restaurant/${restaurant.id}`"
              class="btn btn-primary"
              >Voir plus</router-link
            >
            <!-- Pour l'instant in faut faire un refresh manuel -->
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
  },
};
</script>

<style scoped></style>
