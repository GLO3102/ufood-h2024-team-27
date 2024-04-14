<template>
  <div class="card rounded-4 p-3 mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between gap-2">
        <h2 class="card-title fs-4 mb-4">
          {{ listFav.name }}
        </h2>
      </div>
      <FavRestaurants
        :token="token"
        :restaurants="listFav.restaurants"
        @deleteRestaurant="handleDeleteRestaurant"
      />
    </div>
  </div>
</template>

<script>
import FavRestaurants from "./FavRestaurantCards_NoEdit.vue";


export default {
  name: "FavList",
  components: { FavRestaurants },
  props: {
    listFav: Object,
    token: String,
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
