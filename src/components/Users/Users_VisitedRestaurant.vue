<template>
  <div class="card">
    <div class="card-body p-4 p-xxl-5">
      <div
        class="bsb-ratings text-warning mb-3"
        data-bsb-star="5"
        data-bsb-star-off="0"
      ></div>
      <blockquote class="bsb-blockquote-icon mb-3">
        {{ visit.comment }}
      </blockquote>
      <figure class="d-flex align-items-center m-0 p-0">
        <div class="d-flex justify-content-center">
          <img
            v-if="restaurant.pictures && restaurant.pictures.length"
            :src="restaurant.pictures[0]"
            class="img-fluid rounded-circle w-150"
            alt="Restaurant picture"
          />
          <img
            v-else
            src="default-image-url.jpg"
            class="img-fluid rounded-circle w-25"
            alt="Default image"
          />
        </div>
        <figcaption class="ms-3">
          <h3 class="mb-1 h4">{{ restaurant.name }}</h3>
          <h4 class="mb-1 h5">
            {{ visit.rating
            }}<i class="fa-solid fa-star w-100 pb-4" style="color: #ffd43b"></i>
          </h4>
          <h5 class="fs-6 text-secondary mb-0">{{ visit.date }}</h5>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api.js";
// Il va nous rester a regarder pour le restaurant ID, aller le chercher et
//lutiliser ici. Changer le style et autre egalement
export default {
  name: "VisitedRestaurant",
  data() {
    return {
      restaurant: Object,
    };
  },
  props: {
    visit: Object,
  },
  async created() {
    try {
      this.restaurant = await api.apiGetRestaurant(this.visit.restaurant_id);
    } catch (error) {
      console.log("Error while fetching restaurant", error);
    }
  },
};
</script>

<style></style>
