<template>
  <button
    class="btn btn-danger btn-sm"
    type="button"
    data-toggle="tooltip"
    data-placement="top"
    title="Delete"
    @click="$emit('deleteList')"
  >
    <i class="fa fa-trash"></i>
  </button>
</template>

<script>
export default {
  name: "DeleteList",
  emits: ["deleteList"],
};
</script>
