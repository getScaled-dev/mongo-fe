<template>
    <div class="text-center">

        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-title class="text-h5 grey lighten-2">
                        Upload CSV or Excel

                    </v-card-title>

                    <v-card-text>

                        <v-row class="mt-4 justify-center">

                            <v-col cols="12" md="6">
                                <v-select :items="categories" label="Select Category" item-value="key" item-text="value"
                                    dense outlined :rules="required" v-model="column"></v-select>

                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select :items="type" label="Select Search Type" item-text="value" item-value="key" dense
                                    outlined :rules="required" v-model="filterType"></v-select>

                            </v-col>

                            <div class="document-upload d-flex justify-content-center align-items-center">
                                <div class="d-flex flex-column justify-content-center align-items-center">
                                    <v-icon> mdi-database-import-outline </v-icon>
                                    <span> Drag and Drop Document here </span>
                                    <span style="text-align: center"> OR </span>
                                    <span class="text-primary cursor-pointer" @click="handleFileUpload"
                                        style="text-align: center">
                                        Browse Files</span>
                                    <span v-for="(selectedFiles, index) in files" :key="index">
                                        {{ selectedFiles.name }}
                                    </span>
                                    <input type="file" class="form-control hidden-input" id="documents" name="documents[]"
                                        aria-describedby="documents" ref="documents" accept=".csv" multiple hidden
                                        @change="onChange" />
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
                </v-form>
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
            valid: true,
            currentFile: null,
            files: null,
            fielUploaded: false,
            loading: false,
            successMsg: "",
            categories: [{ key: 'state', value: 'State' }, { key: 'city', value: 'City' }, { key: 'jobTitle', value: 'Job Title' }, { key: 'companyName', value: 'Company Name' }],
            type: [{ key: 'like', value: 'Contains' }, { key: 'is', value: 'is' }],
            required: [
                v => !!v || 'Field is required',

            ],
            column: null,
            filterType: null,

        };
    },
    props: {
        dataType: {
            type: String,
            default: "",
        },
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
            console.log(this.dataType);
            for (var i = 0; i < this.$refs.documents.files.length; i++) {
                let file = this.$refs.documents.files[i];
                data.append("csvFile", file);

            }
            data.append('model', this.dataType)
            data.append('column', this.column)
            data.append('filterType', this.filterType)

            console.log(data)


            axios
                .post(`${process.env.VUE_APP_API_URL}api/add-filter-data`, data, {
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
                    const csvData = res.data;

                    // Convert CSV data to Blob
                    const blob = new Blob([csvData], { type: 'text/csv' });

                    // Create a temporary anchor element
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = 'data.csv';

                    // Trigger a click event to download the file
                    document.body.appendChild(link);
                    link.click();

                    // Remove the temporary anchor element from the DOM
                    document.body.removeChild(link);


                    this.$emit("update-data");
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






