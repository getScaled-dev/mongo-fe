<template>
    <v-dialog v-model="dialog" persistent max-width="600px">

        <v-card>
            <v-card-title>
                <span class="text-h5">Edit Customer</span>

            </v-card-title>
            <v-card-text>
                <v-container>

                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Customer Name*" v-model="customer.customerName"
                                    :rules="[rules.required]" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email*" v-model="customer.email" required :rules="[rules.required]"
                                    type="email"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="customer.apiKey" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1" @click="saveCustomer">
                    Update
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


            customer: {}
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
                customerName: this.customer.customerName,
                apiKey: this.customer.apiKey,
                email: this.customer.email,
                id: this.customer._id

            }
            if (valid) {
                this.isLoading = true;
                // let pagination = `?itemsPerPage=${this.pagination.itemPerPage}&page=${this.pagination.page}`

                let url = `${process.env.VUE_APP_API_URL}api/update-customer`;
                axios
                    .put(url, payload, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        }
                    })
                    .then((response) => {
                        console.log('alkdlkd asdlkjsd', response);


                        this.isLoading = false;
                        this.dialog = false
                        this.$emit('edit-customer')
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