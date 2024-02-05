<template>
  <nav class="navbar navbar-expand-sm navbar-light">
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
            <router-link class="nav-link " to="/"
              >Home <i class="fa-solid fa-house"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/restaurant"
              >Restaurant <i class="fa-solid fa-burger"></i
            ></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="user.isLoggedIn ? '/user' : '/login'">
          {{ user.isLoggedIn ? user.name : 'Log In' }} <i class="fa-solid fa-user"></i
            ></router-link>
          </li>
        </ul>
      </div>

      <form action="" class="d-flex">
        <div class="input-group mb-0">
          <input
            type="text"
            class="form-control border-0 rounded"
            placeholder="Find a restaurant..."
            aria-label="Search anything"
          />
          <button
            class="btn btn-outline-secondary rounded-pill border-0"
            type="button"
            id="button-addon2"
          >
            <i
              class="fa-solid fa-magnifying-glass fa-lg"
              style="color: #f9e7de"
            ></i>
          </button>
        </div>
      </form>
    </div>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      user: {
        isLoggedIn: true,
        name : 'User 1 '
      }
    }
  }
}
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  font-family: "poppins", sans-serif;
}

.navbar {
  background: #db6327;
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

@media (max-width: 840.98px) {
  .navbar .container-lg {
    flex-direction: column;
    align-items: center;
  }

  .input-group {
    margin-top: 1em;
  }
}

@media (max-width: 577px) {
}
</style>
