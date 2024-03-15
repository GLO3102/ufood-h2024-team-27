<template>
    <div class="container">
        <div class="row text-center">
            <h1 class="fs-1 fw-bold p-4">{{ restaurant.name }}</h1>
        </div>
        <div class="rounded d-flex z-1 rounded-5 mb-4" v-if="restaurant.pictures">
            <div class="w-50">
                <img :src="restaurant.pictures[0]"
                class="w-100 p-1 object-fit-cover rounded-start-5"
                style="aspect-ratio: 1/1"
                alt="restaurant thumbnail" draggable=false>
            </div>
            <div class="w-50 flex-wrap">
                <div class="d-flex flex-wrap">
                    <img v-for="(picture, index) in restaurant.pictures.slice(1, 5)" :key="index"
                        :src="picture"
                        class="w-50 p-1 object-fit-cover"
                        :class="roundedCorner(index)"
                        style="aspect-ratio: 1/1"
                        draggable=false>
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-md-6 mb-4">
                <div class="card rounded-5">
                    <div class="card-body">
                        <h2 class="card-title">Contact us</h2>
                        <h3 class="fs-5">Address</h3>
                        <p class="mb-4">{{ restaurant.address }}</p>
                        <h3 class="fs-5">Phone number</h3>
                        <p class="mb-4">{{ restaurant.tel }}</p>
                        <h3 class="fs-5">Opening hours</h3>
                        <ul class="list-unstyled">
                            <li v-for="(hours, day) in restaurant.opening_hours" :key="day" class="text-capitalize fw-semibold">
                                {{ day }}
                            </li>
                            <li v-for="(hours, day) in restaurant.opening_hours" :key="day">
                                {{ test(hours) }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6" mb-4>
                <div class="card rounded-5">
                    <div class="card-body">
                        <h2 class="card-title">Restaurant infos</h2>
                        <div class="d-flex mb-4">
                            <div class="w-75">
                                <h3 class="fs-5">Genres</h3>
                                <div class="d-flex flex-wrap gap-2">
                                    <GenreButton v-for="genre in restaurant.genres" :key="genre" :genre="genre" read-only/>
                                </div>
                            </div>
                            <div class="w-25">
                                <h3 class="fs-5">Price range</h3>
                                <span class="btn rounded-pill btn-light" disabled>
                                    <i v-for="i in restaurant.price_range" :key="i" class="fa-solid fa-dollar-sign"></i>
                                </span>
                            </div>
                        </div>
                        <h3 class="fs-5">Rating</h3>
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <div class="rating-box">
                                <div class="rating" :style="'width:' + convertRatingPercentage(restaurant.rating) +'%;'"></div>
                            </div>
                            <span class="fs-5" v-if="restaurant.rating">{{ restaurant.rating.toFixed(1) }} / 5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card rounded-5">
                <div class="card-body">
                    <h2 class="card-title">Reviews</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiGetRestaurant } from '@/api/api';
import GenreButton from "../components/Search/GenreButton.vue";

    export default {
        name: "Restaurantv2",
        props: ["restaurantId"],
        components: { GenreButton },
        data() {
            return {
                restaurant: {}
            }
        },
        async created() {
            const data = await apiGetRestaurant(this.restaurantId);
            this.restaurant = data;
        },
        methods: {
            roundedCorner(index) {
                if (index == 1) return 'rounded-top-right-2';
                if (index == 3) return 'rounded-bottom-right-2';
                return ''
            },
            convertRatingPercentage(rating){
                return Math.round((rating / 5) * 100);
            },
            test(hour) {
                if (hour === null) return "—";
                return hour;
            }
        }
    }
</script>

<style scoped>
.rounded-top-right-2 {
    border-top-right-radius: 2rem;
}

.rounded-bottom-right-2 {
    border-bottom-right-radius: 2rem;
}

.rating-box {
    position:relative;
    vertical-align: middle;
    font-size: 2rem;
    font-family: FontAwesome;
    display: inline-block;

    &:before{
        content: "\f006 \f006 \f006 \f006 \f006";
    }

    .rating {
        position: absolute;
        left:0;
        top:0;
        white-space:nowrap;
        overflow:hidden;
        &:before {
            content: "\f005 \f005 \f005 \f005 \f005";
        }
    }
}

ul {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
}
</style>