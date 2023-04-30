<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Contact Details of {{ userData.fullName }}
        </v-card-title>

        <v-card-text>
          <v-row class="mt-4">
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="First Name"
                  outlined
                  dense
                  v-model="userData.firstName"
                  placeholder="Enter first name"
                ></v-text-field>
              </div>
            </v-col>

            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Last Name"
                  outlined
                  dense
                  v-model="userData.lastName"
                  placeholder="Enter lasr name"
                ></v-text-field>
              </div>
            </v-col>

            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Email"
                  outlined
                  dense
                  v-model="userData.email"
                  placeholder="Enter email"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Company Phone"
                  outlined
                  dense
                  v-model="userData.companyPhone"
                  placeholder="Enter company phone"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Company Name"
                  outlined
                  dense
                  v-model="userData.companyName"
                  placeholder="Enter company name"
                ></v-text-field>
              </div>
            </v-col>

            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Mobile Phone"
                  outlined
                  dense
                  v-model="userData.mobilePhone"
                  placeholder="Enter mobile phone"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Job Title"
                  outlined
                  dense
                  v-model="userData.jobTitle"
                  placeholder="Enter job title"
                ></v-text-field>
              </div>
            </v-col>

            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Date of birth"
                  outlined
                  dense
                  type="date"
                  v-model="userData.dob"
                  placeholder="Enter date of birth"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Age"
                  outlined
                  dense
                  type="number"
                  v-model="userData.age"
                  placeholder="Enter age"
                  readonly
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Address Line 1"
                  outlined
                  dense
                  v-model="userData.address"
                  placeholder="Enter address line 1"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Address Line 2"
                  outlined
                  dense
                  v-model="userData.address2"
                  placeholder="Enter address line 2"
                ></v-text-field>
              </div>
            </v-col>

            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="City"
                  outlined
                  dense
                  v-model="userData.city"
                  placeholder="Enter city"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="State"
                  outlined
                  dense
                  v-model="userData.state"
                  placeholder="Enter state"
                ></v-text-field>
              </div>
            </v-col>
            <v-col md="6">
              <div class="d-flex flex-column">
                <v-text-field
                  label="Zip"
                  outlined
                  dense
                  v-model="userData.zipCode"
                  placeholder="Enter zip"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="secondary" @click="dialog = false"> Cancel </v-btn>
          <v-btn
            color="#D75D3F"
            style="color: white"
            @click="updateData(userData)"
            :loading="loading"
          >
            Save Chnages
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    userData: {
      default: {},
    },
  },
  data() {
    return {
      dialog: false,
      loading: false,
    };
  },
  methods: {
    updateData(user) {
      this.loading = true;
      axios
        .put(`${process.env.VUE_APP_API_URL}update-data?id=${user._id}`, user)
        .then((res) => {
          this.$emit("update-date", user);
          (this.loading = false), (this.dialog = false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>