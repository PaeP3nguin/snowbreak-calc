<template>
  <!--
    Operative base ATK * ATK% buffs * Weapon compatibility * crit damage multiplier
    * (total buff %) * final damage buff * damage taken debuffs
    * defense * elemental resist multiplier * shield multiplier -->
  <q-page>
    <div class="calculation-results">
      <div class="q-px-lg q-pt-sm">
        <div class="row">
          <div class="col">
            <h6 class="q-mt-sm q-mb-lg">Calculation results</h6>

            <div class="row justify-left">
              <div class="col-md-3">
                <p class="q-mb-none text-body1">
                  <b>Bullet damage:</b>
                  {{
                    bulletDamage(CritDamageCondition.NoCrit).toFixed(
                      decimalPlaces,
                    )
                  }}
                  <span v-if="sumAptitudeDamage(CritDamageCondition.NoCrit)">
                    +
                    {{
                      sumAptitudeDamage(CritDamageCondition.NoCrit).toFixed(
                        decimalPlaces,
                      )
                    }}
                    (aptitude)
                  </span>

                  <br />
                  <b>Bullet damage (crit):</b>
                  {{
                    bulletDamage(CritDamageCondition.Crit).toFixed(
                      decimalPlaces,
                    )
                  }}
                  <span v-if="sumAptitudeDamage(CritDamageCondition.Crit)">
                    +
                    {{
                      sumAptitudeDamage(CritDamageCondition.Crit).toFixed(
                        decimalPlaces,
                      )
                    }}
                    (aptitude)
                  </span>

                  <br />
                  <b>Crit rate: </b> {{ totalCritRate }}%
                  <br />
                  <b>Crit damage:</b> {{ critDmgPercent }}%
                </p>

                <p class="q-mt-md text-body1" v-if="showDetailedStats">
                  <b>Intermediate calculations:</b>
                  <br />
                  <b>Mag capacity including boosts:</b> {{ realAmmoCapacity }}
                  <br />
                  <b>Single mag damage (no crits):</b>
                  {{
                    oneMagDamage(CritDamageCondition.NoCrit).toFixed(
                      decimalPlaces,
                    )
                  }}
                  <br />
                  <b>Single mag non-weakspot damage:</b>
                  {{ oneMagDamageAvgCrits.toFixed(decimalPlaces) }}
                  <span v-if="oneMagAptitudeDamageAvgCrits">
                    +
                    {{ oneMagAptitudeDamageAvgCrits.toFixed(decimalPlaces) }}
                    (aptitude)
                  </span>
                  <br />
                  <b>Time to empty mag:</b>
                  {{ timeToEmptyMag.toFixed(2) }}
                  <br />
                  <br />
                  <b>Overall stats:</b>
                  <br />
                  <b>Base atk:</b> {{ totalBaseAtk }}
                  <br />
                  <b>ATK %:</b> {{ totalAtkPercent * 100 }}%
                  <br />
                  <b>Final ATK:</b> {{ fullAtk.toFixed(decimalPlaces) }}
                  <br />
                  <b>Total ballistic buff:</b> {{ totalBallisticBuffPercent }}%
                  <br />
                  <b>Total skill buff:</b> {{ totalSkillBuffPercent }}%
                  <br />
                  <b>Final damage modifier:</b> {{ totalFinalDamageBuff }}
                  <br />
                  <b>Damage taken:</b> {{ totalDamageTakenPercent }}%
                  <br />
                  <b>Elemental resist modifier:</b>
                  {{ elementalResistModifier }}%
                  <br />
                  <b>Defense modifier:</b> {{ defenseModifier }}
                </p>
              </div>

              <div class="col-auto">
                <div class="row text-body1">
                  <div class="col-auto q-mr-md">
                    <b>Single mag non-weakspot DPS:</b>
                    <br />
                    <b>Single mag weakspot DPS:</b>
                    <br />
                    <b>Sustained non-weakspot DPS: </b>
                    <br />
                    <b>Sustained weakspot DPS: </b>
                  </div>

                  <div class="col-auto">
                    {{ oneMagDpsText(CritDpsCondition.NonWeakspot) }}
                    <br />
                    {{ oneMagDpsText(CritDpsCondition.Weakspot) }}
                    <br />
                    {{ sustainDpsText(CritDpsCondition.NonWeakspot) }}
                    <br />
                    {{ sustainDpsText(CritDpsCondition.Weakspot) }}
                  </div>
                </div>

                <p class="q-mt-md text-body1" v-if="showDetailedStats">
                  <template v-for="skill in uSkills" v-bind:key="skill.id">
                    <b>{{ skill.name }}</b> :
                    {{
                      skillDamage(skill, CritDamageCondition.NoCrit).toFixed(
                        decimalPlaces,
                      )
                    }}
                    damage
                    <br />
                  </template>
                </p>
              </div>
            </div>
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
            <div>
              <q-toggle
                v-model="showDecimals"
                label="Show decimal places"></q-toggle>
            </div>
          </div>
        </div>
      </div>

      <q-separator class="q-my-lg"></q-separator>
    </div>

    <div class="q-pa-lg">
      <h6 class="q-my-lg">
        Operative:
        {{
          selectedOperative.name
            ? selectedOperative.name
            : 'None chosen (custom)'
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

      <template v-if="selectedOperative.name.includes('Blue Bolt')">
        <q-toggle
          v-model="isBlueBoltInSkill"
          label="In standard skill?"></q-toggle>
      </template>

      <p v-if="showExplanations">
        <b>Base ATK:</b> only the ATK from the operative. Pre-filled are level
        80 by default. Calculate for your own operatives from the "Basic Value"
        of ATK in "View Details", then subtract flat ATK from weapon and
        logistics.
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

        <template v-if="selectedWeapon.type === WeaponType.Crossbow">
          <q-radio
            v-for="mode in Object.values(CrossbowShootingMode)"
            v-bind:key="mode"
            v-model="crossbowShootingMode"
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
                <q-item-section class="text-h6">{{
                  weapon.name
                }}</q-item-section>

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

        <div class="col">
          <q-input
            type="number"
            v-model.number="selectedWeapon.reloadSpeed"
            filled
            label="Reload speed"
            mask="#"
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

      <div class="q-mb-md">
        <pick-logistics-button
          label="Pick logistics"
          :logistic-list="dpsLogisticList"
          @selected="mainLogisticChosen"></pick-logistics-button>

        <q-btn
          class="q-ml-md"
          label="Clear logistics"
          color="negative"
          @click="clearLogistics"
          :disable="!selectedLogistic.name"></q-btn>
      </div>

      <p v-if="showExplanations">
        <b>Rarity/level:</b> Rarity and levels are just used to calculate flat
        ATK and ATK% values.
        <br />
        <b>Disclaimer:</b> the flat ATK values are approximate when not at max
        level as different logistics have slightly different flat ATK values. At
        level 15 they use accurate in-game values.
      </p>

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
        <b>Aptitude effect:</b> Aptitude effects are additional damage that
        apply to each bullet, like Discordance, Fury, or Fritia - Little
        Sunshine support
        <br />
        <b>Frequency:</b> Number of times per minute the skill procs. Adjust
        based on the cooldown and S-Energy cost.
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
                :rules="[
                  (val) => val >= 0 || 'Damage percent must non-negative',
                ]"
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
                <span v-if="props.row.alignmentIncrease">
                  {{
                    `${props.row.damagePercent}% + ${getAlignmentIncrease(
                      props.row,
                    )}% + ${props.row.damageFlat}`
                  }}
                </span>
                <span v-else>
                  {{ `${props.row.damagePercent}% + ${props.row.damageFlat}` }}
                </span>
              </q-td>

              <q-td key="frequency" :props="props">
                {{
                  props.row.isAptitude
                    ? 'Aptitude effect (every bullet)'
                    : props.row.frequency.toFixed(2)
                }}
              </q-td>

              <q-td key="specialModifier" :props="props">
                {{ props.row.specialModifiers || 'N/A' }}
              </q-td>

              <q-td key="actions" :props="props" auto-width>
                <div>
                  <q-btn
                    flat
                    round
                    :icon="
                      props.row.lockSource
                        ? 'mdi-delete-off-outline'
                        : 'mdi-delete'
                    "
                    :disable="!!props.row.lockSource"
                    @click="deleteSkill(props.row)">
                  </q-btn>

                  <q-tooltip class="text-body2" v-if="props.row.lockSource">
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
        <b>Element:</b> Element is only needed if a buff should be restricted to
        a particular element, such as the elemental damage boost from 3* weapons
        or the Kinetic/Chaos callistic damage boost from 4* Troubadour logistics
        set.
        <br />
        <b>Value:</b> Enter any percentages as whole numbers, ex. 30% should be
        entered as a value of 30
        <br />
        <b>Editing:</b> Click on any cell to edit it.
      </p>

      <div class="q-mb-md">
        <add-support-operative-button
          @selected="addSupportOperative"></add-support-operative-button>

        <pick-logistics-button
          class="q-ml-md"
          label="Add support logistics"
          :logistic-list="supportLogisticList"
          @selected="supportLogisticChosen"></pick-logistics-button>

        <q-btn
          class="q-ml-md"
          label="Clear unlocked modifiers"
          color="negative"
          @click="clearUnlockedModifiers"
          :disable="!canClearUnlocked"></q-btn>
      </div>

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
              use-input
              hide-selected
              fill-input
              @filter="modifierTypeFilter"
              :options="modifierTypeOptions"
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

            <q-td key="lock" :props="props" auto-width>
              <div>
                <q-btn
                  flat
                  round
                  :icon="
                    props.row.lockSource ? 'mdi-lock' : 'mdi-lock-open-variant'
                  "
                  :disable="
                    props.row.lockSource && props.row.lockSource !== MANUAL_LOCK
                  "
                  @click="toggleModifierLock(props.row)">
                </q-btn>

                <q-tooltip
                  class="text-body2"
                  v-if="
                    props.row.lockSource && props.row.lockSource !== MANUAL_LOCK
                  ">
                  Added by a operative, weapon, or logistic
                </q-tooltip>
              </div>
            </q-td>

            <q-td key="delete" :props="props" auto-width>
              <div>
                <q-btn
                  flat
                  round
                  :icon="
                    props.row.lockSource
                      ? 'mdi-delete-off-outline'
                      : 'mdi-delete'
                  "
                  :disable="props.row.lockSource"
                  @click="deleteModifier(props.row)">
                </q-btn>

                <q-tooltip
                  class="text-body2"
                  v-if="
                    props.row.lockSource && props.row.lockSource === MANUAL_LOCK
                  ">
                  Unlock to allow deletion
                </q-tooltip>
                <q-tooltip class="text-body2" v-else-if="props.row.lockSource"
                  >Added by a operative, weapon, or logistic
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
// Calculation results are sticky to the top of the page.
.calculation-results {
  position: sticky;
  top: 50px;
  z-index: 99;
  background-color: $dark-page;
}

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
import AddSupportOperativeButton from 'src/components/AddSupportOperativeButton.vue';
import PickLogisticsButton from 'src/components/PickLogisticsButton.vue';
import { DPS_LOGISTICS } from 'src/data/logistics/dps_logistics';
import { SUPPORT_LOGISTICS } from 'src/data/logistics/support_logistics';
import {
  OPERATIVES,
  Operative,
  operativeSerializer,
} from 'src/data/operatives';
import { Skill, SkillBehaviorModifiers, UniqueSkill } from 'src/data/skill';
import { Logistic, logisticSerializer } from 'src/models/logistic';
import { SupportOperative } from 'src/models/support-operative';
import { useCalcSettingsStore } from 'src/stores/calc-settings-store';
import { computed, ref, watch } from 'vue';

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
const { showExplanations, showDetailedStats, showDecimals } = storeToRefs(
  useCalcSettingsStore(),
);

const decimalPlaces = computed<number>(() => (showDecimals.value ? 2 : 0));

const uModifiers = ref<Array<UniqueModifier>>([]);
const uSkills = ref<Array<UniqueSkill>>([]);

/**
 * Clears any locked items from the given source name.
 *
 * @param lockSourceName name of a weapon, logistics, or operative that added modifiers
 */
function clearLockedItems(lockSourceName: string) {
  // Iterate in reverse order since we're removing by index.
  for (var i = uModifiers.value.length - 1; i >= 0; i--) {
    if (uModifiers.value[i].lockSource !== lockSourceName) {
      continue;
    }

    uModifiers.value.splice(i, 1);
  }

  // Iterate in reverse order since we're removing by index.
  for (var i = uSkills.value.length - 1; i >= 0; i--) {
    if (uSkills.value[i].lockSource !== lockSourceName) {
      continue;
    }

    uSkills.value.splice(i, 1);
  }
}

/**
 * Clears any unlocked modifiers.
 */
function clearUnlockedModifiers() {
  // Iterate in reverse order since we're removing by index.
  for (var i = uModifiers.value.length - 1; i >= 0; i--) {
    if (uModifiers.value[i].lockSource) {
      continue;
    }

    uModifiers.value.splice(i, 1);
  }
}

const canClearUnlocked = computed<boolean>(() => {
  const lockedCount = uModifiers.value.filter(
    (modifier) => modifier.lockSource,
  ).length;
  return uModifiers.value.length > lockedCount;
});

// ============= OPERATIVE SELECTION =============

const operativeList = computed<Array<Operative>>(() => OPERATIVES);

const showOperativeList = ref(false);

const selectedOperative = ref<Operative>(
  // Putting a value here just so the type is guaranteed to exist.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  operativeSerializer.parse(operativeList.value[0])!,
);

/**
 * If true, the Katya - Blue Bolt operative is in her standard skill, which decreases her final
 * damage by a percentage but greatly buffs her rate of fire.
 */
const isBlueBoltInSkill = ref(false);

watch(isBlueBoltInSkill, () => {
  updateCrossbowStats();

  // Turn on standard skill damage reduction effect.
  const modifierName =
    selectedOperative.value.manifestLevel < 4
      ? 'Blue Bolt standard skill damage reduction (before M4)'
      : 'Blue Bolt standard skill damage reduction (M4)';
  for (const modifier of uModifiers.value) {
    if (modifier.name === modifierName) {
      modifier.active = isBlueBoltInSkill.value;
    }
  }
});

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

  // Clear operative-specific modifiers.
  isBlueBoltInSkill.value = false;

  // Select new operative.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedOperative.value = operativeSerializer.parse(operative)!;

  // Add modifiers.
  for (const modifier of selectedOperative.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifier.lockSource = operative.name;
    uModifiers.value.push(uModifier);
  }

  if (selectedOperative.value.skillDamage) {
    // Add skill damage sources.
    for (const skill of selectedOperative.value.skillDamage) {
      const uSkill = UniqueSkill.fromSkill(skill);
      uSkill.lockSource = operative.name;
      uSkills.value.push(uSkill);
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

/**
 * Stores a copy of the weapon before any shooting mode customizations. Used to restore stats after disabling shooting
 * mode customization.
 *
 * No need to make a deep copy, the initial value will be overwritten by the initial `weaponChosen` call anyways.
 */
let baseWeapon: Weapon = selectedWeapon.value;

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
 * Overwrite gun stats for different Winter Solstice shooting modes.
 */
watch(
  winterSolsticeShootingMode,
  (after: WinterSolsticeShootingMode, before: WinterSolsticeShootingMode) => {
    // Restore original stats before applying overlay.
    selectedWeapon.value.element = baseWeapon.element;
    selectedWeapon.value.compatibility = baseWeapon.compatibility;
    selectedWeapon.value.rateOfFire = baseWeapon.rateOfFire;
    selectedWeapon.value.ammoCapacity = baseWeapon.ammoCapacity;
    selectedWeapon.value.critDamage = baseWeapon.critDamage;

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

enum CrossbowShootingMode {
  Normal = 'Normal',
  Spread = 'Spread fire (5x shot spread)',
}

const crossbowShootingMode = ref<CrossbowShootingMode>(
  CrossbowShootingMode.Normal,
);

watch(crossbowShootingMode, updateCrossbowStats);

/**
 * Update the weapon stats for the given crossbow based on its shooting mode and whether or not
 * Katya is in her standard skill, if applicable.
 */
function updateCrossbowStats() {
  if (selectedWeapon.value.type !== WeaponType.Crossbow) {
    // If it's not a crossbow, don't do anything
    return;
  }

  // Restore original stats before applying overlay.
  selectedWeapon.value.compatibility = baseWeapon.compatibility;
  selectedWeapon.value.rateOfFire = baseWeapon.rateOfFire;

  if (crossbowShootingMode.value === CrossbowShootingMode.Normal) {
    selectedWeapon.value.rateOfFire = isBlueBoltInSkill.value ? 480 : 150;
    selectedWeapon.value.compatibility = 112.78;
  } else {
    selectedWeapon.value.rateOfFire = isBlueBoltInSkill.value ? 240 : 85;
    selectedWeapon.value.compatibility = 45.82;
  }
}

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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  baseWeapon = weaponSerializer.parse(weapon)!;

  // Turn off the Winter Solstice ult gun when swapping guns.
  winterSolsticeShootingMode.value = WinterSolsticeShootingMode.Normal;
  // Reset crossbow shooting mode when swapping guns.
  crossbowShootingMode.value = CrossbowShootingMode.Normal;

  const oldWeaponName = selectedWeapon.value.name;

  // Clear out old locked modifiers.
  clearLockedItems(oldWeaponName);

  // Select new weapon.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedWeapon.value = weaponSerializer.parse(weapon)!;

  // Add modifiers.
  for (const modifier of selectedWeapon.value.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifier.lockSource = weapon.name;
    uModifiers.value.push(uModifier);
  }

  if (selectedWeapon.value.skillDamage) {
    // Add skill damage sources.
    for (const skill of selectedWeapon.value.skillDamage) {
      const uSkill = UniqueSkill.fromSkill(skill);
      uSkill.lockSource = weapon.name;
      uSkills.value.push(uSkill);
    }
  }

  if (selectedWeapon.value.type === WeaponType.Crossbow) {
    // Apply crossbow shooting mode/skill again
    updateCrossbowStats();
  }

  showWeaponList.value = false;
}

function clearWeapon() {
  clearLockedItems(selectedWeapon.value.name);
  selectedWeapon.value.name = '';
}

// ============= LOGISTICS SELECTION =============

const dpsLogisticList = DPS_LOGISTICS;
const supportLogisticList = SUPPORT_LOGISTICS;

const selectedLogistic = ref<Logistic>({
  name: '',
  rarity: Rarity.Orange,
  maxAtk: 0,
  levelL: 15,
  levelM: 15,
  levelR: 15,
  modifiers2: [],
  modifiers3: [],
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
  // Use fake values for lower levels, then actual value at max level.
  function individualAtk(level: number, rarity: Rarity): number {
    if (rarity === Rarity.Orange) {
      return [
        7,
        12,
        18,
        24,
        30,
        36,
        42,
        48,
        55,
        61,
        67,
        74,
        80,
        87,
        93,
        selectedLogistic.value.maxAtk / 2,
      ][level];
    } else if (rarity === Rarity.Purple) {
      return [
        6,
        12,
        17,
        23,
        29,
        34,
        40,
        46,
        52,
        58,
        64,
        70,
        selectedLogistic.value.maxAtk / 2,
      ][level];
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

function addLogisticModifiers(logistic: Logistic, lock = true) {
  if (logistic.modifiers2) {
    for (const modifier of logistic.modifiers2) {
      const uModifier = UniqueModifier.fromModifier(modifier);
      if (lock) {
        uModifier.lockSource = logistic.name;
      }
      uModifiers.value.push(uModifier);
    }
  }

  if (logistic.modifiers3) {
    for (const modifier of logistic.modifiers3) {
      const uModifier = UniqueModifier.fromModifier(modifier);
      if (lock) {
        uModifier.lockSource = logistic.name;
      }
      uModifiers.value.push(uModifier);
    }
  }
}

function mainLogisticChosen(logistic: Logistic) {
  const oldLogisticName = selectedLogistic.value.name;
  if (oldLogisticName === logistic.name) {
    // Same logistic selected.
    return;
  }

  // Clear out old locked modifiers.
  clearLockedItems(oldLogisticName);

  // Select new logistic and add modifiers.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  selectedLogistic.value = logisticSerializer.parse(logistic)!;
  addLogisticModifiers(selectedLogistic.value);
}

/**
 * Adds a support logistic.
 *
 * These do not haev any special handling and are not locked.
 */
function supportLogisticChosen(logistic: Logistic) {
  addLogisticModifiers(logistic, false);
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
    headerStyle: 'min-width: 90px;',
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
    name: 'specialModifier',
    label: 'Special modifiers',
    field: 'specialModifiers',
    align: 'left',
    sortable: false,
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
    headerStyle: 'min-width: 90px;',
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
    name: 'lock',
    label: 'Lock?',
    // This column is just used to show the lock/unlock action button, just use any field.
    field: 'value',
    align: 'left',
  },
  {
    name: 'delete',
    label: 'Delete',
    // This column is just used to show the delete action button, just use any field.
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

function getAlignmentIncrease(modifierOrSkill: Modifier | Skill) {
  if (modifierOrSkill.alignmentIncrease) {
    return (
      (modifierOrSkill.alignmentIncrease *
        selectedOperative.value.alignmentIndex) /
      100
    );
  }
  return 0;
}

function sumModifiers(
  type: ModifierType,
  element?: ElementType,
  skillName?: string,
) {
  return modifiersOfType(type, element, skillName).reduce(
    (a, b) => a + b.value + getAlignmentIncrease(b),
    0,
  );
}

function multiplyModifiers(
  type: ModifierType,
  element?: ElementType,
  skillName?: string,
) {
  return modifiersOfType(type, element, skillName).reduce(
    (a, b) => a * (1 + (b.value + getAlignmentIncrease(b)) / 100),
    1,
  );
}

/**
 * Returns a list of all modifiers with the given type.
 *
 * @param type modifier type to find
 * @param element specific element to filter for
 * @param skillName skill name to match with skill modifiers that have targets
 */
function modifiersOfType(
  type: ModifierType,
  element?: ElementType,
  skillName?: string,
): Array<UniqueModifier> {
  return uModifiers.value.filter(function (value: UniqueModifier) {
    const skillTargetMatches = !(
      !!skillName &&
      !!value.target &&
      skillName.indexOf(value.target) === -1
    );
    return (
      value.active &&
      value.type === type &&
      skillTargetMatches &&
      // ElementType can be undefined or null if cleared in form.
      (!value.element || value.element === element)
    );
  });
}

const modifierInput = ref<Modifier>({
  active: true,
  name: '',
  description: '',
  type: ModifierType.AtkPercent,
  value: 0,
});

// Auto complete for modifier type input.
var modifierTypeOptions = ref(Object.values(ModifierType));
function modifierTypeFilter(
  input: string,
  update: (callbackFn: () => void) => void,
) {
  update(() => {
    const search = input.toLocaleLowerCase();
    modifierTypeOptions.value = Object.values(ModifierType).filter(
      (v) => v.toLocaleLowerCase().indexOf(search) > -1,
    );
  });
}

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

function addSupportOperative(operative: SupportOperative) {
  for (const modifier of operative.modifiers) {
    const uModifier = UniqueModifier.fromModifier(modifier);
    uModifiers.value.push(uModifier);
  }
}

function deleteModifier(modifier: UniqueModifier) {
  uModifiers.value.splice(uModifiers.value.indexOf(modifier), 1);
}

const MANUAL_LOCK = 'manual-lock-source';

function toggleModifierLock(modifier: UniqueModifier) {
  const isManualLocked = modifier.lockSource === MANUAL_LOCK;
  modifier.lockSource = isManualLocked ? undefined : MANUAL_LOCK;
}

// ============= DPS CALCULATION =============

/** Different conditions for calculating critical damage of a single attack. */
enum CritDamageCondition {
  /** Calculate assuming the attack doesn't crit. */
  NoCrit,

  /** Calculate assuming the attack crits. */
  Crit,
}

/** Different conditions for calculating damage per second. */
enum CritDpsCondition {
  /** Calculate hitting a non-weakspot, with average crits from on the operative's crit rate. */
  NonWeakspot,

  /**
   * Calculate hitting a weakspot. Aptitude damage that can crit will still only crit based on
   * crit rate.
   */
  Weakspot,
}

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

const totalBallisticBuffPercent = computed<number>(
  () =>
    sumModifiers(ModifierType.ElementalDamage, selectedWeapon.value.element) +
    sumModifiers(ModifierType.BallisticDamage, selectedWeapon.value.element) +
    sumModifiers(ModifierType.Generic, selectedWeapon.value.element),
);

const totalSkillBuffPercent = computed<number>(
  () =>
    sumModifiers(ModifierType.ElementalDamage, selectedWeapon.value.element) +
    sumModifiers(ModifierType.SkillDamage, selectedWeapon.value.element) +
    sumModifiers(ModifierType.Generic, selectedWeapon.value.element),
);

const totalFinalDamageBuff = computed<number>(() =>
  multiplyModifiers(ModifierType.FinalDamage),
);

const totalDamageTakenPercent = computed<number>(() =>
  sumModifiers(ModifierType.DamageTaken),
);

const elementalResistModifier = computed<number>(() =>
  sumModifiers(ModifierType.ElementalResist, selectedWeapon.value.element),
);

const defenseModifier = computed<number>(() => {
  // All enemies (that we've tested) have 1000 defense.
  const baseDefense = 1000;
  const totalFlatReduction = sumModifiers(ModifierType.FlatDefenseReduction);
  const totalDefPen = sumModifiers(ModifierType.DefensePenetration) / 100;
  return (
    1 / (1 + (baseDefense * (1 - totalDefPen) - totalFlatReduction) / 1000)
  );
});

/**
 * Total modifier to damage for debuffs and defense.
 */
function enemyModifier(element: ElementType): number {
  return (
    (1 + totalDamageTakenPercent.value / 100) *
    (1 + sumModifiers(ModifierType.ElementalResist, element) / 100) *
    defenseModifier.value
  );
}

const totalCritRate = computed<number>(
  () => baseCritRate.value + sumModifiers(ModifierType.CritRate),
);

const critDmgPercent = computed<number>(() => {
  const totalCritDmgAmp = 1 + sumModifiers(ModifierType.CritDmgAmp) / 100;
  return selectedWeapon.value.critDamage * totalCritDmgAmp;
});

function bulletDamage(critCondition: CritDamageCondition): number {
  const critMultiplier =
    critCondition === CritDamageCondition.Crit
      ? 1 + critDmgPercent.value / 100
      : 1;
  return (
    fullAtk.value *
    (selectedWeapon.value.compatibility / 100) *
    critMultiplier *
    (1 + totalBallisticBuffPercent.value / 100) *
    multiplyModifiers(ModifierType.FinalBallisticDamage) *
    totalFinalDamageBuff.value *
    enemyModifier(selectedWeapon.value.element)
  );
}

function skillHasModifier(
  skill: Skill,
  modifier: SkillBehaviorModifiers,
): boolean {
  return (
    !!skill.specialModifiers && skill.specialModifiers.indexOf(modifier) >= 0
  );
}

function skillDamage(skill: Skill, critCondition: CritDamageCondition): number {
  let baseDamage =
    (fullAtk.value * (skill.damagePercent + getAlignmentIncrease(skill))) /
      100 +
    skill.damageFlat;
  let totalBuff =
    sumModifiers(ModifierType.ElementalDamage, skill.element, skill.name) +
    sumModifiers(ModifierType.SkillDamage, skill.element, skill.name) +
    sumModifiers(ModifierType.Generic, skill.element, skill.name);

  if (skillHasModifier(skill, SkillBehaviorModifiers.CloudShot)) {
    // Cloud shot can be buffed by ballistic damage.
    totalBuff += sumModifiers(ModifierType.BallisticDamage, skill.element);
  }

  if (skillHasModifier(skill, SkillBehaviorModifiers.Auxiliary)) {
    // Auxiliary units are only buffed by Auxiliary damage
    totalBuff = sumModifiers(ModifierType.AuxiliaryDamage, skill.element);
  }

  const totalBuffMultiplier =
    (1 + totalBuff / 100) *
    totalFinalDamageBuff.value *
    multiplyModifiers(ModifierType.FinalSkillDamage, skill.element, skill.name);

  let totalDamage =
    baseDamage * totalBuffMultiplier * enemyModifier(skill.element);

  if (skillHasModifier(skill, SkillBehaviorModifiers.BasedOnBulletDamage)) {
    baseDamage = bulletDamage(critCondition) * (skill.damagePercent / 100);

    // All current BasedOnBulletDamage effects are only affected by skill damage.
    totalBuff = sumModifiers(
      ModifierType.SkillDamage,
      skill.element,
      skill.name,
    );

    totalDamage = baseDamage * (1 + totalBuff / 100);
    if (skillHasModifier(skill, SkillBehaviorModifiers.RecalculateDefense)) {
      totalDamage *= enemyModifier(skill.element);
    }
  }

  const canCrit =
    skillHasModifier(skill, SkillBehaviorModifiers.CanCrit) ||
    skillHasModifier(skill, SkillBehaviorModifiers.CanCritWeakspot);
  const shouldCrit = critCondition == CritDamageCondition.Crit;
  const critMultiplier =
    canCrit && shouldCrit ? 1 + critDmgPercent.value / 100 : 1;

  return totalDamage * critMultiplier;
}

function sumAptitudeDamage(critCondition: CritDamageCondition) {
  let damageTotal = 0;
  for (const skill of uSkills.value) {
    if (!skill.isAptitude || !skill.active) {
      continue;
    }

    const isCrossbowSpread =
      selectedWeapon.value.type === WeaponType.Crossbow &&
      crossbowShootingMode.value === CrossbowShootingMode.Spread;
    const damageMultiplier = isCrossbowSpread ? 0.4 : 1;

    damageTotal += skillDamage(skill, critCondition) * damageMultiplier;
  }
  return damageTotal;
}

function skillDps(critCondition: CritDpsCondition) {
  let dpsTotal = 0;
  for (const skill of uSkills.value) {
    if (skill.isAptitude || !skill.active) {
      continue;
    }

    let skillDmgResult = skillDamage(skill, CritDamageCondition.NoCrit);
    if (skillHasModifier(skill, SkillBehaviorModifiers.CanCrit)) {
      // If the skill can crit, calculate average damage.
      skillDmgResult = damageWithAvgCrits(
        skillDamage(skill, CritDamageCondition.NoCrit),
        skillDamage(skill, CritDamageCondition.Crit),
      );
    } else if (
      skillHasModifier(skill, SkillBehaviorModifiers.CanCritWeakspot) &&
      critCondition === CritDpsCondition.Weakspot
    ) {
      // If hitting weakspot, let the skill crit.
      skillDmgResult = skillDamage(skill, CritDamageCondition.Crit);
    }
    dpsTotal += (skillDmgResult * skill.frequency) / 60;
  }
  return dpsTotal;
}

/**
 * Calculates an average damage or dps value based on the operative's crit rate.
 */
function damageWithAvgCrits(damage: number, damageWithCrit: number) {
  return (
    damage * (1 - totalCritRate.value / 100) +
    damageWithCrit * (totalCritRate.value / 100)
  );
}

/**
 * Ammo capacity after boost buffs, like Swift Deiwos.
 */
const realAmmoCapacity = computed<number>(
  () =>
    selectedWeapon.value.ammoCapacity + sumModifiers(ModifierType.MagSizeBoost),
);

function oneMagDamage(critCondition: CritDamageCondition): number {
  return (
    bulletDamage(critCondition) *
    realAmmoCapacity.value *
    (selectedWeapon.value.type === WeaponType.Shotgun ? 8 : 1)
  );
}

const oneMagDamageAvgCrits = computed<number>(() =>
  damageWithAvgCrits(
    oneMagDamage(CritDamageCondition.NoCrit),
    oneMagDamage(CritDamageCondition.Crit),
  ),
);

function oneMagAptitudeDamage(critCondition: CritDamageCondition): number {
  return (
    sumAptitudeDamage(critCondition) *
    realAmmoCapacity.value *
    (selectedWeapon.value.type === WeaponType.Shotgun ? 8 : 1)
  );
}

const oneMagAptitudeDamageAvgCrits = computed<number>(() =>
  damageWithAvgCrits(
    oneMagAptitudeDamage(CritDamageCondition.NoCrit),
    oneMagAptitudeDamage(CritDamageCondition.Crit),
  ),
);

const totalRateOfFire = computed<number>(
  () =>
    selectedWeapon.value.rateOfFire *
    (1 + sumModifiers(ModifierType.RateOfFire) / 100),
);

const timeToEmptyMag = computed<number>(() => {
  // No delay on first round.
  const roundToFire = realAmmoCapacity.value - 1;
  return (roundToFire / totalRateOfFire.value) * 60;
});

function oneMagDps(critCondition: CritDpsCondition): number {
  const damage =
    critCondition === CritDpsCondition.NonWeakspot
      ? oneMagDamageAvgCrits.value
      : oneMagDamage(CritDamageCondition.Crit);
  return damage / timeToEmptyMag.value;
}

function oneMagAptitudeDps(critCondition: CritDpsCondition): number {
  const damage =
    critCondition === CritDpsCondition.NonWeakspot
      ? oneMagAptitudeDamageAvgCrits.value
      : oneMagAptitudeDamage(CritDamageCondition.Crit);
  return damage / timeToEmptyMag.value;
}

function sustainDps(critCondition: CritDpsCondition): number {
  if (selectedWeapon.value.type === WeaponType.Crossbow) {
    // Crossbows have unlimited mag.
    const shotsFired =
      crossbowShootingMode.value === CrossbowShootingMode.Normal ? 1 : 5;
    return (
      (bulletDamage(CritDamageCondition.NoCrit) *
        shotsFired *
        totalRateOfFire.value) /
      60
    );
  }
  const damage =
    critCondition === CritDpsCondition.NonWeakspot
      ? oneMagDamageAvgCrits.value
      : oneMagDamage(CritDamageCondition.Crit);
  return damage / (timeToEmptyMag.value + selectedWeapon.value.reloadSpeed);
}

function sustainAptitudeDps(critCondition: CritDpsCondition): number {
  if (selectedWeapon.value.type === WeaponType.Crossbow) {
    // Crossbows have unlimited mag.
    const shotsFired =
      crossbowShootingMode.value === CrossbowShootingMode.Normal ? 1 : 5;
    return (
      (sumAptitudeDamage(CritDamageCondition.NoCrit) *
        shotsFired *
        totalRateOfFire.value) /
      60
    );
  }
  const damage =
    critCondition === CritDpsCondition.NonWeakspot
      ? oneMagAptitudeDamageAvgCrits.value
      : oneMagAptitudeDamage(CritDamageCondition.Crit);
  return damage / (timeToEmptyMag.value + selectedWeapon.value.reloadSpeed);
}

function damageText(
  ballisticDmg: number,
  skillDmg: number,
  aptitudeDmg: number,
): string {
  const sumDmg = ballisticDmg + skillDmg + aptitudeDmg;
  if (sumDmg === ballisticDmg) {
    return ballisticDmg.toFixed(decimalPlaces.value);
  }

  let text = `${sumDmg.toFixed(decimalPlaces.value)} = ${ballisticDmg.toFixed(
    decimalPlaces.value,
  )}`;
  if (skillDmg) {
    text += ` + ${skillDmg.toFixed(decimalPlaces.value)} (skill)`;
  }
  if (aptitudeDmg) {
    text += ` + ${aptitudeDmg.toFixed(decimalPlaces.value)} (aptitude)`;
  }
  return text;
}

function oneMagDpsText(critCondition: CritDpsCondition): string {
  if (selectedWeapon.value.type === WeaponType.Crossbow) {
    // Crossbows have unlimited mag size.
    return 'N/A';
  }

  const ballisticDpsResult = oneMagDps(critCondition);
  const skillDpsResult = skillDps(critCondition);
  const aptitudeDpsResult = oneMagAptitudeDps(critCondition);
  return damageText(ballisticDpsResult, skillDpsResult, aptitudeDpsResult);
}

function sustainDpsText(critCondition: CritDpsCondition): string {
  if (winterSolsticeShootingMode.value !== WinterSolsticeShootingMode.Normal) {
    // Winter Solstice shooting modes aren't 'sustained'
    return 'N/A';
  }

  const ballisticDpsResult = sustainDps(critCondition);
  const skillDpsResult = skillDps(critCondition);
  const aptitudeDpsResult = sustainAptitudeDps(critCondition);
  return damageText(ballisticDpsResult, skillDpsResult, aptitudeDpsResult);
}
</script>
