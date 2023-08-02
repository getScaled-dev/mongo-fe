<template>
   <div class="mt-3">
    <v-btn @click="showDialog" x-small class="mb-3">
  Add a reference
</v-btn>
<v-divider></v-divider>
<div class="d-flex justify-space-between my-3" v-for="(ref, index) in references" :key="index">
<span style="font-size: 12px">
    {{ref.referenceName}} = <span id="copy">{{ref.referenceValue}}</span> 
</span>
<v-icon small style="cursor: pointer"  @click="copyToClipboard(ref.referenceValue)">mdi-content-copy</v-icon>

</div>
<v-dialog
      v-model="dialog"
      width="500"
    >
     

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
         Give a name to the reference.
        </v-card-title>

        <v-card-text class="mt-3">
         <v-text-field
            label="Reference Name"
            outlined
            dense
            v-model="referenceName"
          ></v-text-field>
           <v-text-field
            label="Reference Value"
            outlined
            dense
            v-model="referenceValue"
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
            
            @click="saveReference"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
    
   </div>
</template>

<script>
import axios from "axios";

import { EventBus } from "../../main";

export default {
    data(){
        return{
            dialog: false,
            copied: false,
            referenceName: '',
            referenceValue: '',
            references: [
               
               

            ]
        }
    },
    mounted(){
this.getReferencs()
    },
    methods: {
        showDialog(){
            this.dialog = true
        },
        copyToClipboard(text) {
         
      if (!text) return; // If no text is provided, don't proceed

      // Create a temporary textarea element
       EventBus.$emit("showSnackbar", "Copied!!", "success");
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(textArea);
     
    },
    getReferencs() {
      axios
        .get(`${process.env.VUE_APP_API_URL}api/get-reference`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.references = res.data.data;
        });
    },
    saveReference() {
      if(this.referenceName.trim() == '' || this.referenceValue.trim() == ''){
         EventBus.$emit(
            "showSnackbar",
            "All fields are required",
            "error"
          );
          return
      }
      let payload = {
       referenceName: this.referenceName,
       referenceValue: this.referenceValue
      }
      axios
        .post(`${process.env.VUE_APP_API_URL}api/save-reference`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.getReferencs();
          this.dialog = false
          EventBus.$emit(
            "showSnackbar",
            "Campaign has been saved successfully",
            "success"
          );
        });
    },
    }

}
</script>

<style scoped>
.box{
height: 240px;
border: 1px solid;
}
</style>