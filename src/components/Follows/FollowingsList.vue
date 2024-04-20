<template>
  <section class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between" style="gap: 10px">
        <h2 v-if="other" class="card-title mb-4">
          <i class="fa-solid fa-user-plus"></i>
          Followed by this user
        </h2>
        <h2 v-else class="card-title mb-4">
          <i class="fa-solid fa-user-plus"></i>
          Users you follow
        </h2>
      </div>
      <div
        class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-3"
      >
        <div :key="following.id" v-for="following in followings">
          <Following
            :following="following"
            :read-only="other"
            @unfollow="handleUnfollow"
          />
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
    other: Boolean,
  },
  methods: {
    handleUnfollow(followingId) {
      this.$emit("unfollow", followingId);
    },
  },
  emits: ["unfollow"],
};
</script>
