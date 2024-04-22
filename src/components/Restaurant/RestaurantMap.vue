<template>
  <div>
    <div id="restaurant-map" class="b-0"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
export default {
  name: "RestaurantMap",
  props: {
    userCoords: Object,
    restaurantCoords: Object,
    restaurantName: String,
  },
  data() {
    return {
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
  mounted() {
    this.drawRoute();
  },
  methods: {
    drawRoute() {
      const loader = new Loader({
        apiKey: "AIzaSyD-RlodHUWxhZx-evhtdH9-PkBXa6g-qyU",
        version: "weekly",
        libraries: ["routes", "maps", "marker"],
      });
      loader.load().then((google) => {
        const map = new google.maps.Map(
          document.getElementById("restaurant-map"),
          {
            zoom: 10,
            center: this.userCoords,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
          },
        );
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer({
          polylineOptions: {
            strokeColor: "#3D434A",
          },
          draggable: false,
          suppressMarkers: true,
        });
        const userMarker = new google.maps.Marker({
          position: this.userCoords,
          title: "You",
          icon: { ...this.faLocationIcon, fillColor: "#198754" },
        });
        const restaurantMarker = new google.maps.Marker({
          position: this.restaurantCoords,
          title: this.restaurantName,
          icon: { ...this.faLocationIcon, fillColor: "#20c997" },
        });

        directionsDisplay.setMap(map);
        userMarker.setMap(map);
        restaurantMarker.setMap(map);

        const travel = {
          origin: this.userCoords,
          destination: this.restaurantCoords,
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
        };

        directionsService.route(travel, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
      });
    },
  },
};
</script>

<style>
#restaurant-map {
  aspect-ratio: 1/1;
  border-radius: 2rem;
}
</style>
