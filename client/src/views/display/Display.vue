<template>
  <div class="main nocursor">
    <v-container class="fill-height">
      <v-row align="center" justify="center" v-if="showInputField">
        <v-col cols="2">
          <!-- Show search box -->
          <div>
            <v-text-field
              v-model="userInput"
              align="center"
              autofocus
              type="number"
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="!notFound">
        <v-col cols="3"> </v-col>
        <v-col align="center">
          <!-- Lyric title and content -->
          <div>
            <h1 class="text-h3">
              <strong>{{ currentLyric.title.toUpperCase() }}</strong>
            </h1>
            <br />
            <p class="text-h4">
              <span v-html="currentLyric.content.toUpperCase()"></span>
            </p>
          </div>
        </v-col>
        <v-col cols="3"></v-col>
      </v-row>
      <v-row v-if="notFound">
        <v-col align="center">
          <div v-if="currentLyricIndex === null">
            <h1>Vtipkaj številko pesmi...</h1>
          </div>
          <div v-else>
            <h1>Pesem ne obstaja!</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Display',
  data () {
    return {
      scroll: 0,
      showInputField: false,
      userInput: ''
    }
  },
  computed: {
    ...mapGetters({
      currentLyricIndex: 'socket/getCurrentLyric',
      currentLyric: 'lyric/getCurrentLyric',
      notFound: 'lyric/getNotFoundValue',
      scrollPage: 'socket/getScrollDirection',
      refresh: 'socket/getRefreshPageStatus'
    })
  },
  watch: {
    currentLyricIndex: function (newIndex, oldIndex) {
      this.onNewLyric(newIndex)
    },
    scrollPage: function (newDirection, oldDirection) {
      if (newDirection > oldDirection) {
        this.scrollWindow('up')
      } else {
        this.scrollWindow('down')
      }
    },
    refresh: function (newStatus, oldStatus) {
      if (newStatus === true) {
        location.reload()
      }
    }
  },
  methods: {
    onNewLyric (newIndex) {
      this.$store.dispatch('lyric/fetchLyrics')
      if (newIndex !== null) {
        this.$store.dispatch('lyric/fetchLyric', newIndex)
      } else {
        this.$store.dispatch('lyric/updateNotFoundVariable', true)
      }
    },
    scrollWindow (direction) {
      if (direction === 'up') {
        this.scroll -= 60
      } else {
        this.scroll += 60
      }
      window.scroll(0, this.scroll)
    },
    doCommand (e) {
      const cmd = String.fromCharCode(e.keyCode).toLowerCase()
      if (!isNaN(cmd)) {
        clearTimeout(this.gotoTimeout)
        this.showInputField = true
        this.gotoTimeout = setTimeout(() => {
          this.showInputField = false
          if (this.userInput !== '') {
            console.log('In here!')
            const lyricId = this.$store.getters['lyric/getLyricIdByNumber'](Number(this.userInput))
            if (lyricId === -1) {
              this.$store.dispatch('lyric/updateNotFoundVariable', true)
            } else {
              const document = {
                currentLyric: lyricId,
                currentPlaylist: null
              }
              console.log(lyricId)
              this.$store.dispatch('socket/sendRemoteMessage', document)
            }
          }
          this.userInput = ''
        }, 1000)
      }
    }
  },
  async created () {
    this.$vuetify.theme.dark = true
    await this.$store.dispatch('lyric/fetchLyrics')
    await this.$store.dispatch('socket/getCurrentState')
    // Setup keyboard listener
    window.addEventListener('keypress', this.doCommand)
  }
}
</script>

<style scoped>
.nocursor {
  cursor: none;
}
</style>
