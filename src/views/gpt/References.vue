<template>
  <div class="mt-3">
    <v-btn @click="showDialog" x-small class="mb-3"> Add a variable </v-btn>
    <v-divider></v-divider>
    <div
      class="d-flex justify-space-between my-3"
      v-for="(ref, index) in references"
      :key="index"
    >
      <div>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn  icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item style="cursor-pointer" @click="editReference(ref)">
              <v-list-item-title >Edit</v-list-item-title>
            </v-list-item>
             <v-list-item style="cursor-pointer" @click="deleteReference(ref._id)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <span style="font-size: 12px">
          {{ ref.referenceName }} =
          <span id="copy">{{ ref.referenceValue }}</span>
        </span>
      </div>

      <v-icon
        small
        style="cursor: pointer"
        @click="copyToClipboard(ref.referenceValue)"
        >mdi-content-copy</v-icon
      >
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Give a name to the vreiable.
        </v-card-title>

        <v-card-text class="mt-3">
          <v-text-field
            label="Variable Name"
            outlined
            dense
            v-model="referenceName"
          ></v-text-field>
          <v-text-field
            label="Variable Value"
            outlined
            dense
            v-model="referenceValue"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>

          <v-btn color="primary" @click="saveReference"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <v-dialog v-model="editDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Update the variable.
        </v-card-title>

        <v-card-text class="mt-3">
          <v-text-field
            label="Variable Name"
            outlined
            dense
            v-model="referenceName"
          ></v-text-field>
          <v-text-field
            label="Variable Value"
            outlined
            dense
            v-model="referenceValue"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editDialog = false"> Cancel </v-btn>

          <v-btn color="primary" @click="updateReference"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

import { EventBus } from "../../main";

export default {
  data() {
    return {
      dialog: false,
      copied: false,
      referenceName: "",
      referenceValue: "",
      references: [],
      editDialog: false,
       referenceID: ''
    };
  },
  mounted() {
    this.getReferencs();
  },
  methods: {
    showDialog() {
      this.dialog = true;
      this.referenceName = '',
      this.referenceValue = ''
    },
    copyToClipboard(text) {
      if (!text) return; // If no text is provided, don't proceed

      // Create a temporary textarea element
      EventBus.$emit("showSnackbar", "Copied!!", "success");
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      document.execCommand("copy");
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
      if (this.referenceName.trim() == "" || this.referenceValue.trim() == "") {
        EventBus.$emit("showSnackbar", "All fields are required", "error");
        return;
      }
      let payload = {
        referenceName: this.referenceName,
        referenceValue: this.referenceValue,
      };
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
          this.dialog = false;
          EventBus.$emit(
            "showSnackbar",
            "Campaign has been saved successfully",
            "success"
          );
        });
    },
    editReference(ref){
        console.log(ref)
        this.editDialog = true
        this.referenceName = ref.referenceName
      this.referenceValue = ref.referenceValue
      this.referenceID = ref._id
    },
    updateReference(){
 if (this.referenceName.trim() == "" || this.referenceValue.trim() == "") {
        EventBus.$emit("showSnackbar", "All fields are required", "error");
        return;
      }
      let payload = {
        referenceName: this.referenceName,
        referenceValue: this.referenceValue,
        id: this.referenceID
      };
      axios
        .put(`${process.env.VUE_APP_API_URL}api/update-reference`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.getReferencs();
          this.editDialog = false;
          EventBus.$emit(
            "showSnackbar",
            "Variable has been updated successfully",
            "success"
          );
        });
    },
     deleteReference(id) {
      console.log(id);
      const data = {
        id: id,
      };
      axios
        .delete(`${process.env.VUE_APP_API_URL}api/delete-reference`, { data })
        .then((res) => {
          this.loading = false;

          // this.$refs.confirmation.dialog = false;
          // this.dataDeleted = true;
          EventBus.$emit(
            "showSnackbar",
            "Variable has been deleted",
            "success"
          );
          this.getReferencs();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.box {
  height: 240px;
  border: 1px solid;
}
</style>
