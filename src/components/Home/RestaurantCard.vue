<template>
    <div>
      <!--
        <router-link :to="{name: 'Restaurant', params: {restaurantId: restaurant.id}}"
            style="text-decoration: none; color: inherit;">
      -->
      <div class="card border-0" style="cursor:pointer">
        <div v-if="carousel" :id="'carousel-'+restaurant.id" class="carousel slide">
          <div class="carousel-inner rounded-4">
            <div class="carousel-item active">
              <img :src="restaurant.pictures[0]" class="card-img-top object-fit-cover position-relative" style="aspect-ratio: 1/1" alt="Main picture" draggable="false">
            </div>
            <div v-for="picture in restaurant.pictures.slice(1, 5)" :key="picture" class="carousel-item">
              <img :src="picture" class="card-img-top object-fit-cover position-relative" style="aspect-ratio: 1/1" alt="picture" draggable="false">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel-'+restaurant.id" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" :data-bs-target="'#carousel-'+restaurant.id" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <img v-else :src="restaurant.pictures[0]"
        class="card-img-top object-fit-cover rounded-4 position-relative"
        style="aspect-ratio: 1/1"
        alt="restaurant thumbnail" draggable=false
        @click="this.$router.push({name: 'Restaurant', params: {restaurantId: restaurant.id}})">
        
        <VisitedButton :id="restaurant.id" :initial="false" class="position-absolute top-0 start-0 mt-1 ms-1"/>
        <FavoriteButton :id="restaurant.id" :initial="false" class="position-absolute top-0 end-0 mt-1 me-1" />

        <div class="card-body pt-1 pe-1 ps-0 text-truncate" @click="this.$router.push({name: 'Restaurant', params: {restaurantId: restaurant.id}})">
          <div class="d-flex justify-content-between">
            <div class="text-truncate fw-bold" style="overflow: hidden">
              <span>{{restaurant.name}}</span>
            </div>
            <span class="ps-2" style="white-space: nowrap">
              {{ roundRating(restaurant.rating) }} <i class="fa-solid fa-star fa-sm"></i>
            </span>
          </div>

          <div class="d-flex justify-content-between">
            <div class="text-truncate" style="overflow: hidden">
              {{restaurant.genres.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(", ")}}
            </div>
            <span class="ps-2" style="white-space: nowrap">
              <i v-for="icon in restaurant.price_range" :key="icon" class="fa-solid fa-dollar-sign"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import FavoriteButton from "./FavoriteButton.vue"
import VisitedButton from "./VisitedButton.vue"

  export default {
    name: 'RestaurantCard',
    props: {
      restaurant: Object,
      carousel: Boolean
    },
    methods: {
      roundRating(rating) {
        return Math.round(rating * 10) / 10;
      }
    },
    components: {FavoriteButton, VisitedButton}
  }
</script>

<style scoped>

</style>