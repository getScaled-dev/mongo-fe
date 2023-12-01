<template>
    <v-dialog v-model="dialog" persistent max-width="600px">

        <v-card>
            <v-card-title>
                <span class="text-h5">Add Customer</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Customer Name*" v-model="customerName" :rules="[rules.required]"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email*" v-model="email" required :rules="[rules.required]"
                                    type="email"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="apiKey" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                                    label="API Key" @click:append="show1 = !show1"></v-text-field>
                            </v-col>

                        </v-row>
                    </v-form>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue darken-1" @click="saveCustomer" :loading="isLoading">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            dialog: false,
            show1: false,
            valid: true,
            isLoading: false,

            rules: {
                required: value => !!value || 'Required.',
            },

            customerName: '',
            apiKey: '',
            email: ''
        }
    },
    methods: {
        showDialog() {
            this.dialog = true
        },
        saveCustomer() {
            const valid = this.$refs.form.validate()
            console.log('customer is saved', valid)
            let payload = {
                customerName: this.customerName,
                apiKey: this.apiKey,
                email: this.email
            }
            if (valid) {
                this.isLoading = true;
                // let pagination = `?itemsPerPage=${this.pagination.itemPerPage}&page=${this.pagination.page}`

                let url = `${process.env.VUE_APP_API_URL}api/add-customer`;
                axios
                    .post(url, payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    })
                    .then((response) => {
                        console.log('alkdlkd asdlkjsd', response);
                        this.$emit('add-customer', payload)

                        this.isLoading = false;
                        this.dialog = false
                    })
                    .catch((error) => {
                        this.isLoading = false;
                    });

            }
        }

    }

}
</script>

<style></style>