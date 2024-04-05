<template>
  <section class="vh-100 bg-image">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-5">
                  Create an account
                </h2>

                <form>
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      id="name"
                      v-model="name"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="name">Your Name</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      v-model="email"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="email">Your Email</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      v-model="password"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      @click="register"
                    >
                      Register
                    </button>
                  </div>
                  <p class="text-danger" v-if="this.ErrorSignUp">
                    {{ errorMessage }}
                  </p>
                  <p class="text-success" v-if="this.CreatedSuccess">
                    Account created successfully
                  </p>
                  <p class="text-center text-muted mt-5 mb-0">
                    Have already an account?
                    <a href="/#/login" class="fw-bold text-body"
                      ><u>Login here</u></a
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
import { signUp } from "@/auth/auth.js";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: "",
      ErrorSignUp: false,
      CreatedSuccess: false,
      isSubmitting: false,
    };
  },
  methods: {
    async register() {
      this.isSubmitting = true;
      this.ErrorSignUp = false;
      try {
        const success = await signUp(this.name, this.email, this.password);
        if (success) {
          this.CreatedSuccess = true;
          this.resetForm();
          setTimeout(() => {
            this.CreatedSuccess = false;
          }, 5000);
        } else {
          this.ErrorSignUp = true;
          this.errorMessage = "Signup failed, please try again.";
        }
      } catch (error) {
        this.ErrorSignUp = true;
        this.errorMessage = "Error while signing up, check credentials";
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style></style>
