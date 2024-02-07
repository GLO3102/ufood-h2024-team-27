<template>
  <div>
    <h1>Catchphrase here + logo</h1>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <div class="input-group">
            <input type="text" class="form-control" aria-label="Text input with dropdown button">
            <button class="btn btn-primary" type="button" id="button-addon1">Button</button>
          </div>
          <ul class="list-group mt-3">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
          <label for="customRange1" class="form-label">Price range</label>
          <input type="range" class="form-range bv-no-focus-ring" id="customRange1">
          <ul class="list-group mt-3">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
            <li class="list-group-item">A fourth item</li>
            <li class="list-group-item">And a fifth one</li>
          </ul>
        </div>

        <div class="col-6 d-flex flex-wrap row-gap-3 justify-content-evenly align-items-center">
          <div class="card rounded-4 border-0 shadow" style="width: 15em">
            <img src="https://picsum.photos/200" class="card-img-top p-3 rounded-5" alt="..." draggable=false>
            <div class="card-body">
              <h3 class="card-title">Restaurant</h3>
            </div>
          </div>
          <div class="card rounded-4 border-0 shadow" style="width: 15em">
            <img src="https://picsum.photos/200" class="card-img-top p-3 rounded-5" alt="..." draggable=false>
            <div class="card-body">
              <h3 class="card-title">Restaurant</h3>
            </div>
          </div>
          <div class="card rounded-4 border-0 shadow" style="width: 15em">
            <img src="https://picsum.photos/200" class="card-img-top p-3 rounded-5" alt="..." draggable=false>
            <div class="card-body">
              <h3 class="card-title">Restaurant</h3>
            </div>
          </div>
          <div class="card rounded-4 border-0 shadow" style="width: 15em">
            <img src="https://picsum.photos/200" class="card-img-top p-3 rounded-5" alt="..." draggable=false>
            <div class="card-body">
              <h3 class="card-title">Restaurant</h3>
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
          <button class="btn btn-primary" type="button">Add friends</button>
        </div>
      </div>
    </div>
    </div>
</template>
<style>

</style>
<script setup>
</script>
