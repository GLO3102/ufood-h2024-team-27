<template>
  <div class="row justify-content-center">
    <div class="col-10">
      <div class="d-flex flex-column align-items-center gap-3">
        <span class="fs-3 text-center"
          >To access this page and its functionalities, please log in.</span
        >
        <button
          type="button"
          class="btn btn-primary p-3 px-4 fs-5 rounded-4"
          @click="this.$router.push({ name: 'Login' })"
        >
          <i class="fa-solid fa-user"></i> Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotLoggedIn",
};
</script>
