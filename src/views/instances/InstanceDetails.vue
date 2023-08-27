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

        <v-tab href="#tab-1">
          Leads Database
          <v-icon>mdi-phone</v-icon>
        </v-tab>

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
                   
                  <div class=""><span class="font-weight-bold"> Instance Name: </span> {{instanceDetails.instanceName}}</div>
                  <div> <span class="font-weight-bold">Instance URL:</span> {{instanceDetails.instanceName}}</div>
                  <div> <span class="font-weight-bold">User Name:</span> {{instanceDetails.userName}}</div>
                  <div> <span class="font-weight-bold">Password:</span> {{instanceDetails.instancePassword}}</div>
                  <div> <span class="font-weight-bold">API Key:</span> {{instanceDetails.apiKey}}</div>
                </div>

                <!-- {{instanceDetails}} -->
              </v-card>
            </v-col>
            <v-col md="4">
              <v-card class="instance-card" elevation="0" height="200">
                <div class="instance-card pl-3">Instance Actions</div>
                <div class="d-flex justify-space-around py-7">
                  <v-btn small color="primary" width='185px'>Create Campaign</v-btn>
                  <v-btn small color="primary" width='185px'>Create Email</v-btn>
                </div>
                <div class="d-flex justify-space-around">
                  <v-btn small color="primary" width='185px'>Customer Info</v-btn>
                  <v-btn small color="primary" width='185px'>Reporting</v-btn>
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


                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in emails" :key="item.id">
                          <td>{{ item.name }}</td>
                          
                          <td> <v-icon color="blue darken-2" v-if="item.isPublished">mdi-check</v-icon> </td>
                          <td>{{ item.readCount }}</td>
                          <td>{{ item.sentCount }}</td>
                          <td>{{ item.createdByUser }}</td>
                          <td>{{ moment(item.dateAdded).format("MM-DD-YYYY") }}</td>


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


                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in campaigns" :key="item.id">
                          <td>{{ item.name }}</td>
                          <td> <v-icon color="blue darken-2" v-if="item.isPublished">mdi-check</v-icon> </td>
                          <td>{{ item.createdByUser }}</td>
                          <td>{{ moment(item.dateAdded).format("MM-DD-YYYY") }}</td>


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
  </v-dialog>
</template>

<script>
import axios from 'axios';
import moment from "moment";
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      instanceDetails: {},
         moment: moment,
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
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  mounted(){
// this.listEmails()
  },
  methods: {
    listEmails(item){
        console.log('req body ====>', item)
       axios
        .post(`${process.env.VUE_APP_API_URL}api/list-emails`,item, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.emails = res.data.emails
         
        });  
    },
     listCampaigns(item){
        console.log('req body ====>', item)
       axios
        .post(`${process.env.VUE_APP_API_URL}api/list-campaigns`,item, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.campaigns = res.data.campaigns
         
        });  
    }
  }
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
::v-deep .v-toolbar{
    height: 42px !important;
}
::v-deep .v-toolbar__content {
     height: 42px !important;
}
</style>
