<template>
  <nav class="navbar navbar-expand-md bg-secondary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          class="d-inline-block align-top"
          src="@/assets/ufood_logo_1_export.svg"
          width="50"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 200px"
        >
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="fa-solid fa-house"></i> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Social' }">
              <i class="fa-solid fa-users"></i> Social
            </router-link>
          </li>
          <li class="nav-item" v-if="!user.isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'Login' }">
              <i class="fa-solid fa-user"></i>
              Log In
            </router-link>
          </li>
          <li class="nav-item" v-if="user.isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'User' }">
              <i class="fa-solid fa-user"></i>
              My Profile
            </router-link>
          </li>
          <li class="nav-item logout" v-if="user.isLoggedIn">
            <router-link
              class="nav-link"
              :to="{ name: 'Home' }"
              @click="logout"
            >
              <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
            </router-link>
          </li>
          <li class="nav-item register" v-if="!user.isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'Register' }">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Register
            </router-link>
          </li>
        </ul>
        <form v-if="this.$route.name !== 'Home'" class="d-flex" role="search">
          <input
            id="navbar-search"
            v-model="search"
            type="text"
            class="form-control mr-2 navbar-search-input rounded-pill"
            placeholder="Search a restaurant..."
            aria-label="Search anything"
          />
          <button
            class="btn btn-outline-none my-2 my-sm-0 navbar-search-btn"
            type="submit"
            @click="searchRestaurants"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { checkUserLoggedIn, logout } from "@/auth/auth";
import { useSearchStore } from "@/stores/searchStore";
export default {
  setup() {
    const searchStore = useSearchStore();
    return { searchStore };
  },
  data() {
    return {
      user: {
        isLoggedIn: false,
        name: "My Profile",
      },
      search: "",
    };
  },
  created() {
    this.user.isLoggedIn = checkUserLoggedIn();
  },
  methods: {
    searchRestaurants() {
      this.searchStore.modifySearch(this.search);
      this.$router.push({ name: "Home" });
      this.search = "";
    },
    logout() {
      logout();
      this.user.isLoggedIn = false;
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
