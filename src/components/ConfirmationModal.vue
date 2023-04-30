<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Confirmation
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete the selected data?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteEvent" :loading="loading">
            Yes
          </v-btn>
          <v-btn text @click="dialog = false"> No </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteEvent() {
      this.$emit("delete-records");
    },
  },
};
</script>
</script>

<style>
</style>