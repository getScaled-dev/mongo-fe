<template>
  <div class="mx-10">
    <div class="d-flex justify-space-between mt-8 mb-4">
      <img
        src="../assets/logo_scaled_falcqb.png"
        alt=""
        style="max-width: 225px; height: fit-content"
      />

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#070253" v-bind="attrs" v-on="on" class="mr-3">
              <span style="color: white"> {{ currentRoute }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/consumer-data"> Consumer Data </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/">LinkedIn Data</router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <router-link to="/linkedin2">LinkedIn Data 2</router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#070253" v-bind="attrs" v-on="on">
              <span style="color: white">{{ currentUser }}</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="viewMautic">
              <v-list-item-title>View Mautic</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import UsersTable from "./UsersTable.vue";

export default {
  name: "Home",

  components: {
    UsersTable,
  },
  computed: {
    currentRoute() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
  data() {
    return {
      currentUser: "Cameron",
    };
  },
  methods: {
    viewMautic() {
      this.$router.push("/mautic");
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");

      this.$router.push("/login");
    },
  },
};
</script>
