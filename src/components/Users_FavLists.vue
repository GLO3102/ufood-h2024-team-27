<template>
  <div>Your Lists of Favorites :
    <CreateList />
    <div :key="listFav.listId" v-for="listFav in listsFavs">
        <FavList />
    </div>
  </div>

</template>

<script>
import CreateList from "@/components/Users_CreateListFav.vue";
import FavList from "@/components/Users_FavList.vue"
export default {
  name: "FavLists",
  components: {CreateList,FavList},
  data() {
    return {
        
    }
  },
  props: {
    listsFavs : Array
  },
  methods: {},
}
</script>
