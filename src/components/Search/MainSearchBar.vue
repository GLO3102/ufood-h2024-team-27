<template>
  <div>
    <div class="row justify-content-center align-items-center mb-5">
      <div class="col-10">
        <div class="input-group mb-0">
          <button
            class="btn btn-primary rounded-start-pill p-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#search-filter"
          >
            <i class="fa-solid fa-sliders fa-l"></i>
          </button>
          <input
            type="text"
            v-model="searchInput"
            class="form-control fs-5 z-0 rounded-end-pill py-3 pe-5"
            id="home-search-bar"
            aria-label="Search bar"
            placeholder="Search..."
            autocomplete="off"
            @keyup.enter="search"
          />
          <button
            @click="search"
            class="btn btn-primary z-1"
            type="button"
            id="button-search-home"
          >
            <i class="fa-solid fa-magnifying-glass fa-l"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="search-filter">
      <div
        class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        tabindex="-1"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">Filters</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <h3 class="fs-4">Category</h3>
            <div class="d-flex flex-wrap gap-2">
              <GenreButton
                v-for="(genre, index) in this.genres"
                :key="index"
                :genre="genre"
                :index="index"
                v-model="this.checkedGenres"
              >
              </GenreButton>
            </div>
            <hr />

            <h3 class="fs-4">Price</h3>
            <div class="d-flex gap-2">
              <PriceButton
                v-for="i in 5"
                :key="i"
                :number="i"
                v-model="this.checkedPrices"
              />
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-light rounded-pill"
              @click="resetFilters"
            >
              Reset all
            </button>
            <button
              type="button"
              class="btn btn-primary rounded-pill"
              data-bs-dismiss="modal"
              @click="search"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenreButton from "./GenreButton.vue";
import PriceButton from "./PriceButton.vue";

export default {
  name: "MainSearchBar",
  components: { GenreButton, PriceButton },
  data() {
    return {
      genres: [
        "fast-food",
        "libanais",
        "hamburgers",
        "ambiance",
        "café",
        "asiatique",
        "bistro",
        "italien",
        "happy hour",
        "mexicain",
        "végétarien",
        "steakhouse",
        "grec",
        "fruits de mer",
        "vietnamien",
        "pizzeria",
        "boulangerie",
        "desserts",
        "charcuterie",
        "indien",
        "européen",
        "cuisine moléculaire",
        "santé",
        "japonais",
      ],
      searchInput: "",
      checkedGenres: [],
      checkedPrices: [],
    };
  },
  methods: {
    resetFilters() {
      console.log(this.checkedPrices);
      this.checkedGenres = [];
      this.checkedPrices = [];
      this.search();
    },
    resetSearchBar() {
      this.searchInput = "";
      this.search();
    },
    search() {
      let params = {};

      if (this.searchInput !== "") params.q = this.searchInput;
      if (this.checkedGenres.length > 0) params.genres = this.checkedGenres;
      if (this.checkedPrices.length > 0)
        params.price_range = this.checkedPrices;

      this.$emit("search", params);
    },
  },
  emits: ["search"],
};
</script>
