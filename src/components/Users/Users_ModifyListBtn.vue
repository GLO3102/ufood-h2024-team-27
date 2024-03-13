<template>
  <button
    @click="emitModification"
    type="button"
    class="btn btn-primary"
    data-bs-dismiss="modal"
  >
    Modify List
  </button>
</template>

<script>
export default {
  name: "ModifyListBtn",
  props: {
    listId : String,
    listName: String,
  },
  methods: {
    emitModification() {
      this.$emit("modifyListName", this.listId, this.listName);
    },
  },
  emits: ["modifyListName"]
};
</script>
