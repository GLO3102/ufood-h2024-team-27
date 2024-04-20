<template>
  <div class="card rounded-4 p-3 mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between gap-2">
        <h2 class="card-title fs-4 mb-4">
          {{ listFav.name }}
        </h2>
        <div v-if="!readOnly">
          <ModifyListName
            style="margin-right: 0.125rem"
            :listId="listFav.listId"
            @modifyListName="modifyListName"
          />
          <DeleteList @deleteList="handleDeleteList" />
        </div>
      </div>
      <FavRestaurants
        :token="token"
        :restaurants="listFav.restaurants"
        :read-only="readOnly"
        @deleteRestaurant="handleDeleteRestaurant"
      />
    </div>
  </div>
</template>

<script>
import FavRestaurants from "../Favorites/FavRestaurantCards.vue";
import DeleteList from "../Favorites/DeleteFavList.vue";
import ModifyListName from "../Favorites/ModifyListName.vue";

export default {
  name: "FavList",
  components: { FavRestaurants, DeleteList, ModifyListName },
  props: {
    listFav: Object,
    token: String,
    readOnly: Boolean,
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
