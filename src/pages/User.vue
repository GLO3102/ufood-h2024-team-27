<template>
  <div class="container">
    <UserInfo :userInfo="userInfo" :gravatarUrl="gravatarUrl" />
    <div>
      <div>
        <Followings :followings="followings" @unfollow="unfollow" />

        <Followers :followers="followers" />
      </div>
      <Loading v-if="loadingFavLists" />
      <FavLists
        :token="token"
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
        :token="token"
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
import SparkMD5 from "spark-md5";
import UserInfo from "@/components/Users/Info.vue";
import FavLists from "@/components/Favorites/FavLists.vue";
import VisitedRestaurants from "@/components/Users/VisitedRestaurants.vue";
import Loading from "@/components/Loading.vue";
import Followings from "../components/Follows/FollowingsList.vue";
import Followers from "../components/Follows/FollowersList.vue";
import * as follow from "@/Follows/follow.js";
import Cookies from "js-cookie";
import { getUserId } from "@/auth/auth.js";
import {
  apiRemoveFromFavoritesList,
  apiCreateFavoritesList,
  apiDeleteFavoritesList,
  apiEditFavoritesList,
} from "@/api/apiFavorites";
import { apiGetVisits } from "@/api/apiVisits";
import { apiGetUser, apiGetUserFavorites } from "@/api/apiUsers";

export default {
  name: "User",
  components: {
    UserInfo,
    FavLists,
    VisitedRestaurants,
    Loading,
    Followings,
    Followers,
  },
  data() {
    return {
      userId: "",
      userInfo: [],
      userEmail: "",
      gravatarUrl: "",
      visitedRestaurants: [],
      listsOfFavs: [],
      followings: [],
      followers: [],
      state: { isActive: true },
      currentPage: 0,
      pageSize: 10,
      totalVisits: 0,
      loadingFavLists: false,
      loadingVisits: false,
      token: Cookies.get("user_cookie"),
    };
  },
  computed: {},
  methods: {
    goHome() {
      this.$router.push("/");
    },

    getGravatarUrl(email) {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = SparkMD5.hash(trimmedEmail);
      const size = 200;
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
    },

    changeState() {
      this.state.isActive = !this.state.isActive;
    },
    async deleteRestaurant(restId, listId) {
      try {
        await apiRemoveFromFavoritesList(listId, restId, this.token);
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
    async unfollow(unfollowId) {
      try {
        await follow.unfollow(unfollowId, this.token);
        this.followings = this.followings.filter(
          (followings) => followings.id !== unfollowId,
        );
      } catch (error) {
        console.error("Could not unfollow...", error);
        alert("Could not unfollow...");
      }
    },

    async createList(listName) {
      try {
        const newList = await apiCreateFavoritesList(listName, this.token);
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
        await apiDeleteFavoritesList(listId, this.token);
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
        const modifiedList = await apiEditFavoritesList(
          listId,
          listName,
          this.token,
        );

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
        const paramPage = {
          page: page,
        };
        const response = await apiGetVisits(this.userId, paramPage, this.token);
        if (response && response.items) {
          this.visitedRestaurants = response.items;
          this.totalVisits = response.total;
          this.currentPage = page;
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
      this.userInfo = await apiGetUser(this.userId, this.token);
      this.userEmail = this.userInfo.email;
      this.gravatarUrl = this.getGravatarUrl(this.userEmail);
      this.followings = await follow.getFollowings(this.userId, this.token);
      this.followers = await follow.getFollowers(this.userId, this.token);
      this.fetchVisits(this.currentPage);
      const response = await apiGetUserFavorites(this.userId, this.token, {});
      if (response && response.items) {
        this.listsOfFavs = response.items.map((item) => ({
          listId: item.id,
          name: item.name,
          restaurants: item.restaurants,
        }));
      }
    } catch (error) {
      if (error.message === "401") {
        await this.$router.push({ name: "Login" });
      }
    } finally {
      this.loadingFavLists = false;
      this.loadingVisits = false;
    }
  },
};
</script>
