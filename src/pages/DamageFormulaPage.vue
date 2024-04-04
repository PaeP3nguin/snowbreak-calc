<template>
  <q-page class="q-pa-lg" style="margin-top: 50px">
    <p>
      For detailed information on the damage formula, see this Google sheet:
    </p>
    <a
      href="https://docs.google.com/spreadsheets/d/1CZMANZLRY-ncr3Go0Fipr3F9QwyFCV6gGgUCtqP2JIo/edit#gid=459905076"
      target="_blank"
      >https://docs.google.com/spreadsheets/d/1CZMANZLRY-ncr3Go0Fipr3F9QwyFCV6gGgUCtqP2JIo/edit#gid=459905076</a
    >
  </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({
  title: 'Damage formula',
  meta: {
    description: {
      name: 'description',
      content:
        'Describes how damage is calculated in the game Snowbreak: Containment Zone',
    },
  },
});
</script>
