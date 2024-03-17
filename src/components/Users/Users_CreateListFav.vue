<template>
  <div>
    <button
      type="button"
      class="btn btn-primary rounded-pill"
      data-bs-toggle="modal"
      data-bs-target="#listModal"
    >
      Create a new list
    </button>

    <div class="modal fade" id="listModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New list</h1>
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
                <label for="create-list" class="col-form-label"
                  >List name:</label
                >
                <input
                  v-model="listName"
                  type="text"
                  class="form-control"
                  id="create-list"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <CreateListBtn
              :listName="this.listName"
              @createList="$emit('createList', this.listName)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateListBtn from "./Users_CreateListBtn.vue";
export default {
  name: "CreateListFav",
  data() {
    return {
      name: "",
      nameState: null,
      listName: "",
    };
  },
  components: {
    CreateListBtn,
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
  },
};
</script>
