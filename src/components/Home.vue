<template>
  <div>
    <div class="container-fluid">
      <div class="row bg-secondary">
        <h1>UFood</h1>
        Eat, Share, Repeat
      </div>
      <div class="row bg-secondary justify-content-end mb-3">
        <img src="../assets/ufood_alligator_export.svg" class="float-end" style="width: 30%" alt="...">
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col">
          <div class="input-group mb-3">
            <input type="text" class="form-control position-relative rounded-pill z-1 pe-5" aria-label="Search bar" placeholder="Search...">
            <button class="btn btn-primary btn-sm position-absolute z-2 end-0 rounded-circle m-1" type="button" id="button-addon1"><i class="fa-solid fa-magnifying-glass fa-xs"></i></button>
          </div>
          <h3>Filters</h3>
          <hr/>
          <h4>Category</h4>
          <button type="button" class="btn btn-outline-primary rounded-pill m-1">fast-food</button>
          <button type="button" class="btn btn-outline-primary rounded-pill m-1">pasta</button>
          <button type="button" class="btn btn-outline-primary rounded-pill m-1">vegan</button>
          <button type="button" class="btn btn-outline-primary rounded-pill m-1">healthy</button>
          <hr/>

          <h4>Rating</h4>
          <button type="button" class="btn btn-outline-primary rounded-pill m-1">
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

          <h4>Price range</h4>
          <label for="customRange2" class="form-label"><i class="fa-solid fa-dollar-sign"></i></label>
          <input type="range" class="form-range" min="0" max="2" id="customRange2">
        </div>

        <div class="col-lg-6 d-flex flex-wrap gap-3 justify-content-center align-items-top mb-" id="cards">
          <div class="card position-relative rounded-4 border-primary-subtle shadow" style="width: 12em" v-for="item in items" :key=item.name >
            <button class="btn btn-light text-primary position-absolute top-0 end-0 rounded-circle m-1" type="button">
              <i class="fa-regular fa-heart fa-sm"></i>
            </button>
            <img :src="item.pictures[0]" class="card-img-top object-fit-cover rounded-5 p-3" style="width:100%; height:12em" alt="..." draggable=false>
            <div class="card-body pt-1">
                <h6 class="card-title text-truncate text-sm-start">{{item.name}}</h6>
            </div>
          </div>
        </div>

        <div class="col">
          <h2 class="text-center">Friends</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th class="text-end" scope="col">pts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>William</td>
                <td class="text-end">2350</td>
              </tr>
              <tr>
                <td>Cédric</td>
                <td class="text-end">1990</td>
              </tr>
              <tr>
                <td>Alex</td>
                <td class="text-end">1800</td>
              </tr>
              <tr>
                <td>Edwin</td>
                <td class="text-end">1180</td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary rounded-pill mb-2" type="button">Add friends</button>

          <h2 class="text-center pt-4">Top-rated</h2>
          <table class="table align-middle">
            <thead>
            <tr>
              <th scope="col">Restaurant</th>
              <th class="text-end" scope="col"><i class="fa-regular fa-star"></i></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <img src="https://picsum.photos/200" class="rounded-circle m-1" style="width:2em; height:2em" alt="...">
                Zbeub resto
              </td>
              <td class="text-end">4.8</td>
            </tr>
            <tr>
              <td>
                <img src="https://picsum.photos/200" class="rounded-circle m-1" style="width:2em; height:2em" alt="...">
                McDo
              </td>
              <td class="text-end">4.5</td>
            </tr>
            <tr>
              <td>
                <img src="https://picsum.photos/200" class="rounded-circle m-1" style="width:2em; height:2em" alt="...">
                La Concurrence
              </td>
              <td class="text-end">4.3</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="container">
      <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
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

</style>
<script>
import restaurants from "../assets/restaurants.json"

export default {
  data() {
    return {
      items: restaurants.items
    }
  }
}
</script>
