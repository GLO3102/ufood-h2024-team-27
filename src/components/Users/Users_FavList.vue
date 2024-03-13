<template>
  <div>
    <h3>{{ listFav.name }}</h3>

    <ModifyListName :listId="listFav.listId" @modifyListName="modifyListName" />    

    <DeleteList @deleteList="handleDeleteList" />

    <FavRestaurants
      :restaurants="listFav.restaurants"
      @deleteRestaurant="handleDeleteRestaurant"
    />
  </div>
</template>

<script>
import FavRestaurants from "./Users_FavRestaurantCards.vue";
import DeleteList from "./Users_DeleteFavList.vue";
import ModifyListName from './Users_ModifyListName.vue';

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
    modifyListName(listId, listName){
      this.$emit('modifyListName', listId, listName);
      console.log(listId);
      
    }
    
  },
  emits: ["deleteRestaurant", "deleteList", "modifyListName"],
};
</script>
