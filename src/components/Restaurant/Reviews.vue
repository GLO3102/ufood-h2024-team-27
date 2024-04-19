<template>
  <div class="card rounded-5 p-3 py-2">
    <div class="card-body">
      <h2 class="card-title mb-3">Reviews</h2>
      <div class="d-flex flex-column justify-content-evenly">
        <div
          class="text-center d-flex flex-column align-items-center"
          v-for="review in reviews"
          :key="review.id"
          style="height: 5em"
        >
          <p class="fst-italic mb-0">"{{ review.comment }}"</p>
          <Rating
            class="text-dark"
            v-model="review.rating"
            :cancel="false"
            readonly
          >
            <template #onicon>
              <i class="fa-solid fa-star fa-lg" style="line-height: 25px"></i>
            </template>
            <template #officon>
              <i class="fa-regular fa-star fa-lg" style="line-height: 25px"></i>
            </template>
          </Rating>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from "primevue/rating";

export default {
  name: "Reviews",
  components: {
    Rating,
  },
  props: {
    reviews: Array,
  },
};
</script>

<style scoped>
p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
