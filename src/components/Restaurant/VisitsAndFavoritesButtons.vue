<template>
  <div class="row">
    <button
      class="btn btn-primary rounded-pill p-2 m-3 mt-0 me-2 col"
      data-bs-toggle="modal"
      data-bs-target="#favorite-modal-0"
    >
      <i class="fa-solid fa-heart"></i> Add to favorites
    </button>
    <button
      class="btn btn-primary rounded-pill p-2 m-3 mt-0 ms-2 col"
      data-bs-toggle="modal"
      data-bs-target="#visit-modal-0"
    >
      <i class="fa-solid fa-map-pin"></i> Add a visit
    </button>
  </div>
</template>

<script>
export default {
  name: "VisitsAndFavoritesButtons",
};
</script>
