<template>
  <div class="container">
    <UserInfo :userInfo="userInfo" />
    <div>
      <Loading v-if="loadingFavLists" />
      <FavLists
        :listsFavs="listsOfFavs"
        @deleteRestaurant="deleteRestaurant"
        @createList="createList"
        @deleteList="deleteList"
        @modifyListName="modifyListName"
      />
    </div>
    <div>
      <Loading v-if="loadingVisits" />
      <VisitedRestaurants
        :visitedRestaurants="visitedRestaurants"
        :total-items="totalVisits"
        :current-page="currentPage"
        :page-size="pageSize"
        @page-changed="fetchVisits"
      />
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/Users/Users_Info.vue";
import * as api from "@/api/api.js";
import FavLists from "@/components/Users/Users_FavLists.vue";
import VisitedRestaurants from "@/components/Users/Users_VisitedRestaurants.vue";
import Loading from "@/components/Loading.vue";
import Cookies from 'js-cookie';
import {getUserId} from '@/auth/auth.js'

export default {
  name: "User",
  components: {
    UserInfo,
    FavLists,
    VisitedRestaurants,
    Loading,
  },
  data() {
    return {
      userId: "",
      userInfo: [],
      visitedRestaurants: [],
      listsOfFavs: [],
      state: { isActive: true },
      currentPage: 0,
      pageSize: 10,
      totalVisits: 0,
      loadingFavLists: false,
      loadingVisits: false,
      token : Cookies.get('user_cookie'),
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
        await api.apiRemoveFromFavoritesList(listId, restId, this.token);
        let list = this.listsOfFavs.find((list) => list.listId === listId);
        if (list) {
          list.restaurants = list.restaurants.filter(
            (restaurant) => restaurant.id !== restId,
          );
        }
      } catch (error) {
        console.error("Error while deleting restaurant");
        alert("Failed to delete restaurant!");
      }
    },
    async createList(listName) {
      try {
        const newList = await api.apiCreateFavoritesList(listName, this.token);
        if (newList) {
          this.listsOfFavs.push({
            listId: newList.id,
            name: newList.name,
            restaurants: [],
          });
        }
      } catch (error) {
        console.error("Error creating new favorites list:", error);
        alert("Failed creating new favorites list");
      }
    },
    async deleteList(listId) {
      try {
        await api.apiDeleteFavoritesList(listId, this.token);
        this.listsOfFavs = this.listsOfFavs.filter(
          (list) => list.listId !== listId,
        );
      } catch (error) {
        console.error("Error while deleting list", error);
        alert("Failed to delete favorites list");
      }
    },
    async modifyListName(listId, listName) {
      try {
        const modifiedList = await api.apiEditFavoritesList(listId, listName, this.token);

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
        alert("Failed to modify list name");
      }
    },
    async fetchVisits(page) {
      try {
        this.currentPage = page;
        const response = await api.apiGetVisits(this.userId, page, this.token);
        if (response && response.items) {
          this.visitedRestaurants = response.items;
          this.totalVisits = response.total;
        }
      } catch (error) {
        console.error("Error while fetching visits", error);
        alert("Failed to fetch visits!");
      }
    },
  },
  async created() {
    try {
      this.loadingFavLists = true;
      this.loadingVisits = true;
      this.userId = await getUserId(this.token);
      this.userInfo = await api.apiGetUser(this.userId, this.token);
      this.fetchVisits(this.currentPage);
      const response = await api.apiGetUserFavorites(this.userId ,this.token, {});
      if (response && response.items) {
        this.listsOfFavs = response.items.map((item) => ({
          listId: item.id,
          name: item.name,
          restaurants: item.restaurants,
        }));
      }
    } catch (error) {
      console.error("Error fetching favs", error);
      alert("Failed to fetch favs!");
    } finally {
      this.loadingFavLists = false;
      this.loadingVisits = false;
    }
  },
};
</script>

<style></style>
@/auth/auth.js