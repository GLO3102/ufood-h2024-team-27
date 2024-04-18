<template>
  <div class="col">
    <GoogleMap
      id="home-map"
      api-key=""
      style="aspect-ratio: 16/9; width: 100%"
      :center="userCoords"
      :zoom="11"
      :disableDefaultUi="true"
      :zoomControl="true"
    >
      <MapMarker
        :options="{
          position: this.userCoords,
          title: 'You',
          icon: { ...this.faLocationIcon, fillColor: '#198754' },
        }"
      />
      <MapMarker
        v-for="restaurant in this.restaurants"
        :key="restaurant.id"
        :options="{
          position: position(restaurant.location),
          icon: { ...this.faLocationIcon, fillColor: '#20c997' },
        }"
        @mouseover="selectedMarker = restaurant"
        @mouseout="selectedMarker = null"
        @click="
          this.$router.push({
            name: 'Restaurant',
            params: { restaurantId: selectedMarker.id },
          })
        "
      >
      </MapMarker>
      <InfoWindow
        v-if="selectedMarker"
        :options="{
          position: position(selectedMarker.location),
          pixelOffset: { height: -40 },
        }"
      >
        <div class="d-flex gap-2" style="width: 16em">
          <img
            :src="selectedMarker.pictures[0]"
            class="object-fit-cover rounded-4"
            style="aspect-ratio: 1/1; width: 40%"
            alt="restaurant thumbnail"
            draggable="false"
          />
          <div
            class="d-flex flex-column justify-content-between"
            style="width: 60%"
          >
            <div class="d-flex flex-column">
              <span id="restaurant-name" class="fw-semibold">{{
                selectedMarker.name
              }}</span>
              <span>{{
                selectedMarker.genres
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(", ")
              }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span style="white-space: nowrap">
                {{ roundRating(selectedMarker.rating) }}
                <i class="fa-solid fa-star fa-sm"></i>
              </span>
              <span class="ps-2" style="white-space: nowrap">
                <i
                  v-for="icon in selectedMarker.price_range"
                  :key="icon"
                  class="fa-solid fa-dollar-sign"
                ></i>
              </span>
            </div>
          </div>
        </div>
      </InfoWindow>
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, Marker as MapMarker, InfoWindow } from "vue3-google-map";
export default {
  name: "HomeMap",
  components: {
    GoogleMap,
    MapMarker,
    InfoWindow,
  },
  props: {
    restaurants: {
      type: Array,
      default: () => [],
    },
    userCoords: {
      type: Object,
    },
  },
  data() {
    return {
      selectedMarker: null,
      faLocationIcon: {
        path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z",
        fillColor: "#198754",
        fillOpacity: 1,
        strokeWeight: 0,
        anchor: { x: 200, y: 512 },
        scale: 0.07,
      },
    };
  },
  methods: {
    roundRating(rating) {
      return Math.round(rating * 10) / 10;
    },
    position(location) {
      return {
        lat: location.coordinates[1],
        lng: location.coordinates[0],
      };
    },
  },
};
</script>

<style>
#restaurant-name {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

#home-map > .mapdiv {
  border-radius: 1.5rem;
  border: 0;
}
@media (max-width: 768px) {
  #home-map {
    aspect-ratio: 1/1 !important;
  }
}

button.gm-ui-hover-effect {
  visibility: hidden;
}
</style>
