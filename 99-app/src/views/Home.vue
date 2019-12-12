<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm3 md4>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-text-field
          class="pa-2"
          v-model="search"
          hide-details
          prepend-inner-icon="mdi-magnify"
          solo
          rounded
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm3 md4>
      </v-flex>
      <v-flex xs12 class="text-center pb-2">
        <div v-if="loading">
          Memuat...
        </div>
        <div v-else>
          <div v-if="error">
            Tidak ada data yang dapat ditampilkan.
          </div>
          <div v-else>
            Menampilkan {{ filteredList.length }} data
            <span v-if="search !== ''">dengan kata kunci "{{ search }}"</span>
          </div>
        </div>
      </v-flex>
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
        <template  v-if="error">
          <v-flex xs12 class="text-center" style="margin-top: 150px;">
            <v-icon size="100">mdi-alert</v-icon>
            <h1 class="display-1">Astaghfirullah !</h1>
            <p>Tidak dapat menerima data dari penyedia. Periksa koneksi internet anda, kemudian coba lagi. </p>
            <v-btn depressed @click="reload">
              <v-icon>mdi-refresh</v-icon>
              <span class="pl-2">Muat Ulang</span>
            </v-btn>
          </v-flex>
        </template>
        <template  v-else>
          <template v-if="filteredList.length > 0">
            <v-flex v-for="item in filteredList" :key="item.id" xs12 sm6 md4 class="pa-2">
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
          <template v-else>
            <v-flex xs12 class="text-center" style="margin-top: 150px;">
              <h1 class="display-1">Tidak ditemukan !</h1>
              <p>Tidak ada Asma Ul Husna yang cocok dengan kata kunci "{{ search }}". </p>
            </v-flex>
          </template>
        </template>
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
    list: [],
    search: ''
  }),
  computed: {
    filteredList () {
      return this.list.filter(v => v.latin.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
    }
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        const res = await AsmaUlHusna.list()
        this.list = res.data
        this.error = false
        window.localStorage.setItem('99list_key', Date.now())
        window.localStorage.setItem('99list_val', JSON.stringify(res.data))
      } catch (error) {
        const key = window.localStorage.getItem('99list_key') || 0
        if (Date.now() - key < 60000) {
          this.list = JSON.parse(window.localStorage.getItem('99list_val'))
        } else {
          this.error = true
        }
      }
      this.loading = false
    },
    getColor (id) {
      return this.bgcolors[id % this.bgcolors.length].replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "-" + m[1];
      }).toLowerCase() + ' darken-3'
    },
    reload () {
      this.loadData()
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
