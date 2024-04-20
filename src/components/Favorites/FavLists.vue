<template>
  <section class="card rounded-5 p-3 py-2 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between" style="gap: 10px">
        <h2 class="card-title mb-4">
          <i class="fa-solid fa-heart"></i>
          Lists of favorites
        </h2>
        <CreateList v-if="!readOnly" @createList="createList" />
      </div>
      <div>
        <div
          :key="listFav.listId"
          v-for="listFav in listsFavs.slice().reverse()"
        >
          <FavList
            :token="token"
            :listFav="listFav"
            :read-only="readOnly"
            @deleteRestaurant="handleDeleteRestaurant"
            @deleteList="deleteList"
            @modifyListName="modifyListName"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CreateList from "@/components/Favorites/CreateListFav.vue";
import FavList from "@/components/Favorites/FavList.vue";
export default {
  name: "FavLists",
  components: { CreateList, FavList },
  data() {
    return {};
  },
  props: {
    listsFavs: Array,
    token: String,
    readOnly: Boolean,
  },
  methods: {
    handleDeleteRestaurant(restId, listId) {
      this.$emit("deleteRestaurant", restId, listId);
    },
    createList(listName) {
      this.$emit("createList", listName);
    },
    deleteList(listId) {
      this.$emit("deleteList", listId);
    },
    modifyListName(listId, listName) {
      this.$emit("modifyListName", listId, listName);
    },
  },
  emits: ["deleteRestaurant", "createList", "deleteList", "modifyListName"],
};
</script>
