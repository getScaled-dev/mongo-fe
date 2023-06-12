<template>
  <v-dialog
      v-model="listSearchesDialog"
      width="500"
    >
     

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Select Your Saved Search
        </v-card-title>

        <v-card-text>
           
          <v-select
          class="mt-4"
                :items="savedSearch"
                dense
                outlined
                v-model="selectedSearch"
                :menu-props="{ bottom: true }"
                item-text="searchName"
               
                return-object
              
              ></v-select>
        </v-card-text>

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
            selectedSearch: {}
        }
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