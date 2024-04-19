<template>
  <section class="vh-100 bg-image">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-5">
                  Log Into Your Account
                </h2>

                <form @submit.prevent="handleLogin">
                  <div class="form-outline mb-4">
                    <label class="form-label" for="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      class="form-control form-control-lg"
                      v-model="email"
                      required
                      maxlength="50"
                      pattern="^\S+@\S+\.\S+$"
                      oninvalid="this.setCustomValidity('Email must be of valid format (x@y.z)')"
                      oninput="this.setCustomValidity('')"
                    />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      v-model="password"
                      class="form-control form-control-lg"
                      required
                      maxlength="30"
                    />
                  </div>

                  <div class="d-flex justify-content-center mb-2">
                    <button
                      type="submit"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Log in
                    </button>
                  </div>
                  <p class="text-danger text-center" v-if="error">
                    {{ errorMessage }}
                  </p>
                  <p class="text-center text-muted mt-5 mb-0">
                    Don't have an account?
                    <router-link
                      :to="{ name: 'Register' }"
                      class="fw-bold text-body"
                      ><u>Register here</u></router-link
                    >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { login } from "@/auth/auth.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        await login(this.email, this.password);
        this.$router.push({ name: "User" });
      } catch (error) {
        this.error = true;
        this.errorMessage = "Could not log in. Check credentials";
        console.error(error.message);
      }
    },
  },
};
</script>
