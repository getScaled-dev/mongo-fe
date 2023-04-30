<template>
  <div class="text-center">
    <v-snackbar v-model="fielUploaded" timeout="3000" top>
      File is uploading in stream!
    </v-snackbar>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Upload CSV or Excel
        </v-card-title>

        <v-card-text>
          <v-row class="mt-4 justify-center">
            <!-- <v-file-input
              multiple
              label="File input"
              v-model="files"
             
            ></v-file-input> -->
            <div
              class="document-upload d-flex justify-content-center align-items-center"
            >
              <div
                class="d-flex flex-column justify-content-center align-items-center"
              >
                <v-icon> mdi-database-import-outline </v-icon>
                <span> Drag and Drop Document here </span>
                <span style="text-align: center"> OR </span>
                <span
                  class="text-primary cursor-pointer"
                  @click="handleFileUpload"
                  style="text-align: center"
                >
                  Browse Files</span
                >
                <span v-for="(selectedFiles, index) in files" :key="index">
                  {{ selectedFiles.name }}
                </span>
                <input
                  type="file"
                  class="form-control hidden-input"
                  id="documents"
                  name="documents[]"
                  aria-describedby="documents"
                  ref="documents"
                  accept=".csv"
                  multiple
                  hidden
                  @change="onChange"
                />
              </div>
            </div>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false"> Close </v-btn>

          <v-btn :loading="loading" color="primary" @click="uploadFiles">
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      currentFile: null,
      files: null,
      fielUploaded: false,
      loading: false,
    };
  },

  methods: {
    onChange() {
      this.files = [...this.$refs.documents.files];
    },
    handleFileUpload() {
      document.getElementById("documents").click();
    },
    uploadFiles() {
      this.loading = true;
      let data = new FormData();

      for (var i = 0; i < this.$refs.documents.files.length; i++) {
        let file = this.$refs.documents.files[i];
        data.append("csvFile", file);
      }
      this.loading = true;
      axios
        .post(`http://localhost:3000/api/add-data`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        .then((res) => {
          this.files = null;
          this.fielUploaded = true;
          this.loading = false;

          this.$emit("file-uploaded");
          console.log(this.loading, res, "=========>");
          this.dialog = false;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.reaponse);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.document-upload {
  min-height: 200px;
  border: 1px dashed;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
