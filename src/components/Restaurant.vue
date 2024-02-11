<script setup>
// doc: https://developer.mapquest.com/documentation/mapquest-js/v1.3/

// this took me an embarassingly long time to figure out ;-;
import {onMounted, ref} from "vue";
onMounted(()=>initMap())

// read The Data
import restaurantsData from "@/assets/restaurants.json";
const restaurant = ref(restaurantsData.items[2]);

const restPos = [...restaurant.value.location.coordinates]; //[46.82645, -71.24556]; // centre videotron
const restName = restaurant.value.name;

L.mapquest.key = "SCeop25saVUhKgzAdwuB9IXjs21FyYKT"; // very safe 

//var popup = L.popup();
var map = null;

function displayPriceRange(priceRange) {
  return '$'.repeat(priceRange);
}

function initMap(){
  // the old, dumb way to get location data
  //navigator.geolocation.getCurrentPosition(createMap);
  //L.mapquest.geocoding().reverse(e.latlng, generatePopupContent); // to find the user's current address
  createMap();

  function createMap(){
    map = L.mapquest.map('map', {
      center: [0,0],
      layers: L.mapquest.tileLayer('map'),
      zoom: 16
    });
    map.on("locationfound", setDirections);
    map.on("locationerror", ()=>console.error("Could not find user location"));
    map.locate({setView:true});
  }

  function setDirections(){
    let startPos = map.getCenter();
    let endPos = L.latLng(restPos[1],restPos[0])

    var directions = L.mapquest.directions();
    directions.setLayerOptions({
      startMarker: {
        draggable: false,
        title: "Current position"
      },
      endMarker: {
        draggable: false,
        title: restName
      },
      routeRibbon: {
        draggable: false
      }
    });

    directions.route({
      start: startPos,
      end: endPos
    });
  }

  /* 
  // make it tell you what the address is of the thing you clicked
  map.on('click', function(e) {
    popup.setLatLng(e.latlng).openOn(this);
    L.mapquest.geocoding().reverse(e.latlng, generatePopupContent);
  });

  function generatePopupContent(error, response) {
    var location = response.results[0].locations[0];
    var street = location.street;
    var city = location.adminArea5;
    var state = location.adminArea3;
    popup.setContent(street + ', ' + city + ', ' + state);
  }
  */
}

// BEFORE MAPQUEST - KEPT AS FALLBACK
// the LeafletMap corner
// https://github.com/vue-leaflet/vue-leaflet/blob/master/src/playground/views/ for usable components

//import "leaflet/dist/leaflet.css";
//import { LMap, LTileLayer, LMarker, LTooltip, LPopup } from "@vue-leaflet/vue-leaflet"
//import {ref} from "vue";

/*let map=null
let zoom = ref(16)
let center = ref([47.41322, -1.219482]) // set default value
let here = ref(center.value)*/

/*function getLocation(after=()=>null) { // absolute garbage but it's fine
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((geo)=>{
      center.value=[geo.coords.latitude, geo.coords.longitude];
      here.value = [...center.value]
      map.setView(center.value) // what
      after();
    });
  } 
  // do nothing if geo is not available
}*/

/*function mapReady(arg){
  map=arg
  getLocation()
}*/
</script>


<template>
  <div>
    
    <div class="container text-center mt-3">
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" style="max-width: 75rem;">
  <div class="carousel-inner">
    <div class="carousel-item" v-for="(picture, index) in restaurant.pictures" :class="{ active: index === 0 }" :key="index">
      <img :src="picture" class="d-block w-100 carousel-image" :alt="`Image ${index + 1}`">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</div>

    <div class="container my-5">
      <div class="row gy-4">

        <div class="col-lg-4">
          <div class="card border-primary-subtle shadow">
            <div class="card-body">
              <h5 class="card-title">About us</h5>
              <p class="card-text"><b><u>Price range</u></b> <br>{{ displayPriceRange(restaurant.price_range) }} </p> 
              <div> <b><u>Genres</u></b>
              <ul class="list-unstyled">
                <li v-for="genre in restaurant.genres" :key="genre">{{ genre }}</li>
              </ul>
            </div>
              <p class="card-text"><b><u>Rating</u></b> <br>{{ restaurant.rating }}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card border-primary-subtle shadow">
            <div class="card-body">
              <h5 class="card-title">Contact</h5>
              <p class="card-text"><b><u>Address</u></b> <br>{{ restaurant.address }}</p>
              <p class="card-text"><b><u>Phone</u></b> <br>{{ restaurant.tel }}</p>
              <p class="card-text"><b><u>Email</u></b> <br>McDonaldsDesRivieres@mcdo.ca</p>
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
      <div id="map" style="width: 75%; height: 550px;" @load="initMap"></div>
      <!--<main style="width: 600px; height: 400px;">
        <l-map ref="map" v-model:zoom="zoom" :center="center" @ready="mapReady">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>

          <l-marker v-model:lat-lng="here">
            <l-popup>You are here</l-popup>
          </l-marker>
        </l-map>
      </main>-->
    </div>
  </div>
</template>

<style>
.carousel-image {
  height: 35rem;
  object-fit: cover;
}
</style>