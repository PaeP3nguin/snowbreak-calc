<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          aria-label="Menu"
          flat
          dense
          round
          icon="menu"
          @click="toggleLeftDrawer" />

        <q-toolbar-title> Snowbreak calc </q-toolbar-title>

        <q-btn
          href="https://github.com/PaeP3nguin/snowbreak-calc"
          aria-label="Github"
          flat
          dense
          round
          icon="mdi-github"
          target="_blank" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple to="/calculator">
          <q-item-section avatar>
            <q-icon name="calculate" />
          </q-item-section>

          <q-item-section> Damage calculator </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/enemy-info">
          <q-item-section avatar>
            <q-icon name="mdi-sword-cross" />
          </q-item-section>

          <q-item-section> Enemy information </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/damage-formula">
          <q-item-section avatar>
            <q-icon name="mdi-function-variant" />
          </q-item-section>

          <q-item-section> Damage formula </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/changelog">
          <q-item-section avatar>
            <q-icon name="mdi-format-list-bulleted" />
          </q-item-section>

          <q-item-section> Changlog </q-item-section>
        </q-item>

        <!-- <q-item clickable v-ripple to="/resources">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>

          <q-item-section> Misc resources </q-item-section>
        </q-item> -->
      </q-list>
    </q-drawer>

    <!-- Reset padding top to 0 so that position: sticky in a page can work nicely. -->
    <q-page-container style="padding-top: 0">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
