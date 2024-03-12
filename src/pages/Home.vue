<template>
  <div>
    <header class="container-fluid mb-5">
      <h1 class="fw-bold text-light mb-0">UFood</h1>
      <p class="ps-2 mb-5 fs-2 fw-bold">Eat, Share, Repeat</p>
      <div class="row justify-content-center align-items-center mb-5">
        <div class="col-10">
          <div class="input-group mb-0">
            <button class="btn btn-primary rounded-start-pill p-3" type="button" data-bs-toggle="modal" data-bs-target="#search-filter">
              <i class="fa-solid fa-sliders fa-l"></i>
            </button>
            <input type="text" v-model="searchInput" class="form-control fs-5 z-0 rounded-end-pill py-3 pe-5" id="home-search-bar" aria-label="Search bar" placeholder="Search...">
            <button @click="search(searchInput);" class="btn btn-primary z-1" type="button" id="button-search-home">
              <i class="fa-solid fa-magnifying-glass fa-l"></i>
            </button>
          </div>
        </div>
      </div>
      <SearchFilter></SearchFilter>
      <div class="row justify-content-end">
        <img src="../assets/ufood_alligator_export.svg" class="img-fluid" alt="Ufood Alligator" style="max-width: 20rem">
      </div>
    </header>
    <main class="container-fluid">
      <div class="row mb-5" id="restaurants-section">
        <h2 class="text-center fs-1 fw-bold">Restaurants</h2>
      </div>
      <RestaurantCards :restaurants="this.restaurants"></RestaurantCards>

      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-light rounded-4"
        v-if="this.total > this.limit * (this.page + 1)"
        @click="showMore()">Show more results</button>
      </div>
    </main>
  </div>
</template>

<script>
import RestaurantCards from "@/components/Home/RestaurantCards.vue";
import SearchFilter from "@/components/Search/SearchFilter.vue";
import { apiGetRestaurants } from "@/api/api";

export default {
    components: {
      RestaurantCards,
      SearchFilter
    },
    data() {
      return {
        restaurants: [],
        total: 0,
        limit: 24,
        page: 0,
        searchInput: ''
      }
    },
    async created() {
      this.page = 0;
      const data = await apiGetRestaurants({limit: this.limit, page: this.page});
      this.total = data.total;
      this.restaurants = data.items;
    },
    methods: {
      async search(input) {
        this.page = 0;
        const data = await apiGetRestaurants({q: input, limit: this.limit, page: this.page});
        this.restaurants = data.items;
      },
      async showMore() {
        this.page++;
        const data = await apiGetRestaurants({limit: this.limit, page: this.page});
        this.restaurants = [...this.restaurants, ...data.items];
      }
    }
}
</script>

<style>
header {
  background-image: linear-gradient(var(--bs-secondary), var(--bs-primary));
}

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
  background-image: linear-gradient(to left, var(--bs-secondary), var(--bs-primary));
  background-clip: text;
  color: transparent;
}

</style>