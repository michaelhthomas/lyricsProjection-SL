<template>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>

        <v-list-item :to="{name: 'Home'}">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('nav.home') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'ListPlaylists'}">
          <v-list-item-action >
            <v-icon>mdi-presentation-play</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('nav.playlists') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'AddLyric'}">
          <v-list-item-action >
            <v-icon>mdi-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('nav.newSong') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'ListLyrics'}">
          <v-list-item-action >
            <v-icon>mdi-playlist-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('nav.songs') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Options'}">
          <v-list-item-action >
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('nav.options') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Remote'}">
          <v-list-item-action >
            <v-icon>mdi-remote</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t('nav.remote') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navigationDrawer',
  computed: {
    ...mapGetters({
      drawerState: 'appState/getDrawerState'
    }),
    drawer: {
      get () {
        return this.drawerState
      },
      set (newState) {
        this.$store.dispatch('appState/setDrawerState', newState)
      }
    }
  }
}
</script>
