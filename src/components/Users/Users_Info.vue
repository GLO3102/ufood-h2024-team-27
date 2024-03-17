<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-8 mt-3 pt-3 pb-5">
        <div
          class="row z-depth-3 shadow-lg mb-1 mt-3 border border-5 rounded-4 border-primary"
        >
          <div class="col-sm-4 bg-primary rounded-left">
            <div class="card-block text-center text-white">
              <i
                class="fa-solid fa-user rounded-circle mb-3 mt-5"
                style="font-size: 150px"
                alt="Avatar"
              ></i>
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
              <i class="far fa-edit fa-2x mb-4"></i>
            </div>
          </div>
          <div class="col-sm-8 bg-white rounded-4">
            <h3 class="mt-3 text-center">Information</h3>
            <hr class="border border-secondary border-1 opacity-50" />

            <div class="row">
              <div class="col-6 mt-3 ml-2">
                <p class="fw-bold">Name</p>
                <h6 class="fw-normal text-muted">{{ userInfo.name }}</h6>
              </div>
              <!-- <div class="col-6 mt-3">
                <p class="fw-bold">Last Name</p>
                <h6 class="fw-normal text-muted"></h6>
              </div>-->
            </div>

            <div class="row">
              <div class="col-6 mt-3">
                <p class="fw-bold">Email</p>
                <h6 class="fw-normal text-muted">{{ userInfo.email }}</h6>
              </div>
              <!--   <div class="col-6 mt-3">
                <p class="fw-bold">Phone</p>
                <h6 class="fw-normal text-muted"></h6>
              </div>-->
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
export default {
  name: "UserInfo",

  data() {},
  methods: {},
  props: {
    userInfo: Object,
  },
};
</script>
