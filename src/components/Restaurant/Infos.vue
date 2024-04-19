<template>
  <div class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <h2 class="card-title">Restaurant infos</h2>
      <div class="d-flex mb-4">
        <div class="w-75">
          <h3 class="fs-5">Genres</h3>
          <div class="d-flex flex-wrap gap-2">
            <GenreButton
              v-for="genre in genres"
              :key="genre"
              :genre="genre"
              read-only
            />
          </div>
        </div>
        <div class="w-25">
          <h3 class="fs-5">Price range</h3>
          <span class="btn rounded-pill btn-light" disabled>
            <i
              v-for="i in priceRange"
              :key="i"
              class="fa-solid fa-dollar-sign"
            ></i>
          </span>
        </div>
      </div>
      <h3 class="fs-5">Rating</h3>
      <div
        class="d-flex align-items-center justify-content-center gap-2 text-secondary"
      >
        <div class="rating-box">
          <div
            class="rating"
            :style="'width:' + convertRatingPercentage(rating) + '%;'"
          ></div>
        </div>
        <span class="fs-5 fw-semibold"> {{ rating.toFixed(1) }} / 5 </span>
      </div>
    </div>
  </div>
</template>

<script>
import GenreButton from "../Search/GenreButton.vue";

export default {
  name: "Infos",
  components: {
    GenreButton,
  },
  props: {
    genres: Array,
    priceRange: Array,
    rating: Number,
  },
  methods: {
    convertRatingPercentage(rating) {
      return Math.round((rating / 5) * 100);
    },
  },
};
</script>

<style scoped>
.rating-box {
  position: relative;
  vertical-align: middle;
  font-size: 2rem;
  font-family: FontAwesome;
  display: inline-block;

  &:before {
    content: "\f006 \f006 \f006 \f006 \f006";
  }

  .rating {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
    &:before {
      content: "\f005 \f005 \f005 \f005 \f005";
    }
  }
}
</style>
