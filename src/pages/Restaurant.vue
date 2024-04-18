<template>
  <div class="container" v-if="loaded">
    <div class="row text-center">
      <h1 class="fs-1 fw-bold p-4">{{ restaurant.name }}</h1>
    </div>
    <div class="rounded d-flex z-1 rounded-5 mb-4">
      <div class="w-50">
        <img
          :src="restaurant.pictures[0]"
          class="w-100 p-1 object-fit-cover rounded-start-5"
          style="aspect-ratio: 1/1"
          alt="restaurant thumbnail"
          draggable="false"
        />
      </div>
      <div class="w-50 flex-wrap">
        <div class="d-flex flex-wrap">
          <img
            v-for="(picture, index) in restaurant.pictures.slice(1, 5)"
            :key="index"
            :src="picture"
            class="w-50 p-1 object-fit-cover"
            :class="roundedCorner(index)"
            style="aspect-ratio: 1/1"
            draggable="false"
          />
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-6 mb-4">
        <div class="row">
          <button
            class="btn btn-primary rounded-pill p-2 m-3 mt-0 me-2 col"
            data-bs-toggle="modal"
            data-bs-target="#favorite-modal-0"
          >
            <i class="fa-solid fa-heart"></i> Add to favorites
          </button>
          <button
            class="btn btn-primary rounded-pill p-2 m-3 mt-0 ms-2 col"
            data-bs-toggle="modal"
            data-bs-target="#visit-modal-0"
          >
            <i class="fa-solid fa-map-pin"></i> Add a visit
          </button>
        </div>
        <div class="card rounded-5 p-3 py-2 mb-4">
          <div class="card-body">
            <h2 class="card-title">Restaurant infos</h2>
            <div class="d-flex mb-4">
              <div class="w-75">
                <h3 class="fs-5">Genres</h3>
                <div class="d-flex flex-wrap gap-2">
                  <GenreButton
                    v-for="genre in restaurant.genres"
                    :key="genre"
                    :genre="genre"
                    read-only
                  />
                </div>
              </div>
              <div class="w-25">
                <h3 class="fs-5">Price range</h3>
                <span class="btn rounded-pill btn-light" disabled>
                  <i
                    v-for="i in restaurant.price_range"
                    :key="i"
                    class="fa-solid fa-dollar-sign"
                  ></i>
                </span>
              </div>
            </div>
            <h3 class="fs-5">Rating</h3>
            <div
              class="d-flex align-items-center justify-content-center gap-2 text-secondary"
            >
              <div class="rating-box">
                <div
                  class="rating"
                  :style="
                    'width:' + convertRatingPercentage(restaurant.rating) + '%;'
                  "
                ></div>
              </div>
              <span class="fs-5 fw-semibold"
                >{{ restaurant.rating.toFixed(1) }} / 5</span
              >
            </div>
          </div>
        </div>
        <MapquestMap
          :restaurant-name="restaurant.name"
          :restaurant-location="restaurant.location.coordinates"
        ></MapquestMap>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card rounded-5 p-3 py-2 mb-4">
          <div class="card-body">
            <h2 class="card-title">Contact us</h2>
            <h3 class="fs-5">Address</h3>
            <p class="mb-4">{{ restaurant.address }}</p>
            <h3 class="fs-5">Phone number</h3>
            <p class="mb-4">{{ restaurant.tel }}</p>
            <h3 class="fs-5">Opening hours</h3>
            <ul class="list-unstyled">
              <li
                v-for="(hours, day) in restaurant.opening_hours"
                :key="day"
                class="text-capitalize fw-semibold"
              >
                {{ day }}
              </li>
              <li v-for="(hours, day) in restaurant.opening_hours" :key="day">
                {{ test(hours) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="card rounded-5 p-3 py-2">
          <div class="card-body">
            <h2 class="card-title">Reviews</h2>
          </div>
        </div>
      </div>
    </div>
    <RelatedRestaurants
      :genre="restaurant.genres[0]"
      :current-restaurant-id="restaurant.id"
    >
    </RelatedRestaurants>
    <FavoriteModal
      :id="0"
      :restaurant="restaurant"
      :favorites="this.favorites"
      @add="addToFavorites"
    ></FavoriteModal>
    <VisitModal
      :id="0"
      :restaurant="restaurant"
      @submit="submitVisit"
    ></VisitModal>
  </div>
</template>

<script>
import { apiGetRestaurant } from "@/api/apiRestaurants";
import { apiAddToFavoritesList } from "@/api/apiFavorites";
import { apiGetUserFavorites } from "@/api/apiUsers";
import { apiCreateVisit } from "@/api/apiVisits";
import { getUserId } from "@/auth/auth";
import GenreButton from "../components/Search/GenreButton.vue";
import FavoriteModal from "../components/Favorites/FavoriteModal.vue";
import VisitModal from "../components/Home/VisitModal.vue";
import MapquestMap from "../components/MapquestMap.vue";
import RelatedRestaurants from "../components/Restaurant/RelatedRestaurants.vue";
import Cookies from "js-cookie";

export default {
  name: "Restaurant",
  props: ["restaurantId"],
  components: {
    GenreButton,
    FavoriteModal,
    VisitModal,
    MapquestMap,
    RelatedRestaurants,
  },
  data() {
    return {
      restaurant: {},
      loaded: false,
      favorites: [],
      token: Cookies.get("user_cookie"),
      userId: "",
    };
  },
  async created() {
    const data = await apiGetRestaurant(this.restaurantId, this.token);
    const id = await getUserId(this.token);
    this.userId = id;
    this.restaurant = data;
    const favorites = await apiGetUserFavorites(this.userId, this.token, {});
    this.favorites = favorites.items;
    this.loaded = true;
  },
  methods: {
    roundedCorner(index) {
      if (index === 1) return "rounded-top-right-2";
      if (index === 3) return "rounded-bottom-right-2";
      return "";
    },
    convertRatingPercentage(rating) {
      return Math.round((rating / 5) * 100);
    },
    test(hour) {
      if (hour === null) return "—";
      return hour;
    },
    addToFavorites(form) {
      apiAddToFavoritesList(form.favorite_id, form.restaurant_id, this.token);
    },
    async submitVisit(form) {
      await apiCreateVisit(
        this.userId,
        form.restaurant_id,
        form.comment,
        form.rating,
        form.date,
        this.token,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.rounded-top-right-2 {
  border-top-right-radius: 2rem;
}

.rounded-bottom-right-2 {
  border-bottom-right-radius: 2rem;
}

.rating-box {
  position: relative;
  vertical-align: middle;
  font-size: 2rem;
  font-family: FontAwesome;
  display: inline-block;

  &:before {
    content: "\f006 \f006 \f006 \f006 \f006";
  }

  .rating {
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
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
