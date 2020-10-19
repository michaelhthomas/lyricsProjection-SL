<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-img :src="require(`@/assets/homePage.jpg`)"
        :lazy-src="require(`@/assets/homePage-lazy.jpg`)"
        max-height="600" contain>
       </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" cols=12 sm=6>
        <v-btn
        :to="{ name: 'ListLyrics'}"
        color="primary">{{ $t('songList') }} <v-icon>mdi-playlist-music</v-icon></v-btn>
      </v-col>
      <v-col align="center" cols=12 sm=6>
        <v-btn
        :to="{name: 'AddLyric'}"
        color="primary">{{ $t('addSong') }} <v-icon>mdi-music</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn
        :to="{name: 'Remote'}"
        color="#59A96A"
        large>{{ $t('remote') }} <v-icon>mdi-remote</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n>
en:
  songList: Song Queue
  addSong: New Song
  remote: Remote
sl:
  songList: Seznam pesmi
  addSong: Dodaj novo pesem
  remote: Upravljaj
</i18n>

<script>
export default {
  name: 'Home'
}
</script>
