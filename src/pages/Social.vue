<template>
  <div>
    <main v-if="token" class="container-fluid" style="width: 75%">
      <div class="row mb-0 mt-4" id="users-section">
        <h2 class="text-center text-dark fs-1 fw-bold mb-3">Users</h2>
        <SocialSearchBar @search="search" />
      </div>

      <div class="text-center" v-if="loading"><Loading /></div>

      <UserCards :users="this.users"></UserCards>

      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-light rounded-4 m-4"
          v-if="
            this.total >
            this.previousParams.limit * (this.previousParams.page + 1)
          "
          @click="showMore()"
        >
          Show more results
        </button>
        <span v-if="this.total === 0" class="fs-4">No user found!</span>
      </div>
    </main>
    <NotLoggedIn v-else class="mt-5" />
  </div>
</template>

<script>
import NotLoggedIn from "@/components/NotLoggedIn.vue";
import UserCards from "@/components/Social/UserCards.vue";
import SocialSearchBar from "@/components/Social/SocialSearchBar.vue";
import { apiGetUsers } from "@/api/apiUsers";
import Loading from "@/components/Loading.vue";
import Cookies from "js-cookie";

export default {
  components: {
    NotLoggedIn,
    UserCards,
    SocialSearchBar,
    Loading,
  },
  data() {
    return {
      users: [],
      total: null,
      previousParams: { limit: 24, page: 0 },
      loading: false,
      token: Cookies.get("user_cookie"),
    };
  },
  async created() {
    try {
      this.loading = true;
      const data = await apiGetUsers(this.previousParams, this.token);
      this.total = data.total;
      this.users = data.items;
    } catch (error) {
      console.error("Error while fetching users");
      await this.$router.push({ name: "Login" });
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async search(params) {
      params.limit = 24;
      params.page = 0;
      this.previousParams = params;

      try {
        const data = await apiGetUsers(params, this.token);
        this.users = data.items;
        this.total = data.total;
      } catch (error) {
        // crash occurs if we search for "*" or "\" followed by seemingly anything, and it's not our fault this time!
        console.error("An error has occured: ", error);
        alert("An internal server error has occured; Please try again later.");
      }
    },
    async showMore() {
      this.previousParams.page += 1;
      const data = await apiGetUsers(this.previousParams, this.token);
      this.users = [...this.users, ...data.items];
    },
  },
};
</script>

<style>
h1 {
  font-size: 6rem !important;
}

#button-search-social {
  margin-left: -60px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-top: 4px;
}

/* is this completely useless or? */
#users-section {
  background-image: linear-gradient(
    to left,
    var(--bs-secondary),
    var(--bs-primary)
  );
  background-clip: text;
  color: transparent;
}
</style>
