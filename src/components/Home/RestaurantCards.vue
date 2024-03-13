<template>
    <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
        <div v-for="(restaurant, index) in restaurants" :key="restaurant.id">
            <RestaurantCard :restaurant="restaurant" :id="index" :carousel="carousel"/>
        </div>
    </div>
</template>

<script>
import RestaurantCard from "./RestaurantCard.vue";

    export default {
    name: "RestaurantCards",
    props: {
        restaurants: {
            type: Array,
            default: () => []
        },
        carousel: {
            type: Boolean,
            default: false
        }
    },
    components: { RestaurantCard }
}
</script>