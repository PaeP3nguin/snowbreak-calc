<template>
  <!--
    Operative base ATK * ATK% buffs * Weapon compatibility * crit damage multiplier
    * (total buff %) * final damage buff * damage taken debuffs
    * defense * elemental resist multiplier * shield multiplier -->
  <q-page class="q-pa-lg">
    <h6 class="q-mt-sm q-mb-lg">Calculation results</h6>

    <p class="q-mb-none text-body1">
      <b>Single mag DPS:</b> {{ oneMagDps.toFixed(0) }}
      <br />
      <b>Sustained DPS (no crits):</b> {{ sustainDps.toFixed(0) }}
      <br />
      <b>Sustained DPS (all crits):</b> {{ sustainDpsWithCrit.toFixed(0) }}
      <br />
      <span v-if="totalCritRate > 0">
        <b>Sustained DPS (based on total crit rate of {{ totalCritRate }}%):</b>
        {{ avgSustainDps.toFixed(0) }}
        <br />
      </span>
      <b>Bullet damage:</b> {{ bulletDamage.toFixed(0) }}
      <br />
      <b>Bullet damage (crit):</b> {{ critBulletDamage.toFixed(0) }}
    </p>

    <div>
      <q-toggle v-model="showDetailedStats" label="Detailed stats"></q-toggle>
    </div>

    <p class="text-body1" v-if="showDetailedStats">
      <b>Intermediate calculations:</b>
      <br />
      <b>Single mag damage:</b> {{ singleMagDamage.toFixed(0) }}
      <br />
      <b>Time to empty mag:</b> {{ timeToEmptyMag.toFixed(2) }}
      <br />
      <br />
      <b>Overall stats:</b>
      <br />
      <b>Base atk:</b> {{ totalBaseAtk }}
      <br />
      <b>ATK %:</b> {{ totalAtkPercent * 100 }}%
      <br />
      <b>Final ATK:</b> {{ fullAtk.toFixed(0) }}
      <br />
      <b>Crit damage:</b> {{ critDmgPercent }}%
      <br />
      <b>Crit rate:</b> {{ totalCritRate }}%
      <br />
      <b>Buff:</b> {{ totalBuffPercent }}%
      <br />
      <b>Final damage:</b> {{ totalFinalDamagePercent }}%
      <br />
      <b>Damage taken:</b> {{ totalDamageTakenPercent }}%
      <br />
      <b>Elemental resist modifier:</b> {{ elementalResistModifier }}%
    </p>

    <q-separator class="q-my-lg"></q-separator>

    <h6 class="q-my-lg">
      Operative:
      {{
        selectedOperative.name ? selectedOperative.name : 'None chosen (custom)'
      }}
    </h6>

    <q-btn
      class="q-mb-md"
      label="Pick operative"
      @click="showOperativeList = true"
      color="primary"></q-btn>

    <q-btn
      class="q-mb-md q-mx-md"
      label="Clear operative"
      color="negative"
      @click="clearOperative"
      :disable="!selectedOperative.name"></q-btn>

    <p>
      <b>Base ATK:</b> only the ATK from the operative. Pre-filled are level 80
      by default. Calculate for your own operatives from the "Basic Value" of
      ATK in "View Details", then subtract flat ATK from weapon and logistics.
      <br />
      <b>Manifest level/step:</b> just used to calculate extra ATK% boost for
      now. Manifest step is the X/9 number in the middle of the next manifest
      level you're working on.
      <br />
      Note: operative passives are not pre-filled yet (sorry!)
    </p>

    <q-dialog v-model="showOperativeList">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Choose an operative</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item
              v-ripple
              v-for="operative in operativeList"
              v-bind:key="operative.name"
              clickable
              @click="operativeChosen(operative)">
              <!-- <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section> -->
              <q-item-section>{{ operative.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedOperative.baseAtk"
          filled
          :disable="!!selectedOperative.name"
          label="Base ATK"
          :rules="[(val) => val > 0 || 'ATK must be positive']"
          lazy-rules />
      </div>

      <div class="col">
        <q-select
          v-model.number="selectedOperative.manifestLevel"
          filled
          label="Manifest level (0-5)"
          :options="[...Array(6).keys()]" />
      </div>

      <div class="col">
        <q-select
          v-model.number="selectedOperative.manifestStep"
          filled
          label="Manifest step (0-8)"
          :options="[...Array(9).keys()]" />
      </div>

      <div class="col">
        <q-select
          v-model="selectedOperative.weaponType"
          filled
          :disable="!!selectedOperative.name"
          :options="Object.values(WeaponType)"
          :rules="[(v) => !!v || 'Weapon type is required']"
          label="Weapon type" />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model="baseCritRate"
          filled
          disable
          label="Base crit rate"
          suffix="%" />
      </div>
    </div>

    <q-separator class="q-my-lg"></q-separator>

    <h6 class="q-my-lg">
      Weapon: {{ selectedWeapon.name || 'None chosen (custom)' }}
    </h6>

    <q-btn
      class="q-mb-md"
      label="Pick weapon"
      @click="showWeaponList = true"
      color="primary"></q-btn>

    <q-btn
      class="q-mb-md q-mx-md"
      label="Clear weapon"
      color="negative"
      @click="clearWeapon"
      :disable="!selectedWeapon.name"></q-btn>

    <q-dialog v-model="showWeaponList">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Choose a weapon</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item
              v-ripple
              v-for="weapon in weaponList"
              v-bind:key="weapon.name"
              clickable
              @click="weaponChosen(weapon)">
              <!-- <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section> -->
              <q-item-section>{{ weapon.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.atk"
          filled
          label="Weapon ATK"
          :disable="!!selectedWeapon.name"
          :rules="[(val) => val > 0 || 'ATK must be positive']"
          lazy-rules />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.rateOfFire"
          filled
          label="Rate of fire"
          mask="#"
          :disable="!!selectedWeapon.name"
          :rules="[(val) => val > 0 || 'Rate of fire must be positive']"
          lazy-rules />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.ammoCapacity"
          filled
          label="Ammo capacity"
          mask="#"
          :disable="!!selectedWeapon.name"
          :rules="[(val) => val > 0 || 'Ammo capacity must be positive']"
          lazy-rules />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.reloadSpeed"
          filled
          label="Reload speed"
          mask="#"
          suffix="%"
          :disable="!!selectedWeapon.name"
          :rules="[(val) => val > 0 || 'Reload speed must be positive']"
          lazy-rules />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.atkPercent"
          filled
          label="Attack %"
          suffix="%"
          :disable="!!selectedWeapon.name"
          :rules="[
            (val) => (val !== '' && val >= 0) || 'ATK% must be non-negative',
          ]"
          lazy-rules />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.compatibility"
          filled
          label="Compatibility"
          mask="#.#"
          suffix="%"
          :disable="!!selectedWeapon.name"
          :rules="[(val) => val > 0 || 'Compatibility must be positive']"
          lazy-rules />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model.number="selectedWeapon.critDamage"
          filled
          label="Crit damage"
          mask="#"
          suffix="%"
          :disable="!!selectedWeapon.name"
          :rules="[(val) => val > 0 || 'Crit damage must be positive']"
          lazy-rules />
      </div>
    </div>

    <q-separator class="q-my-lg"></q-separator>

    <h6 class="q-my-lg">
      Logistics: {{ selectedLogistic.name || 'None chosen (custom)' }}
    </h6>

    <q-btn
      class="q-mb-md"
      label="Pick logistics"
      @click="showLogisticList = true"
      color="primary"></q-btn>

    <q-btn
      class="q-mb-md q-mx-md"
      label="Clear logistics"
      color="negative"
      @click="clearLogistics"
      :disable="!selectedLogistic.name"></q-btn>

    <p>
      Rarity and levels are just used to calculate flat ATK and ATK% values.
      Disclaimer: the flat ATK values are approximate, different logistics have
      slightly different flat ATK values.
    </p>

    <q-dialog v-model="showLogisticList">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Choose a logistic</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item
              v-ripple
              v-for="logistic in logisticList"
              v-bind:key="logistic.name"
              clickable
              @click="logisticChosen(logistic)">
              <!-- <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section> -->
              <q-item-section>{{ logistic.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col">
        <q-select
          v-model="selectedLogistic.rarity"
          filled
          :disable="!!selectedLogistic.name"
          label="Rarity"
          :options="[Rarity.Orange, Rarity.Purple]" />
      </div>

      <div class="col">
        <q-select
          v-model="selectedLogistic.levelL"
          filled
          label="Left piece level"
          :options="[...Array(16).keys()]" />
      </div>

      <div class="col">
        <q-select
          v-model="selectedLogistic.levelM"
          filled
          label="Middle piece level"
          :options="[...Array(16).keys()]" />
      </div>

      <div class="col">
        <q-select
          v-model="selectedLogistic.levelR"
          filled
          label="Right piece level"
          :options="[...Array(16).keys()]" />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model="logisticsFlatAtk"
          filled
          disable
          label="Flat attack" />
      </div>

      <div class="col">
        <q-input
          type="number"
          v-model="logisticsAtkPercent"
          filled
          disable
          label="Attack %"
          suffix="%" />
      </div>
    </div>

    <q-separator class="q-my-lg"></q-separator>

    <h6 class="q-my-lg">Additional modifiers</h6>

    <p>
      Element is only needed if a buff should be restricted to a particular
      element, such as the elemental damage boost from 3* weapons or the
      Kinetic/Chaos callistic damage boost from 4* Troubadour logistics set.
      <br />
      Enter any percentages as whole numbers, ex. 30% should be a value of 30
    </p>

    <div style="max-width: 1200px">
      <q-form @submit="addModifier" greedy>
        <div class="row q-col-gutter-x-md q-mb-md">
          <div class="col">
            <q-input
              type="text"
              v-model="formInput.name"
              filled
              label="Name"
              :rules="[(v: string) => !!v || 'Name is required']"
              lazy-rules />
          </div>

          <div class="col">
            <q-select
              v-model="formInput.type"
              filled
              :options="Object.values(ModifierType)"
              label="Type" />
          </div>

          <div class="col">
            <q-select
              v-model="formInput.element"
              filled
              clearable
              :options="Object.values(ElementType)"
              :disable="!enableElementInput"
              label="Element" />
          </div>

          <div class="col">
            <q-input
              type="number"
              v-model.number="formInput.value"
              filled
              label="Value"
              :rules="[(val) => val >= 0 || 'Value must non-negative']"
              lazy-rules />
          </div>

          <div class="col-auto q-mt-sm">
            <q-btn type="submit" label="Add" color="primary"></q-btn>
          </div>
        </div>
      </q-form>

      <!--
      <p>{{ formInput }}</p>
      <p>{{ modifiers }}</p>
      <p>{{ selected }}</p> -->

      <q-table
        wrap-cells
        :rows="uModifiers"
        :columns="modifierTableColumns"
        row-key="id"
        :rows-per-page-options="[0]"
        hide-top
        hide-bottom>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="active" :props="props" auto-width>
              <q-checkbox v-model="props.row.active" />
            </q-td>

            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit
                title="Update name"
                buttons
                v-model="props.row.name"
                v-slot="scope"
                :validate="checkTableEditValid"
                @hide="validateTableEditExists">
                <q-input
                  type="text"
                  v-model="scope.value"
                  filled
                  autofocus
                  :rules="[
                    (val) => validateTableEditExists(val) || 'Name is required',
                  ]" />
              </q-popup-edit>
            </q-td>

            <q-td key="description" :props="props">
              {{ props.row.description }}
              <q-popup-edit
                title="Update description"
                buttons
                v-model="props.row.description"
                v-slot="scope">
                <q-input type="text" v-model="scope.value" dense autofocus />
              </q-popup-edit>
            </q-td>

            <q-td key="type" :props="props">
              {{ props.row.type }}
              <q-popup-edit
                title="Update type"
                buttons
                v-model="props.row.type"
                v-slot="scope"
                @before-hide="checkClearElementType(props.row)">
                <q-select
                  v-model="scope.value"
                  filled
                  autofocus
                  :options="Object.values(ModifierType)"
                  label="Type" />
              </q-popup-edit>
            </q-td>

            <q-td key="element" :props="props">
              {{ props.row.element || 'N/A' }}
              <q-popup-edit
                title="Update element"
                buttons
                v-model="props.row.element"
                v-slot="scope"
                :disable="!ELEMENT_ENABLED_MODIFIERS.includes(props.row.type)">
                <q-select
                  v-model="scope.value"
                  filled
                  clearable
                  :options="Object.values(ElementType)"
                  label="Element" />
              </q-popup-edit>
            </q-td>

            <q-td key="value" :props="props">
              {{ props.row.value }}

              <q-popup-edit
                title="Update value"
                buttons
                v-model="props.row.value"
                v-slot="scope"
                :validate="checkTableEditValid"
                @hide="validateTableEditExists">
                <q-input
                  type="number"
                  v-model.number="scope.value"
                  filled
                  autofocus
                  :rules="[
                    (val) =>
                      validateTableEditNotNegative(val) ||
                      'Value must not be negative',
                  ]" />
              </q-popup-edit>
            </q-td>

            <q-td key="actions" :props="props" auto-width>
              <div>
                <q-btn
                  flat
                  round
                  :icon="
                    props.row.id in lockedModifierIds
                      ? 'mdi-delete-off-outline'
                      : 'mdi-delete'
                  "
                  :disable="props.row.id in lockedModifierIds"
                  @click="deleteModifier(props.row)">
                </q-btn>

                <q-tooltip
                  class="text-body2"
                  v-if="props.row.id in lockedModifierIds">
                  Added by a weapon or logistic
                </q-tooltip>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ElementType } from 'app/src/data/element';
import {
  ELEMENT_ENABLED_MODIFIERS,
  Modifier,
  ModifierType,
  UniqueModifier,
} from 'app/src/data/modifier';
import { Rarity } from 'app/src/data/rarity';
import {
  WEAPONS,
  Weapon,
  WeaponType,
  weaponSerializer,
} from 'app/src/data/weapons';
import { QTableProps } from 'quasar';
import { LOGISTICS, Logistic, logisticSerializer } from 'src/data/logistics';
import {
  OPERATIVES,
  Operative,
  operativeSerializer,
} from 'src/data/operatives';
import { computed, readonly, ref, watch } from 'vue';

// Map from modifier ID to name of the weapon/logistic set that caused it to be locked.
const lockedModifierIds = ref<Record<number, string>>({});

const uModifiers = ref<Array<UniqueModifier>>([]);

// ============= OPERATIVE SELECTION =============

const operativeList = computed<Array<Operative>>(() => OPERATIVES);

const showOperativeList = ref(false);

const selectedOperative = ref<Operative>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  operativeSerializer.parse(operativeList.value[0])!,
);

const baseCritRate = computed<number>(() =>
  selectedOperative.value.weaponType === WeaponType.Shotgun ? 25 : 0,
);

const manifestAtkPercent = computed<number>(() => {
  // Each manifest level adds 2% ATK. Odd numbered manifest steps add 0.5% ATK.
  return (
    selectedOperative.value.manifestLevel * 2 +
    Math.floor((selectedOperative.value.manifestStep + 1) / 2) * 0.5
  );
});

function operativeChosen(operative: Operative) {
  if (selectedOperative.value.name === operative.name) {
    // Same operative chosen.
    showOperativeList.value = false;
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedOperative.value = operativeSerializer.parse(operative)!;
  showOperativeList.value = false;
}

function clearOperative() {
  selectedOperative.value.name = '';
}

// ============= WEAPON SELECTION =============

const weaponList = computed<Array<Weapon>>(() => {
  return WEAPONS[selectedOperative.value.weaponType];
});

const showWeaponList = ref(false);

const selectedWeapon = ref<Weapon>(
  // Putting a value here just so the type is guaranteed to exist.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  weaponSerializer.parse(weaponList.value[0])!,
);

// When the operative weapon type changes, update the chosen weapon to the first one from that type.
watch(
  computed<WeaponType>(() => selectedOperative.value.weaponType),
  (after, before) => {
    if (before !== after) {
      weaponChosen(weaponList.value[0]);
    }
  },
  // Choose a weapon on start so that the modifiers get added.
  { immediate: true },
);

function weaponChosen(weapon: Weapon) {
  const oldWeaponName = selectedWeapon.value.name;

  // Clear out old locked modifiers.
  clearLockedModifiers(oldWeaponName);

  // Select new weapon and add modifiers.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedWeapon.value = weaponSerializer.parse(weapon)!;
  for (const modifier of selectedWeapon.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifiers.value.push(uModifier);
    lockedModifierIds.value[uModifier.id] = weapon.name;
  }

  showWeaponList.value = false;
}

function clearWeapon() {
  clearLockedModifiers(selectedWeapon.value.name);
  selectedWeapon.value.name = '';
}

// ============= LOGISTICS SELECTION =============

const logisticList = readonly(ref<Array<Logistic>>(LOGISTICS));

const showLogisticList = ref(false);

const selectedLogistic = ref<Logistic>({
  name: '',
  rarity: Rarity.Orange,
  maxAtk: 0,
  levelL: 15,
  levelM: 15,
  levelR: 15,
  modifiers: [],
});

// Cap the logistics levels at 12 when switching to a purple logistics set.
watch(
  computed<Rarity>(() => selectedLogistic.value.rarity),
  (after) => {
    if (after === Rarity.Purple) {
      selectedLogistic.value.levelL = Math.min(
        12,
        selectedLogistic.value.levelL,
      );
      selectedLogistic.value.levelM = Math.min(
        12,
        selectedLogistic.value.levelM,
      );
      selectedLogistic.value.levelR = Math.min(
        12,
        selectedLogistic.value.levelR,
      );
    }
  },
);

const logisticsFlatAtk = computed<number>(() => {
  function individualAtk(level: number, rarity: Rarity): number {
    if (rarity === Rarity.Orange) {
      return [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 87, 93, 100][
        level
      ];
    } else if (rarity === Rarity.Purple) {
      return [6, 12, 17, 23, 29, 34, 40, 46, 52, 58, 64, 70, 76][level];
    }
    return level * 6;
  }
  return (
    individualAtk(
      selectedLogistic.value.levelL,
      selectedLogistic.value.rarity,
    ) +
    individualAtk(selectedLogistic.value.levelR, selectedLogistic.value.rarity)
  );
});

const logisticsAtkPercent = computed<number>(() => {
  // See this sheet for values:
  // https://docs.google.com/spreadsheets/d/1nuFU7Ic9wETaBdPmX7SWfxXuG5e-4mekiChntmeIiVg/edit#gid=895905006
  if (selectedLogistic.value.rarity === Rarity.Orange) {
    return Math.min(Math.floor(selectedLogistic.value.levelM / 3) * 4 + 4, 20);
  } else if (selectedLogistic.value.rarity === Rarity.Purple) {
    // Why...
    const upgradeStep = Math.floor(selectedLogistic.value.levelM / 3);
    return Math.min(
      upgradeStep * 3.9 + 3.9 + (upgradeStep >= 2 ? 0.1 : 0),
      19.6,
    );
  }
  return 0;
});

function logisticChosen(logistic: Logistic) {
  const oldLogisticName = selectedLogistic.value.name;
  if (oldLogisticName === logistic.name) {
    // Same logistic selected.
    showLogisticList.value = false;
    return;
  }

  // Clear out old locked modifiers.
  clearLockedModifiers(oldLogisticName);

  // Select new logistic and add modifiers.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedLogistic.value = logisticSerializer.parse(logistic)!;
  for (const modifier of selectedLogistic.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifiers.value.push(uModifier);
    lockedModifierIds.value[uModifier.id] = logistic.name;
  }

  showLogisticList.value = false;
}

function clearLogistics() {
  clearLockedModifiers(selectedLogistic.value.name);
  selectedLogistic.value.name = '';
}

// ============= MODIFIER TABLE =============

function clearLockedModifiers(lockSourceName: string) {
  const idsToRemove = [];
  for (const modifierId in lockedModifierIds.value) {
    const name = lockedModifierIds.value[modifierId];
    if (name === lockSourceName) {
      idsToRemove.push(Number(modifierId));
      uModifiers.value.splice(
        uModifiers.value.findIndex(
          (modifier) => modifier.id === Number(modifierId),
        ),
        1,
      );
    }
  }
  for (const modifierId of idsToRemove) {
    delete lockedModifierIds.value[modifierId];
  }
}

const modifierTableColumns: QTableProps['columns'] = [
  {
    name: 'active',
    label: 'Active',
    field: 'active',
    align: 'left',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
    sortable: true,
  },
  {
    name: 'type',
    label: 'Type',
    field: 'type',
    align: 'left',
    sortable: true,
  },
  {
    name: 'element',
    label: 'Element',
    field: 'element',
    align: 'left',
    sortable: true,
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
    align: 'left',
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Actions',
    // This column is just used to show action buttons, just use any field.
    field: 'value',
    align: 'left',
  },
];

let isTableEditValid = true;

function checkTableEditValid() {
  return isTableEditValid;
}

function validateTableEditExists(value: any) {
  if (!!value) {
    isTableEditValid = true;
    return true;
  }
  isTableEditValid = false;
  return false;
}

function validateTableEditNotNegative(value: any) {
  if (value !== '' && value >= 0) {
    isTableEditValid = true;
    return true;
  }
  isTableEditValid = false;
  return false;
}

/**
 * Used by table popup edit to clear the element if the modifier changes.
 */
function checkClearElementType(modifier: UniqueModifier) {
  if (ELEMENT_ENABLED_MODIFIERS.includes(modifier.type)) {
    return;
  }

  modifier.element = undefined;
}

function sumModifiers(type: ModifierType, element?: ElementType) {
  return modifiersOfType(type, element).reduce((a, b) => a + b.value, 0);
}

function modifiersOfType(type: ModifierType, element?: ElementType) {
  return uModifiers.value.filter(
    (value: UniqueModifier) =>
      value.active &&
      value.type === type &&
      (value.element === undefined || value.element === element),
  );
}

const formInput = ref<Modifier>({
  active: true,
  name: '',
  description: '',
  type: ModifierType.AtkPercent,
  value: 0,
});

const enableElementInput = computed<boolean>(() =>
  ELEMENT_ENABLED_MODIFIERS.includes(formInput.value.type),
);

watch(enableElementInput, (newValue) => {
  if (!newValue) {
    formInput.value.element = undefined;
  }
});

function addModifier() {
  uModifiers.value.push(UniqueModifier.fromModifier(formInput.value));
}

function deleteModifier(modifier: UniqueModifier) {
  uModifiers.value.splice(uModifiers.value.indexOf(modifier), 1);
}

// ============= DPS CALCULATION =============

const showDetailedStats = ref<boolean>(true);

const totalBaseAtk = computed<number>(
  () =>
    selectedOperative.value.baseAtk +
    selectedWeapon.value.atk +
    logisticsFlatAtk.value,
);

const totalAtkPercent = computed<number>(
  () =>
    (manifestAtkPercent.value +
      selectedWeapon.value.atkPercent +
      logisticsAtkPercent.value +
      sumModifiers(ModifierType.AtkPercent)) /
    100,
);

const fullAtk = computed<number>(
  () =>
    totalBaseAtk.value * (1 + totalAtkPercent.value) +
    sumModifiers(ModifierType.FlatAtk),
);

const totalBuffPercent = computed<number>(
  () =>
    sumModifiers(ModifierType.ElementalDamage, selectedWeapon.value.element) +
    sumModifiers(ModifierType.BallisticDamage, selectedWeapon.value.element) +
    sumModifiers(ModifierType.Generic, selectedWeapon.value.element),
);

const totalFinalDamagePercent = computed<number>(() =>
  sumModifiers(ModifierType.FinalDamage),
);

const totalDamageTakenPercent = computed<number>(() =>
  sumModifiers(ModifierType.DamageTaken),
);

const elementalResistModifier = computed<number>(() =>
  sumModifiers(ModifierType.ElementalResist, selectedWeapon.value.element),
);

const totalCritRate = computed<number>(
  () => baseCritRate.value + sumModifiers(ModifierType.CritRate),
);

const critDmgPercent = computed<number>(() => {
  const totalCritDmgAmp = 1 + sumModifiers(ModifierType.CritDmgAmp) / 100;
  return selectedWeapon.value.critDamage * totalCritDmgAmp;
});

const bulletDamage = computed<number>(() => {
  const defenseModifier = 0.5;
  return (
    fullAtk.value *
    (selectedWeapon.value.compatibility / 100) *
    (1 + totalBuffPercent.value / 100) *
    (1 + totalFinalDamagePercent.value / 100) *
    (1 + totalDamageTakenPercent.value / 100) *
    (1 + elementalResistModifier.value / 100) *
    defenseModifier
  );
});

const critBulletDamage = computed<number>(
  () => bulletDamage.value * (1 + critDmgPercent.value / 100),
);

const singleMagDamage = computed<number>(
  () =>
    bulletDamage.value *
    selectedWeapon.value.ammoCapacity *
    (selectedWeapon.value.type === WeaponType.Shotgun ? 8 : 1),
);

const timeToEmptyMag = computed<number>(
  () =>
    ((selectedWeapon.value.ammoCapacity - 1) /
      selectedWeapon.value.rateOfFire) *
    60,
);

const oneMagDps = computed<number>(() => {
  return singleMagDamage.value / timeToEmptyMag.value;
});

const sustainDps = computed<number>(() => {
  return (
    singleMagDamage.value /
    (timeToEmptyMag.value + selectedWeapon.value.reloadSpeed)
  );
});

const sustainDpsWithCrit = computed<number>(
  () => sustainDps.value * (1 + critDmgPercent.value / 100),
);

const avgSustainDps = computed<number>(
  () =>
    sustainDps.value * (1 - totalCritRate.value / 100) +
    (sustainDpsWithCrit.value * totalCritRate.value) / 100,
);
</script>
