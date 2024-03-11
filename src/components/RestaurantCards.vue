<template>
    <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
        <div v-for="restaurant in restaurants" :key="restaurant.id">
            <router-link :to="{name: 'Restaurant', params: {restaurantId: restaurant.id}}"
            style="text-decoration: none; color: inherit;">
                <RestaurantCard :restaurant="restaurant" :carousel="carousel"/>
            </router-link>
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