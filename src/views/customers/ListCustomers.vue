<template>
<section>
    <div style="width: 100%" class="d-flex justify-end mr-4">
     <v-btn
        color="deep-purple lighten-2 float-right mb-4"
        
      >
        Add Customer
      </v-btn>   
    </div>
   <v-row class="mt-4">
<v-col cols="12" md="4">
    <v-card
    :loading="loading"
    class="ml-4"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Customer Name</v-card-title>

   

    <v-divider class="mx-4"></v-divider>

    <v-card-text>Tonight's availability</v-card-text>

   

    <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-card-actions>
  </v-card>
</v-col>
<v-col cols="12" md="4">
    <v-card
    :loading="loading"
    class="ml-4"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Customer Name</v-card-title>

   

    <v-divider class="mx-4"></v-divider>

    <v-card-text>Tonight's availability</v-card-text>

   

    <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-card-actions>
  </v-card>
</v-col>
<v-col cols="12" md="4">
    <v-card
    :loading="loading"
    class="ml-4"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Customer Name</v-card-title>

   

    <v-divider class="mx-4"></v-divider>

    <v-card-text>Tonight's availability</v-card-text>

   

    <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-card-actions>
  </v-card>
</v-col>
</v-row> 
</section>

  
</template>

<script>
export default {

}
</script>

<style>

</style>