<template>
  <!--
    Operative base ATK * ATK% buffs * Weapon compatibility * crit damage multiplier
    * (total buff %) * final damage buff * damage taken debuffs
    * defense * elemental resist multiplier * shield multiplier -->
  <q-page class="q-pa-lg">
    <h6 class="q-mt-sm q-mb-lg">Calculation results</h6>

    <div class="row justify-between">
      <div class="col-auto">
        <p class="q-mb-none text-body1">
          <b>Bullet damage:</b> {{ bulletDamage.toFixed(0) }}
          <span v-if="aptitudeDamage">
            + {{ aptitudeDamage.toFixed(0) }} (aptitude)
          </span>

          <br />
          <b>Bullet damage (crit):</b> {{ critBulletDamage.toFixed(0) }}
          <span v-if="aptitudeDamage">
            + {{ critAptitudeDamage.toFixed(0) }} (aptitude)
          </span>

          <br />
          <b> Single mag non-weakspot DPS ({{ totalCritRate }}% crit rate): </b>
          <span v-if="singleMagAptitudeDamageAvgCrits || skillDps">
            {{
              (
                oneMagDpsAvgCrits +
                skillDps +
                oneMagAptitudeDpsAvgCrits
              ).toFixed(0)
            }}
            = {{ oneMagDpsAvgCrits.toFixed(0) }} +
            {{ skillDps.toFixed(0) }} (skill) +
            {{ oneMagAptitudeDpsAvgCrits.toFixed(0) }} (aptitude)
          </span>
          <span v-else>
            {{ oneMagDpsAvgCrits.toFixed(0) }}
          </span>

          <br />
          <b>Single mag weakspot DPS: </b>
          <span v-if="singleMagAptitudeDamageAvgCrits || skillDps">
            {{
              (oneMagDpsAllCrit + skillDps + oneMagAptitudeDpsAvgCrits).toFixed(
                0,
              )
            }}
            = {{ oneMagDpsAllCrit.toFixed(0) }} +
            {{ skillDps.toFixed(0) }} (skill)
            {{ oneMagAptitudeDpsAvgCrits.toFixed(0) }} (aptitude)
          </span>
          <span v-else>
            {{ oneMagDpsAllCrit.toFixed(0) }}
          </span>
        </p>

        <p class="q-mt-md text-body1" v-if="showDetailedStats">
          <b>Intermediate calculations:</b>
          <br />
          <b>Single mag damage (no crits):</b>
          {{ singleMagDamageNoCrits.toFixed(2) }}
          <br />
          <b>Single mag non-weakspot damage:</b>
          {{ singleMagDamageAvgCrits.toFixed(2) }}
          <span v-if="singleMagAptitudeDamageAvgCrits">
            + {{ singleMagAptitudeDamageAvgCrits.toFixed(2) }} (aptitude)
          </span>
          <br />
          <b>Time to empty mag:</b> {{ timeToEmptyMag.toFixed(3) }}
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
          <br />
          <b>Defense modifier:</b> {{ defenseModifier }}
        </p>
      </div>

      <div class="col q-mx-xl">
        <p class="q-mb-none text-body1">
          <b>Skill DPS:</b> {{ skillDps.toFixed(0) }}

          <br />
          <b>Sustained non-weakspot DPS ({{ totalCritRate }}% crit rate): </b>
          <span
            v-if="
              winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
            ">
            N/A
          </span>
          <span v-else-if="skillDps || sustainAptitudeDps">
            {{ (avgSustainDps + skillDps + sustainAptitudeDps).toFixed(0) }} =
            {{ avgSustainDps.toFixed(0) }} + {{ skillDps.toFixed(0) }} (skill) +
            {{ sustainAptitudeDps.toFixed(0) }} (aptitude)
          </span>
          <span v-else>
            {{ avgSustainDps.toFixed(0) }}
          </span>

          <br />
          <b>Sustained weakspot DPS: </b>
          <span
            v-if="
              winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
            ">
            N/A
          </span>
          <span v-else-if="skillDps || sustainAptitudeDps">
            {{
              (sustainDpsWithCrit + skillDps + sustainAptitudeDps).toFixed(0)
            }}
            = {{ sustainDpsWithCrit.toFixed(0) }} +
            {{ skillDps.toFixed(0) }} (skill) +
            {{ sustainAptitudeDps.toFixed(0) }} (aptitude)
          </span>
          <span v-else>
            {{ sustainDpsWithCrit.toFixed(0) }}
          </span>
        </p>
      </div>

      <div class="col col-xs-auto">
        <div>
          <q-toggle
            v-model="showDetailedStats"
            label="Detailed calculation stats"></q-toggle>
        </div>
        <div>
          <q-toggle
            v-model="showExplanations"
            label="Show explanations"></q-toggle>
        </div>
      </div>
    </div>

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

    <p v-if="showExplanations">
      <b>Base ATK:</b> only the ATK from the operative. Pre-filled are level 80
      by default. Calculate for your own operatives from the "Basic Value" of
      ATK in "View Details", then subtract flat ATK from weapon and logistics.
      <br />
      <b>Alignment index:</b> Enter alignment index from all sources here,
      including neuronics, weapon, logistics.
      <br />
      <b>Manifest level/step:</b> just used to calculate extra ATK% boost for
      now. Manifest step is the X/9 number in the middle of the next manifest
      level you're working on.
    </p>

    <q-dialog v-model="showOperativeList">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose an operative</div>
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
        <q-input
          type="number"
          v-model.number="selectedOperative.alignmentIndex"
          filled
          label="Alignment index"
          :rules="[(val) => val >= 0 || 'Alignment index must be positive']"
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

    <div class="q-mb-md">
      <q-btn
        label="Pick weapon"
        @click="showWeaponList = true"
        color="primary"></q-btn>

      <q-btn
        class="q-mx-md"
        label="Clear weapon"
        color="negative"
        @click="clearWeapon"
        :disable="!selectedWeapon.name"></q-btn>

      <template v-if="selectedOperative.name.includes('Winter Solstice')">
        <q-radio
          v-for="mode in Object.values(WinterSolsticeShootingMode)"
          v-bind:key="mode"
          v-model="winterSolsticeShootingMode"
          :val="mode"
          :label="mode" />
      </template>
    </div>

    <q-dialog v-model="showWeaponList">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose a weapon</div>
        </q-card-section>
        <q-card-section>
          <q-list bordered separator>
            <q-item
              :class="rarityClass(weapon.rarity)"
              style="min-height: 75px"
              v-ripple
              v-for="weapon in weaponList"
              v-bind:key="weapon.name"
              clickable
              @click="weaponChosen(weapon)">
              <q-item-section class="text-h6">{{ weapon.name }}</q-item-section>

              <q-item-section side>
                <q-avatar>
                  <img :src="elementImage(weapon.element)" />
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-col-gutter-x-md q-mb-md">
      <div class="col">
        <q-select
          v-model="selectedWeapon.element"
          filled
          label="Element"
          :disable="
            !!selectedWeapon.name ||
            winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
          "
          :options="Object.values(ElementType)" />
      </div>

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
          :disable="
            !!selectedWeapon.name ||
            winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
          "
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
          :disable="
            !!selectedWeapon.name ||
            winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
          "
          :rules="[(val) => val > 0 || 'Ammo capacity must be positive']"
          lazy-rules />
      </div>
    </div>

    <div class="row q-col-gutter-x-md q-mb-md">
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
          :disable="
            !!selectedWeapon.name ||
            winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
          "
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
          :disable="
            !!selectedWeapon.name ||
            winterSolsticeShootingMode !== WinterSolsticeShootingMode.Normal
          "
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

    <p v-if="showExplanations">
      <b>Rarity/level:</b> Rarity and levels are just used to calculate flat ATK
      and ATK% values.
      <br />
      <b>Disclaimer:</b> the flat ATK values are approximate, different
      logistics have slightly different flat ATK values.
    </p>

    <q-dialog v-model="showLogisticList">
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

    <h6 class="q-my-lg">Skill damage sources</h6>

    <p v-if="showExplanations">
      <b>Damage percent:</b> Percent of the operatives ATK that the
      skill/aptitude effect deals.
      <br />
      <b>Flat damage:</b> Additional flat damage amount added after the ATK%
      damage.
      <br />
      <b>Aptitude effect:</b> Aptitude effects are additional damage that apply
      to each bullet, like Discordance, Fury, or Fritia - Little Sunshine
      support
      <br />
      <b>Frequency:</b> Number of times per minute the skill procs. Adjust based
      on the cooldown and S-Energy cost.
    </p>

    <div>
      <q-form @submit="addSkill" greedy>
        <div class="row q-col-gutter-x-md q-mb-md">
          <div class="col">
            <q-input
              type="text"
              v-model="skillInput.name"
              filled
              label="Name"
              :rules="[(v: string) => !!v || 'Name is required']"
              lazy-rules />
          </div>

          <div class="col">
            <q-select
              v-model="skillInput.element"
              filled
              :options="Object.values(ElementType)"
              label="Element" />
          </div>

          <div class="col">
            <q-input
              type="number"
              v-model.number="skillInput.damagePercent"
              filled
              step="0.01"
              label="Damage percent"
              :rules="[(val) => val >= 0 || 'Damage percent must non-negative']"
              lazy-rules />
          </div>

          <div class="col">
            <q-input
              type="number"
              v-model.number="skillInput.damageFlat"
              filled
              step="1"
              label="Flat damage"
              :rules="[(val) => val >= 0 || 'Flat damage must non-negative']"
              lazy-rules />
          </div>

          <div class="col-auto q-mt-sm">
            <q-checkbox
              v-model="skillInput.isAptitude"
              label="Aptitude effect?" />
          </div>

          <div class="col">
            <q-input
              type="number"
              v-model.number="skillInput.frequency"
              filled
              step="0.01"
              label="Frequency (times per minute)"
              :disable="skillInput.isAptitude"
              :rules="[(val) => val > 0 || 'Frequency must positive']"
              lazy-rules />
          </div>

          <div class="col-auto q-mt-sm">
            <q-btn type="submit" label="Add" color="primary"></q-btn>
          </div>
        </div>
      </q-form>

      <q-table
        wrap-cells
        :rows="uSkills"
        :columns="skillTableColumns"
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
            </q-td>

            <q-td key="description" :props="props">
              {{ props.row.description }}
            </q-td>

            <q-td key="element" :props="props">
              {{ props.row.element || 'N/A' }}
            </q-td>

            <q-td key="damage" :props="props">
              {{ `${props.row.damagePercent}% + ${props.row.damageFlat}` }}
            </q-td>

            <q-td key="frequency" :props="props">
              {{ props.row.frequency || 'Aptitude effect (every bullet)' }}
            </q-td>

            <q-td key="actions" :props="props" auto-width>
              <div>
                <q-btn
                  flat
                  round
                  :icon="
                    props.row.id in lockedItemIds
                      ? 'mdi-delete-off-outline'
                      : 'mdi-delete'
                  "
                  :disable="props.row.id in lockedItemIds"
                  @click="deleteSkill(props.row)">
                </q-btn>

                <q-tooltip
                  class="text-body2"
                  v-if="props.row.id in lockedItemIds">
                  Added by a operative, weapon, or logistic
                </q-tooltip>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-separator class="q-my-lg"></q-separator>

    <h6 class="q-my-lg">Additional modifiers</h6>

    <p v-if="showExplanations">
      <b>Element:</b> Element is only needed if a buff should be restricted to a
      particular element, such as the elemental damage boost from 3* weapons or
      the Kinetic/Chaos callistic damage boost from 4* Troubadour logistics set.
      <br />
      <b>Value:</b> Enter any percentages as whole numbers, ex. 30% should be
      entered as a value of 30
      <br />
      <b>Editing:</b> Click on any cell to edit it.
    </p>

    <div style="max-width: 1200px">
      <q-form @submit="addModifier" greedy>
        <div class="row q-col-gutter-x-md q-mb-md">
          <div class="col">
            <q-input
              type="text"
              v-model="modifierInput.name"
              filled
              label="Name"
              :rules="[(v: string) => !!v || 'Name is required']"
              lazy-rules />
          </div>

          <div class="col">
            <q-select
              v-model="modifierInput.type"
              filled
              :options="Object.values(ModifierType)"
              label="Type" />
          </div>

          <div class="col">
            <q-select
              v-model="modifierInput.element"
              filled
              clearable
              :options="Object.values(ElementType)"
              :disable="!enableElementInput"
              label="Element" />
          </div>

          <div class="col">
            <q-input
              type="number"
              v-model.number="modifierInput.value"
              filled
              step="0.001"
              label="Value"
              :rules="[(val) => val >= 0 || 'Value must non-negative']"
              lazy-rules />
          </div>

          <div class="col-auto q-mt-sm">
            <q-btn type="submit" label="Add" color="primary"></q-btn>
          </div>
        </div>
      </q-form>

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
                :validate="checkModifierTableEditValid"
                @hide="validateModifierTableEditExists">
                <q-input
                  type="text"
                  v-model="scope.value"
                  filled
                  autofocus
                  :rules="[
                    (val) =>
                      validateModifierTableEditExists(val) ||
                      'Name is required',
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
              {{ props.row.value
              }}<span v-if="props.row.alignmentIncrease">
                + {{ getAlignmentIncrease(props.row) }}</span
              >

              <q-popup-edit
                title="Update value"
                buttons
                v-model="props.row.value"
                v-slot="scope"
                :validate="checkModifierTableEditValid"
                @hide="validateModifierTableEditExists">
                <q-input
                  type="number"
                  v-model.number="scope.value"
                  filled
                  autofocus
                  :rules="[
                    (val) =>
                      validateModifierTableEditNotNegative(val) ||
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
                    props.row.id in lockedItemIds
                      ? 'mdi-delete-off-outline'
                      : 'mdi-delete'
                  "
                  :disable="props.row.id in lockedItemIds"
                  @click="deleteModifier(props.row)">
                </q-btn>

                <q-tooltip
                  class="text-body2"
                  v-if="props.row.id in lockedItemIds">
                  Added by a operative, weapon, or logistic
                </q-tooltip>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
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
.blue-rarity {
  border-left: 8px solid;
  border-color: #3761f0;
}
</style>

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
import { storeToRefs } from 'pinia';
import { QTableProps } from 'quasar';
import { LOGISTICS, Logistic, logisticSerializer } from 'src/data/logistics';
import {
  OPERATIVES,
  Operative,
  operativeSerializer,
} from 'src/data/operatives';
import { Skill, UniqueSkill, SkillBehaviorModifiers } from 'src/data/skill';
import { useCalcSettingsStore } from 'src/stores/calc-settings-store';
import { computed, readonly, ref, watch } from 'vue';

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

function elementImage(element: ElementType): string {
  switch (element) {
    case ElementType.Kinetic:
      return 'element_kinetic.png';
    case ElementType.Chaos:
      return 'element_chaos.png';
    case ElementType.Thermal:
      return 'element_thermal.png';
    case ElementType.Frost:
      return 'element_frost.png';
    case ElementType.Electrical:
      return 'element_electrical.png';
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

// Calc settings store is automatically persisted to local storage.
const { showExplanations, showDetailedStats } = storeToRefs(
  useCalcSettingsStore(),
);

// Map from modifier or skill ID to name of the weapon/logistic set that caused it to be locked.
const lockedItemIds = ref<Record<number, string>>({});

const uModifiers = ref<Array<UniqueModifier>>([]);
const uSkills = ref<Array<UniqueSkill>>([]);

function clearLockedItems(lockSourceName: string) {
  const idsToRemove = [];
  for (const itemId in lockedItemIds.value) {
    const name = lockedItemIds.value[itemId];
    if (name === lockSourceName) {
      idsToRemove.push(Number(itemId));
    }
  }

  for (const itemId of idsToRemove) {
    const modifierIndex = uModifiers.value.findIndex(
      (modifier) => modifier.id === Number(itemId),
    );
    if (modifierIndex >= 0) {
      uModifiers.value.splice(modifierIndex, 1);
    }

    const skillIndex = uSkills.value.findIndex(
      (skill) => skill.id === Number(itemId),
    );
    if (skillIndex >= 0) {
      uSkills.value.splice(skillIndex, 1);
    }

    delete lockedItemIds.value[itemId];
  }
}

// ============= OPERATIVE SELECTION =============

const operativeList = computed<Array<Operative>>(() => OPERATIVES);

const showOperativeList = ref(false);

const selectedOperative = ref<Operative>(
  // Putting a value here just so the type is guaranteed to exist.
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
  const oldOperativeName = selectedOperative.value.name;

  // Clear out old locked modifiers.
  clearLockedItems(oldOperativeName);

  // Select new operative.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedOperative.value = operativeSerializer.parse(operative)!;

  // Add modifiers.
  for (const modifier of selectedOperative.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifiers.value.push(uModifier);
    lockedItemIds.value[uModifier.id] = operative.name;
  }

  if (selectedOperative.value.skillDamage) {
    // Add skill damage sources.
    for (const skill of selectedOperative.value.skillDamage) {
      const uSkill = UniqueSkill.fromSkill(skill);
      uSkills.value.push(uSkill);
      lockedItemIds.value[uSkill.id] = operative.name;
    }
  }

  showOperativeList.value = false;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
operativeChosen(operativeSerializer.parse(operativeList.value[0])!);

function clearOperative() {
  clearLockedItems(selectedOperative.value.name);
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

enum WinterSolsticeShootingMode {
  Normal = 'Normal',
  SkillReloading = 'Reloading with skill',
  Ult = 'Ultimate',
  UltReloading = 'Reloading with skill during ultimate',
}

const winterSolsticeShootingMode = ref<WinterSolsticeShootingMode>(
  WinterSolsticeShootingMode.Normal,
);

/**
 * Stores a copy of the weapon before any shooting mode customizations. Used to restore stats after disabling shooting
 * mode customization.
 *
 * No need to make a deep copy, the initial value will be overwritten by the initial `weaponChosen` call anyways.
 */
let baseWeapon: Weapon = selectedWeapon.value;

/**
 * Overwrite gun stats for different Winter Solstice shooting modes.
 */
watch(
  winterSolsticeShootingMode,
  (after: WinterSolsticeShootingMode, before: WinterSolsticeShootingMode) => {
    if (before === WinterSolsticeShootingMode.Normal) {
      // If changing from normal, save weapon stats.
      baseWeapon.element = selectedWeapon.value.element;
      baseWeapon.compatibility = selectedWeapon.value.compatibility;
      baseWeapon.rateOfFire = selectedWeapon.value.rateOfFire;
      baseWeapon.ammoCapacity = selectedWeapon.value.ammoCapacity;
      baseWeapon.critDamage = selectedWeapon.value.critDamage;
    } else {
      // Restore original stats before applying overlay.
      selectedWeapon.value.element = baseWeapon.element;
      selectedWeapon.value.compatibility = baseWeapon.compatibility;
      selectedWeapon.value.rateOfFire = baseWeapon.rateOfFire;
      selectedWeapon.value.ammoCapacity = baseWeapon.ammoCapacity;
      selectedWeapon.value.critDamage = baseWeapon.critDamage;
    }

    switch (after) {
      case WinterSolsticeShootingMode.SkillReloading: {
        selectedWeapon.value.rateOfFire = 50;
        break;
      }
      case WinterSolsticeShootingMode.Ult: {
        selectedWeapon.value.element = ElementType.Thermal;
        selectedWeapon.value.compatibility = 450;
        selectedWeapon.value.rateOfFire = 37.6;
        selectedWeapon.value.ammoCapacity = 5;
        selectedWeapon.value.critDamage = 100;
        break;
      }
      case WinterSolsticeShootingMode.UltReloading: {
        selectedWeapon.value.element = ElementType.Thermal;
        selectedWeapon.value.compatibility = 450;
        selectedWeapon.value.rateOfFire = 31.6;
        selectedWeapon.value.ammoCapacity = 5;
        selectedWeapon.value.critDamage = 100;
        break;
      }
    }

    // Toggle Winter Solstice skill damage as needed.
    if (
      after === WinterSolsticeShootingMode.SkillReloading ||
      after === WinterSolsticeShootingMode.UltReloading
    ) {
      for (const skill of uSkills.value) {
        if (skill.name.includes('Winter Solstice')) {
          skill.active = true;
        }
      }
    } else {
      for (const skill of uSkills.value) {
        if (skill.name.includes('Winter Solstice')) {
          skill.active = false;
        }
      }
    }
  },
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
  // Turn off the Winter Solstice ult gun when swapping guns.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  baseWeapon = weaponSerializer.parse(weapon)!;
  winterSolsticeShootingMode.value = WinterSolsticeShootingMode.Normal;

  const oldWeaponName = selectedWeapon.value.name;

  // Clear out old locked modifiers.
  clearLockedItems(oldWeaponName);

  // Select new weapon.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedWeapon.value = weaponSerializer.parse(weapon)!;

  // Add modifiers.
  for (const modifier of selectedWeapon.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifiers.value.push(uModifier);
    lockedItemIds.value[uModifier.id] = weapon.name;
  }

  if (selectedWeapon.value.skillDamage) {
    // Add skill damage sources.
    for (const skill of selectedWeapon.value.skillDamage) {
      const uSkill = UniqueSkill.fromSkill(skill);
      uSkills.value.push(uSkill);
      lockedItemIds.value[uSkill.id] = weapon.name;
    }
  }

  showWeaponList.value = false;
}

function clearWeapon() {
  clearLockedItems(selectedWeapon.value.name);
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

function logisticChosen(logistic: Readonly<Logistic>) {
  const oldLogisticName = selectedLogistic.value.name;
  if (oldLogisticName === logistic.name) {
    // Same logistic selected.
    showLogisticList.value = false;
    return;
  }

  // Clear out old locked modifiers.
  clearLockedItems(oldLogisticName);

  // Select new logistic and add modifiers.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedLogistic.value = logisticSerializer.parse(logistic)!;
  for (const modifier of selectedLogistic.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifiers.value.push(uModifier);
    lockedItemIds.value[uModifier.id] = logistic.name;
  }

  showLogisticList.value = false;
}

function clearLogistics() {
  clearLockedItems(selectedLogistic.value.name);
  selectedLogistic.value.name = '';
}

// ============= SKILL TABLE =============

const skillTableColumns: QTableProps['columns'] = [
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
    name: 'element',
    label: 'Element',
    field: 'element',
    align: 'left',
    sortable: true,
  },
  // This column shows both percent + flat damage, just use any field.
  {
    name: 'damage',
    label: 'Damage',
    field: 'damagePercent',
    align: 'left',
    sortable: true,
  },
  // This column will show either the frequency or that it's an aptitude effect.
  {
    name: 'frequency',
    label: 'Frequency (per minute)',
    field: 'frequency',
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

const skillInput = ref<Skill>({
  name: '',
  description: '',
  element: ElementType.Kinetic,
  damagePercent: 0,
  damageFlat: 0,
  frequency: 0,
  active: true,
  isAptitude: true,
  specialModifiers: [],
});

function addSkill() {
  const newSkill = UniqueSkill.fromSkill(skillInput.value);
  if (newSkill.isAptitude) {
    newSkill.frequency = 0;
  }
  uSkills.value.push(newSkill);
}

function deleteSkill(skill: UniqueSkill) {
  uSkills.value.splice(uSkills.value.indexOf(skill), 1);
}

// ============= MODIFIER TABLE =============

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

let isModifierTableEditValid = true;

function checkModifierTableEditValid() {
  return isModifierTableEditValid;
}

function validateModifierTableEditExists(value: any) {
  if (!!value) {
    isModifierTableEditValid = true;
    return true;
  }
  isModifierTableEditValid = false;
  return false;
}

function validateModifierTableEditNotNegative(value: any) {
  if (value !== '' && value >= 0) {
    isModifierTableEditValid = true;
    return true;
  }
  isModifierTableEditValid = false;
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

function getAlignmentIncrease(modifier: Modifier) {
  if (modifier.alignmentIncrease) {
    return (
      (modifier.alignmentIncrease * selectedOperative.value.alignmentIndex) /
      100
    );
  }
  return 0;
}

function sumModifiers(type: ModifierType, element?: ElementType) {
  return modifiersOfType(type, element).reduce(
    (a, b) => a + b.value + getAlignmentIncrease(b),
    0,
  );
}

function multiplyModifiers(type: ModifierType, element?: ElementType) {
  return modifiersOfType(type, element).reduce(
    (a, b) => a * (1 + (b.value + getAlignmentIncrease(b)) / 100),
    1,
  );
}

function modifiersOfType(type: ModifierType, element?: ElementType) {
  return uModifiers.value.filter(
    (value: UniqueModifier) =>
      value.active &&
      value.type === type &&
      // ElementType can be undefined or null if cleared in form.
      (!value.element || value.element === element),
  );
}

const modifierInput = ref<Modifier>({
  active: true,
  name: '',
  description: '',
  type: ModifierType.AtkPercent,
  value: 0,
});

const enableElementInput = computed<boolean>(() =>
  ELEMENT_ENABLED_MODIFIERS.includes(modifierInput.value.type),
);

watch(enableElementInput, (newValue) => {
  if (!newValue) {
    modifierInput.value.element = undefined;
  }
});

function addModifier() {
  uModifiers.value.push(UniqueModifier.fromModifier(modifierInput.value));
}

function deleteModifier(modifier: UniqueModifier) {
  uModifiers.value.splice(uModifiers.value.indexOf(modifier), 1);
}

// ============= DPS CALCULATION =============

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
  multiplyModifiers(ModifierType.FinalDamage),
);

const totalDamageTakenPercent = computed<number>(() =>
  sumModifiers(ModifierType.DamageTaken),
);

const elementalResistModifier = computed<number>(() =>
  sumModifiers(ModifierType.ElementalResist, selectedWeapon.value.element),
);

const defenseModifier = ref<number>(0.5);

const totalCritRate = computed<number>(
  () => baseCritRate.value + sumModifiers(ModifierType.CritRate),
);

const critDmgPercent = computed<number>(() => {
  const totalCritDmgAmp = 1 + sumModifiers(ModifierType.CritDmgAmp) / 100;
  return selectedWeapon.value.critDamage * totalCritDmgAmp;
});

const bulletDamage = computed<number>(() => {
  return (
    fullAtk.value *
    (selectedWeapon.value.compatibility / 100) *
    (1 + totalBuffPercent.value / 100) *
    multiplyModifiers(ModifierType.FinalBallisticDamage) *
    totalFinalDamagePercent.value *
    (1 + totalDamageTakenPercent.value / 100) *
    (1 + elementalResistModifier.value / 100) *
    defenseModifier.value
  );
});

const critBulletDamage = computed<number>(
  () => bulletDamage.value * (1 + critDmgPercent.value / 100),
);

function skillDamage(skill: Skill, critIfAble?: boolean): number {
  const baseDamage =
    (fullAtk.value * skill.damagePercent) / 100 + skill.damageFlat;
  let totalBuff = 0;
  if (
    !skill.specialModifiers ||
    skill.specialModifiers.indexOf(SkillBehaviorModifiers.SweetSoul) === -1
  ) {
    // Only add modifiers if the skill is by the on-field operative.
    totalBuff +=
      sumModifiers(ModifierType.ElementalDamage, skill.element) +
      sumModifiers(ModifierType.SkillDamage, skill.element) +
      sumModifiers(ModifierType.Generic, skill.element);
  }

  let totalDamage;
  if (
    skill.specialModifiers &&
    skill.specialModifiers.indexOf(SkillBehaviorModifiers.SweetSoul) >= 0
  ) {
    totalDamage =
      bulletDamage.value * (skill.damagePercent / 100) * defenseModifier.value;
  } else {
    totalDamage =
      baseDamage *
      (1 + totalBuff / 100) *
      totalFinalDamagePercent.value *
      multiplyModifiers(ModifierType.FinalSkillDamage) *
      (1 + totalDamageTakenPercent.value / 100) *
      (1 + sumModifiers(ModifierType.ElementalResist, skill.element) / 100) *
      defenseModifier.value;
  }

  const canCrit =
    skill.specialModifiers &&
    skill.specialModifiers.indexOf(SkillBehaviorModifiers.CanCrit) >= 0;
  const critMultiplier =
    canCrit && critIfAble ? 1 + critDmgPercent.value / 100 : 1;

  return totalDamage * critMultiplier;
}

function sumAptitudeDamage(critIfAble?: boolean): number {
  let damageTotal = 0;
  for (const skill of uSkills.value) {
    if (!skill.isAptitude || !skill.active) {
      continue;
    }

    damageTotal += skillDamage(skill, critIfAble);
  }
  return damageTotal;
}

const aptitudeDamage = computed<number>(sumAptitudeDamage);

const critAptitudeDamage = computed<number>(() => sumAptitudeDamage(true));

const skillDps = computed<number>(() => {
  let dpsTotal = 0;
  for (const skill of uSkills.value) {
    if (skill.isAptitude || !skill.active) {
      continue;
    }

    dpsTotal += (skillDamage(skill) * skill.frequency) / 60;
  }
  return dpsTotal;
});

/**
 * Calculates an average damage or dps value based on the operative's crit rate.
 */
function damageWithAvgCrits(damage: number, damageWithCrit?: number) {
  damageWithCrit = damageWithCrit || damage * (1 + critDmgPercent.value / 100);
  return (
    damage * (1 - totalCritRate.value / 100) +
    damageWithCrit * (totalCritRate.value / 100)
  );
}

const singleMagDamageNoCrits = computed<number>(
  () =>
    bulletDamage.value *
    selectedWeapon.value.ammoCapacity *
    (selectedWeapon.value.type === WeaponType.Shotgun ? 8 : 1),
);

const singleMagDamageAvgCrits = computed<number>(
  () =>
    damageWithAvgCrits(bulletDamage.value) *
    selectedWeapon.value.ammoCapacity *
    (selectedWeapon.value.type === WeaponType.Shotgun ? 8 : 1),
);

const singleMagAptitudeDamageAvgCrits = computed<number>(
  () =>
    damageWithAvgCrits(aptitudeDamage.value, critAptitudeDamage.value) *
    selectedWeapon.value.ammoCapacity *
    (selectedWeapon.value.type === WeaponType.Shotgun ? 8 : 1),
);

const timeToEmptyMag = computed<number>(() => {
  // No delay on first round.
  const roundToFire = selectedWeapon.value.ammoCapacity - 1;
  const rateOfFire =
    selectedWeapon.value.rateOfFire *
    (1 + sumModifiers(ModifierType.RateOfFire) / 100);
  return (roundToFire / rateOfFire) * 60;
});

const oneMagDpsAvgCrits = computed<number>(() => {
  return singleMagDamageAvgCrits.value / timeToEmptyMag.value;
});

const oneMagDpsNoCrits = computed<number>(() => {
  return singleMagDamageNoCrits.value / timeToEmptyMag.value;
});

const oneMagAptitudeDpsAvgCrits = computed<number>(() => {
  return singleMagAptitudeDamageAvgCrits.value / timeToEmptyMag.value;
});

const oneMagDpsAllCrit = computed<number>(() => {
  return oneMagDpsNoCrits.value * (1 + critDmgPercent.value / 100);
});

const sustainDpsNoCrits = computed<number>(() => {
  return (
    singleMagDamageNoCrits.value /
    (timeToEmptyMag.value + selectedWeapon.value.reloadSpeed)
  );
});

const sustainAptitudeDps = computed<number>(() => {
  return (
    singleMagAptitudeDamageAvgCrits.value /
    (timeToEmptyMag.value + selectedWeapon.value.reloadSpeed)
  );
});

const sustainDpsWithCrit = computed<number>(
  () =>
    (singleMagDamageNoCrits.value * (1 + critDmgPercent.value / 100)) /
    (timeToEmptyMag.value + selectedWeapon.value.reloadSpeed),
);

const avgSustainDps = computed<number>(() =>
  damageWithAvgCrits(sustainDpsNoCrits.value),
);
</script>
