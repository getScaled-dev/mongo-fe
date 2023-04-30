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
                    type="text"
                    placeholder="Enter Email"
                    v-model="email"
                    rules="required"
                  />

                  <v-btn
                    style="width: 100% !important; color: white"
                    color="#414583"
                    @click="handleSubmit(submit)"
                  >
                    <v-icon dark class="mr-1"> mdi-shield-check </v-icon>
                    Send Verification Code</v-btn
                  >
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <router-link to="/login">
                  <v-btn text color="primary"> Back</v-btn>
                </router-link>
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
export default {
  name: "Login",
  props: {
    source: String,
  },
  components: { BaseInput, ValidationObserver },
  data() {
    return {
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 10000,
    };
  },
};
</script>

<style></style>
