<template>
  <div class="card rounded-4 p-3 shadow mb-3">
    <div class="d-flex align-items-start">
      <h3 class="me-2">{{ listFav.name }}</h3>
      <ModifyListName
        style="margin-right: 0.125rem"
        :listId="listFav.listId"
        @modifyListName="modifyListName"
      />
      <DeleteList @deleteList="handleDeleteList" />
    </div>

    <FavRestaurants
      :restaurants="listFav.restaurants"
      @deleteRestaurant="handleDeleteRestaurant"
    />
  </div>
</template>

<script>
import FavRestaurants from "./Users_FavRestaurantCards.vue";
import DeleteList from "./Users_DeleteFavList.vue";
import ModifyListName from "./Users_ModifyListName.vue";

export default {
  name: "FavList",
  components: { FavRestaurants, DeleteList, ModifyListName },
  props: {
    listFav: Object,
  },
  methods: {
    handleDeleteRestaurant(restId) {
      this.$emit("deleteRestaurant", restId, this.listFav.listId);
    },
    handleDeleteList() {
      this.$emit("deleteList", this.listFav.listId);
    },
    modifyListName(listId, listName) {
      this.$emit("modifyListName", listId, listName);
    },
  },
  emits: ["deleteRestaurant", "deleteList", "modifyListName"],
};
</script>
