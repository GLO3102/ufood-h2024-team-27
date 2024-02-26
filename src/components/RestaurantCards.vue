<template>
    <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
        <RestaurantCard v-for="restaurant in this.restaurants" :key="restaurant.id"
        :restaurant="restaurant" :carousel="carousel"/>
    </div>
</template>

<script>
import RestaurantCard from "./RestaurantCard.vue";

    export default {
    name: "RestaurantCards",
    props: {
        restaurants: Array,
        carousel: {
            type: Boolean,
            default: false
        }
    },
    components: { RestaurantCard }
}
</script>