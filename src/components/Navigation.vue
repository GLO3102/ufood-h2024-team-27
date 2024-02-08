<template>
  <nav class="navbar navbar-expand-sm bg-secondary">
    <div class="container-lg">
      <router-link class="navbar-brand mb-0 h1" to="/">
        <img
          class="d-inline-block align-top"
          src="./LogoUFood.png"
          width="160"
          height="100"
        />
      </router-link>

      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        class="navbar-toggler"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle Navigation"
      >
        <span class="navbar-toggler-icon d-flex justify-content-center"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/"
              >Home <i class="fa-solid fa-house"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link disabled" to="/restaurant"
              >Restaurants <i class="fa-solid fa-burger"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="user.isLoggedIn ? '/user' : '/login'"
              @click="login"
            >
              {{ user.isLoggedIn ? user.name : "Log In" }}
              <i class="fa-solid fa-user"></i
            ></router-link>
          </li>
          <li class="nav-item logout" v-if="user.isLoggedIn">
            <router-link class="nav-link" to="/logout" @click="logout"
              >LogOut <i class="fa fa-sign-out" aria-hidden="true"></i>
            </router-link>
          </li>
        </ul>

        <form
          class="form-inline my-2 my-lg-0 d-flex align-items-center position-relative"
        >
          <input
            v-model="searchQuery"
            type="text"
            class="form-control mr-2 navbar-search-input"
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
    <!--    -->
  </nav>
</template>

<script>
import restaurantsData from "@/assets/restaurants.json";
export default {
  data() {
    return {
      user: {
        isLoggedIn: true,
        name: "User 1 ",
      },
      searchQuery: "",
      items: restaurantsData.items,

      dropdownVisible: false,
    };
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
      this.$router.push({ path: "/restaurant" });
    },

    logout() {
      this.user.isLoggedIn = false;
    },

    login() {
      this.user.isLoggedIn = true;
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
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  font-family: "poppins", sans-serif;
}

.navbar-nav .nav-item {
  margin-right: 1rem;
}

.navbar-nav .nav-item:last-child {
  margin-right: 0;
}

.navbar-nav .nav-link:hover {
  font-size: 1.1em;
  transition: font-size 0.3s ease;
}

.navbar-brand:hover {
  font-size: inherit;
}
.navbar-toggler {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
}

.navbar-collapse.collapse.show {
  transition: all 0.5s ease-in-out;
  margin-top: 1em;
}

.navbar-collapse.collapsing {
  transition: all 0.5s ease-in-out;
  margin-top: 1em;
}

.navbar-collapse.collapse {
  transition: all 0.5s ease-in-out;

  border: black;
  border-radius: 10%;
}
.form-inline {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1050;
  width: 100%;
}

.navbar-search-input {
  width: auto;
  max-width: 200px;
}

.navbar-search-btn {
  padding: 0.1rem 0.5rem;
}

.navbar-nav .nav-link,
.navbar-search-btn,
.navbar-search-input {
  display: flex;
  align-items: center;
  height: 38px;
}

@media (max-width: 884.98px) {
  .navbar .container-lg {
    flex-direction: column;
    align-items: center;
  }

  .input-group {
    margin-top: 1em;
  }
}
@media (max-width: 577px) {
  .navbar .container-lg {
    flex-direction: column;
    align-items: center;
  }
  .dropdown-menu {
    max-width: 200px;
  }
}
</style>
