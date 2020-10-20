<template>
  <v-card class="mx-auto">
    <v-img :src="require(`@/assets/display-status.jpg`)" :aspect-ratio="16/9">
    </v-img>

    <v-card-title>
      <v-container fluid>
      <v-row>
        <v-col>
          <p class="display-1 mb-2 text-h3">{{ $t('title') }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="title font-weight-regular grey--text text-h4">{{ currentDay }}, {{ currentTime }}</p>
        </v-col>
      </v-row>
    </v-container>
    </v-card-title>

    <v-divider ></v-divider>

    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col align="center">
            <v-chip @click="refreshDisplay" class="mr-2">
              <v-icon left>mdi-refresh</v-icon>
              {{ $t('displayRefresh') }}
            </v-chip>
          </v-col>
          <v-col align="center">
            <v-chip @click="stopProjection" class="mr-2">
              <v-icon left>mdi-close-circle</v-icon>
              {{ $t('stopProjection') }}
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<i18n>
en:
  title: "Projection options..."
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  displayRefresh: "Refresh display"
  stopProjection: "Stop projecting"
sl:
  title: "Možnosti prikazovalnika..."
  dayNames: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota']
  displayRefresh: "Osveži prikazovalnik"
  stopProjection: "Ustavi projekcijo"
</i18n>

<script>
export default {
  name: 'DisplayStatus',
  data () {
    return {
      currentDate: '',
      currentDay: '',
      currentTime: ''
    }
  },
  methods: {
    updateCurrentDate () {
      const dateVariable = new Date()
      this.currentTime = dateVariable.getHours() + ':' + dateVariable.getMinutes() + ':' + dateVariable.getSeconds()
      setInterval(() => {
        const dateVariable = new Date()
        this.currentTime = dateVariable.getHours() + ':' + dateVariable.getMinutes() + ':' + dateVariable.getSeconds()
      }, 1000)
    },
    setDay () {
      const dateVariable = new Date().getUTCDay()
      this.currentDay = this.$t('dayNames')[dateVariable]
    },
    refreshDisplay () {
      this.$store.dispatch('socket/sendRefreshDisplay')
    },
    stopProjection () {
      this.$store.dispatch('socket/stopProjection')
    }
  },
  mounted () {
    this.updateCurrentDate()
    this.setDay()
  }
}
</script>
