<template>
  <v-card>
    <v-card-text class="filters">
      <!-- First Name  -->
      <v-form ref="form">
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">First Name</label>
              <v-select
                :items="filterItems"
                dense
                outlined
                v-model="filters.firstName"
                :menu-props="{ bottom: true }"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.firstName, 'firstName')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              v-if="
                filters.firstName == 'like' ||
                filters.firstName == 'notLike' ||
                filters.firstName == 'eq' ||
                filters.firstName == 'ne' ||
                filters.firstName == 'startsWith' ||
                filters.firstName == 'endsWith'
              "
              class="mt-5"
              outlined
              type="text"
              v-model="filters.firstNameValue"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Last Name</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                :menu-props="{ bottom: true }"
                v-model="filters.lastName"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.lastName, 'lastName')"
              ></v-select>
            </div>
          </v-col>
          <v-col md="3">
            <v-text-field
              v-if="
                filters.lastName == 'like' ||
                filters.lastName == 'notLike' ||
                filters.lastName == 'eq' ||
                filters.lastName == 'ne' ||
                filters.lastName == 'startsWith' ||
                filters.lastName == 'endsWith'
              "
              class="mt-5"
              outlined
              type="text"
              v-model="filters.lastNameValue"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Email  -->
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Email</label>
              <v-select
                :items="filterItems"
                :menu-props="{ bottom: true }"
                outlined
                dense
                v-model="filters.email"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.email, 'email')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              v-if="
                filters.email == 'like' ||
                filters.email == 'notLike' ||
                filters.email == 'eq' ||
                filters.email == 'ne' ||
                filters.email == 'startsWith' ||
                filters.email == 'endsWith'
              "
              outlined
              type="text"
              v-model="filters.emailValue"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Company Phone</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                v-model="filters.companyPhone"
                :menu-props="{ bottom: true }"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.companyPhone, 'companyPhone')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              v-if="
                filters.companyPhone == 'like' ||
                filters.companyPhone == 'notLike' ||
                filters.companyPhone == 'eq' ||
                filters.companyPhone == 'ne' ||
                filters.companyPhone == 'startsWith' ||
                filters.companyPhone == 'endsWith'
              "
              type="text"
              v-model="filters.companyPhoneValue"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Company Phone  -->

        <!-- Mobile Phone  -->
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Mobile Phone</label>
              <v-select
                :items="filterItems"
                :menu-props="{ bottom: true }"
                outlined
                dense
                v-model="filters.mobilePhone"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.mobilePhone, 'mobilePhone')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-if="
                filters.mobilePhone == 'like' ||
                filters.mobilePhone == 'notLike' ||
                filters.mobilePhone == 'eq' ||
                filters.mobilePhone == 'ne' ||
                filters.mobilePhone == 'startsWith' ||
                filters.mobilePhone == 'endsWith'
              "
              v-model="filters.mobilePhoneValue"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Company Name</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                v-model="filters.companyName"
                :menu-props="{ bottom: true }"
                item-text="name"
                item-value="key"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-model="filters.companyNameValue"
              v-if="
                filters.companyName == 'like' ||
                filters.companyName == 'notLike' ||
                filters.companyName == 'eq' ||
                filters.companyName == 'ne' ||
                filters.companyName == 'startsWith' ||
                filters.companyName == 'endsWith'
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Company Name  -->
        <v-row class="mt-4"> </v-row>
        <!-- Job Title  -->
        <v-row class="mt-4"> </v-row>
        <!-- Date of birth  -->
        <!-- <v-row class="mt-4">
          <v-col md="6">
            <div class="d-flex flex-column">
              <label for="firstName">Date Of Birth</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                v-model="filters.dob"
                item-text="name"
                :menu-props="{ bottom: true }"
                item-value="key"
              ></v-select>
            </div>
          </v-col>

          <v-col md="6">
            <v-text-field
              class="mt-5"
              outlined
              type="date"
              v-if="
                filters.dob == 'like' ||
                filters.dob == 'notLike' ||
                filters.dob == 'eq' ||
                filters.dob == 'ne' ||
                filters.dob == 'startsWith' ||
                filters.dob == 'endsWith'
              "
              v-model="filters.dobValue"
            ></v-text-field>
          </v-col>
        </v-row> -->
        <!-- Age  -->
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Age</label>
              <v-select
                :items="ageFilters"
                :menu-props="{ bottom: true }"
                outlined
                dense
                v-model="filters.age"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.age, 'age')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3" class="d-flex">
            <v-text-field
              class="mt-5"
              outlined
              v-if="filters.age != 'all'"
              type="number"
              v-model="filters.ageStartValue"
            ></v-text-field>
            <span v-if="filters.age == 'between'" class="mt-9 mx-2">To</span>
            <v-text-field
              class="mt-5"
              outlined
              v-if="filters.age == 'between'"
              type="number"
              v-model="filters.ageEndValue"
            ></v-text-field>
          </v-col>

          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Address Line 1</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                :menu-props="{ bottom: true }"
                v-model="filters.address"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.address, 'address')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-if="
                filters.address == 'like' ||
                filters.address == 'notLike' ||
                filters.address == 'eq' ||
                filters.address == 'ne' ||
                filters.address == 'startsWith' ||
                filters.address == 'endsWith'
              "
              v-model="filters.addressValue"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Address 1  -->
        <v-row class="mt-4"> </v-row>
        <!-- Address 2  -->
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Address Line 2</label>
              <v-select
                :menu-props="{ bottom: true }"
                :items="filterItems"
                outlined
                dense
                v-model="filters.address2"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.address2, 'address2')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-if="
                filters.address2 == 'like' ||
                filters.address2 == 'notLike' ||
                filters.address2 == 'eq' ||
                filters.address2 == 'ne' ||
                filters.address2 == 'startsWith' ||
                filters.address2 == 'endsWith'
              "
              v-model="filters.address2Value"
            ></v-text-field>
          </v-col>
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">City</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                v-model="filters.city"
                :menu-props="{ bottom: true }"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.city, 'city')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-if="
                filters.city == 'like' ||
                filters.city == 'notLike' ||
                filters.city == 'eq' ||
                filters.city == 'ne' ||
                filters.city == 'startsWith' ||
                filters.city == 'endsWith'
              "
              v-model="filters.cityValue"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- Job title  -->
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Job Title</label>

              <v-select
                :items="jobTitleFilters"
                :menu-props="{ bottom: true }"
                outlined
                dense
                v-model="filters.jobTitle"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.jobTitle, 'jobTitle')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-combobox
              v-if="filters.jobTitle == 'like'"
              class="mt-7"
              v-model="filters.jobTitles"
              :filter="filter"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="Search for an option"
              multiple
              small-chips
              solo
              dense
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                    {{ search }}
                  </v-chip>
                </v-list-item>
              </template>
              <template v-slot:selection="{ attrs, item, parent, selected }">
                <v-chip
                  v-if="item === Object(item)"
                  v-bind="attrs"
                  :color="`${item.color} lighten-3`"
                  :input-value="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.jobTitleValue }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editing === item"
                  v-model="editing.jobTitleValue"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="edit(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.jobTitleValue }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn icon @click.stop.prevent="edit(index, item)">
                    <v-icon>{{
                      editing !== item ? "mdi-pencil" : "mdi-check"
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>

          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">State</label>
              <v-select
                :items="filterItems"
                outlined
                dense
                v-model="filters.state"
                :menu-props="{ bottom: true }"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.state, 'state')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-if="
                filters.state == 'like' ||
                filters.state == 'notLike' ||
                filters.state == 'eq' ||
                filters.state == 'ne' ||
                filters.state == 'startsWith' ||
                filters.state == 'endsWith'
              "
              v-model="filters.stateValue"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- state  -->
        <v-row class="mt-4"> </v-row>
        <v-row class="mt-4">
          <!-- <v-col md="12">
            <div class="d-flex flex-column">
              <label for="firstName">Zip Codes</label>
              <v-combobox
                v-model="filters.zipCodes"
                :items="items"
                type="number"
                deletable-chips
                multiple
                outlined
                dense
                chips
              >
              </v-combobox>
            </div>
          </v-col> -->

          <!-- <v-col md="6">
              <v-text-field
                class="mt-5"
                outlined
                type="text"
                v-model="searchFirstName"
              ></v-text-field>
            </v-col> -->
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#070253" style="color: white" @click="dialog = false">
        Cancel
      </v-btn>
      <v-btn color="#D75D3F" style="color: white" @click="applyFilters">
        Apply Filters
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      activator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      editing: null,
      editingIndex: -1,
      items: [
        { header: "Select an option or create one" },
        {
          jobTitleValue: "CEO",
        },
        {
          jobTitleValue: "President",
        },
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0,
      items: [],
      textBox: "",
      filters: {
        lastName: "all",
        firstName: "all",
        age: "all",
        city: "all",
        state: "all",
        address: "all",
        address2: "all",
        email: "all",
        companyPhone: "all",
        mobilePhone: "all",
        companyName: "all",
        jobTitle: "all",
        jobTitles: [],
        dob: "all",
        firstNameValue: "",
        lastNameValue: "",
        agrStartValue: 0,
        ageEndValue: 0,
        cityValue: "",

        addressValue: "",
        address2Value: "",
        emailValue: "",
        mobilePhoneValue: "",
        companyPhoneValue: "",
        companyNameValue: "",

        dobValue: "",
        stateValue: "",
        zipCodes: [],
      },

      dialog: false,

      filterItems: [
        { name: "is any", key: "all" },
        { name: "contains", key: "like" },
        { name: "does not contain", key: "notLike" },

        { name: "is", key: "eq" },
        { name: "is not", key: "ne" },
        { name: "starts with", key: "startsWith" },
        { name: "end with", key: "endsWith" },

        { name: "is blank", key: "isBlank" },

        { name: "is not blank", key: "notBlank" },
      ],
      jobTitleFilters: [
        { name: "is any", key: "all" },
        { name: "contains", key: "like" },
      ],
      ageFilters: [
        { name: "is any", key: "all" },
        { name: "greater than and equal", key: "gte" },
        { name: "less than and equal", key: "lte" },
        { name: "between", key: "between" },
      ],
    };
  },
  watch: {
    "filters.jobTitles"(val, prev) {
      if (val.length === prev.length) return;

      this.filters.jobTitles = val.map((v) => {
        if (typeof v === "string") {
          v = {
            jobTitleValue: v,
          };

          this.items.push(v);

          this.nonce++;
        }

        return v;
      });
    },
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const jobTitleValue = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        jobTitleValue
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    },
    applyFilters() {
      this.$emit("apply-filter", this.filters);
    },
    addJobTitle() {
      this.filters.jobTitles.push({
        jobTitleValue: "",
      });
    },
    removeJobTitle(index) {
      this.filters.jobTitle.splice(index, 1);
    },
    checkIsAny(val, type) {
      if (val == "all") {
        this.$emit("check-any", type);
      }
    },

    clearForm() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
::v-deep .v-text-field--outlined > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 40px;
  height: 40px !important;
}
::v-deep .v-text-field__details {
  display: none !important;
}
.filters {
  max-height: 85vh !important;
  overflow: auto;
}
</style>