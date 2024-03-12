<template>
  <div>
    <h2>Your Lists of Favorites :</h2>
    <CreateList @createList="createList" />
    <div :key="listFav.listId" v-for="listFav in listsFavs">
      <FavList
        :listFav="listFav"
        @deleteRestaurant="handleDeleteRestaurant"
        @deleteList="deleteList"
      />
    </div>
  </div>
</template>

<script>
import CreateList from "@/components/Users/Users_CreateListFav.vue";
import FavList from "@/components/Users/Users_FavList.vue";
export default {
  name: "FavLists",
  components: { CreateList, FavList },
  data() {
    return {};
  },
  props: {
    listsFavs: Array,
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
  },
  emits: ["deleteRestaurant", "createList", "deleteList"],
};
</script>
