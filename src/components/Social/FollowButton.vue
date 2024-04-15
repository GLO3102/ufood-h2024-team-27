<template>
  <div class="rounded-circle">
    <i
      class="fa-user fa-xl p-2 d-inline-block text-secondary"
      style="line-height: 25px"
      :class="{ 'fa-solid': this.active, 'fa-regular': !this.active }"
      @click.stop="this.active = !this.active"
    >
    </i>
  </div>
</template>

<script>
export default {
  name: "FollowButton",
  props: {
    id: Number,
    initial: Boolean,
  },
  data() {
    return {
      active: this.initial,
    };
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
