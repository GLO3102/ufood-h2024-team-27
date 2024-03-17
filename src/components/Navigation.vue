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
            <router-link
              class="nav-link"
              :to="user.isLoggedIn ? '/user' : '/login'"
              @click="login"
            >
              <i class="fa-solid fa-user"></i>
              {{ user.isLoggedIn ? user.name : "Log In" }}
            </router-link>
          </li>
          <li class="nav-item logout" v-if="user.isLoggedIn">
            <router-link class="nav-link" to="/logout" @click="logout">
              <i class="fa fa-sign-out" aria-hidden="true"></i> Logout
            </router-link>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control mr-2 navbar-search-input rounded-pill"
            placeholder="Find a restaurant..."
            aria-label="Search anything"
            @focus="dropdownVisible = true"
            @blur="hideDropdown"
            ref="searchInput"
          />
          <button
            class="btn btn-outline-none my-2 my-sm-0 navbar-search-btn"
            type="submit"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <div
            v-if="filteredItems.length && searchQuery && dropdownVisible"
            class="dropdown-menu show w-100"
          >
            <a
              v-for="item in filteredItems"
              :key="item.id"
              class="dropdown-item"
              @click="selectItem(item)"
            >
              {{ item.name }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import usersData from "@/assets/users.json";

export default {
  data() {
    return {
      user: {
        isLoggedIn: false,
        name: "My Profile",
      },
      searchQuery: "",
      items: [],

      dropdownVisible: false,
    };
  },
  props: {},
  created() {
    this.setUser();
  },
  computed: {
    filteredItems() {
      return this.items.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },

  watch: {
    searchQuery(newValue) {
      this.dropdownVisible = newValue.length > 0;
    },
  },
  methods: {
    selectItem(item) {
      //this.$router.push({ path: `/restaurants/${item.id}` });
      this.$router.push({
        name: "Restaurant",
        params: { restaurantId: item.id },
      });
      // this.$router.push({ path: "/restaurant" });
    },

    setUser() {
      this.user.isLoggedIn = true;
    },

    logout() {
      this.user.isLoggedIn = false;
      this.$router.push("/");
    },

    login() {
      this.user.isLoggedIn = true;
      this.$router.push("/user");
    },

    hideDropDown(event) {
      if (
        event.relatedTarget &&
        this.$refs.searchInput.contains(event.relatedTarget)
      ) {
        return;
      }
      this.dropdownVisible = false;
    },
    handleClickOutside(event) {
      if (
        this.$refs.searchInput &&
        !this.$refs.searchInput.contains(event.target)
      ) {
        this.dropdownVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1050;
  width: 100%;
}
</style>
