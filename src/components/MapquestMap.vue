<template>
  <div>
    <div id="map" style="aspect-ratio: 1/1; border-radius: 2rem"></div>
  </div>
</template>

<script>
export default {
  name: "MapquestMap",
  props: {
    restaurantName: String,
    restaurantLocation: Array,
  },
  data() {
    return {
      L: window.L,
      map: null,
    };
  },
  mounted() {
    this.L.mapquest.key = "KpCMIAhgKEi3ZR28LT38ofIjaDbt21mZ";

    this.initMap();
  },
  methods: {
    initMap() {
      this.map = this.L.mapquest.map("map", {
        center: [0, 0],
        layers: L.mapquest.tileLayer("map"),
        zoom: 16,
      });
      this.map.on("locationfound", this.setDirections);
      this.map.on("locationerror", () =>
        console.error("Could not find user location"),
      );
      this.map.locate({ setView: true });
    },
    setDirections() {
      let startPos = this.map.getCenter();
      let endPos = this.L.latLng(
        this.restaurantLocation[1],
        this.restaurantLocation[0],
      );

      const directions = this.L.mapquest.directions();
      directions.setLayerOptions({
        startMarker: {
          draggable: false,
          title: "Current position",
        },
        endMarker: {
          draggable: false,
          title: this.restaurantName,
        },
        routeRibbon: {
          draggable: false,
        },
      });
      directions.route({
        start: startPos,
        end: endPos,
      });
    },
  },
};
</script>

<style scoped></style>
