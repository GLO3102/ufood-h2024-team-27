<script setup>
// the LeafletMap corner
// https://github.com/vue-leaflet/vue-leaflet/blob/master/src/playground/views/ for usable components
import "leaflet/dist/leaflet.css";
import restaurantsData from "@/assets/restaurants.json";
import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "@vue-leaflet/vue-leaflet"
import {ref} from "vue";

let map=null
let zoom = ref(16)
let center = ref([47.41322, -1.219482]) // set default value
let here = ref(center.value)
const restaurant = ref(restaurantsData.items[2]);

function getLocation(after=()=>null) { // absolute garbage but it's fine
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((geo)=>{
      center.value=[geo.coords.latitude, geo.coords.longitude];
      here.value = [...center.value]
      map.setView(center.value) // what
      after();
    });
  } 
  // do nothing if geo is not available
}

function mapReady(arg){
  map=arg
  getLocation()
}
</script>


<template>
  <div>
    <div>Restaurant : {{restaurant.name}}</div>
    
    <div class="container my-5">
    <div class="row gy-4">

      <div class="col-lg-4">
        <div class="card border-primary-subtle shadow">
          <div class="card-body">
            <h5 class="card-title">About us</h5>
            <p class="card-text">Prix : {{ restaurant.price_range }}</p>
            <p class="card-text">Type of food : {{ restaurant.genres }}</p>
            <p class="card-text">Rating : {{ restaurant.rating }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-primary-subtle shadow">
          <div class="card-body">
            <h5 class="card-title">Contact</h5>
            <p class="card-text">Address: {{ restaurant.address }}</p>
            <p class="card-text">Telephone: {{ restaurant.tel }}</p>
            <p class="card-text">Email: {{ restaurant.email }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-primary-subtle shadow">
          <div class="card-body">
            <h5 class="card-title">Opening hours</h5>
            <ul class="list-unstyled">
              <li>Dimanche: {{ restaurant.opening_hours.sunday }}</li>
              <li>Lundi: {{ restaurant.opening_hours.monday }}</li>
              <li>Mardi: {{ restaurant.opening_hours.tuesday }}</li>
              <li>Mercredi: {{ restaurant.opening_hours.wednesday }}</li>
              <li>Jeudi: {{ restaurant.opening_hours.thursday }}</li>
              <li>Vendredi: {{ restaurant.opening_hours.friday }}</li>
              <li>Samedi: {{ restaurant.opening_hours.saturday }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

    
    <div style="width: 100%; display: flex; justify-content: center;">
      <main style="width: 600px; height: 400px;">
        <l-map ref="map" v-model:zoom="zoom" :center="center" @ready="mapReady">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>

          <l-marker v-model:lat-lng="here">
            <l-popup>You are here</l-popup>
          </l-marker> <!--optionally add draggable to... make it draggable-->
        </l-map>
      </main>

      <!-- https://www.maps.ie/create-google-map/ -->
      <!--<iframe
        width="100%"
        height="600"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
        <a href="https://www.maps.ie/population/"
          >Population Estimator map</a>
        </iframe>-->

      <!--<MglMap
        :mapboxGl="mapbox - gl"
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        @load="onMapLoaded"
      />-->
    </div>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
}

main {
  height: 100vh;
  width: 100vw;
}
</style>



<!--<script>
	import "mapbox-gl/dist/mapbox-gl.css";
  import Mapbox from "mapbox-gl";
  import { MglMap } from "vue-mapbox";
  export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: ACCESS_TOKEN, // your access token. Needed if you using Mapbox maps
      mapStyle: MAP_STYLE // your map style
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>-->

