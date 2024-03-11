<template>
  <div>
    <h2>Your Lists of Favorites :</h2>
    <CreateList />
    <div :key="listFav.listId" v-for="listFav in listsFavs">
      <FavList :listFav="listFav" />
    </div>
  </div>
</template>

<script>
import CreateList from "@/components/Users_CreateListFav.vue";
import FavList from "@/components/Users_FavList.vue";
export default {
  name: "FavLists",
  components: { CreateList, FavList },
  data() {
    return {};
  },
  props: {
    listsFavs: Array,
  },
  methods: {},
};
</script>
