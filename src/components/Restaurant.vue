

<template>
  <div>
    <h1>Restaurant</h1>
    <div>GLO-3102 Restaurant page</div>
    <div style="width: 100%">
      <!-- https://www.maps.ie/create-google-map/ -->
      <iframe
        width="100%"
        height="600"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
        <a href="https://www.maps.ie/population/"
          >Population Estimator map</a>
        </iframe>

      <!--<MglMap
        :mapboxGl="mapbox - gl"
        :accessToken="accessToken"
        :mapStyle.sync="mapStyle"
        @load="onMapLoaded"
      />-->
    </div>
  </div>
</template>

<style></style>

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

