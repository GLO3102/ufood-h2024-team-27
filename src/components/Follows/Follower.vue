<template>
  <div>
    <div
      class="card rounded-4 border-2"
      style="cursor: pointer"
      @click="
        this.$router.push({
          name: 'OtherUser',
          params: { userId: follower.id },
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
        <div class="d-flex justify-content-center">
          <div class="text-truncate fw-bold" style="overflow: hidden">
            <span>{{ follower.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";

export default {
  name: "Follower",
  props: {
    follower: Object,
  },
  data() {
    return {
      gravatarUrl: "",
    };
  },
  methods: {
    getGravatarUrl(email) {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = SparkMD5.hash(trimmedEmail);
      const size = 200;
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
    },
  },
  async created() {
    this.gravatarUrl = this.getGravatarUrl(this.follower.email);
  },
};
</script>

<style scoped></style>
