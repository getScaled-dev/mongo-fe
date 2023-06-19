<template>
  <v-dialog
      v-model="listSearchesDialog"
      width="500"
    >
     

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Select Your Saved Search
        </v-card-title>
<v-text-field
              class="mt-5"
              outlined
              type="text"
             
              v-model="search"
              
            ></v-text-field>
        <!-- <v-card-text> -->
           
          <!-- <v-select
          class="mt-4"
                :items="savedSearch"
                dense
                outlined
                v-model="selectedSearch"
                :menu-props="{ bottom: true }"
                item-text="searchName"
               
                return-object
              
              ></v-select>
        </v-card-text> -->
         
      <v-list dense>
    
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in filteredItems"
          :key="i"
        >
          <v-list-item-icon>
           
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.searchName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="applySearch"
          >
           Apply
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="listSearchesDialog = false"
          >
           Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
savedSearch: {
    default: {}
}
    },
    data(){
        return{
            listSearchesDialog: false,
            selectedSearch: {},
            search: "",
           
        }
    },
    computed: {
    filteredItems() {
      // Apply the filter based on the search input
      return this.savedSearch.filter((item) =>
        item.searchName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
    methods: {
applySearch(){
    this.$emit('applySavedFilter', this.selectedSearch)
    this.listSearchesDialog = false
}
    }

}
</script>

<style>

</style>