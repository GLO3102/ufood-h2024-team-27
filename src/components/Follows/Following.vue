<template>
  <div>
    <div
      class="card rounded-4 border-2"
      style="cursor: pointer"
      @click="
        this.$router.push({
          name: 'Other_User',
          params: { userId: following.id },
        })
      "
    >
      <img
        :src="gravatarUrl"
        class="rounded-circle object-fit-cover position-relative"
        style="aspect-ratio: 1/1; width: 90%; margin: 5%"
        draggable="false"
        alt="Avatar"
      />
      <div class="card-body pt-1 pe-1 ps-0 text-truncate">
        <div class="d-flex justify-content-center gap-2">
          <div class="text-truncate fw-bold" style="overflow: hidden">
            <span>{{ following.name }}</span>
          </div>
          <div>
            <Unfollow @unfollow="handleUnfollow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Unfollow from "./UnfollowBtn.vue";
import SparkMD5 from "spark-md5";

export default {
  name: "Following",
  components: { Unfollow },
  props: {
    following: Object,
  },
  data() {
    return {
      gravatarUrl: "",
    };
  },
  methods: {
    handleUnfollow() {
      this.$emit("unfollow", this.following.id);
    },
    getGravatarUrl(email) {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = SparkMD5.hash(trimmedEmail);
      const size = 200;
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
    },
  },
  async created() {
    this.gravatarUrl = this.getGravatarUrl(this.following.email);
  },

  emits: ["unfollow"],
};
</script>
