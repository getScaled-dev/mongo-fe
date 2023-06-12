<template>
  <v-card>
    <v-card-text class="filters">
      <v-btn color="primary" text @click="getFilters">
        Select Saved Filters
      </v-btn>
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
                :items="jobTitleFilters"
                outlined
                dense
                v-model="filters.companyName"
                :menu-props="{ bottom: true }"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.companyName, 'companyName')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-combobox
              v-if="
                filters.companyName == 'like' ||
                filters.companyName == 'not' ||
                filters.companyName == 'in'
              "
              class="mt-7"
              v-model="filters.companies"
              :filter="filter"
              :hide-no-data="!searchCompany"
              :items="items"
              :search-input.sync="searchCompany"
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
                  <v-chip
                    :color="`${colors[nonceCompany - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ searchCompany }}
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
                    {{ item.companyNameValue }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editingCompany === item"
                  v-model="editingCompany.companyNameValue"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="editCompanyName(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.companyNameValue }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    @click.stop.prevent="editCompanyName(index, item)"
                  >
                    <v-icon>{{
                      editingCompany !== item ? "mdi-pencil" : "mdi-check"
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <!-- Company Name  -->
        <v-row class="mt-4"> </v-row>
        <!-- Job Title  -->
        <v-row class="mt-4"> </v-row>

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
                :items="jobTitleFilters"
                :menu-props="{ bottom: true }"
                outlined
                dense
                v-model="filters.city"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.city, 'city')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-combobox
              v-if="
                filters.city == 'like' ||
                filters.city == 'not' ||
                filters.city == 'in'
              "
              class="mt-7"
              v-model="filters.cities"
              :filter="filter"
              :hide-no-data="!searchCity"
              :items="items"
              :search-input.sync="searchCity"
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
                  <v-chip
                    :color="`${colors[nonceCity - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ searchCity }}
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
                    {{ item.cityValue }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editingCity === item"
                  v-model="editingCity.cityValue"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="editCity(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.cityValue }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn icon @click.stop.prevent="editCity(index, item)">
                    <v-icon>{{
                      editingCity !== item ? "mdi-pencil" : "mdi-check"
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
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
              v-if="
                filters.jobTitle == 'like' ||
                filters.jobTitle == 'not' ||
                filters.jobTitle == 'in'
              "
              class="mt-7"
              v-model="filters.jobTitles"
              :filter="filter"
              :hide-no-data="!searchJobTitle"
              :items="items"
              :search-input.sync="searchJobTitle"
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
                  <v-chip
                    :color="`${colors[nonceJobTitle - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ searchJobTitle }}
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
                  v-if="edtingJobTitle === item"
                  v-model="edtingJobTitle.jobTitleValue"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="editJobTitle(index, item)"
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
                  <v-btn icon @click.stop.prevent="editJobTitle(index, item)">
                    <v-icon>{{
                      edtingJobTitle !== item ? "mdi-pencil" : "mdi-check"
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
        <!-- ZIPCODES  -->
        <v-row class="mt-4"> </v-row>
        <v-row class="mt-4">
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">zipCode</label>
              <v-select
                :menu-props="{ bottom: true }"
                :items="jobTitleFilters"
                outlined
                dense
                v-model="filters.zipCode"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.zipCode, 'zipCode')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-combobox
              v-if="
                filters.zipCode == 'like' ||
                filters.zipCode == 'not' ||
                filters.zipCode == 'in'
              "
              class="mt-7"
              v-model="filters.zipCodes"
              :filter="filter"
              :hide-no-data="!searchZipCode"
              :items="items"
              :search-input.sync="searchZipCode"
              hide-selected
              label="Search zipcodes"
              multiple
              small-chips
              solo
              dense
            >
              <template v-slot:no-data>
                <v-list-item>
                  <span class="subheading">Create</span>
                  <v-chip
                    :color="`${colors[nonceZipCode - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ searchZipCode }}
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
                    {{ item.zipCodeValue }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editingZipCode === item"
                  v-model="editingZipCode.zipCodeValue"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="editOptionSource(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.zipCodeValue }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn icon @click.stop.prevent="editZipCode(index, item)">
                    <v-icon>{{
                      editingZipCode !== item ? "mdi-pencil" : "mdi-check"
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row class="mt-4" v-if="dataType == 'consumerData'">
          <!-- gender  -->
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Gender</label>
              <v-select
                :menu-props="{ bottom: true }"
                :items="genderFilters"
                outlined
                dense
                v-model="filters.gender"
                item-text="name"
                item-value="key"
                placeholder="Select gender"
                @change="checkIsAny(filters.gender, 'gender')"
              ></v-select>
            </div>
          </v-col>
          <!-- gender  -->
          <v-col md="3"> </v-col>
          <!-- own rent  -->
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Own Rent</label>
              <v-select
                :menu-props="{ bottom: true }"
                :items="ownRentFilter"
                outlined
                dense
                v-model="filters.ownRent"
                item-text="name"
                item-value="key"
                placeholder="Select type"
                @change="checkIsAny(filters.ownRent, 'ownRent')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3"> </v-col>

          <!-- option source  -->
          <v-col md="3">
            <div class="d-flex flex-column">
              <label for="firstName">Opt in Source</label>
              <v-select
                :menu-props="{ bottom: true }"
                :items="jobTitleFilters"
                outlined
                dense
                v-model="filters.optionSource"
                item-text="name"
                item-value="key"
                @change="checkIsAny(filters.optionSource, 'optionSource')"
              ></v-select>
            </div>
          </v-col>

          <v-col md="3">
            <v-combobox
              v-if="
                filters.optionSource == 'like' ||
                filters.optionSource == 'not' ||
                filters.optionSource == 'in'
              "
              class="mt-7"
              v-model="filters.optionSources"
              :filter="filter"
              :hide-no-data="!searchOptionSource"
              :items="items"
              :search-input.sync="searchOptionSource"
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
                  <v-chip
                    :color="`${colors[nonceOptionSource - 1]} lighten-3`"
                    label
                    small
                  >
                    {{ searchOptionSource }}
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
                    {{ item.optionSourceValue }}
                  </span>
                  <v-icon small @click="parent.selectItem(item)">
                    $delete
                  </v-icon>
                </v-chip>
              </template>
              <template v-slot:item="{ index, item }">
                <v-text-field
                  v-if="editingOptionSource === item"
                  v-model="editingOptionSource.optionSourceValue"
                  autofocus
                  flat
                  background-color="transparent"
                  hide-details
                  solo
                  @keyup.enter="editOptionSource(index, item)"
                ></v-text-field>
                <v-chip
                  v-else
                  :color="`${item.color} lighten-3`"
                  dark
                  label
                  small
                >
                  {{ item.optionSourceValue }}
                </v-chip>
                <v-spacer></v-spacer>
                <v-list-item-action @click.stop>
                  <v-btn
                    icon
                    @click.stop.prevent="editOptionSource(index, item)"
                  >
                    <v-icon>{{
                      editingOptionSource !== item ? "mdi-pencil" : "mdi-check"
                    }}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-combobox>
          </v-col>
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
      <v-dialog v-model="searchDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            class="mx-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Save Search
          </v-btn>
        </template>

        <v-card>
          <v-snackbar v-model="snackbar" timeout="3000" top>
            {{ text }}
          </v-snackbar>
          <v-card-title class="text-h5 grey lighten-2">
            Give a name to that search
          </v-card-title>

          <v-card-text>
            <v-text-field
              class="mt-5"
              outlined
              type="text"
              v-model="searchName"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="saveSearch"> save </v-btn>
            <v-btn color="primary" text @click="searchDialog = false">
              cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
    <SavedSearches ref="listSearch" :savedSearch='savedSearch' @applySavedFilter='applySavedFilter'/>
  </v-card>
</template>

<script>
import axios from "axios";
import SavedSearches from '../components/SavedSearches.vue';
export default {
  props: {
    dataType: {
      type: String,
      default: "",
    },
  },
  components: {SavedSearches},
  data() {
    return {
      snackbar: false,
      text: "",
      searchDialog: false,
      searchName: "",
      activator: null,
      attach: null,
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
      edtingJobTitle: null,
      editingCity: null,
      editingCompany: null,
      editingOptionSource: null,
      editingZipCode: null,
      editingIndexJobTitle: -1,
      editingIndexCity: -1,
      editingIndexCompany: -1,

      nonceJobTitle: 1,
      nonceCity: 1,
      nonceCompany: 1,
      nonceOptionSource: 1,
      nonceZipCode: 1,

      searchJobTitle: null,
      searchCity: null,
      searchCompany: null,
      searchOptionSource: null,
      searchZipCode: null,

      cityItems: [],
      jobTitleItems: [],
      companyItems: [],

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
        cities: [],
        dob: "all",
        firstNameValue: "",
        lastNameValue: "",
        agrStartValue: 0,
        ageEndValue: 0,
        optionSource: "all",
        optionSourceValue: "",
        zipCodeValue: "",
        zipCode: "all",

        addressValue: "",
        address2Value: "",
        emailValue: "",
        mobilePhoneValue: "",
        companyPhoneValue: "",
        companies: [],
        optionSources: [],

        gender: "all",
        ownRent: "",
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
        { name: "is", key: "in" },
        { name: "is not", key: "not" },
        { name: "is blank", key: "isBlank" },
        { name: "is not blank", key: "notBlank" },
      ],
      ageFilters: [
        { name: "is any", key: "all" },
        { name: "greater than and equal", key: "gte" },
        { name: "less than and equal", key: "lte" },
        { name: "between", key: "between" },
      ],
      genderFilters: [
        { name: "is any", key: null },
        { name: "Male", key: "M" },
        { name: "Female", key: "F" },
      ],
      ownRentFilter: [
        { name: "Own", key: "own" },
        { name: "Rent", key: "rent" },
        { name: "Both", key: null },
      ],
      savedSearch: [],
    };
  },
  watch: {
    "filters.jobTitles"(val, prev) {
      console.log(val, prev);
      if (val.length === prev.length) return;

      this.filters.jobTitles = val.map((v) => {
        if (typeof v === "string") {
          v = {
            jobTitleValue: v,
          };

          this.jobTitleItems.push(v);

          this.nonceJobTitle++;
        }

        return v;
      });
    },
    //watch for city filter
    "filters.cities"(val, prev) {
      console.log(val, prev);
      if (val.length === prev.length) return;

      this.filters.cities = val.map((v) => {
        if (typeof v === "string") {
          v = {
            cityValue: v,
          };

          this.cityItems.push(v);

          this.nonceCity++;
        }

        return v;
      });
    },

    // watch for company Name

    "filters.companies"(val, prev) {
      console.log(val, prev);
      if (val.length === prev.length) return;

      this.filters.companies = val.map((v) => {
        if (typeof v === "string") {
          v = {
            companyNameValue: v,
          };

          this.companyItems.push(v);

          this.nonceCompany++;
        }

        return v;
      });
    },

    "filters.optionSources"(val, prev) {
      console.log(val, prev);
      if (val.length === prev.length) return;

      this.filters.optionSources = val.map((v) => {
        if (typeof v === "string") {
          v = {
            optionSourceValue: v,
          };

          this.companyItems.push(v);

          this.nonceOptionSource++;
        }

        return v;
      });
    },
    "filters.zipCodes"(val, prev) {
      console.log(val, prev);
      if (val.length === prev.length) return;

      this.filters.zipCodes = val.map((v) => {
        if (typeof v === "string") {
          v = {
            zipCodeValue: v,
          };

          this.companyItems.push(v);

          this.nonceZipCode++;
        }

        return v;
      });
    },
  },

  methods: {
    saveSearch() {
      let payload = {
        searchName: this.searchName,
        firstName: this.filters.firstName,
        firstNameValue: this.filters.firstNameValue,
        lastName: this.filters.lastName,
        lastNameValue: this.filters.lastNameValue,
        email: this.filters.email,
        emailValue: this.filters.emailValue,
        companyName: this.filters.companyName,
        companyNameValue: this.filters.companies,
        mobilePhone: this.filters.mobilePhone,
        mobilePhoneValue: this.filters.mobilePhoneValue,
        companyPhone: this.filters.companyPhone,
        companyPhoneValue: this.filters.companyPhoneValue,
        address1: this.filters.address,
        address1Value: this.filters.addressValue,
        address2: this.filters.address2,
        address2Value: this.filters.address2Value,
        city: this.filters.city,
        cityValue: this.filters.cities,
        jobTitle: this.filters.jobTitle,
        jobTitleValue: this.filters.jobTitles,
        state: this.filters.state,
        stateValue: this.filters.stateValue,
        zipCode: this.filters.zipCode,
        zipCodeValue: this.filters.zipCodes,
        gender: this.filters.gender,
        ownRent: this.filters.ownRent,
        optionSource: this.filters.optionSource,
        optionSourceValue: this.filters.optionSources,
      };
     

      this.loading = true;

      axios
        .post(`${process.env.VUE_APP_API_URL}api/save-search`, payload)
        .then((res) => {
          this.loading = false;
          if (res.data.msg == "error") {
            this.text = res.data.error;
            this.snackbar = true;
          } else {
            (this.searchName = ""), (this.searchDialog = false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getFilters() {
      axios
        .get(`${process.env.VUE_APP_API_URL}api/get-search`)
        .then((res) => {
         console.log(res, 'this is saved search')
         this.savedSearch = res.data.data
        this.$refs.listSearch.listSearchesDialog = true
        })
        .catch((err) => {
          console.log(err);
        });
    },
    applySavedFilter(search){
console.log(search.zipCodeValue, 'here is the search')
this.filters.firstName = search.firstName
this.filters.firstNameValue = search.firstNameValue
this.filters.lastName = search.lastName
this.filters.lastNameValue = search.lastNameValue
this.filters.email = search.email
this.filters.emailValue = search.emailValue
this.filters.companyPhone = search.companyPhone
this.filters.companyPhoneValue = search.companyPhoneValue
this.filters.companyName = search.companyName
this.filters.companies = search.companyNameValue
this.filters.mobilePhone = search.mobilePhone
this.filters.mobilePhoneValue = search.mobilePhoneValue
this.filters.address = search.address1
this.filters.addressValue = search.addressValue
this.filters.address2 = search.address2
this.filters.address2Value = search.address2Value
this.filters.city = search.city
this.filters.cities = search.cityValue
this.filters.state = search.state
this.filters.stateValue = search.stateValue
this.filters.zipCode = search.zipCode
this.filters.zipCodes = search.zipCodeValue
this.filters.gender = search.gender
this.filters.ownRent = search.ownRent
this.filters.optionSource = search.optionSource
this.filters.optionSources = search.optionSourceValue
    },

    // filter(item, queryText, itemText) {
    //   if (item.header) return false;

    //   const hasValue = (val) => (val != null ? val : "");

    //   const jobTitleValue = hasValue(itemText);
    //   const query = hasValue(queryText);

    //   return (
    //     jobTitleValue
    //       .toString()
    //       .toLowerCase()
    //       .indexOf(query.toString().toLowerCase()) > -1
    //   );
    // },
    applyFilters() {
      this.$emit("apply-filter", this.filters);
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
