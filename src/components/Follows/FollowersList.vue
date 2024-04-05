<template>
  <section class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between" style="gap: 10px">
        <h2 class="card-title mb-4">
          <i class="fa-solid fa-user"></i>
          Following you
        </h2>
      </div>
      <div>
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
  },
};
</script>
