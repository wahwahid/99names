<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span v-if="$route.name === 'home'" style="width: 36px">
        <v-icon>mdi-home</v-icon>
      </span>
      <v-btn icon v-else @click="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-1">99 Asma Ul Husna</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="about"
        width="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn depressed color="primary" v-on="on">
            About
          </v-btn>
        </template>

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            About
          </v-card-title>
          <v-card-text class="py-4">
            <div class="headline">
              99 Asma Ul Husna
            </div>
            <p class="mb-0">
              Presented by :
              <ul>
                  <li>wahwahid</li>
                  <li>andrisiswanto</li>
                  <li>kdzikry</li>
                  <li>lukmansurya</li>
                  <li>andrianto69</li>
              </ul>
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="about = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    about: false
  }),
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    goHome() {
      this.$router.push('/')
    }
  }
};
</script>

<style>
.clean {
  text-decoration: none;
}
</style>