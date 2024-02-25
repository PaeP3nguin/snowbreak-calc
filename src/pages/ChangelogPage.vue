<template>
  <q-page class="q-pa-lg" style="margin-top: 50px">
    <q-markdown :src="Changelog" no-heading-anchor-links />
  </q-page>
</template>

<script setup lang="ts">
import Changelog from 'assets/changelog.md';
</script>
