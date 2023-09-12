<template>
  <div>
    <Loader v-if="isLoading" />

    <div>
      <!-- filter  -->
      <v-snackbar v-model="dataDeleted" :timeout="timeout" top right>
      </v-snackbar>
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <!-- <v-text-field
          outlined
          type="text"
          placeholder="Search..."
          v-model="serarchText"
        ></v-text-field> -->
          <span class="mt-2 mx-2">
            <v-btn color="#070253" @click="clearForm">
              <v-icon color="white"> mdi-sync </v-icon>
            </v-btn>
          </span>

          <!-- <v-btn class="ma-2" color="primary" @click="openFiltersModal"
          ><v-icon> mdi-filter-outline </v-icon> Add Filters
        </v-btn> -->

          <v-btn
            class="ma-2"
           color="rgb(124 155 211)"
            :loading="exportLoader"
            @click="exportCSV"
          >
            <v-icon color="white"> mdi-database-export-outline </v-icon>
            <span style="color: white">Export to CSV</span>
          </v-btn>
          <v-btn
            class="ma-2"
            color="#D75D3F"
            :loading="verifyLoader"
            @click="verifyEmail"
          >
            <v-icon color="white"> mdi-database-export-outline </v-icon>
            <span style="color: white">Launch To Campaign</span>
          </v-btn>

          <v-btn class="ma-2" color="Primary" @click="uploadCSV">
            <v-icon> mdi-database-import-outline </v-icon> Import CSV
          </v-btn>
          <!-- <v-btn class="ma-2" color="Primary" @click="checkDuplicates">
            <v-icon> mdi-database-import-outline </v-icon> Check Duplicates
          </v-btn>
          <DuplicateDataModal ref="duplicates" /> -->
          <UploadFile
            ref="uploadFile"
            @file-uploaded="fileUploaded = true"
            @update-data="getUsers"
            dataType="add-consumer-data"
          />
          <v-btn
            class="ma-2"
            color="error"
            @click="openConfirmation"
            :disabled="selected.length < 1"
          >
            <v-icon> mdi-trash-can-outline </v-icon> Delete Selected Records
          </v-btn>
        </div>
      </div>
      <!-- <div style="display: flex">
        <span>
          Total Emails: {{totalEmails}}
        </span>
        <span>
          Verified Emails: {{verifiedEmails}}
        </span>
      <v-progress-linear :model-value="percentage" v-if="verifyEmail"></v-progress-linear>
      </div> -->
      <v-expansion-panels class="mt-5">
        <v-expansion-panel>
          <v-expansion-panel-header> Apply Filters </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Filters
              ref="filters"
              @apply-filter="applyFilters"
              @check-any="checkAny"
              dataType="consumerData"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row>
        <v-col md="12">
          <div id="wrapper2">
            <div id="div2" class="width-scroll"></div>
          </div>

          <v-data-table
            ref="dt"
            v-model="selected"
            :headers="headers"
            hide-default-footer
            :items="usersData"
            show-select
            :single-select="singleSelect"
            fixed-header
            item-key="_id"
            class="elevation-1 v-scroll-x-reverse v-data-table__overflow table-reference"
            height="70vh"
            :page.sync="pagination.page"
            :items-per-page="pagination.itemPerPage"
          >
            <template v-slot:header.source="{ header }">
              <span v-if="isAdmin == 'true'">{{ header.text }}</span>
            </template>
            <template v-slot:item.fullName="{ item }">
              {{ item.firstName }} {{ item.lastName }}
            </template>
            <template v-slot:item.companyPhone="{ item }">
              {{ item.companyPhone == "null" ? "" : item.companyPhone }}
            </template>
            <template v-slot:item.companyName="{ item }">
              {{ item.companyName == "null" ? "" : item.companyName }}
            </template>
            <template v-slot:item.mobilePhone="{ item }">
              {{ item.mobilePhone == "null" ? "" : item.mobilePhone }}
            </template>
            <template v-slot:item.jobTitle="{ item }">
              {{ item.jobTitle == "null" ? "" : item.jobTitle }}
            </template>
            <template v-slot:item.address="{ item }">
              {{ item.address == "null" ? "" : item.address }}
            </template>
            <template v-slot:item.address2="{ item }">
              {{ item.address2 == "null" ? "" : item.address2 }}
            </template>
            <template v-slot:item.age="{ item }">
              {{ item.age == "null" ? "" : item.age }}
            </template>
            <template v-slot:item.gender="{ item }">
              {{ item.gender == "F" ? "Female" : "Male" }}
            </template>
            <template v-slot:item.dob="{ item }">
              {{ item.dob == "null" ? "" : item.dob }}
            </template>
            <template v-slot:item.city="{ item }">
              {{ item.city == "null" ? "" : item.city }}
            </template>
            <template v-slot:item.state="{ item }">
              {{ item.state == "null" ? "" : item.state }}
            </template>
            <template v-slot:item.zip="{ item }">
              {{ item.zip == "null" ? "" : item.zip }}
            </template>
            <template v-slot:item.createdAt="{ item }">
              {{ moment(item.createdAt).format("MM-DD-YYYY") }}
            </template>
            <template v-slot:item.details="{ item }">
              <v-btn class="ma-2" @click="openUserDetails(item)">
                View Details
              </v-btn>
              <UserDetailsModal
                ref="userDetails"
                :userData="userData"
                dataType="add-consumer-data"
              />
            </template>
            <template v-slot:top>
              <Pagination
                :count="count"
                :pagination="pagination"
                @pageChangedEvent="pagination.page = $event"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <ConfirmationModalVue
        @delete-records="deleteData"
        ref="confirmation"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/common/BaseInput.vue";
import Loader from "@/components/common/Loader.vue";
import axios from "axios";
import UserDetailsModal from "@/components/UserDetailsModal.vue";
import Filters from "@/components/Filters.vue";
import Pagination from "@/components/Pagination.vue";
import UploadFile from "@/components/UploadFile.vue";
import DuplicateDataModal from "@/components/DuplicateDataModal.vue";
import moment from "moment";
import DuplicateDataModalVue from "@/components/DuplicateDataModal.vue";
import ConfirmationModalVue from "@/components/ConfirmationModal.vue";
export default {
  components: {
    UserDetailsModal,
    BaseInput,
    Filters,
    UploadFile,
    Pagination,
    DuplicateDataModal,
    ConfirmationModalVue,
    Loader,
  },
  data() {
    return {
     
     totalEmails: 0,
     verifiedEmails: 0,
      deletedText: "Data has been deleted successfully!",
      dataDeleted: false,
     verifyLoader: false,
      timeout: 5000,
      singleSelect: false,
      selected: [],
      userData: {},
      serarchText: "",
      isLoading: false,
      exportLoader: false,
      filtersData: null,
      moment: moment,
      fileUploaded: false,
      loading: false,
      usersData: [],
      count: 0,
      headers: [
        {
          text: "Detail",
          align: "start",
          sortable: true,
          value: "details",
          width: "150px",
        },
        { text: "Full Name", value: "fullName", width: "170px" },
        { text: "First Name", value: "firstName", width: "150px" },
        { text: "Last Name", value: "lastName", width: "150px" },
        { text: "Email", value: "email", width: "200px" },
        { text: "Company Phone", value: "companyPhone", width: "150px" },

        { text: "Mobile Phone", value: "mobilePhone", width: "150px" },
        { text: "Company Name", value: "companyName", width: "150px" },
        { text: "Job Title", value: "jobTitle", width: "100px" },
        { text: "Date Of Birth", value: "dob", width: "150px" },
        { text: "Age", value: "age", width: "80px" },
        { text: "Gender", value: "gender", width: "80px" },
        { text: "Address Line 1", value: "address", width: "150px" },
        { text: "Address Line 2", value: "address2", width: "150px" },
        { text: "City", value: "city", width: "150px" },
        { text: "State", value: "state", width: "100px" },
        { text: "ZIP", value: "zipCode", width: "100px" },
        { text: "Source", value: "source", width: "100px" },
        { text: "Own Rent", value: "ownRent", width: "150px" },
        { text: "Option Source", value: "optionSource", width: "150px" },
        { text: "Created At", value: "createdAt", width: "150px" },
      ],
      csv_data: [],
      pagination: {
        page: 1,
        itemPerPage: 100,
      },
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem("isAdmin");
    },
    //     pagination(){
    // return {
    //       page: 1,
    //       itemPerPage: 100,
    //     }
    //     }
  },
  methods: {
    openConfirmation() {
      this.$refs.confirmation.dialog = true;
    },
    deleteData() {
      this.loading = true;
      const selectedIds = this.selected.map((item) => item._id);
      console.log(selectedIds);
      axios
        .delete(`${process.env.VUE_APP_API_URL}delete-consumer-records`, {
          data: {
            id: selectedIds,
          },
        })
        .then((res) => {
          this.loading = false;

          this.$refs.confirmation.dialog = false;
          this.dataDeleted = true;
          this.getUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openUserDetails(item) {
      this.$refs.userDetails.dialog = true;
      this.userData = item;
    },
    uploadCSV() {
      this.$refs.uploadFile.dialog = true;
    },

    checkAny(type) {
      if (type == "firstName") {
        this.filtersData.firstNameValue = "";
      }
      if (type == "lastName") {
        this.filtersData.lastNameValue = "";
      }
      if (type == "email") {
        this.filtersData.emailValue = "";
      }
      if (type == "companyPhone") {
        this.filtersData.companyPhoneValue = "";
      }
      if (type == "mobilePhone") {
        this.filtersData.mobilePhoneValue = "";
      }
      if (type == "jobTitle") {
        this.filtersData.jobTitleValue = "";
      }

      if (type == "address") {
        this.filtersData.addressValue = "";
      }
      if (type == "address2") {
        this.filtersData.address2Value = "";
      }
      if (type == "city") {
        this.filtersData.cityValue = "";
      }
      if (type == "state") {
        this.filtersData.stateValue = "";
      }
      if (type == "age") {
        this.filtersData.dobEndValue = "";
        this.filtersData.dobStartValue = "";
      }
    },

    getUsers() {
      console.log(process.env);
      this.isLoading = true;
      // let pagination = `?itemsPerPage=${this.pagination.itemPerPage}&page=${this.pagination.page}`
      let filters = {
        lastName: this.filtersData?.lastName || null,
        firstName: this.filtersData?.firstName || null,
        dob: this.filtersData?.dob || null,
        city: this.filtersData?.city || null,
       
        address: this.filtersData?.address || null,
        address2: this.filtersData?.address2 || null,
        email: this.filtersData?.email || null,
        companyPhone: this.filtersData?.companyPhone || null,
        mobilePhone: this.filtersData?.mobilePhone || null,
        mobilePhoneValue: this.filtersData?.mobilePhoneValue || null,
        dobStartValue: this.filtersData?.dobStartValue || null,
        dobEndValue: this.filtersData?.dobEndValue || null,

        companyName: this.filtersData?.companyName || null,
        jobTitle: this.filtersData?.jobTitle || null,
        jobTitleValue: this.filtersData?.jobTitles || null,
         state: this.filtersData?.state || null,
        stateValue: this.filtersData?.states || null,
        dob: this.filtersData?.dob || null,
        firstNameValue: this.filtersData?.firstNameValue || null,
        lastNameValue: this.filtersData?.lastNameValue || null,
        ageValue: this.filtersData?.ageValue || null,
        cityValue: this.filtersData?.cities || null,
        dobValue: this.filtersData?.dobvalue || null,
        addressValue: this.filtersData?.addressValue || null,
        address2Value: this.filtersData?.address2Value || null,
        emailValue: this.filtersData?.emailValue || null,
        companyPhoneValue: this.filtersData?.companyPhoneValue || null,
        companyNameValue: this.filtersData?.companies || null,

       
        zipCodeValue: this.filtersData?.zipCodes || null,
        zipCode: this.filtersData?.zipCode || null,
        optionSource: this.filtersData?.optionSource || null,
        optionSourceValue: this.filtersData?.optionSources || null,
        ownRent: this.filtersData?.ownRent || null,
        gender: this.filtersData?.gender || null,
      };

      let url = `${
        process.env.VUE_APP_API_URL
      }api/get-consumer-data?itemsPerPage=${this.pagination.itemPerPage}&page=${
        this.pagination.page
      }&dobStartValue=${filters?.dobStartValue}&dobEndValue=${
        filters?.dobEndValue
      }&dob=${filters?.dob}&firstName=${filters?.firstName}&firstNameValue=${
        filters?.firstNameValue
      }&lastName=${filters?.lastName}&lastNameValue=${
        filters?.lastNameValue
      }&email=${filters?.email}&emailValue=${
        filters?.emailValue
      }&companyPhone=${filters?.companyPhone}&companyPhoneValue=${
        filters?.companyPhoneValue
      }&mobilePhone=${filters?.mobilePhone}&mobilePhoneValue=${
        filters?.mobilePhoneValue
      }&city=${filters?.city}&cityValue=${JSON.stringify(
        filters?.cityValue
      )}&state=${filters?.state}&stateValue=${JSON.stringify(filters?.stateValue)}&jobTitle=${
        filters?.jobTitle
      }&jobTitleValue=${JSON.stringify(filters?.jobTitleValue)}&address=${
        filters?.address
      }&addressValue=${filters?.addressValue}&companyName=${
        filters?.companyName
      }&companyNameValue=${JSON.stringify(
        filters?.companyNameValue
      )}&optionSource=${
        filters?.optionSource
      }&optionSourceValue=${JSON.stringify(
        filters?.optionSourceValue
      )}&ownRent=${filters?.ownRent}&gender=${
        filters?.gender
      }&zipCodeValue=${JSON.stringify(filters?.zipCodeValue)}&zipCode=${
        filters?.zipCode
      }`;
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.usersData = response.data.data;
          this.count = response.data.count;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },
    exportCSV() {
      this.exportLoader = true;
      // let pagination = `?itemsPerPage=${this.pagination.itemPerPage}&page=${this.pagination.page}`
      let filters = {
        lastName: this.filtersData?.lastName || null,
        firstName: this.filtersData?.firstName || null,
        dob: this.filtersData?.dob || null,
        city: this.filtersData?.city || null,
      
        address: this.filtersData?.address || null,
        address2: this.filtersData?.address2 || null,
        email: this.filtersData?.email || null,
        companyPhone: this.filtersData?.companyPhone || null,
        mobilePhone: this.filtersData?.mobilePhone || null,
        mobilePhoneValue: this.filtersData?.mobilePhoneValue || null,
        dobStartValue: this.filtersData?.dobStartValue || null,
        dobEndValue: this.filtersData?.dobEndValue || null,

        companyName: this.filtersData?.companyName || null,
        jobTitle: this.filtersData?.jobTitle || null,
        jobTitleValue: this.filtersData?.jobTitles || null,
        dob: this.filtersData?.dob || null,
        firstNameValue: this.filtersData?.firstNameValue || null,
        lastNameValue: this.filtersData?.lastNameValue || null,
        ageValue: this.filtersData?.ageValue || null,
        cityValue: this.filtersData?.cities || null,
        dobValue: this.filtersData?.dobvalue || null,
        addressValue: this.filtersData?.addressValue || null,
        address2Value: this.filtersData?.address2Value || null,
        emailValue: this.filtersData?.emailValue || null,
        companyPhoneValue: this.filtersData?.companyPhoneValue || null,
        companyNameValue: this.filtersData?.companies || null,

         state: this.filtersData?.state || null,
        stateValue: this.filtersData?.states || null,
        zipCodeValue: this.filtersData?.zipCodes || null,
        zipCode: this.filtersData?.zipCode || null,
        optionSource: this.filtersData?.optionSource || null,
        optionSourceValue: this.filtersData?.optionSources || null,
        ownRent: this.filtersData?.ownRent || null,
        gender: this.filtersData?.gender || null,
      };
      let url = `${
        process.env.VUE_APP_API_URL
      }api/get-consumer-data?export=${true}&dobStartValue=${
        filters?.dobStartValue
      }&dobEndValue=${filters?.dobEndValue}&dob=${filters?.dob}&firstName=${
        filters?.firstName
      }&firstNameValue=${filters?.firstNameValue}&lastName=${
        filters?.lastName
      }&lastNameValue=${filters?.lastNameValue}&email=${
        filters?.email
      }&emailValue=${filters?.emailValue}&companyPhone=${
        filters?.companyPhone
      }&companyPhoneValue=${filters?.companyPhoneValue}&mobilePhone=${
        filters?.mobilePhone
      }&mobilePhoneValue=${filters?.mobilePhoneValue}&city=${
        filters?.city
      }&cityValue=${JSON.stringify(filters?.cityValue)}&state=${filters?.state}&stateValue=${JSON.stringify(filters?.stateValue)}&jobTitle=${
        filters?.jobTitle
      }&jobTitleValue=${JSON.stringify(filters?.jobTitleValue)}&address=${
        filters?.address
      }&addressValue=${filters?.addressValue}&companyName=${
        filters?.companyName
      }&companyNameValue=${JSON.stringify(
        filters?.companyNameValue
      )}&optionSource=${
        filters?.optionSource
      }&optionSourceValue=${JSON.stringify(
        filters?.optionSourceValue
      )}&ownRent=${filters?.ownRent}&gender=${
        filters?.gender
      }&zipCodeValue=${JSON.stringify(filters?.zipCodeValue)}&zipCode=${
        filters?.zipCode
      }`;
      const key = "lxxzhhJB1iCpKE5Uvzw5D";
       axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log(response);

          this.exportLoader = false;

          window.open(url, "_blank");
        })
        .catch((error) => {
          this.exportLoader = false;
        });
      // axios
      //   .get(url, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response);

         
         
      //     let myInterval = setInterval(function () {
      //       axios
      //         .get(
      //           `https://apps.emaillistverify.com/api/getApiFileInfo?secret=${key}&id=${response.data}`
      //         )
      //         .then((res) => {
      //           const inputString = res.data;
      //           const splitString = inputString.split("|");

      //           // Access the desired URL, which is the 8th element in the splitString array
      //           const url = splitString[7];

      //           const finished = splitString[5];

      //          this.totalEmails = splitString[3];
      //           this.verifiedEmails = splitString[4];
              
      //           if (finished == "finished") {
      //             this.exportLoader = false;
      //             window.open(url, "_blank");
      //             clearInterval(myInterval);
      //           }

      //           console.log(res.data);
      //         });
      //       // window.open(url, "_blank");
      //     }, 5000);
      //   })
      //   .catch((error) => {
      //     this.exportLoader = false;
      //   });
    },

    verifyEmail() {
      this.verifyLoader = true;
      // let pagination = `?itemsPerPage=${this.pagination.itemPerPage}&page=${this.pagination.page}`
      let filters = {
        lastName: this.filtersData?.lastName || null,
        firstName: this.filtersData?.firstName || null,
        dob: this.filtersData?.dob || null,
        city: this.filtersData?.city || null,
      
        address: this.filtersData?.address || null,
        address2: this.filtersData?.address2 || null,
        email: this.filtersData?.email || null,
        companyPhone: this.filtersData?.companyPhone || null,
        mobilePhone: this.filtersData?.mobilePhone || null,
        mobilePhoneValue: this.filtersData?.mobilePhoneValue || null,
        dobStartValue: this.filtersData?.dobStartValue || null,
        dobEndValue: this.filtersData?.dobEndValue || null,

        companyName: this.filtersData?.companyName || null,
        jobTitle: this.filtersData?.jobTitle || null,
        jobTitleValue: this.filtersData?.jobTitles || null,
        dob: this.filtersData?.dob || null,
        firstNameValue: this.filtersData?.firstNameValue || null,
        lastNameValue: this.filtersData?.lastNameValue || null,
        ageValue: this.filtersData?.ageValue || null,
        cityValue: this.filtersData?.cities || null,
        dobValue: this.filtersData?.dobvalue || null,
        addressValue: this.filtersData?.addressValue || null,
        address2Value: this.filtersData?.address2Value || null,
        emailValue: this.filtersData?.emailValue || null,
        companyPhoneValue: this.filtersData?.companyPhoneValue || null,
        companyNameValue: this.filtersData?.companies || null,

         state: this.filtersData?.state || null,
        stateValue: this.filtersData?.states || null,
        zipCodeValue: this.filtersData?.zipCodes || null,
        zipCode: this.filtersData?.zipCode || null,
        optionSource: this.filtersData?.optionSource || null,
        optionSourceValue: this.filtersData?.optionSources || null,
        ownRent: this.filtersData?.ownRent || null,
        gender: this.filtersData?.gender || null,
      };
      let url = `${
        process.env.VUE_APP_API_URL
      }api/get-consumer-data?export=${true}&verifyEmailList=${true}&dobStartValue=${
        filters?.dobStartValue
      }&dobEndValue=${filters?.dobEndValue}&dob=${filters?.dob}&firstName=${
        filters?.firstName
      }&firstNameValue=${filters?.firstNameValue}&lastName=${
        filters?.lastName
      }&lastNameValue=${filters?.lastNameValue}&email=${
        filters?.email
      }&emailValue=${filters?.emailValue}&companyPhone=${
        filters?.companyPhone
      }&companyPhoneValue=${filters?.companyPhoneValue}&mobilePhone=${
        filters?.mobilePhone
      }&mobilePhoneValue=${filters?.mobilePhoneValue}&city=${
        filters?.city
      }&cityValue=${JSON.stringify(filters?.cityValue)}&state=${filters?.state}&stateValue=${JSON.stringify(filters?.stateValue)}&jobTitle=${
        filters?.jobTitle
      }&jobTitleValue=${JSON.stringify(filters?.jobTitleValue)}&address=${
        filters?.address
      }&addressValue=${filters?.addressValue}&companyName=${
        filters?.companyName
      }&companyNameValue=${JSON.stringify(
        filters?.companyNameValue
      )}&optionSource=${
        filters?.optionSource
      }&optionSourceValue=${JSON.stringify(
        filters?.optionSourceValue
      )}&ownRent=${filters?.ownRent}&gender=${
        filters?.gender
      }&zipCodeValue=${JSON.stringify(filters?.zipCodeValue)}&zipCode=${
        filters?.zipCode
      }`;
      const key = "lxxzhhJB1iCpKE5Uvzw5D";
      
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
       console.log(response)
          let myInterval = setInterval(function () {
            axios
              .get(
                `https://apps.emaillistverify.com/api/getApiFileInfo?secret=${key}&id=${response.data}`
              )
              .then((res) => {
                const inputString = res.data;
                const splitString = inputString.split("|");

                // Access the desired URL, which is the 8th element in the splitString array
                const url = splitString[7];

                const finished = splitString[5];

               this.totalEmails = splitString[3];
                this.verifiedEmails = splitString[4];
              
                if (finished == "finished") {
                  this.verifyLoader = false;
                  window.open(url, "_blank");
                  clearInterval(myInterval);
                }

                console.log(res.data);
              });
            // window.open(url, "_blank");
          }, 5000);
        })
        .catch((error) => {
          this.exportLoader = false;
        });
    },
    applyFilters(filters) {
      this.filtersData = filters;
      this.getUsers();
    },
    clearForm() {
      this.$refs.filters.clearForm();
    },
    checkDuplicates() {
      this.$refs.duplicates.dialog = true;
    },
   
  },
  watch: {
    "pagination.page"() {
      this.getUsers();
    },
    "pagination.itemPerPage"() {
      this.pagination.page = 1;
      this.getUsers();
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.getUsers();
    
    console.log(process.env.VUE_APP_API_URL);

    let wrapper_1 = document.querySelector(
      ".table-reference .v-data-table__wrapper"
    );
    let wrapper_2 = document.querySelector("#wrapper2");
    wrapper_1.onscroll = function () {
      wrapper_2.scrollLeft = wrapper_1.scrollLeft;
    };

    wrapper_2.onscroll = function () {
      wrapper_1.scrollLeft = wrapper_2.scrollLeft;
    };
  },
};
</script>

<style scoped>
#wrapper2 {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
.width-scroll {
  width: 3700px;
}
/* This div allow to make the scroll function and show the scrollbar */
#div2 {
  height: 1px;
  overflow: scroll;
}
.v-data-table__wrapper {
  overflow-x: visible !important;
}

.v-data-footer__wrapper {
  position: sticky;
  bottom: 0;
  z-index: 1;
}

.v-data-footer__wrapper .v-data-table__wrapper {
  margin-bottom: -18px; /* adjust for scrollbar height */
}
::v-deep .v-data-table-header {
  background: #f9f9f9 !important;
}

::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 36px;
  margin-top: 7px;
}
</style>
