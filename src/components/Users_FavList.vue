<template>
  <div>
    <h3>{{ listFav.name }}</h3>
   
    <button
      class="btn btn-success btn-sm rounded-0"
      type="button"
      data-toggle="tooltip"
      data-placement="top"
      title="Edit"
    >
      <i class="fa fa-edit"></i>
    </button>

    <button
      class="btn btn-danger btn-sm rounded-0"
      type="button"
      data-toggle="tooltip"
      data-placement="top"
      title="Delete"
    >
      <i class="fa fa-trash"></i>
    </button>

        <FavRestaurants :restaurants="listFav.restaurants"/>
    
  </div>
</template>

<script>
import FavRestaurants from "@/components/Users_FavRestaurantCards.vue";

export default {
  name: "FavList",
  components: {FavRestaurants,},
  props: {
    listFav: Object,
    
  },
};
</script>
