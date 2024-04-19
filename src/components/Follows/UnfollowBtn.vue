<template>
  <button
    class="btn btn-danger btn-sm"
    type="button"
    data-toggle="tooltip"
    data-placement="top"
    title="Delete"
    @click.stop="$emit('unfollow')"
  >
    <i class="fa-solid fa-user-minus"></i>
  </button>
</template>

<script>
export default {
  name: "Unfollow",
  emits: ["unfollow"],
};
</script>
