<template>
  <div class="d-flex justify-spac-between mt-4 mx-4">
    <div style="width: 20%">
      <h4>Previous Campaigns</h4>
      <v-divider></v-divider>
       <v-text-field
     
        
        name="input-7-4"
        label="Search previous Capmaigns"
         v-model="search"
      
      ></v-text-field>
      <!-- <div class="mt-3 mb-3 d-flex justify-space-between" v-for="chats in previousChats" :key="chats">
      
        <div>{{chats.prompt}}</div>
        <div>
          <v-btn small color="rgb(7, 2, 83)" dark>View</v-btn>
        </div>
         <v-divider></v-divider>
      </div> -->
      <v-list-item v-for="chat in filteredItems" :key="chat.id">
        <!-- <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar> -->
        <v-list-item-content>
          <v-list-item-title v-text="chat.campaignName"></v-list-item-title>

          <v-list-item-subtitle>{{
            moment(chat.createdAt).format("MM-DD-YYYY")
          }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <div class="d-flex">
            <v-btn icon @click="showChat(chat)">
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="deleteChat(chat._id)"
                >mdi-delete</v-icon
              >
            </v-btn>
          </div>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
       <References />
    </div>
   
    <v-divider vertical class="ml-2" inset></v-divider>
    <div :style="isResponse ? 'width: 40%' : 'width: 80%'" class="ml-8">
       <v-expansion-panels>
    <v-expansion-panel
     v-for="(data, index) in response" :key="index"
    >
      <v-expansion-panel-header>
        Q:{{index +1}}  {{data.prompt}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
         <pre class="formatted-text" style="color: black">
                    {{data.res}}
                  </pre>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
      <!-- <v-card  class="mb-4" v-if="isResponse">
        <v-expand-transition>
          <v-card
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%"
            color="blue-grey lighten-5"
          >
            <v-card-text class="pb-0" style="height: 300px; overflow: auto"  ref="scrollContainer">
              <div
                class="d-flex justify-center align-items-center"
                v-if="isLoading"
              >
                <img src="@/assets/loaders/3-dots.svg" alt="" />
              </div>
              <div v-else>
              
                <div  v-for="(data, index) in response" :key="index">
                  <h3>Q:{{index +1}}  {{data.prompt}}</h3>
                  <pre class="formatted-text" style="color: black">
                    {{data.res}}
                  </pre>
              
              </div
                >
              </div>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-card> -->

      <h4 v-if="isSearchable" class="mb-3">What would you like to work on?</h4>
      <v-textarea
      v-if="isSearchable"
        outlined
        name="input-7-4"
        label="Write Prompt Here..."
        v-model="prompt"
        rows=3
      ></v-textarea>
      <div class="d-flex justify-space-between" >
        <div>
          <v-btn
            small
            color="rgb(7, 2, 83)"
            :loading="isLoading"
            dark
            @click="sendPrompt"
            v-if="isSearchable"
            >Enter Here</v-btn
          >
          <v-btn small class="ml-3" @click="clearData" v-if="isResponse"
            >New Campaign</v-btn
          >
          <v-btn small class="ml-3"  @click="dialog = true" v-if="isResponse && isSearchable"
            >Save</v-btn
          >
         <v-dialog
      v-model="dialog"
      width="500"
    >
      

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         Give a name to this campaign.
        </v-card-title>

        <v-card-text class="mt-3">
           <v-text-field
      v-if="isSearchable"
        outlined
        name="input-7-4"
        label="Write Campaing Name"
        v-model="campaignName"
      
      ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          
          <v-btn
            color="primary"
            
            @click="saveAiEmail"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </div>
        <!-- <div>
          <v-btn small color="rgb(215, 93, 63)" dark v-if="isResponse"
            >Approve and send to GetScaled account</v-btn
          >
        </div> -->
      </div>
    </div>

    <div class="ml-4 " style="width: 40%" v-if="isResponse">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          outlined
          v-model="name"
          :counter="10"
          label="Enter name of email"
        ></v-text-field>

        <v-text-field
          outlined
          v-model="subject"
          label="Enter subject line"
        ></v-text-field>
        <v-textarea
          outlined
          v-model="plainText"
          label="Enter email body"
        ></v-textarea>

        <v-checkbox v-model="isPublished" label="is published"></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="createEmail"
          :loading="emailLoading"
        >
          Send
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { EventBus } from "../../main";
import VueScrollTo from 'vue-scrollto';

import References from './References.vue';
export default {
  components: {References},
  data() {
    return {
     
      response: [
      ],
      isResponse: false,
      isLoading: false,
      emailLoading: false,
      moment: moment,
      previousChats: [],
      valid: true,
      name: "",
      subject: "",
      plainText: "",
      isPublished: false,
      sessionId: "",
      prompt: '',
      isSearchable: true,
      dialog: false,
      campaignName: '',
         search: "",
        
    };
  },
  mounted() {
    this.getAiSearches();
    this.newChat();
  },
  methods: {
    newChat() {
      axios
        .post(`${process.env.VUE_APP_API_URL}api/start-new-chat`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.sessionId, "session id");
          this.sessionId = res.data.sessionId;
        });
    },
    showChat(chat) {
      console.log(chat.template)

      this.isResponse = true;
    
      this.response = chat.template;
      this.isSearchable = false
    },
    sendPrompt() {
      if (this.prompt.trim() == "") {
        EventBus.$emit("showSnackbar", "Please enter prompt!!!", "error");
        return;
      }
      
 this.isResponse = true;
      
     
      this.isLoading = true;
      let payload = { message: this.prompt, sessionId: this.sessionId };
      axios
        .post(`${process.env.VUE_APP_API_URL}api/generate-email`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          let data = res.data.reply;
          this.response.push({prompt: this.prompt, res: data})

          this.isLoading = false;
          
          this.prompt = ''
        
        });
    },
    getAiSearches() {
      axios
        .get(`${process.env.VUE_APP_API_URL}api/get-template`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.previousChats = res.data.data;
        });
    },
    saveAiEmail() {
      if(this.campaignName.trim() == ''){
         EventBus.$emit(
            "showSnackbar",
            "Please give a name to that campaign",
            "error"
          );
          return
      }
      let payload = {
       campaignName: this.campaignName,
       campaign: this.response
      }
      axios
        .post(`${process.env.VUE_APP_API_URL}api/save-template`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.getAiSearches();
          this.dialog = false
          EventBus.$emit(
            "showSnackbar",
            "Campaign has been saved successfully",
            "success"
          );
        });
    },
    clearData() {
      this.newChat()
      this.response = []
      this.isResponse = false
      this.isSearchable = true
    

    },
    deleteChat(id) {
      console.log(id);
      const data = {
        id: id,
      };
      axios
        .delete(`${process.env.VUE_APP_API_URL}api/delete-template`, { data })
        .then((res) => {
          this.loading = false;

          // this.$refs.confirmation.dialog = false;
          // this.dataDeleted = true;
          EventBus.$emit(
            "showSnackbar",
            "Campaign has been deleted",
            "success"
          );
          this.getAiSearches();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createEmail() {
      if (this.name.trim() == "") {
        EventBus.$emit("showSnackbar", "Email Name is required", "error");
        return;
      }
      if (this.subject == "") {
        EventBus.$emit("showSnackbar", "Email Subject is required", "error");
        return;
      }
      this.emailLoading = true;
      const payload = {
        name: this.name,
        subject: this.subject,
        plainText: this.plainText,
        isPublished: this.isPublished,
      };
      axios
        .post(`${process.env.VUE_APP_API_URL}api/create-email`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.emailLoading = false;
          console.log(res);
          EventBus.$emit(
            "showSnackbar",
            "Email has been created successfully!",
            "success"
          );
          this.$refs.form.reset();
        });
    },
  },
  computed: {
     filteredItems() {
      // Apply the filter based on the search input
      return this.previousChats.filter((item) =>
        item.campaignName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  }
};
</script>

<style scoped>
::v-deep .v-input__slot {
  background: white !important;
}
.formatted-text {
  white-space: pre-wrap;
  height: 400px;
  overflow: auto;
}
</style>
