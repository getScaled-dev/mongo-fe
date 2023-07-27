<template>
<div>



  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" top>
    {{ snackbar.message }}
  </v-snackbar>
  </div>
</template>

<script>
import { EventBus } from '../../main.js'; // Adjust the import path based on your project structure

export default {
  data() {
    return {
      snackbar: {
        show: false,
        message: '',
        color: '',
        timeout: 3000, // Snackbar timeout in milliseconds
      },
    };
  },
  mounted() {
    EventBus.$on('showSnackbar', this.showSnackbar);
  },
  beforeDestroy() {
    EventBus.$off('showSnackbar', this.showSnackbar);
  },
  methods: {
    showSnackbar(message, color) {
      this.snackbar.show = true;
      this.snackbar.message = message;
      this.snackbar.color = color;
    },
  },
};
</script>
