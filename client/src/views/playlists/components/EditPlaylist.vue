<template>
  <div class="main">
    <div class="list">
     <v-card max-width="500" class="mx-auto">
       <v-toolbar color="indigo" dark>

         <v-toolbar-title>{{ playlistName }}</v-toolbar-title>

         <v-spacer></v-spacer>

        <div class="pop-up-dialog">
          <div class="text-center">
           <v-dialog v-model="dialog" width="500">
             <template v-slot:activator="{ on, attrs }">
               <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
             </template>

             <v-card>
               <v-card-title class="headline">
                 <h5>{{ $t('songHeadline') }}</h5>
               </v-card-title>

                <!-- List lyrics -->
               <v-card-text>
                 <v-card class="mx-auto" max-width="600">

                  <v-card-text>
                    <v-text-field
                    v-model="search"
                    :label="$t('search')"
                    @click="page = 1"
                    color="indigo"
                    prepend-inner-icon="mdi-magnify"></v-text-field>
                  </v-card-text>

                  <v-divider></v-divider>

                  <div v-for="lyric in paginatedLyrics" :key="lyric.index">
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-avatar color="indigo" size="56" class="white--text">{{ lyric.index }}</v-avatar>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ lyric.title }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn depressed small @click="selectLyric(lyric)">
                          <v-icon color="indigo">mdi-plus-circle</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                  <v-divider></v-divider>
                  <br />
                  <v-pagination v-model="page" :length="totalPages" :total-visible="totalVisible" color="indigo" circle></v-pagination>
                  <br />
                </v-card>
               </v-card-text>

               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn
                   color="indigo"
                   text
                   @click="dialog = false"
                 >{{ $t('dialog.close') }}</v-btn>
               </v-card-actions>
             </v-card>
           </v-dialog>
          </div>
        </div>

         <v-menu offset-y>
           <template v-slot:activator="{ on, attrs }">
             <v-btn icon v-bind="attrs" v-on="on">
               <v-icon>mdi-dots-vertical</v-icon>
             </v-btn>
           </template>
           <v-list>
             <v-list-item @click="sheet = true">
              <v-list-item-title>{{ $t('rename') }}</v-list-item-title>
             </v-list-item>
           </v-list>
         </v-menu>

          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <v-btn @click="savePlaylist" icon>
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </div>
            </template>
            <span>{{ $t('save') }}</span>
          </v-tooltip>

       </v-toolbar>
       <v-list>
         <draggable v-model="playlist">
           <v-list-item v-for="lyric in playlist" :key="lyric.position" >
            <v-list-item-avatar>
              <v-avatar color="indigo" size="56" class="white--text">{{ lyric.lyricIndex }}</v-avatar>
            </v-list-item-avatar>

             <v-list-item-content>
               <v-list-item-title v-text="lyric.lyricTitle"></v-list-item-title>
             </v-list-item-content>

             <v-list-item-avatar>
               <v-btn @click="removeFromPlaylist(lyric)" icon>
                 <v-icon>mdi-minus-circle</v-icon>
               </v-btn>
             </v-list-item-avatar>
           </v-list-item>
         </draggable>
       </v-list>
     </v-card>
    </div>

    <div class="bottom-panel">
      <v-bottom-sheet v-model="sheet" inset>
        <v-sheet class="text-center" height="200px">
          <v-btn
            class="mt-6"
            text
            color="green"
            @click="sheet = !sheet"
          >{{ $t('dialog.done') }}</v-btn>
          <v-container fluid>
            <v-row>
              <v-col align="center">
                <v-text-field
                v-model="playlistName"
                :label="$t('playlistName')"
                color="indigo"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<i18n>
en:
  newPlaylist: 'New Playlist'
  playlistName: 'Playlist name'
  playlistsHelpText: 'Add songs to a new playlist, or update an existing one.'
  songHeadline: 'Select a song to add to this playlist'
sl:
  newPlaylist: 'Nov seznam'
  playlistName: 'Naslov seznama'
  playlistsHelpText: 'Dodaj pesmi v nov seznam, ali posodobi obstoječega.'
  songHeadline: 'Dodaj pesem v seznam'
</i18n>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: 'EditPlaylist',
  components: {
    draggable
  },
  data () {
    return {
      selectedIndexes: [],
      playlist: [],
      playlistName: '',
      playlistDescription: '',
      sheet: false,
      dialog: false,
      search: '',
      perPage: 5,
      page: 1,
      totalVisible: 6,
      selectedLyric: Object
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    allLyrics () {
      return Object.keys(this.filteredLyrics).map(pid => this.filteredLyrics[pid])
    },
    filteredLyrics () {
      return this.lyrics.filter((lyric) => {
        return lyric.title.toUpperCase().match(this.search.toUpperCase()) && this.selectedIndexes.indexOf(lyric.index) === -1
      })
    },
    paginatedLyrics () {
      return this.allLyrics.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    },
    totalPages () {
      return Math.ceil(this.allLyrics.length / this.perPage)
    },
    ...mapGetters({
      currentPlaylist: 'playlist/getCurrentPlaylist',
      lyrics: 'lyric/getAllLyrics'
    })
  },
  methods: {
    generateObject () {
      this.selectedIndexes = this.currentPlaylist.indexes
      this.playlistName = this.currentPlaylist.playlistName
      this.playlistDescription = this.currentPlaylist.playlistDescription
      for (let index = 0; index < this.selectedIndexes.length; index++) {
        var lyric = this.lyrics.find(lyric => lyric.index === this.selectedIndexes[index])
        if (typeof lyric !== 'undefined') {
          const obj = {
            position: index,
            lyricTitle: lyric.title,
            lyricIndex: lyric.index
          }
          this.playlist.push(obj)
        }
      }
    },
    removeFromPlaylist (lyric) {
      const position = this.selectedIndexes.indexOf(lyric.lyricIndex)
      this.playlist.splice(position, 1)
    },
    savePlaylist () {
      this.selectedIndexes = []
      for (let index = 0; index < this.playlist.length; index++) {
        this.selectedIndexes.push(this.playlist[index].lyricIndex)
      }

      if (this.id === 'new') {
        const playlistToSave = {
          indexes: this.selectedIndexes,
          playlistName: this.playlistName,
          playlistDescription: this.playlistDescription
        }
        this.$store.dispatch('playlist/addNewPlaylist', playlistToSave)
      } else {
        const playlistToSave = {
          indexes: this.selectedIndexes,
          playlistName: this.playlistName,
          _id: this.currentPlaylist._id,
          playlistDescription: this.playlistDescription
        }
        this.$store.dispatch('playlist/updatePlaylist', playlistToSave)
      }
      this.$router.push({ name: 'ListPlaylists' })
    },
    selectLyric (lyric) {
      const obj = {
        position: this.playlist.length,
        lyricTitle: lyric.title,
        lyricIndex: lyric.index
      }
      if (this.id === 'new') {
        this.selectedIndexes.push(lyric.index)
      }
      this.playlist.push(obj)
      this.dialog = false
    }
  },
  created () {
    if (this.id === 'new') {
      return null
    } else {
      this.$store.dispatch('playlist/fetchPlaylist', this.id)
      this.$store.dispatch('lyric/fetchLyrics')
    }
  },
  mounted () {
    if (this.id === 'new') {
      this.selectedIndexes = []
      this.playlistName = this.$t('newPlaylist')
      this.sheet = true
    } else {
      setTimeout(() => {
        this.generateObject()
      }, 200)
    }
  }
}
</script>
