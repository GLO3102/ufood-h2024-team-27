/* eslint-disable */

<script setup>
// doc: https://developer.mapquest.com/documentation/mapquest-js/v1.3/

// this took me an embarassingly long time to figure out ;-;
import {onMounted, ref} from "vue";
import { apiAddToFavoritesList } from "@/api.js";

onMounted(()=>initMap())

// read The Data
import restaurantsData from "@/assets/restaurants.json";
const restaurant = ref(restaurantsData.items[2]);

const restPos = [...restaurant.value.location.coordinates]; //[46.82645, -71.24556]; // centre videotron
const restName = restaurant.value.name;

L.mapquest.key = "KpCMIAhgKEi3ZR28LT38ofIjaDbt21mZ"; // very safe

//var popup = L.popup();
var map = null;

function roundedRating(rating){
  return Math.round(rating)
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

  const addToFavorites = async () => {
    try{
    const listId = apiGetFavoritesLists()[0].id;
    const restaurantId = apiGetRestaurant().id;
    await apiAddToFavoritesList(listId, restaurantId);
    alert("Added to favorites!");
    } catch (error) {
      alert("An error occurred while adding to favorites");
    }
  }
}


</script>


<template>
  <div>
    <div class="container text-center mt-4">
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

<div class="container my-4">
      <h2 class="text-center mb-4" style="color: rgb(223, 19, 35); text-shadow: 2px 2px 4px rgba(254, 193, 13, 0.462);">Welcome to {{ restaurant.name }}</h2>
    </div>

    <div class="text-center">
    <button class="btn btn-primary rounded-3 me-2" @click="addToFavorites">Add to favorites</button>
    <button class="btn btn-primary rounded-3" @click="addToVisited">Add a visit</button>
    </div>

    <div class="container my-5">
      <div class="row gy-4">

        <div class="col-lg-3 offset-lg-1">
          <div class="card border-primary-subtle shadow">
            <div class="card-body">
              <h5 class="card-title">About us</h5>
              <p class="card-text"><b><u>Price range</u></b> <br><i class="fa-solid fa-dollar-sign" v-for="i in restaurant.price_range" :key="i"></i></p>
              <div> <b><u>Genres</u></b>
              <ul class="list-unstyled">
                <li v-for="genre in restaurant.genres" :key="genre">{{ genre }}</li>
              </ul>
            </div>
              <p class="card-text"><b><u>Rating</u></b> <br><i class="fa-solid fa-star" v-for="i in roundedRating(restaurant.rating)" :key="i"></i></p>
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="card border-primary-subtle shadow">
            <div class="card-body">
              <h5 class="card-title">Contact</h5>
              <p class="card-text"><b><u>Address</u></b> <br>{{ restaurant.address }}</p>
              <p class="card-text"><b><u>Phone</u></b> <br>{{ restaurant.tel }}</p>
              <p class="card-text"><b><u>Email</u></b> <br>McDonaldsDesRivieres@mcdo.ca</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="card border-primary-subtle shadow">
            <div class="card-body mb-3">
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

    <div class="mb-4" style="width: 100%; display: flex; justify-content: center;">
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
