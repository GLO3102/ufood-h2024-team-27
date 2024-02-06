<template>
  <div>
    <h1>Home</h1>
    <div class="input-group mb-3">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">All</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Nearby</a></li>
    <li><a class="dropdown-item" href="#">Cheap</a></li>
    <li><a class="dropdown-item" href="#">Expensive</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
  <input type="text" class="form-control" aria-label="Text input with dropdown button">
  <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
    </div>
    <div class="container-lg">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
          <div class="card">
            <img src="https://picsum.photos/200" class="card-img-top" style="width: 10em" alt="...">
            <div class="card-body">
              <h3 class="card-title">Restaurant name</h3>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://picsum.photos/200" class="card-img-top" alt="...">
            <div class="card-body">
              <h3 class="card-title">Restaurant name</h3>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://picsum.photos/200" class="card-img-top" alt="...">
            <div class="card-body">
              <h3 class="card-title">Restaurant name</h3>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img src="https://picsum.photos/200" class="card-img-top" alt="...">
            <div class="card-body">
              <h3 class="card-title">Restaurant name</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<style>

</style>
<script setup>
</script>
