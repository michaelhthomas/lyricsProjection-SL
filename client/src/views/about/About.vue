<template>
<div>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        <h1>{{ $t('title') }}</h1>
        <p>{{ $t('subtitle') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img
          :src="require(`@/assets/promo.jpg`)"
          max-height="400"
          contain>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<i18n>
en:
  title: "About this app"
  subtitle: "For the parish of Šempeter pri Gorici, by G."
sl:
  title: "O aplikaciji"
  subtitle: "Za župnijo Šempeter pri Gorici, by G."
</i18n>

<script>
export default {
  name: 'About'
}
</script>
