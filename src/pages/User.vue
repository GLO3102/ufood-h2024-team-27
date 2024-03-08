<template>
  <div class="container">
    <UserInfo :userInfo="userInfo" />
    <FavLists :listsFavs="listsOfFavs" />
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-8 text-center mb-2">
        <h2>Recently Viewed Restaurants</h2>
        <button @click="changeState" class="btn btn-primary rounded-4">
          Click here to trigger/untrigger visits
        </button>
      </div>
      <div
        v-if="state.isActive === false"
        class="col-8 d-flex justify-content-center align-items-center"
      >
        <button @click="goHome" class="btn btn-primary rounded-4">
          No recents, go back to home page
        </button>
      </div>
      <div
        v-else
        class="col-8 d-flex flex-wrap gap-3 justify-content-center align-items-top"
        id="cards"
      >
        <div
          :class="[
            'card rounded-4 border-primary-subtle shadow ',
            { active: index === 0 },
          ]"
          style="width: 12em"
          v-for="(restaurant, index) in visitedRestaurantDetails"
          :key="restaurant.id"
        >
          <img
            :src="restaurant.pictures[0]"
            class="card-img-top object-fit-cover rounded-5 p-3"
            style="width: 100%; height: 12em"
            alt="..."
            draggable="false"
          />
          <div class="card-body pt-1">
            <h5 class="card-title text-truncate text-sm-start fs-6">
              {{ restaurant.name }}
            </h5>
            <p class="card-text">
              <i class="fa fa-eye" aria-hidden="true"></i>
              {{ restaurant.visits }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usersData from "@/assets/users.json";
import restaurantsData from "@/assets/restaurants.json";
import UserInfo from "@/components/Users_Info.vue";
import * as api from "@/api/api.js";
import FavLists from "@/components/Users_FavLists.vue";

export default {
  name: "User",
  components: {
    UserInfo,FavLists,
  },
  data() {
    return {
      userId: "637171c38e48e46f6a859622",
      userInfo: [],
      visitedRestaurants: [],
      listsOfFavs: [],
      restaurants: restaurantsData.items,
      state: { isActive: true },
    };
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },

    changeState() {
      this.state.isActive = !this.state.isActive;
    },
  },
  async created() {
    (this.userInfo = await api.apiGetUser(this.userId)),
      (this.visitedRestaurants = await api.apiGetVisits(this.userId)),
      (this.listsOfFavs = await api.apiGetUserFavorites(this.userId))
  },
};
</script>

<style></style>
