<template>
  <v-content class="mt-4">
    <div class="d-flex align-center justify-center mt-5">
      <img src="../../assets/logo_scaled_falcqb.png" alt="" />
    </div>
    <ValidationObserver ref="obs" v-slot="{ handleSubmit }">
      <div class="text-center">
        <v-snackbar v-model="snackbar" :timeout="timeout" top>
          {{ text }}
        </v-snackbar>
      </div>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card elevation="10">
              <v-card-text>
                <v-form>
                  <label for="email">Email Address</label>
                  <BaseInput
                    outlined
                    name="Login"
                    type="email"
                    placeholder="Enter Email"
                    v-model="email"
                    rules="required|email"
                  />
                  <label for="password">Password</label>
                  <BaseInput
                    outlined
                    id="password"
                    name="Password"
                    type="password"
                    v-model="password"
                    placeholder="Enter Password"
                    rules="required"
                  />
                  <v-btn
                    style="width: 100% !important; color: white"
                    color="#1BC5BD"
                    @click="handleSubmit(submit)"
                    :loading="loading"
                  >
                    <v-icon dark class="mr-1"> mdi-login </v-icon>
                    Login</v-btn
                  >
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <router-link to="/forgot-password">
                  <v-btn text color="primary"> Forget Password?</v-btn>
                </router-link>
                <!-- <v-btn color="primary" @click="handleSubmit(submit)">
                  Register Here</v-btn
                > -->
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </ValidationObserver>
  </v-content>
</template>

<script>
import BaseInput from "@/components/common/BaseInput.vue";
import { ValidationObserver } from "vee-validate";
import ApiService from "@/services/ApiService";
import axios from "axios";
export default {
  name: "Login",
  props: {
    source: String,
  },
  components: { BaseInput, ValidationObserver },
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 10000,
      email: "",
      password: "",
      user: null,
      loading: false,
    };
  },
  methods: {
    submit() {
      // console.log("submit form", ApiService);
      this.loading = true;
      let payload = {
        email: this.email,
        password: this.password,
      };

      axios
        .post(`${process.env.VUE_APP_API_URL}api/login`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("user", response.data);
          this.loading = false;
          this.user = response.data.data;
          if (this.user != null) {
            console.log(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isAdmin", response.data.data.isAdmin);

            this.$router.push("/");
          } else {
            this.snackbar = true;
            this.text = "Invalid Credentials!";
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.text = "Something went wrong";
        });
    },
  },
};
</script>

<style></style>
