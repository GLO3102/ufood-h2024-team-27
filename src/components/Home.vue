<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<template>
  <div>
    <h1>Catchphrase here + logo</h1>
    <div class="container-fluid">
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

        <div class="col-6 d-flex flex-wrap row-gap-3 justify-content-evenly align-items-center">
          <div class="card rounded-4 border-0 shadow" style="width: 14em">
            <img src="https://picsum.photos/200" class="card-img-top p-3 rounded-5" alt="..." draggable=false>
            <div class="card-body">
              <h5 class="card-title text-sm-start">La Barberie</h5>
              <button class="btn" type="button"><i class="fa-regular fa-heart"></i></button>
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
          <button class="btn btn-primary rounded-4" type="button">Add friends</button>
        </div>
      </div>
    </div>
    </div>
</template>
<style>

</style>
