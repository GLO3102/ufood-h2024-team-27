<template>
  <div class="container">
    <UserInfo
      :userInfo="userInfo"
      :gravatarUrl="gravatarUrl"
      :isFollowing="thisIsFollowing"
      :other="true"
      @toggle-follow="toggleFollow"
    />
    <div>
      <div>
        <Followings :followings="followings" :other="true" />

        <Followers :followers="followers" :other="true" />
      </div>
      <Loading v-if="loadingFavLists" />
      <FavLists :token="token" :listsFavs="listsOfFavs" :read-only="true" />
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
import { apiGetVisits } from "@/api/apiVisits";
import { apiGetUser, apiGetUserFavorites } from "@/api/apiUsers";

export default {
  name: "OtherUser",
  props: ["userId"],
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
      thisUserId: "",
      thisIsFollowing: false,
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

    async toggleFollow() {
      if (!this.thisIsFollowing) {
        try {
          await follow.follow(this.userId, this.token);
          this.thisIsFollowing = true;
        } catch (error) {
          console.error("Could not follow...", error);
          alert("Could not follow...");
        }
      } else {
        try {
          await follow.unfollow(this.userId, this.token);
          this.thisIsFollowing = false;
        } catch (error) {
          console.error("Could not unfollow...", error);
          alert("Could not unfollow...");
        }
      }
      this.followers = await follow.getFollowers(this.userId, this.token);
    },

    async isFollowing() {
      let thisFollows = await follow.getFollowings(this.thisUserId, this.token);
      for (const user of thisFollows) {
        if (user.id == this.userId) return true;
      }
      return false;
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
      this.thisUserId = await getUserId(this.token); // this (the current logged in user) id
      this.thisIsFollowing = await this.isFollowing();
      this.userInfo = await apiGetUser(this.userId, this.token); // from here on, the other user's stuff
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
