<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary" class="pa-0">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Instance Details</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items> </v-toolbar-items>
      </v-toolbar>
      <v-tabs v-model="tab" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-2">
          Email System Admin
          <v-icon>mdi-heart</v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Campaign Reporting
          <v-icon>mdi-account-box</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-2">
          <v-row class="mx-5">
            <v-col>
              <v-card class="instance-card" elevation="0" height="200">
                <div class="instance-card pl-3">Instance Overview</div>
                <div class="pl-3 py-3">
                  <div class="">
                    <span class="font-weight-bold"> Instance Name: </span>
                    {{ instanceDetails.instanceName }}
                  </div>
                  <div>
                    <span class="font-weight-bold">Instance URL:</span>
                    {{ instanceDetails.instanceName }}
                  </div>
                  <div>
                    <span class="font-weight-bold">User Name:</span>
                    {{ instanceDetails.userName }}
                  </div>
                 
                   <div v-if="isShowPassword">
                    <span class="font-weight-bold">Password:</span>
                    {{ instanceDetails.instancePassword }}
                    <v-icon small class="mr-2 cursor-pointer" @click="isShowPassword = false"> mdi-eye-off </v-icon>
                  </div>
                   <div v-else>
                    <span class="font-weight-bold">Password:</span>
                    {{passwordString}}
                    <v-icon small class="mr-2 cursor-pointer" @click="isShowPassword = true"> mdi-eye </v-icon>
                  </div>
                  <div v-if="isShowApiKey">
                    <span class="font-weight-bold">API Key:</span>
                    {{ instanceDetails.apiKey }}
                    <v-icon small class="mr-2 cursor-pointer" @click="isShowApiKey = false"> mdi-eye-off </v-icon>
                  </div>
                  <div v-else>
                    <span class="font-weight-bold">API Key:</span>
                    **********************************************
                    <v-icon small class="mr-2 cursor-pointer" @click="isShowApiKey = true"> mdi-eye </v-icon>
                  </div>
                </div>

                <!-- {{instanceDetails}} -->
              </v-card>
            </v-col>
            <v-col md="4">
              <v-card class="instance-card" elevation="0" height="200">
                <div class="instance-card pl-3">Instance Actions</div>
                <div class="d-flex justify-space-around py-7">
                  <v-btn small color="primary" width="185px"
                    >Create Campaign</v-btn
                  >
                  <router-link to="/ai-campaign">
                    <v-btn small color="primary" width="185px" link>
                      Create Email
                    </v-btn>
                  </router-link>
                </div>
                <div class="d-flex justify-space-around">
                  <v-btn small color="primary" width="185px"
                    >Customer Info</v-btn
                  >
                  <v-btn small color="primary" width="185px">Reporting</v-btn>
                </div>
                <div></div>
                <!-- {{instanceDetails}} -->
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mx-5">
            <v-col>
              <v-card class="instance-card" elevation="0">
                <div class="instance-card pl-3">Instance Emails Overview</div>
                <div class="table">
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Email Name</th>
                          <th class="text-left">Published</th>
                          <th class="text-left">Read Count</th>

                          <th class="text-left">Sent Count</th>

                          <th class="text-left">Created By</th>
                          <th class="text-left">Created At</th>
                          <th class="text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in emails" :key="item.id">
                          <td>{{ item.name }}</td>

                          <td>
                            <v-icon
                              color="blue darken-2"
                              v-if="item.isPublished"
                              >mdi-check</v-icon
                            >
                          </td>
                          <td>{{ item.readCount }}</td>
                          <td>{{ item.sentCount }}</td>
                          <td>{{ item.createdByUser }}</td>
                          <td>
                            {{ moment(item.dateAdded).format("MM-DD-YYYY") }}
                          </td>
                          <td>
                            <v-icon
                              small
                              class="mr-2"
                              @click="openEmailDialog(item)"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon small class="mr-2"> mdi-delete </v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mx-5">
            <v-col>
              <v-card class="instance-card" elevation="0">
                <div class="instance-card pl-3">Instance Campains Overview</div>
                <div class="table">
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Campaign Name</th>
                          <th class="text-left">Published</th>
                          <th class="text-left">Created By</th>
                          <th class="text-left">Created At</th>
                          <th class="text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in campaigns" :key="item.id">
                          <td>{{ item.name }}</td>
                          <td>
                            <v-icon
                              color="blue darken-2"
                              v-if="item.isPublished"
                              >mdi-check</v-icon
                            >
                          </td>
                          <td>{{ item.createdByUser }}</td>
                          <td>
                            {{ moment(item.dateAdded).format("MM-DD-YYYY") }}
                          </td>
                          <td>
                            <v-icon
                              small
                              class="mr-2"
                              @click="openCampaignDialog(item)"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon small class="mr-2"> mdi-delete </v-icon>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <!-- edit campaign dialog  -->
    <v-dialog v-model="editCampaignDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Campaign</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="campaignDetails.name"
                  label="Campaign name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="campaignDetails.description"
                  label="Campaign Description"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-checkbox
                  v-model="campaignDetails.isPublished"
                  label="Is Published"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editCampaignDialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="eidtCampaign"> Update </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit email dialog  -->
    <v-dialog v-model="editEmailDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Email</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="emailDetails.name"
                  label="Email Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="emailDetails.subject"
                  label="Email Subject"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="emailDetails.plainText"
                  label="Email Body"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-checkbox
                  v-model="emailDetails.isPublished"
                  label="Is Published"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editEmailDialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="eidtEmail"> Update </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { EventBus } from "../../main";

export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      instanceDetails: {},
      editCampaignDialog: false,
      campaignDetails: {},
      editEmailDialog: false,
      emailDetails: {},
      moment: moment,
      isShowPassword: false,
      isShowApiKey: false,
      tab: null,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      emails: [],
      campaigns: [],
    };
  },
  mounted() {
    // this.listEmails()
  },
  computed:{
     passwordString() {
      return '*'.repeat(this.instanceDetails.instancePassword.length);
    }
  },
  methods: {
    listEmails(item) {
      console.log("req body ====>", item);
      axios
        .post(`${process.env.VUE_APP_API_URL}api/list-emails`, item, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.emails = res.data.emails;
        });
    },
    listCampaigns(item) {
      console.log("req body ====>", item);
      axios
        .post(`${process.env.VUE_APP_API_URL}api/list-campaigns`, item, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.campaigns = res.data.campaigns;
        });
    },
    openCampaignDialog(item) {
      (this.editCampaignDialog = true), console.log(item);
      this.campaignDetails = item;
    },
    openEmailDialog(item) {
      (this.editEmailDialog = true), console.log(item);
      this.emailDetails = item;
    },
    showPassword(){
        this.isShowPassword = true
    },
    eidtCampaign(){
 let payload = {
        instanceDetails: this.instanceDetails,
        
        campaignDetails: this.campaignDetails
      };
      axios
        .post(`${process.env.VUE_APP_API_URL}api/edit-campaign`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        
          this.editCampaignDialog = false;
          
          EventBus.$emit(
            "showSnackbar",
            "Campaign has been updated successfully",
            "success"
          );

        });
     },
     // edit email from mautic
     eidtEmail(){
 let payload = {
        instanceDetails: this.instanceDetails,
        
        emailDetails: this.emailDetails
      };
      axios
        .post(`${process.env.VUE_APP_API_URL}api/edit-email`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        
          this.editEmailDialog = false;
          
          EventBus.$emit(
            "showSnackbar",
            "Email has been updated successfully",
            "success"
          );

        });
     },
  },
};
</script>

<style scoped>
.instance-card {
  border: 1px solid gray;
}
.table {
  height: 300px;
  overflow: auto;
}
::v-deep .v-toolbar {
  height: 42px !important;
}
::v-deep .v-toolbar__content {
  height: 42px !important;
}
</style>
