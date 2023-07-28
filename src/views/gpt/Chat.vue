<template>
  <div class="d-flex justify-spac-between">
    <div style="width: 20%">
      <h4>Previous Campaigns</h4>
      <v-divider></v-divider>
      <!-- <div class="mt-3 mb-3 d-flex justify-space-between" v-for="chats in previousChats" :key="chats">
      
        <div>{{chats.prompt}}</div>
        <div>
          <v-btn small color="rgb(7, 2, 83)" dark>View</v-btn>
        </div>
         <v-divider></v-divider>
      </div> -->
      <v-list-item v-for="chat in previousChats" :key="chat.id">
        <!-- <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-folder
          </v-icon>
        </v-list-item-avatar> -->

        <v-list-item-content>
          <v-list-item-title v-text="chat.prompt"></v-list-item-title>

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
    </div>
    <v-divider vertical class="ml-2" inset></v-divider>
    <div :style="isResponse ? 'width: 40%' : 'width: 80%'" class="ml-8">
      <v-card style="height: 80%" class="mb-4" v-if="isResponse">
        <v-expand-transition>
          <v-card
            class="transition-fast-in-fast-out v-card--reveal"
            style="height: 100%"
            color="blue-grey lighten-5"
          >
            <v-card-text class="pb-0">
              <div
                class="d-flex justify-center align-items-center"
                v-if="isLoading"
              >
                <img src="@/assets/loaders/3-dots.svg" alt="" />
              </div>

              <pre class="formatted-text" style="color: black" v-else>
               {{ response }}
              </pre>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-card>

      <h4 class="mb-3">What would you like to work on?</h4>
      <v-textarea
        outlined
        name="input-7-4"
        label="Write Prompt Here..."
        v-model="prompt"
      ></v-textarea>
      <div class="d-flex justify-space-between">
        <div>
          <v-btn
            small
            color="rgb(7, 2, 83)"
            :loading="isLoading"
            dark
            @click="sendPrompt"
            >Enter Here</v-btn
          >
          <v-btn small class="ml-3" @click="clearData" v-if="isResponse"
            >Clear</v-btn
          >
          <v-btn small class="ml-3" @click="saveAiEmail" v-if="isResponse"
            >Save</v-btn
          >
        </div>
        <!-- <div>
          <v-btn small color="rgb(215, 93, 63)" dark v-if="isResponse"
            >Approve and send to GetScaled account</v-btn
          >
        </div> -->
      </div>
    </div>
 
 <div class="ml-4 mt-8"  style="width: 40%" v-if="isResponse">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
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
   

    <v-checkbox
      v-model="isPublished"
      
      label="is published"
    
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="createEmail"
      :loading='emailLoading'
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
import { EventBus } from '../../main';
export default {
  data() {
    return {
      prompt: "",
      response: "",
      isResponse: false,
      isLoading: false,
      emailLoading: false,
      moment: moment,
      previousChats: [],
     valid: true,
      name: '',
      subject: '',
      plainText: '',
      isPublished: true
      };
  },
  mounted() {
    this.getAiSearches();
     
  },
  methods: {
    showChat(chat){
this.isResponse = true;
this.prompt = chat.prompt
this.response = chat.template
    },
    sendPrompt() {
      if(this.prompt.trim() == ''){
          EventBus.$emit('showSnackbar', 'Please enter prompt!!!', 'error');
          return
      }
      this.isResponse = true;
      this.isLoading = true;
      let payload = { message: this.prompt, sessionId: '5432' };
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
          this.response = data;
          this.isLoading = false;
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
      const payload = {
        prompt: this.prompt,
        template: this.response,
      };
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
          EventBus.$emit('showSnackbar', 'Campaign has been saved successfully', 'success');
        });
    },
    clearData() {
      (this.prompt = ""), (this.response = ""), (this.isResponse = false);
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
           EventBus.$emit('showSnackbar', 'Campaign has been deleted', 'success');
          this.getAiSearches();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createEmail(){
      if(this.name.trim() == ''){
  EventBus.$emit('showSnackbar', 'Email Name is required', 'error');
  return
      }
      if(this.subject == ''){
  EventBus.$emit('showSnackbar', 'Email Subject is required', 'error');
return
      }
      this.emailLoading = true
      const payload = {
        name: this.name,
       subject: this.subject,
       plainText:this.plainText,
       isPublished :this.isPublished
      };
      axios
        .post(`${process.env.VUE_APP_API_URL}api/create-email`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.emailLoading = false
          console.log(res);
         EventBus.$emit('showSnackbar', 'Email has been created successfully!', 'success');
          this.$refs.form.reset()
        
        });
    }
  },
};
</script>

<style scoped>
::v-deep .v-input__slot {
  background: white !important;
}
.formatted-text {
  white-space: pre-wrap;
  max-height: 300px;
  overflow: auto;
}
</style>
