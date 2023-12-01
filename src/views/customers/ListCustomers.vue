<template>
  <section>
    <Loader v-if="isLoading" />
    <div style="width: 100%" class="d-flex justify-end mr-4">
      <v-btn color="deep-purple lighten-2 float-right mb-4" @click="addCustomer">
        Add Customer
      </v-btn>
    </div>
    <v-row class="mt-4">
      <v-col cols="12" md="3" v-for="customer in customers" :key="customer.email">
        <v-card :loading="loading" class="ml-4" max-width="374">
          <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
          </template>
          <div style="position: relative; left: 40%;" class="pt-3">
            <v-img width="80" src="@/assets/icons/clients.png"></v-img>

          </div>

          <v-card-title>{{ customer.customerName }}</v-card-title>



          <v-divider class="mx-4"></v-divider>

          <v-card-text>{{ customer.email }}</v-card-text>



          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon @click="showEditDialog(customer)">mdi-account-edit</v-icon>
            </v-btn>

            <v-btn icon @click="deleteConfirmation(customer)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>


          </v-card-actions>
        </v-card>
      </v-col>

    </v-row>
    <AddCustomer ref="addCustomer" @add-customer="saveCustomer" />
    <EditCustomer ref="editCustomer" @edit-customer="listCustomers" />
    <ConfirmationModalVue @delete-records="deleteCustomer" ref="confirmation" :loading="loading" />

  </section>
</template>

<script>
import AddCustomer from './AddCustomer.vue';
import EditCustomer from './EditCustomer.vue'
import axios from "axios";
import ConfirmationModalVue from "@/components/ConfirmationModal.vue";


import Loader from "@/components/common/Loader.vue";
export default {
  components: { AddCustomer, EditCustomer, Loader, ConfirmationModalVue },
  data() {
    return {
      customers: [],
      isLoading: false,
      customerId: '',
      loading: false
    }
  },
  mounted() {
    this.listCustomers()
  },
  methods: {
    addCustomer() {
      this.$refs.addCustomer.showDialog()
    },
    saveCustomer(data) {
      this.customers.push(data)
      this.listCustomers()
    },
    listCustomers() {

      this.isLoading = true;
      // let pagination = `?itemsPerPage=${this.pagination.itemPerPage}&page=${this.pagination.page}`

      let url = `${process.env.VUE_APP_API_URL}api/get-customers`;
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log('alkdlkd asdlkjsd', response);
          this.customers = response.data.data

          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    showEditDialog(customer) {
      let cust = { ...customer }
      this.$refs.editCustomer.customer = cust
      this.$refs.editCustomer.showDialog()
    },

    deleteConfirmation(customer) {
      this.$refs.confirmation.dialog = true
      this.customerId = customer._id
    },
    deleteCustomer() {
      let id = this.customerId
      const data = {
        id: id,
      };
      axios
        .delete(`${process.env.VUE_APP_API_URL}api/delete-customer`, { data })
        .then((res) => {
          this.loading = false;

          this.$refs.confirmation.dialog = false;
          // this.dataDeleted = true;
          // EventBus.$emit(
          //   "showSnackbar",
          //   "Variable has been deleted",
          //   "success"
          // );
          this.listCustomers()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }

}
</script>

<style></style>