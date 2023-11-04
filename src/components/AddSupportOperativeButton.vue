<!--
  Button that shows a dialog to pick a support operative loadout.
  Emits @selected event with the chosen operative.
 -->

<template>
  <q-btn
    label="Add support operative"
    @click="showDialog = true"
    color="primary"></q-btn>

  <q-dialog v-model="showDialog">
    <q-card style="max-width: 1000px">
      <q-card-section>
        <div class="text-h6">Choose support operative</div>
      </q-card-section>

      <q-card-section>
        <q-list bordered separator>
          <template
            v-for="operative in operativeList"
            v-bind:key="operative.name">
            <q-item
              :class="rarityClass(operative.rarity)"
              v-ripple
              clickable
              @click="operativeChosen(operative)">
              <q-item-section avatar>
                <q-avatar size="100px" square>
                  <img :src="`character_icons/${operative.name}.png`" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-h6">{{
                  operative.name
                }}</q-item-label>

                <q-item-label caption>
                  <div class="text-body1">
                    Weapon: {{ operative.weaponName }}
                  </div>

                  <div class="text-body1">
                    {{ operative.description }}
                  </div>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <img :src="weaponImage(operative.weaponType)" />
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
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
import { Rarity } from 'src/data/rarity';
import { SupportOperative } from 'src/data/support-operative';
import { SUPPORT_OPERATIVES } from 'src/data/support_operatives/builds';
import { WeaponType } from 'src/data/weapons';
import { ref } from 'vue';

const SUPPORT_SELECTED_EVENT = 'selected';

const emit = defineEmits<{
  (e: 'selected', operative: SupportOperative): void;
}>();

const showDialog = ref(false);

const operativeList = SUPPORT_OPERATIVES;

function operativeChosen(operative: SupportOperative) {
  showDialog.value = false;
  emit(SUPPORT_SELECTED_EVENT, operative);
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
      throw new Error('Operatives are never blue');
  }
}

function weaponImage(weapon: WeaponType): string {
  switch (weapon) {
    case WeaponType.Shotgun:
      return 'weapon_type_shotgun.png';
    case WeaponType.SMG:
      return 'weapon_type_smg.png';
    case WeaponType.Sniper:
      return 'weapon_type_sniper.png';
    case WeaponType.AssaultRifle:
      return 'weapon_type_ar.png';
    case WeaponType.Pistol:
      return 'weapon_type_pistol.png';
  }
}
</script>
