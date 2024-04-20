<template>
  <div>
    <header class="container-fluid mb-5 bg-secondary text-center">
      <h1 class="fw-bold mb-0">UFood</h1>
      <p class="ps-2 mb-5 fs-2 fw-bold">Eat, Share, Repeat</p>

      <MainSearchBar v-if="token" @search="searchRestaurants" />

      <div class="row justify-content-end">
        <img
          src="../assets/ufood_alligator_export.svg"
          class="img-fluid"
          alt="Ufood Alligator"
          style="max-width: 20rem"
        />
      </div>
    </header>
    <main v-if="token" class="container-fluid mb-5">
      <div class="row justify-content-end mb-5" id="restaurants-section">
        <div class="col-4 d-flex justify-content-center">
          <h2 class="text-center text-dark fs-1 fw-bold">Restaurants</h2>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <input
            v-model="mapMode"
            class="btn-check"
            type="checkbox"
            role="switch"
            id="switch-map-mode"
          />
          <label class="btn btn-light rounded-4 p-3" for="switch-map-mode">
            <i class="fa-solid fa-map fa-xl text-primary"></i>
            <span class="d-none d-md-inline-block ms-1 fw-semibold"
              >Map mode</span
            >
          </label>
        </div>
      </div>
      <div class="text-center" v-if="loading"><Loading /></div>
      <div v-if="mapMode && !loading" class="row justify-content-centered">
        <HomeMap
          :restaurants="this.restaurants"
          :user-coords="this.userCoords"
        />
      </div>
      <RestaurantCards v-else :restaurants="this.restaurants" />
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-light rounded-4 m-4"
          v-if="
            this.total >
            this.previousParams.limit * (this.previousParams.page + 1)
          "
          @click="showMore()"
        >
          Show more results
        </button>
        <span v-if="this.total === 0" class="fs-4">No restaurant found!</span>
      </div>
    </main>
    <NotLoggedIn v-if="!token"/>
  </div>
</template>

<script>
import NotLoggedIn from "@/components/NotLoggedIn.vue";
import RestaurantCards from "@/components/Home/RestaurantCards.vue";
import MainSearchBar from "@/components/Search/MainSearchBar.vue";
import { apiGetRestaurants } from "@/api/apiRestaurants";
import Loading from "@/components/Loading.vue";
import Cookies from "js-cookie";
import HomeMap from "@/components/Home/HomeMap.vue";
import { useSearchStore } from "@/stores/searchStore";

export default {
  setup() {
    const searchStore = useSearchStore();
    return { searchStore };
  },
  components: {
    NotLoggedIn,
    RestaurantCards,
    MainSearchBar,
    Loading,
    HomeMap,
  },
  data() {
    return {
      restaurants: [],
      total: null,
      previousParams: { limit: 24, page: 0 },
      loading: false,
      token: Cookies.get("user_cookie"),
      mapMode: false,
      userCoords: { lat: 46.81211861221178, lng: -71.2052398608132 },
    };
  },
  async created() {
    try {
      this.loading = true;
      const params = this.previousParams;
      if (this.searchStore.search !== "") {
        params.q = this.searchStore.search;
        this.searchStore.modifySearch("");
      }

      const data = await apiGetRestaurants(params, this.token);
      this.total = data.total;
      this.restaurants = data.items;
    } catch (error) {
      console.error("Error while fetching restaurants");
    } finally {
      this.loading = false;
    }
    this.getUserLocation();
  },
  methods: {
    async searchRestaurants(params) {
      params.limit = 24;
      params.page = 0;
      this.previousParams = params;
      if (this.mapMode) {
        params = { ...params, ...this.userCoords };
      }

      try {
        const data = await apiGetRestaurants(params, this.token);
        this.restaurants = data.items;
        this.total = data.total;
      } catch(error) {
        console.error("Error while fetching restaurants");
      }
    },
    async showMore() {
      this.previousParams.page += 1;
      const data = await apiGetRestaurants(this.previousParams, this.token);
      this.restaurants = [...this.restaurants, ...data.items];
    },
    getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
  watch: {
    async mapMode(newValue, oldValue) {
      this.loading = true;
      const params = this.previousParams;
      params.limit = 24;
      params.page = 0;
      let data;

      if (newValue) {
        params.lat = this.userCoords.lat;
        params.lon = this.userCoords.lng;
      }
      try {
        this.loading = true;
        data = await apiGetRestaurants(params, this.token);
        this.restaurants = data.items;
        this.previousParams = params;
        this.total = data.total;
      } catch (error) {
        console.error("Error while fetching restaurants");
      } finally {
        this.loading = false;
      }
      this.loading = false;
    },
  },
};
</script>

<style>
h1 {
  font-size: 6rem !important;
}

#button-search-home {
  margin-left: -60px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-top: 4px;
}
</style>
