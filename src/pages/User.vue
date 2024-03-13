<template>
  <div class="container">
    <UserInfo :userInfo="userInfo" />
    <FavLists
      :listsFavs="listsOfFavs"
      @deleteRestaurant="deleteRestaurant"
      @createList="createList"
      @deleteList="deleteList"
      @modifyListName="modifyListName"
    />
    <div>
        <h2>Recently Visited Restaurants</h2>
      
      <VisitedRestaurants :visitedRestaurants="visitedRestaurants" />
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/Users/Users_Info.vue";
import * as api from "@/api/api.js";
import FavLists from "@/components/Users/Users_FavLists.vue";
import VisitedRestaurants from '@/components/Users/Users_VisitedRestaurants.vue';

export default {
  name: "User",
  components: {
    UserInfo,
    FavLists,
    VisitedRestaurants,
  },
  data() {
    return {
      userId: "618b311822b4a0000478ab1b",
      userInfo: [],
      visitedRestaurants: [],
      listsOfFavs: [],
      state: { isActive: true },
    };
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },

    changeState() {
      this.state.isActive = !this.state.isActive;
    },
    async deleteRestaurant(restId, listId) {
      try {
        console.log("Deleting restaurant", restId, "from list", listId);
        await api.apiRemoveFromFavoritesList(listId, restId);
        let list = this.listsOfFavs.find((list) => list.listId === listId);
        if (list) {
          list.restaurants = list.restaurants.filter(
            (restaurant) => restaurant.id !== restId,
          );
        }
      } catch (error) {
        console.error("Error while deleting restaurant");
      }
    },
    async createList(listName) {
      try {
        const newList = await api.apiCreateFavoritesList(listName);
        if (newList) {
          this.listsOfFavs.push({
            listId: newList.id,
            name: newList.name,
            restaurants: [],
          });
        }
      } catch (error) {
        console.error("Error creating new favorites list:", error);
      }
    },
    async deleteList(listId) {
      try {
        await api.apiDeleteFavoritesList(listId);
        this.listsOfFavs = this.listsOfFavs.filter(
          (list) => list.listId !== listId,
        );
      } catch (error) {
        console.error("Error while deleting list", error);
      }
    },
    async modifyListName(listId, listName) {
      try {
        const modifiedList = await api.apiEditFavoritesList(listId, listName);

        if (modifiedList && modifiedList.id && modifiedList.name) {
          const index = this.listsOfFavs.findIndex(
            (list) => list.listId === listId,
          );

          if (index !== -1) {
            this.listsOfFavs[index].name = modifiedList.name;
          }
        }
      } catch (error) {
        console.error("Error while modifying list name", error);
      }
    },
  },
  async created() {
    try {
      this.userInfo = await api.apiGetUser(this.userId);
      const rep = await api.apiGetVisits(this.userId);
      if (rep && rep.items){
        this.visitedRestaurants = rep.items.map((item)=> ({
          id: item.id,
          restaurant_id: item.restaurant_id,
          comment: item.comment,
          rating: item.rating,
          date: item.date,
        }));
      }
      console.log(this.visitedRestaurants)
      const response = await api.apiGetUserFavorites(this.userId);

      if (response && response.items) {
        this.listsOfFavs = response.items.map((item) => ({
          listId: item.id,
          name: item.name,
          restaurants: item.restaurants,
        }));
      }
    } catch (error) {
      console.error("Error fetching favs", error);
    }
  },
};
</script>

<style></style>
