<template>
  <v-container>
    <v-layout wrap>
      <template  v-if="loading">
        <v-flex xs12 sm2 md3>
        </v-flex>
        <v-flex xs12 sm8 md6>
          <v-card>
            <v-card-text style="margin-left: 25%;">
              <v-skeleton-loader :loading="loading" type="heading"></v-skeleton-loader>
            </v-card-text>
            <v-card-text style="margin-left: 25%;">
              <v-skeleton-loader :loading="loading" type="heading"></v-skeleton-loader>
            </v-card-text>
            <v-card-text style="margin-left: 25%;">
              <v-skeleton-loader :loading="loading" type="heading"></v-skeleton-loader>
            </v-card-text>
            <v-card-text>
              <p class="mb-0">
                <v-skeleton-loader :loading="loading" type="text@5"></v-skeleton-loader>
              </p>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-skeleton-loader :loading="loading" type="avatar"></v-skeleton-loader>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm2 md3>
        </v-flex>
      </template>
      <template  v-else>
        <template  v-if="error">
          <v-flex xs12 class="text-center" style="margin-top: 150px;">
            <v-icon size="100">mdi-alert</v-icon>
            <h1 class="display-1">Astaghfirullah !</h1>
            <p>Tidak dapat menerima data dari penyedia. Periksa koneksi internet anda, kemudian coba lagi. </p>
            <br>
            <v-btn depressed @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
              <span class="pl-2">Go Back</span>
            </v-btn>
          </v-flex>
        </template>
        <template  v-else>
          <v-flex xs12 sm2 md3>
            <v-flex xs12 class="hidden-xs-only text-center">
              <v-btn icon text height="100" width="100" style="margin-top: 150px;" :disabled="Number(this.detail.id) === 1" @click="prev">
                <v-icon size="100">mdi-chevron-left</v-icon>
              </v-btn>
            </v-flex>
          </v-flex>
          <v-flex xs12 sm8 md6>
            <v-card>
              <v-card-title class="display-4 justify-center">
                {{ detail.arab }}
              </v-card-title>
              <v-card-title class="display-1 justify-center">
                {{ detail.latin }}
              </v-card-title>
              <v-card-title class="subtitle-1 justify-center">
                {{ detail.arti }}
              </v-card-title>
              <v-card-text>
                <p class="mb-0">
                  {{ detail.desc }}
                </p>
              </v-card-text>
              <v-card-actions class="justify-center pb-4">
                <v-avatar :color="'white--text ' + getColor(detail.id)">{{ detail.id }}</v-avatar>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 sm2 md3>
            <v-flex xs12 class="hidden-xs-only text-center">
              <v-btn icon text height="100" width="100" style="margin-top: 150px;" :disabled="Number(this.detail.id) === 99" @click="next">
                <v-icon size="100">mdi-chevron-right</v-icon>
              </v-btn>
            </v-flex>
            <!--  -->
            <v-layout row style="margin-top: 20px;">
            <v-flex xs6 class="hidden-sm-and-up text-center">
              <v-btn icon text height="100" width="100" :disabled="Number(this.detail.id) === 1" @click="prev">
                <v-icon size="100">mdi-chevron-left</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs6 class="hidden-sm-and-up text-center">
              <v-btn icon text height="100" width="100" :disabled="Number(this.detail.id) === 99" @click="next">
                <v-icon size="100">mdi-chevron-right</v-icon>
              </v-btn>
            </v-flex>
            </v-layout>
          </v-flex>
        </template>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
import { AsmaUlHusna } from "@/services/AsmaUlHusna"

export default {
  name: 'detail',
  data: () => ({
    bgcolors: [],
    loading: true,
    error: false,
    detail: null
  }),
  methods: {
    async loadData () {
      if (!this.$route.params.id) {
        this.error = true
        this.loading = false
      } else {
        const id = this.$route.params.id
        this.loading = true
        try {
          const res = await AsmaUlHusna.detail(id)
          this.detail = res.data
          window.localStorage.setItem(`99detail_${id}_key`, Date.now())
          window.localStorage.setItem(`99detail_${id}_val`, JSON.stringify(res.data))
        } catch (error) {
          const key = window.localStorage.getItem(`99detail_${id}_key`) || 0
          if (Date.now() - key < 30*24*60*60*1000) {
            this.detail = JSON.parse(window.localStorage.getItem(`99detail_${id}_val`))
          } else {
            this.error = true
          }
        }
        this.loading = false
      }
    },
    getColor (id) {
      return this.bgcolors[id % this.bgcolors.length].replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "-" + m[1];
      }).toLowerCase() + ' darken-3'
    },
    prev () {
      this.$router.push('/detail/' + (this.detail.id - 1))
    },
    next () {
      this.$router.push('/detail/' + (this.detail.id + 1))
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  mounted () {
    for (const color in colors) {
      this.bgcolors.push(color)
    }
    this.bgcolors.pop()
    this.loadData()
  }
}
</script>
