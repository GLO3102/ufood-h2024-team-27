<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mt-3 pt-3 pb-5">
        <div
          class="row z-depth-3 shadow-lg mb-1 mt-3 border border-5 rounded border-primary"
        >
          <div class="col-sm-4 bg-primary rounded-left">
            <div class="card-block text-center text-white">
              <img
                :src="user.pfp"
                class="rounded-circle mb-3 mt-5"
                style="width: 150px"
                alt="Avatar"
              />

              <h5 class="mb-2">
                <strong
                  >{{ user.firstname }} {{ user.lastname }}
                  <span class="badge bg-danger">PRO</span></strong
                >
              </h5>
              <p class="text-muted fst-italic" id="bio">{{ user.bio }}</p>
              <i class="fa-solid fa-star w-100 pb-4" style="color: #ffd43b">{{
                user.rating
              }}</i>
              <i class="far fa-edit fa-2x mb-4"></i>
            </div>
          </div>
          <div class="col-sm-8 bg-white">
            <h3 class="mt-3 text-center">Information</h3>
            <hr class="border border-secondary border-1 opacity-50" />

            <div class="row">
              <div class="col-6 mt-3 ml-2">
                <p class="fw-bold">First Name</p>
                <h6 class="fw-normal text-muted">{{ user.firstname }}</h6>
              </div>
              <div class="col-6 mt-3">
                <p class="fw-bold">Last Name</p>
                <h6 class="fw-normal text-muted">{{ user.lastname }}</h6>
              </div>
            </div>

            <div class="row">
              <div class="col-6 mt-3">
                <p class="fw-bold">Email</p>
                <h6 class="fw-normal text-muted">{{ user.email }}</h6>
              </div>
              <div class="col-6 mt-3">
                <p class="fw-bold">Phone</p>
                <h6 class="fw-normal text-muted">{{ user.tel }}</h6>
              </div>
              <div class="col-12 mt-3">
                <p class="fw-bold">City</p>
                <h6 class="fw-normal text-muted">{{ user.city }}</h6>
                <hr class="border border-secondary border-1 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-8 d-flex flex-wrap justify-content-center mb-2">
        <h2>Recently Viewed Restaurants</h2>
      </div>
      <div
        v-if="visitedRestaurantDetails.length === 0"
        class="col-8 d-flex justify-content-center align-items-center"
      >
        <!-- Display a button if no visited restaurants are present -->
        <button @click="goHome" class="btn btn-primary">
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
            'card rounded-4 border-0 shadow bg-secondary',
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
            <h5 class="card-title text-truncate text-sm-start">
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

export default {
  data() {
    return {
      user: usersData.items[0],
      restaurants: restaurantsData.items,
    };
  },
  computed: {
    visitedRestaurantDetails() {
      if (!this.user.visitedRestaurants) return [];
      return this.user.visitedRestaurants
        .map((visit) => {
          const restaurant = this.restaurants.find(
            (restaurant) => restaurant.id === visit.id,
          );
          if (restaurant) {
            return {
              ...restaurant,
              visits: visit.visits,
            };
          }
          return null;
        })
        .filter((restaurant) => restaurant != null);
    },
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
