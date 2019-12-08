<template>
  <v-container>
    <v-layout wrap>
      <template  v-if="loading">
        <v-flex v-for="i in 4" :key="i" xs12 sm6 md4 class="pa-2">
          <v-skeleton-loader
            :loading="loading"
            type="list-item-avatar-two-line"
          >
          </v-skeleton-loader>
        </v-flex>
      </template>
      <template  v-else>
        <v-flex v-for="item in list" :key="item.id" xs12 sm6 md4 class="pa-2">
          <router-link class="clean" :to="'/detail/' + item.id">
            <v-card ripple>
              <v-list-item>
                <v-list-item-avatar :color="'white--text ' + getColor(item.id)">{{ item.id }}</v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">{{ item.arab }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.latin }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </router-link>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
import { AsmaUlHusna } from "@/services/AsmaUlHusna"

export default {
  name: 'home',
  data: () => ({
    bgcolors: [],
    loading: true,
    error: false,
    list: []
  }),
  methods: {
    async loadData () {
      this.loading = true
      try {
        const res = await AsmaUlHusna.list()
        this.list = res.data
      } catch (error) {
        this.error = true
      }
      this.loading = false
    },
    getColor (id) {
      return this.bgcolors[id % this.bgcolors.length].replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "-" + m[1];
      }).toLowerCase() + ' darken-3'
    }
  },
  mounted () {
    for (const color in colors) {
      this.bgcolors.push(color)
    }
    this.bgcolors.pop()
    setTimeout(() => {
      this.loadData()
    }, 1000)
  }
}
</script>
