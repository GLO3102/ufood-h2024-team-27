<template>
    <div class="card rounded-4 p-3 mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between gap-2">
          <h2 class="card-title fs-4 mb-4">
            {{ follower.name }}
          </h2>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Follower",
    props: {
      follower: Object,
    },
  }
  </script>
  