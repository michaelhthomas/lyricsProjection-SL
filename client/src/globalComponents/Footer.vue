<template>
  <v-footer dark inset app>
      <v-btn :to="{ name: 'About'}"  icon>
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <div>{{ $t('footerText') }}</div>
      <v-spacer></v-spacer>
      <div> {{ new Date().getFullYear() }}</div>
    </v-footer>
</template>

<i18n>
en:
  footerText: "Parish of Šempeter pri Gorici"
sl:
  footerText: "Župnija Šempeter pri Gorici"
</i18n>

<script>
export default {
  name: 'Footer'
}
</script>
