<template>
  <b-row class="d-flex" no-gutters>
    <b-col
      cols="2"
      class="m-3"
      v-for="(highlightedWord, index) in getHighlitedWords"
      :key="index"
    >
      <router-link
        :to="{
          name: 'blogListing',
          query: { highlightedWord: highlightedWord },
        }"
      >
        <b-button variant="outline-primary" size="lg">
          {{ highlightedWord }}
        </b-button>
      </router-link>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getHighlitedWords"]),
  },
};
</script>

<style>
</style>