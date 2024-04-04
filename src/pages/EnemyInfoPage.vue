<template>
  <q-page class="q-pa-lg" style="margin-top: 50px">
    <h6 class="q-mt-none q-mb-lg">Elemental resistance</h6>
    <p>
      Enemies have either 0%, -5%, or -10% elemental resistance. That is, they
      can take up to -10% extra damage of a given element. The only time enemies
      have positive elemental resistance, ie. they take less damage from a given
      element, is when a neural sim modifier gives them more resistance.
    </p>
    <p>
      The table below shows the elemental resistance values of all enemy types,
      just remember to that doing calculations, that negative elemental
      resistance means more damage, not less.
    </p>

    <q-markup-table
      class="element-table"
      separator="cell"
      flat
      bordered
      style="width: fit-content">
      <thead>
        <tr>
          <th></th>
          <th>
            <div class="row justify-center">
              <img src="element_kinetic.png" style="max-width: 42px" />
            </div>
            <h6 class="q-ma-none">Kinetic</h6>
          </th>
          <th>
            <div class="row justify-center">
              <img src="element_chaos.png" style="max-width: 42px" />
            </div>
            <h6 class="q-ma-none">Chaos</h6>
          </th>
          <th>
            <div class="row justify-center">
              <img src="element_thermal.png" style="max-width: 42px" />
            </div>
            <h6 class="q-ma-none">Thermal</h6>
          </th>
          <th>
            <div class="row justify-center">
              <img src="element_frost.png" style="max-width: 42px" />
            </div>
            <h6 class="q-ma-none">Frost</h6>
          </th>
          <th>
            <div class="row justify-center">
              <img src="element_electrical.png" style="max-width: 42px" />
            </div>
            <h6 class="q-ma-none">Electrical</h6>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <div class="row justify-center">
              <img src="enemy_type_biological.png" />
            </div>
            <h6 class="q-ma-none text-center">Biological</h6>
          </td>
          <td class="text-black text-center bg-red"><h5>-10%</h5></td>
          <td class="text-black text-center bg-grey"><h5>0%</h5></td>
          <td class="text-black text-center bg-red"><h5>-10%</h5></td>
          <td class="text-black text-center bg-orange"><h5>-5%</h5></td>
          <td class="text-black text-center bg-grey"><h5>0%</h5></td>
        </tr>
        <tr>
          <td>
            <div class="row justify-center">
              <img src="enemy_type_mechanical.png" />
            </div>
            <h6 class="q-ma-none text-center">Mechanical</h6>
          </td>
          <td class="text-black text-center bg-grey"><h5>0%</h5></td>
          <td class="text-black text-center bg-red"><h5>-10%</h5></td>
          <td class="text-black text-center bg-orange"><h5>-5%</h5></td>
          <td class="text-black text-center bg-grey"><h5>0%</h5></td>
          <td class="text-black text-center bg-red"><h5>-10%</h5></td>
        </tr>
        <tr>
          <td>
            <div class="row justify-center">
              <img src="enemy_type_titan.png" />
            </div>
            <h6 class="q-ma-none text-center">Titan</h6>
          </td>
          <td class="text-black text-center bg-orange"><h5>-5%</h5></td>
          <td class="text-black text-center bg-orange"><h5>-5%</h5></td>
          <td class="text-black text-center bg-grey"><h5>0%</h5></td>
          <td class="text-black text-center bg-red"><h5>-10%</h5></td>
          <td class="text-black text-center bg-orange"><h5>-5%</h5></td>
        </tr>
      </tbody>
    </q-markup-table>

    <h6 class="q-mt-xl q-mb-md">Unique enemy mechanics</h6>

    <q-markup-table
      flat
      bordered
      wrap-cells
      separator="cell"
      style="width: fit-content">
      <thead>
        <tr>
          <th><h6 class="q-my-sm">Enemy</h6></th>
          <th><h6 class="q-my-sm">Mechanics</h6></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <div class="row justify-center">
              <img src="enemy_icons/fiend_foehn.png" style="width: 200px" />
            </div>
            <div class="row justify-center">
              <img src="enemy_icons/fiend_frostwind.png" style="width: 200px" />
            </div>
            <h6 class="q-ma-none text-center">
              Fiend - Foehn / Fiend - Frostwind
            </h6>
          </td>
          <td>
            <p class="text-body1">
              In fire form ("Foehn"), the fiend has 80% thermal resistance, 30%
              chaos resistance, and normal resistance to all the other elements,
              ex. -10% frost resistance like every other titan. In ice form
              ("Frostwind"), the fiend has 80% frost resistance, 30% chaos
              resistance, and normal resistance to all the other elements. The
              ice fiend can't be frozen like most Titans can.
            </p>
            <p class="text-body1">
              The form-specific frost/thermal resistances are not affected by
              Twilight or neural sim modifiers. Strangely, weakspot hits or
              non-weakspot hits on their heads do not seem to be affected by the
              extra resistance.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <div class="row justify-center">
              <img src="enemy_icons/ni_type_mech.png" style="width: 200px" />
            </div>
            <div class="row justify-center">
              <img
                src="enemy_icons/ni_type_mech_falconer.png"
                style="width: 200px" />
            </div>
            <h6 class="q-ma-none text-center">
              Ni-Type Mech / Ni-Type Mech - Falconer
            </h6>
          </td>
          <td>
            <p class="text-body1">
              Both mechs take 50% less damage to the body. This is a separate
              multiplier and cannot be mitigated with elemental resistance shred
              or defense reduction/penetration.
            </p>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<style lang="scss">
.element-table th {
  min-width: 120px;
}
.element-table td {
  margin: 0px;
  padding: 0px 10px;
}
</style>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({
  title: 'Enemy information',
  meta: {
    description: {
      name: 'description',
      content:
        'Basic information on elemental resistance and enemy mechanics in the game Snowbreak: Containment Zone',
    },
  },
});
</script>
