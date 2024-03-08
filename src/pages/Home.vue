<template>
  <div>
    <header class="container-fluid mb-5">
      <h1 class="fw-bold text-light mb-0">UFood</h1>
      <p class="ps-2 mb-5 fs-2 fw-bold">Eat, Share, Repeat</p>
      <div class="row justify-content-center align-items-center mb-5">
        <div class="col-10">
          <div class="input-group mb-0">
            <button class="btn btn-primary rounded-start-pill p-3" type="button" data-bs-toggle="modal" data-bs-target="#filters">
              <i class="fa-solid fa-sliders fa-l"></i>
            </button>
            <input type="text" v-model="searchInput" class="form-control fs-5 z-0 rounded-end-pill py-3 pe-5" id="home-search-bar" aria-label="Search bar" placeholder="Search...">
            <button @click="search(searchInput);" class="btn btn-primary z-1" type="button" id="button-search-home">
              <i class="fa-solid fa-magnifying-glass fa-l"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="modal fade" id="filters">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="filters" tabindex="-1">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title fs-5">Filters</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h3 class="fs-4">Category</h3>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">fast-food</button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">pasta</button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">vegan</button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">healthy</button>
              <hr/>

              <h3 class="fs-4">Rating</h3>
              <button type="button" class="btn btn-outline-primary rounded-pill">
                1 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                2 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                3 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                4 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                5 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <hr/>

              <h3 class="fs-4">Price range</h3>
              <div class="d-flex justify-content-between">
                <label for="price-range" class="form-label"><i class="fa-solid fa-dollar-sign"></i></label>
                <label for="price-range" class="form-label text-center" style="flex:1">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                </label>
                <label for="price-range" class="form-label">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                </label>
              </div>
              <input type="range" class="form-range px-1" min="0" max="2" id="price-range">
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="button" class="btn btn-light rounded-pill">Reset all</button>
              <button type="button" class="btn btn-primary rounded-pill" data-bs-dismiss="modal">Search</button>
            </div>
          </div>
        </div>
      </div>
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
import RestaurantCards from "@/components/RestaurantCards.vue";
import { apiGetRestaurants } from "@/api/api";

export default {
    components: {
      RestaurantCards
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