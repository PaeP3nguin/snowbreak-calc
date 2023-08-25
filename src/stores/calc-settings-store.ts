import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

const STORE_NAME = 'calc_settings';

export const useCalcSettingsStore = defineStore(STORE_NAME, {
  state: () =>
    useStorage(STORE_NAME, {
      showExplanations: true,
      showDetailedStats: false,
    }),
});
