<template>
  <div>
    <header class="container-fluid mb-5 bg-secondary text-center">
      <h1 class="fw-bold mb-0">UFood</h1>
      <p class="ps-2 mb-5 fs-2 fw-bold">Eat, Share, Repeat</p>

      <MainSearchBar @search="search" />

      <div class="row justify-content-end">
        <img
          src="../assets/ufood_alligator_export.svg"
          class="img-fluid"
          alt="Ufood Alligator"
          style="max-width: 20rem"
        />
      </div>
    </header>
    <main class="container-fluid">
      <div class="row mb-5" id="restaurants-section">
        <h2 class="text-center text-dark fs-1 fw-bold">Restaurants</h2>
        
      </div>
      <div class="text-center" v-if="loading"><Loading /></div>
      
      <RestaurantCards :restaurants="this.restaurants"></RestaurantCards>

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
  </div>
</template>

<script>
import RestaurantCards from "@/components/Home/RestaurantCards.vue";
import MainSearchBar from "@/components/Search/MainSearchBar.vue";
import { apiGetRestaurants } from "@/api/api";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    RestaurantCards,
    MainSearchBar,
    Loading,
  },
  data() {
    return {
      restaurants: [],
      total: null,
      previousParams: { limit: 24, page: 0 },
      loading: false,
    };
  },
  async created() {
    try {
      this.loading = true;
      const data = await apiGetRestaurants(this.previousParams);
      this.total = data.total;
      this.restaurants = data.items;
    } catch (error) {
      console.error("Error while fetching restaurants");
    }finally {
      this.loading=false;
    }
  },
  methods: {
    async search(params) {
      params.limit = 24;
      params.page = 0;
      this.previousParams = params;

      const data = await apiGetRestaurants(params);
      this.restaurants = data.items;
      this.total = data.total;
    },
    async showMore() {
      this.previousParams.page += 1;
      const data = await apiGetRestaurants(this.previousParams);
      this.restaurants = [...this.restaurants, ...data.items];
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

#restaurants-section {
  background-image: linear-gradient(
    to left,
    var(--bs-secondary),
    var(--bs-primary)
  );
  background-clip: text;
  color: transparent;
}
</style>
