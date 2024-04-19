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

                <form @submit="register">
                  <div class="form-outline mb-4">
                    <label class="form-label" for="name">Username</label>
                    <input
                      type="text"
                      id="name"
                      v-model="name"
                      class="form-control form-control-lg"
                      required
                      maxlength="25"
                      pattern="^\S+$"
                      oninvalid="this.setCustomValidity('Username must be provided not contain spaces')"
                      oninput="this.setCustomValidity('')"
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      v-model="email"
                      class="form-control form-control-lg"
                      required
                      maxlength="50"
                      pattern="^\S+@\S+\.\S+$"
                      oninvalid="this.setCustomValidity('Email must be of format x@y.z')"
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
                      pattern="^(?!.* )(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,30}$"
                      oninvalid="this.setCustomValidity('Password must be 8-30 characters long and include at least one uppercase letter, one lowercase letter and one number')"
                      oninput="this.setCustomValidity('')"
                    />
                  </div>
                  <div class="d-flex justify-content-center mb-2">
                    <button
                      type="submit"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Register
                    </button>
                  </div>
                  <p class="text-danger text-center" v-if="this.ErrorSignUp">
                    {{ errorMessage }}
                  </p>
                  <p
                    class="text-success text-center"
                    v-if="this.CreatedSuccess"
                  >
                    Account created successfully
                  </p>
                  <p class="text-center text-muted mt-5 mb-0">
                    Already have an account?
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
