<template>
    <div class="card rounded-4 p-3 mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between gap-2">
          <h2 class="card-title fs-4 mb-4">
            {{ following.name }}
          </h2>
          <div>
            <Unfollow @unfollow="handleUnfollow" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UnfollowBtn from "./UnfollowBtn.vue";
import Unfollow from "./UnfollowBtn.vue";
 
  
  export default {
    name: "Following",
    components: { Unfollow },
    props: {
      following: Object,
    },
    methods: {
      handleUnfollow() {
        this.$emit("unfollow", this.following.id);
      },
    },
    emits: ["unfollow"],
  };
  </script>
  