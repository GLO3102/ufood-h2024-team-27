<template>
  <section class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between" style="gap: 10px">
        <h2 v-if="other" class="card-title mb-4">
          <i class="fa-solid fa-user"></i>
          Following this user
        </h2>
        <h2 v-else class="card-title mb-4">
          <i class="fa-solid fa-user"></i>
          Following you
        </h2>
      </div>
      <div class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3">
        <div :key="follower.id" v-for="follower in followers">
          <Follower :follower="follower" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Follower from "./Follower.vue";
export default {
  name: "Followers",
  components: { Follower },
  data() {
    return {};
  },
  props: {
    followers: Array,
    other: Boolean
  },
};
</script>
