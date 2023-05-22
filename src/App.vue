<template>
  <v-app>
    <v-main>
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "./views/Dashboard.vue";
export default {
  name: "App",
  components: { Dashboard },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.theme--light.v-application {
  background: #f0f7fd !important;
}
</style>
