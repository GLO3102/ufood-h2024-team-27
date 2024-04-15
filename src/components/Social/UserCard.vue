<template>
  <div>
    <div 
      class="card rounded-4 border-2"
      style="cursor: pointer"
      @click="
        this.$router.push({
          name: 'Other_User',
          params: { userId: user.id },
        })
      ">
      <img
        :src="gravatarUrl"
        class="rounded-circle object-fit-cover position-relative"
        style="aspect-ratio: 1/1; width: 90%; margin: 5%"
        draggable="false"
        alt="Avatar"
      />
      <!--
      <FollowButton
        :id="id"
        :initial="false"
        class="position-absolute top-0 end-0 mt-1 me-1"
      />
      -->
      <div class="card-body pt-1 pe-1 ps-0 text-truncate">
        <div class="d-flex justify-content-center">
          <div class="text-truncate fw-bold" style="overflow: hidden">
            <span>{{ user.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5";
import FollowButton from "./FollowButton.vue";

export default {
  name: "UserCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
    user: Object,
  },
  data() {
    return {
      gravatarUrl: "",
    };
  },
  components: { /*FollowButton*/ },
  methods: {
    getGravatarUrl(email) {
      const trimmedEmail = email.trim().toLowerCase();
      const hash = SparkMD5.hash(trimmedEmail);
      const size = 200;
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
    },
    /*
    async follow(userId) {
      try {
        await follow.follow(userId, this.token);
      } catch (error) {
        console.error("Could not follow user...", error);
        alert("Could not follow...");
      }
    },

    async unfollow(userId) {
      try {
        await follow.unfollow(userId, this.token);
      } catch (error) {
        console.error("Could not unfollow user...", error);
        alert("Could not unfollow...");
      }
    },
    */
  },
  async created() {
    this.gravatarUrl = this.getGravatarUrl(this.user.email);
  },
};
</script>

<style scoped></style>
