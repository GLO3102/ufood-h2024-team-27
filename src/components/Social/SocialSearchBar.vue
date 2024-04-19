<template>
  <div>
    <div class="row justify-content-center align-items-center mb-5">
      <div class="col-8">
        <div class="input-group mb-0">
          <input
            type="text"
            v-model="searchInput"
            class="form-control fs-5 z-0 rounded-pill py-3 pe-5"
            id="social-search-bar"
            aria-label="Search bar"
            placeholder="Search..."
            autocomplete="off"
            @keyup.enter="search"
          />
          <button
            @click="search"
            class="btn btn-primary z-1"
            type="button"
            id="button-search-social"
          >
            <i class="fa-solid fa-magnifying-glass fa-l"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialSearchBar",
  data() {
    return {
      searchInput: "",
      checkedGenres: [],
      checkedPrices: [],
    };
  },
  methods: {
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
