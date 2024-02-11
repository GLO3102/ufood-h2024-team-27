<script setup>
// doc: https://developer.mapquest.com/documentation/mapquest-js/v1.3/

// this took me an embarassingly long time to figure out ;-;
import {onMounted} from "vue";
onMounted(()=>initMap())

// could read from json if we wanted
let suppliedPos = [46.82645, -71.24556]; // centre videotron
let suppliedName = "Centre Vidéotron";

L.mapquest.key = "SCeop25saVUhKgzAdwuB9IXjs21FyYKT"; // very safe 

//var popup = L.popup();
var currPos = [0,0];
var map = null;
function initMap(){
  // the old, dumb way to get location data
  //navigator.geolocation.getCurrentPosition(createMap);
  //L.mapquest.geocoding().reverse(e.latlng, generatePopupContent); // to find the user's current address

  createMap();

  function createMap(pos=null){
    //currPos = [pos.coords.latitude, pos.coords.longitude]
    map = L.mapquest.map('map', {
      center: currPos, //[37.7749, -122.4194], // san francisco, california
      layers: L.mapquest.tileLayer('map'),
      zoom: 16
    });
    map.on("locationfound", setDirections);
    map.on("locationerror", ()=>console.error("Could not find user location"));
    map.locate({setView:true});
  }

  function setDirections(){
    currPos = map.getCenter();
    var directions = L.mapquest.directions();
    directions.setLayerOptions({
      startMarker: {
        draggable: false,
        title: "Current position"
      },
      endMarker: {
        draggable: false,
        title: suppliedName
      },
      routeRibbon: {
        draggable: false
      }
    });

    directions.route({
      start: currPos,//'350 5th Ave, New York, NY 10118',
      end: suppliedPos//'One Liberty Plaza, New York, NY 10006'
    });
  }
  
  //L.mapquest.geocoding().geocode('Quebec, QC'); // go to place

  /* // make it tell you what the address is of the thing you clicked
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
    <h1>Restaurant</h1>
    <div>GLO-3102 Restaurant page</div>
    <div style="width: 100%">
      <div id="map" style="width: 700px; height: 700px;" @load="initMap"></div>
      
      <!--
      <main>
        
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

