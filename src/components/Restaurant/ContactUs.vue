<template>
  <div class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <h2 class="card-title">Contact us</h2>
      <h3 class="fs-5">Address</h3>
      <p class="mb-4">{{ address }}</p>
      <h3 class="fs-5">Phone number</h3>
      <p class="mb-4">{{ tel }}</p>
      <h3 class="fs-5">Opening hours</h3>
      <ul class="list-unstyled">
        <li
          v-for="(hours, day) in openingHours"
          :key="day"
          class="text-capitalize fw-semibold"
        >
          {{ day }}
        </li>
        <li v-for="(hours, day) in openingHours" :key="day">
          {{ displayHour(hours) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  props: {
    address: String,
    tel: String,
    openingHours: Object,
  },
  methods: {
    displayHour(hour) {
      if (hour === null) return "—";
      return hour;
    },
  },
};
</script>

<style scoped>
ul {
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
}
</style>
