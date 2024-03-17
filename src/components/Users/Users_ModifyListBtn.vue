<template>
  <button
    @click="emitModification"
    type="button"
    class="btn btn-primary"
    :class="{ 'disabled-btn': !listName }"
    :disabled="!listName"
    data-bs-dismiss="modal"
  >
    Modify List
  </button>
</template>

<script>
export default {
  name: "ModifyListBtn",
  props: {
    listId: String,
    listName: String,
  },
  methods: {
    emitModification() {
      this.$emit("modifyListName", this.listId, this.listName);
    },
  },
  emits: ["modifyListName"],
};
</script>

<style>
.disabled-btn {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
