<template>
  <div class="container" v-if="loaded">
    <div class="row text-center">
      <h1 class="fs-1 fw-bold p-4">{{ restaurant.name }}</h1>
    </div>
    <ImagesCluster :pictures="restaurant.pictures" />
    <div class="row mb-4">
      <div class="col-md-6 mb-4">
        <VisitsAndFavoritesButtons />

        <Infos
          :genres="restaurant.genres"
          :price-range="restaurant.price_range"
          :rating="restaurant.rating"
        />

        <RestaurantMap
          v-if="userCoords"
          :restaurant-name="restaurant.name"
          :restaurant-coords="{
            lat: restaurant.location.coordinates[1],
            lng: restaurant.location.coordinates[0],
          }"
          :user-coords="userCoords"
        />
      </div>
      <div class="col-md-6 mb-4">
        <ContactUs
          :address="restaurant.address"
          :tel="restaurant.tel"
          :opening-hours="restaurant.opening_hours"
        />

        <Reviews :reviews="reviews" />
      </div>
      <RelatedRestaurants
        :genre="restaurant.genres[0]"
        :current-restaurant-id="restaurant.id"
      />
    </div>
    <FavoriteModal
      :id="0"
      :restaurant="restaurant"
      :favorites="this.favorites"
      @add="addToFavorites"
    ></FavoriteModal>
    <VisitModal
      :id="0"
      :restaurant="restaurant"
      @submit="submitVisit"
    ></VisitModal>
  </div>
</template>

<script>
import { apiGetRestaurant, apiGetRestaurantVisits } from "@/api/apiRestaurants";
import { apiAddToFavoritesList } from "@/api/apiFavorites";
import { apiGetUserFavorites } from "@/api/apiUsers";
import { apiCreateVisit } from "@/api/apiVisits";
import { getUserId } from "@/auth/auth";
import FavoriteModal from "../components/Favorites/FavoriteModal.vue";
import VisitModal from "../components/Home/VisitModal.vue";
import RelatedRestaurants from "../components/Restaurant/RelatedRestaurants.vue";
import RestaurantMap from "../components/Restaurant/RestaurantMap.vue";
import ImagesCluster from "../components/Restaurant/ImagesCluster.vue";
import VisitsAndFavoritesButtons from "../components/Restaurant/VisitsAndFavoritesButtons.vue";
import Infos from "../components/Restaurant/Infos.vue";
import ContactUs from "../components/Restaurant/ContactUs.vue";
import Reviews from "../components/Restaurant/Reviews.vue";
import Cookies from "js-cookie";

export default {
  name: "Restaurant",
  props: ["restaurantId"],
  components: {
    FavoriteModal,
    VisitModal,
    ImagesCluster,
    VisitsAndFavoritesButtons,
    Infos,
    RestaurantMap,
    ContactUs,
    Reviews,
    RelatedRestaurants,
  },
  data() {
    return {
      restaurant: {},
      loaded: false,
      favorites: [],
      token: Cookies.get("user_cookie"),
      userId: "",
      userCoords: null,
      reviews: [],
    };
  },
  async created() {
    this.loaded = false;
    try {
      this.restaurant = await apiGetRestaurant(this.restaurantId, this.token);
      this.userId = await getUserId(this.token);

      const favorites = await apiGetUserFavorites(this.userId, this.token, {});
      this.favorites = favorites.items;

      const reviews = await apiGetRestaurantVisits(
        this.restaurantId,
        { limit: 3 },
        this.token,
      );
      this.reviews = reviews.items;

      this.getUserLocation();
    } catch (error) {
      if (error.message === "401") {
        await this.$router.push({ name: "Login" });
      }
    } finally {
      this.loaded = true;
    }
  },
  methods: {
    addToFavorites(form) {
      apiAddToFavoritesList(form.favorite_id, form.restaurant_id, this.token);
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    async submitVisit(form) {
      await apiCreateVisit(
        this.userId,
        form.restaurant_id,
        form.comment,
        form.rating,
        form.date,
        this.token,
      );
    },
  },
};
</script>
