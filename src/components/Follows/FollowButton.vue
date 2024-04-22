<template>
  <button
    @click="$emit('toggle-follow')"
    type="button"
    class="btn btn-primary rounded-pill p-2 m-3 mt-0 me-2 col"
    :class="{
      'btn-secondary text-light': this.isFollowing,
      'btn-primary': !this.isFollowing,
    }"
    style="width: 70%; font-size: 120%"
  >
    <i
      class="fa-user d-inline-block fa-lg me-1"
      :class="{ 'fa-solid': this.isFollowing, 'fa-regular': !this.isFollowing }"
    >
    </i>
    <span v-if="!isFollowing"> Follow </span>
    <span v-if="isFollowing"> Following </span>
  </button>
</template>

<script>
export default {
  name: "FollowButton",
  emits: ["toggle-follow"],
  props: {
    isFollowing: Boolean,
  },
};
</script>

<style scoped>
i {
  transition: transform 0.15s;
}
i:hover {
  transform: scale(1.1);
}
</style>
