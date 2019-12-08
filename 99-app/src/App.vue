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
      <v-btn icon v-else @click="goBack">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-1">99 Asmaul Husna</v-toolbar-title>
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
    //
  }),
  methods: {
    goBack() {
      // window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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