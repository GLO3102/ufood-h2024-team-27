<template>
  <button
    @click="$emit('createList')"
    type="button"
    class="btn btn-primary rounded-pill"
    data-bs-dismiss="modal"
    :class="{ 'disabled-btn': !listName }"
    :disabled="!listName"
  >
    Create list
  </button>
</template>

<script>
export default {
  name: "CreateListBtn",
  props: {
    listName: String,
  },
};
</script>

<style>
.disabled-btn {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
