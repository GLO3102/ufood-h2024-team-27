<template>
  <section class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between" style="gap: 10px">
        <h2 class="card-title mb-4">
          <i class="fa-solid fa-user-plus"></i>
          Users you follow
        </h2>
      </div>
      <div>
        <div :key="following.id" v-for="following in followings">
          <Following :following="following" @unfollow="handleUnfollow" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Following from "./Following.vue";
export default {
  name: "Followings",
  components: { Following },
  data() {
    return {};
  },
  props: {
    followings: Array,
  },
  methods: {
    handleUnfollow(followingId) {
      this.$emit("unfollow", followingId);
    },
  },
  emits: ["unfollow"],
};
</script>
