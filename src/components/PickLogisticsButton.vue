<!--
  Button that shows a dialog to pick a support operative loadout.
  Emits @selected event with the chosen operative.
 -->

<template>
  <div style="display: inline-block">
    <q-btn
      :label="props.label"
      @click="showDialog = true"
      color="primary"></q-btn>

    <q-dialog v-model="showDialog">
      <!-- <q-card style="max-width: 1000px"> -->
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose a logistic</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item
              :class="rarityClass(logistic.rarity)"
              style="min-height: 60px"
              v-ripple
              v-for="logistic in logisticList"
              v-bind:key="logistic.name"
              clickable
              @click="logisticChosen(logistic as Readonly<Logistic>)">
              <q-item-section class="text-h6">
                <q-item-label>
                  {{ logistic.name }}
                </q-item-label>
                <q-item-label caption>
                  <div class="text-body1">
                    2-set: {{ logistic.modifiers[0].description }}
                  </div>

                  <div class="text-body1">
                    3-set: {{ logistic.modifiers[1].description }}
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss">
.orange-rarity {
  border-left: 8px solid;
  border-color: #e99b37;
}
.purple-rarity {
  border-left: 8px solid;
  border-color: #c069d6;
}
</style>

<script setup lang="ts">
import { Logistic } from 'src/data/logistics';
import { Rarity } from 'src/data/rarity';
import { ref } from 'vue';

const LOGISTIC_SELECTED_EVENT = 'selected';

const props = defineProps<{
  label: string;
  logisticList: Array<Logistic>;
}>();

const emit = defineEmits<{
  (e: 'selected', logistic: Logistic): void;
}>();

const showDialog = ref(false);

function logisticChosen(logistic: Logistic) {
  showDialog.value = false;
  emit(LOGISTIC_SELECTED_EVENT, logistic);
}

/**
 * Return the name of the CSS class for a left-border of the rarity's color.
 */
function rarityClass(rarity: Rarity): string {
  switch (rarity) {
    case Rarity.Orange:
      return 'orange-rarity';
    case Rarity.Purple:
      return 'purple-rarity';
    case Rarity.Blue:
      return 'blue-rarity';
  }
}
</script>
