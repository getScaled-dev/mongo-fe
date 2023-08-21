<template>
<div><v-data-table
    :headers="headers"
    :items="instances"
   
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Instances List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="createInstanceDialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="clearForm"
            >
              Add New Instance
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Add New Instance</span>
            </v-card-title>
<v-form ref="createForm">
  <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="instanceName"
                      label="Instance name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="userName"
                      label="User name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="instanceUrl"
                      label="Instance URL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="instancePassword"
                      label="Instance password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="apiKey"
                      label="Instance API key"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
</v-form>
            

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="createInstanceDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="createInstance"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">Are you sure you want to delete this Instance?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteInstance">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItemDialog(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    
  </v-data-table>
   <v-dialog
          v-model="editDialog"
          max-width="500px"
        >
          
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Instance</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="instanceName"
                      label="Instance name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="userName"
                      label="User name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="instanceUrl"
                      label="Instance URL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="instancePassword"
                      label="Instance password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="apiKey"
                      label="Instance API key"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="editDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="eidtItem"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog></div>
   
</template>
<script>
import axios from "axios";
import { EventBus } from "../../main";


  export default {
    data: () => ({
      createInstanceDialog: false,
      dialogDelete: false,
      editDialog: false,
      headers: [
        {
          text: 'Instance Name',
          align: 'start',
          sortable: false,
          value: 'instanceName',
        },
         { text: 'User Name', value: 'userName' },
        { text: 'Instance URL', value: 'instanceUrl' },
        { text: 'API Key', value: 'apiKey' },
        { text: 'Password', value: 'instancePassword' },
        { text: 'Actions', value: 'actions', sortable: false }
       
       
      ],
     instanceName: '',
     userName: '',
     instanceUrl: '',
     instancePassword: '',
     apiKey: '',
      instances: [],
      instanceID: null
    
     
     
    }),

    mounted(){
this.listInstances()
    },

    methods: {
      listInstances() {
      axios
        .get(`${process.env.VUE_APP_API_URL}api/get-instances`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.instances = res.data.data;
        });
    },
     editItemDialog(item){
console.log(item)
this.editDialog = true
this.instanceName = item.instanceName
this.userName = item.userName
this.instancePassword = item.instancePassword
this.instanceUrl = item.instanceUrl
this.apiKey = item.apiKey,
this.instanceID = item._id
 

     },
     eidtItem(){
 let payload = {
        instanceName: this.instanceName,
        userName: this.userName,
        id: this.instanceID,
        instancePassword: this.instancePassword,
        instanceUrl: this.instanceUrl,
        apiKey: this.apiKey
      };
      axios
        .put(`${process.env.VUE_APP_API_URL}api/update-instance`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
        
          this.editDialog = false;
          this.listInstances()
          EventBus.$emit(
            "showSnackbar",
            "Instance has been updated successfully",
            "success"
          );

        });
     },
     createInstance() {
    
      let payload = {
       instanceName: this.instanceName,
       userName: this.userName,
       instanceUrl :this.instanceUrl,
       instancePassword: this.instancePassword,
       apiKey: this.apiKey,



      }
      axios
        .post(`${process.env.VUE_APP_API_URL}api/add-instance`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
         
        });
    },
    clearForm(){
        this.$refs.createForm.reset()
    },
    deleteItem(id){
this.dialogDelete = true
this.instanceID = id._id
    },
 deleteInstance(id) {
      console.log(id);
      const data = {
        id: this.instanceID,
      };
      axios
        .delete(`${process.env.VUE_APP_API_URL}api/delete-instance`, { data })
        .then((res) => {
          this.loading = false;

          // this.$refs.confirmation.dialog = false;
          this.dialogDelete = false;
          EventBus.$emit(
            "showSnackbar",
            "Instance has been deleted",
            "success"
          );
          this.listInstances();
        })
        .catch((err) => {
          console.log(err);
        });
    },

     


     


      
    },
  }
</script>

<style>

</style>