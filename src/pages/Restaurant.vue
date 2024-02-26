<script>
/* eslint-disable */
// doc: https://developer.mapquest.com/documentation/mapquest-js/v1.3/

import {onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import * as Api from "@/api/api.js";


export default{
  name: "RestaurantComponent",
  setup() {
    const restaurantInfo = ref(null);
    const route = useRoute();
    const L = window.L;
    let map = null;

    L.mapquest.key = "KpCMIAhgKEi3ZR28LT38ofIjaDbt21mZ";

    async function loadRestaurantInfo(restaurantId) {
      try {
        restaurantInfo.value = await Api.apiGetRestaurant(restaurantId);
        if (restaurantInfo.value) {
          const restPos = [...restaurantInfo.value.location.coordinates];
          const restName = restaurantInfo.value.name;
          initMap(restPos, restName);
        }
      } catch (error) {
          console.error("Error while fetching restaurant info: ", error);
      }
    }

    onMounted(() => {
      loadRestaurantInfo(route.params.restaurantId);
    });

    watch(() => route.params.restaurantId, (newRestaurantId) => {
      loadRestaurantInfo(newRestaurantId);
    });

    function roundedRating(rating){
      return Math.round(rating)
    }

    function initMap(restPos, restName) {
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
    }

//   const addToFavorites = async () => {
//     try{
//     const listId = apiGetFavoritesLists()[0].id;
//     const restaurantId = apiGetRestaurant().id;
//     await apiAddToFavoritesList(listId, restaurantId);
//     alert("Added to favorites!");
//     } catch (error) {
//       alert("An error occurred while adding to favorites");
//     }
//   }

    return {
      restaurantInfo,
      L,
      map,
      roundedRating
    };
  },
};
</script>


<template>
  <div>
    <div class="container text-center mt-4">
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" style="max-width: 75rem;">
  <div class="carousel-inner">
    <div class="carousel-item" v-if="restaurantInfo" v-for="(picture, index) in restaurantInfo.pictures" :class="{ active: index === 0 }" :key="index">
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
      <h2 class="text-center mb-4 fs-1 fw-bold text-primary" v-if="restaurantInfo">Welcome to {{ restaurantInfo.name }}</h2>
    </div>

    <div class="text-center">
    <button class="btn btn-primary rounded-3 me-2" @click="addToFavorites">Add to favorites</button>
    <button class="btn btn-primary rounded-3" @click="addToVisited">Add a visit</button>
    </div>

    <div class="container my-5">
      <div class="row gy-4">

        <div class="col-lg-3 offset-lg-1">
          <div class="card border-primary-subtle shadow">
            <div class="card-body" v-if="restaurantInfo">
              <h5 class="card-title">About us</h5>
              <p class="card-text"><b><u>Price range</u></b> <br><i class="fa-solid fa-dollar-sign" v-for="i in restaurantInfo.price_range" :key="i"></i></p>
              <div> <b><u>Genres</u></b>
              <ul class="list-unstyled" v-if="restaurantInfo">
                <li v-for="genre in restaurantInfo.genres" :key="genre">{{ genre }}</li>
              </ul>
            </div>
              <p class="card-text" v-if="restaurantInfo"><b><u>Rating</u></b> <br><i class="fa-solid fa-star" v-for="i in roundedRating(restaurantInfo.rating)" :key="i"></i></p>
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="card border-primary-subtle shadow">
            <div class="card-body">
              <h5 class="card-title">Contact</h5>
              <p class="card-text" v-if="restaurantInfo"><b><u>Address</u></b> <br>{{ restaurantInfo.address }}</p>
              <p class="card-text" v-if="restaurantInfo"><b><u>Phone</u></b> <br>{{ restaurantInfo.tel }}</p>
              <p class="card-text" v-if="restaurantInfo"><b><u>Email</u></b> <br>{{ restaurantInfo.email }}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="card border-primary-subtle shadow">
            <div class="card-body mb-3">
              <h5 class="card-title">Opening hours</h5>
              <ul class="list-unstyled" v-if="restaurantInfo">
                <li>Dimanche: {{ restaurantInfo.opening_hours.sunday }}</li>
                <li>Lundi: {{ restaurantInfo.opening_hours.monday }}</li>
                <li>Mardi: {{ restaurantInfo.opening_hours.tuesday }}</li>
                <li>Mercredi: {{ restaurantInfo.opening_hours.wednesday }}</li>
                <li>Jeudi: {{ restaurantInfo.opening_hours.thursday }}</li>
                <li>Vendredi: {{ restaurantInfo.opening_hours.friday }}</li>
                <li>Samedi: {{ restaurantInfo.opening_hours.saturday }}</li>
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