<template>
  <div>
    <header class="container-fluid">
      <h1 class="fw-bold text-light mb-0">UFood</h1>
      <p class="ps-2 mb-5 fs-2 fw-bold">Eat, Share, Repeat</p>
      <div class="row justify-content-center align-items-center mb-5">
        <div class="col-10">
          <div class="input-group mb-0">
            <button class="btn btn-primary rounded-start-pill p-3" type="button" data-bs-toggle="modal" data-bs-target="#filters">
              <i class="fa-solid fa-sliders fa-l"></i>
            </button>
            <input type="text" class="form-control fs-5 z-0 rounded-end-pill py-3 pe-5" id="home-search-bar" aria-label="Search bar" placeholder="Search...">
            <button class="btn btn-primary z-1" type="button" id="button-search-home">
              <i class="fa-solid fa-magnifying-glass fa-l"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="modal fade" id="filters">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="filters" tabindex="-1">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title fs-5">Filters</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <h3 class="fs-4">Category</h3>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">fast-food</button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">pasta</button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">vegan</button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">healthy</button>
              <hr/>

              <h3 class="fs-4">Rating</h3>
              <button type="button" class="btn btn-outline-primary rounded-pill">
                1 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                2 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                3 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                4 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <button type="button" class="btn btn-outline-primary rounded-pill m-1">
                5 <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
              </button>
              <hr/>

              <h3 class="fs-4">Price range</h3>
              <div class="d-flex justify-content-between">
                <label for="price-range" class="form-label"><i class="fa-solid fa-dollar-sign"></i></label>
                <label for="price-range ps-1" class="form-label">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                </label>
                <label for="price-range" class="form-label">
                  <i class="fa-solid fa-dollar-sign"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                  <i class="fa-solid fa-dollar-sign"></i>
                </label>
              </div>
              <input type="range" class="form-range px-1" min="0" max="2" id="price-range">
            </div>
            <div class="modal-footer d-flex justify-content-between">
              <button type="button" class="btn btn-light rounded-pill">Reset all</button>
              <button type="button" class="btn btn-primary rounded-pill" data-bs-dismiss="modal">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-end">
        <img src="../assets/ufood_alligator_export.svg" class="img-fluid" alt="Ufood Alligator" style="max-width: 20rem">
      </div>
    </header>
    <main class="container-fluid">
      <div class="row" id="close-by">
        <h2 class="p-5 text-center">Restaurants</h2>
      </div>
      <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
        <div class="card border-0" v-for="item in items" :key=item.name style="cursor:pointer">
          <img :src="item.pictures[0]" class="card-img-top object-fit-cover rounded-4 position-relative" style="aspect-ratio: 1/1" alt="..." draggable=false>
          <button class="btn btn-light text-primary position-absolute end-0 rounded-circle me-3 mt-1" type="button">
            <i class="fa-regular fa-heart fa-sm"></i>
          </button>
          <div class="card-body pt-1 pe-1 ps-0">
            <div class="d-flex justify-content-between">
              <div class="text-truncate fw-bold" style="overflow: hidden">
                <span>{{item.name}}</span>
              </div>
              <span style="white-space: nowrap">
                <i v-for="icon in ratingToIcons(item.price_range)" :key="icon" class="fa-solid fa-dollar-sign"></i>
              </span>
            </div>
            <span>{{item.genres.join(", ")}}</span>
          </div>
        </div>
      </div>
    </main>
    <div class="container">
      <footer class="row row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
        <div class="col mb-3">
          <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
          </a>
          <p class="text-muted">© 2024</p>
        </div>

        <div class="col mb-3">

        </div>

        <div class="col mb-3">
          <h5>Section</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
          </ul>
        </div>

        <div class="col mb-3">
          <h5>Section</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
          </ul>
        </div>

        <div class="col mb-3">
          <h5>Section</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
            <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
          </ul>
        </div>
      </footer>
    </div>
  </div>
</template>
<style>
header {
  background-image: linear-gradient(var(--bs-secondary), var(--bs-primary));
}

h1 {
  font-size: 6rem !important;
}

#button-search-home {
  margin-left: -60px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-top: 4px;
}

</style>
<script>
import restaurants from "../assets/restaurants.json"

export default {
  data() {
    return {
      items: restaurants.items
    }
  },
  methods: {
    ratingToIcons(rating) {
      const icons = [];
      for (let i = 0; i < rating; i++) {
        icons.push(i);
      }
      return icons;
    }
  }
}
</script>
