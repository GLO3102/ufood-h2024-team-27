<template>
  <span>
    <button
      class="btn btn-success btn-sm"
      type="button"
      data-placement="top"
      title="Edit"
      data-bs-toggle="modal"
      :data-bs-target="'#modifyListModal' + this.listId"
    >
      <i class="fa fa-edit"></i>
    </button>
    <div class="modal fade" :id="'modifyListModal' + this.listId" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Modify list name
            </h1>
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
                <label for="recipient-name" class="col-form-label"
                  >New name:</label
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
            <ModifyListBtn
              :listId="this.listId"
              :listName="this.listName"
              @modifyListName="modifyListName"
            />
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import ModifyListBtn from "./ModifyListBtn.vue";
export default {
  name: "ModifyListName",
  components: {
    ModifyListBtn,
  },
  emits: ["modifyListName"],
  props: {
    listId: String,
  },
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
    modifyListName(listId, listName) {
      this.$emit("modifyListName", listId, listName);
    },
  },
};
</script>
