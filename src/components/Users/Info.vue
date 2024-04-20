<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mt-3 pt-3 pb-5">
        <div
          class="row z-depth-3 shadow-lg mb-1 mt-3 border border-5 rounded-4 border-primary"
        >
          <div class="col-sm-4 bg-primary rounded-left">
            <div class="card-block text-center text-white">
              <img
                :src="gravatarUrl"
                class="rounded-circle mb-3 mt-5"
                style="width: 150px; height: 150px"
                alt="Avatar"
              />
              <h5 class="mb-2">
                <strong
                  >{{ userInfo.name }}
                  <span class="badge bg-danger">PRO</span>
                </strong>
              </h5>
              <p class="text-muted fst-italic" id="bio"></p>
              <i class="fa-solid fa-star w-100 pb-4" style="color: #ffd43b">{{
                userInfo.rating
              }}</i>
              <FollowButton
                v-if="other"
                :isFollowing="isFollowing"
                @toggle-follow="$emit('toggle-follow')"
              ></FollowButton>
            </div>
          </div>
          <div class="col-sm-8 bg-white rounded-4">
            <h3 class="mt-3 text-center">Information</h3>
            <hr class="border border-secondary border-1 opacity-50" />

            <div class="row">
              <div class="col-6 mt-3 ml-2">
                <p class="fw-bold">Userame</p>
                <h6 class="fw-normal text-muted">{{ userInfo.name }}</h6>
              </div>
            </div>

            <div class="row">
              <div v-if="!other" class="col-6 mt-3">
                <p class="fw-bold">Email</p>
                <h6 class="fw-normal text-muted">{{ userInfo.email }}</h6>
              </div>
              <div class="col-12 mt-3">
                <p class="fw-bold">City</p>
                <h6 class="fw-normal text-muted">Quebec</h6>
                <hr class="border border-secondary border-1 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FollowButton from "../Follows/FollowButton.vue";

export default {
  name: "UserInfo",
  components: { FollowButton },
  emits: ["toggle-follow"],
  methods: {
    created() {
      console.log(gravatarUrl);
    },
  },
  props: {
    userInfo: Object,
    gravatarUrl: String,
    isFollowing: Boolean,
    other: Boolean,
  },
};
</script>
