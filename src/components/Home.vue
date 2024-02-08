<template>
  <div>
    <h1>Catchphrase here + logo</h1>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="input-group mb-3">
            <button class="btn border-end-0 border rounded-start-4" type="button" id="button-addon1"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" class="form-control border-start-0 rounded-end-4" aria-label="Text input with dropdown button">
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

        <div class="col-6 d-flex flex-wrap gap-3 justify-content-center align-items-top">
          <div class="card rounded-4 border-0 shadow" style="width: 12em; height: 15em">
            <img src="https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=1000,height=300,format=auto,quality=80/https://doordash-static.s3.amazonaws.com/media/store/header/fd84883e-19df-4a26-afd1-9b3616e922fa.jpg" class="card-img-top object-fit-cover p-3 rounded-5" style="height:12em" alt="..." draggable=false>
            <div class="card-body pt-2">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">La Barberie</h5>
                <button class="btn btn-outline-primary rounded-circle" type="button"><i class="fa-regular fa-heart fa-sm"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-3">
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
          <p class="text-muted">© 2022</p>
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
<script setup>

</script>
