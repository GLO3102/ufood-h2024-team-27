<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#listModal"
    >
      Create a new List
    </button>

    <div class="modal fade" id="listModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New List</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="createList" class="col-form-label"
                  >List Name:</label
                >
                <input
                  v-model="listName"
                  type="text"
                  class="form-control"
                  id="recipient-name"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button @click="createList" type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Create List
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/api.js";
export default {
  name: "CreateListFav",
  data() {
    return {
      name: "",
      nameState: null,
      listName: "",
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();

      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
    },
    async createList() {
      console.log(this.listName);
      await api.apiCreateFavoritesList(this.listName);
    },
  },
};
</script>
