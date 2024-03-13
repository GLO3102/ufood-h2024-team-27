<template>
    
  <div class="col-12 col-lg-6">
    <div class="card">
      <div class="card-body p-4 p-xxl-5">
        <div
          class="bsb-ratings text-warning mb-3"
          data-bsb-star="5"
          data-bsb-star-off="0"
        ></div>
        <blockquote class="bsb-blockquote-icon mb-3">
          {{visit.comment}}
        </blockquote>
        <figure class="d-flex align-items-center m-0 p-0">
          <img
            class="img-fluid rounded rounded-circle m-0 border border-5"
            loading="lazy"
            src=""
            alt="Luna John"
          />
          <figcaption class="ms-3">
            <h4 class="mb-1 h5">{{visit.rating}}</h4>
            <h5 class="fs-6 text-secondary mb-0">{{ visit.date }}</h5>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>



<script>
// Il va nous rester a regarder pour le restaurant ID, aller le chercher et 
//lutiliser ici. Changer le style et autre egalement
export default {
  name: "VisitedRestaurant",
  props: {
    visit: Object,
  },
};
</script>
