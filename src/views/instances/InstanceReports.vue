<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="reports.reports"
   
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Reports List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       
       
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
       <v-icon
        small
        class="mr-2"
       
      >
        mdi-eye
      </v-icon>
      
     
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    
  </v-data-table>
  </div>
</template>

<script>
export default {
     props: {
    reports: {
      type: Array,
      default: [],
    },
  },
  data(){
    return{
         headers: [
            {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Report Name',
         
          value: 'name',
        },
         { text: 'Scheduled', value: 'isScheduled' },
        { text: 'source', value: 'source' },
        
        { text: 'Actions', value: 'actions', sortable: false }
       
       
      ],
    }
  }

}
</script>

<style>

</style>