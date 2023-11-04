import {
  Modifier,
  ModifierType,
  modifierSerializer,
} from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';
import { WeaponType } from './weapons';
import { Rarity } from './rarity';
import { Skill } from './skill';

/**
 * Represents a support operative with a full loadout and all of their weapons. Not for
 * fine-grained calculation, more just a preset template with all of their info.
 */
interface SupportOperativeModel {
  name: string;
  /** Extra info on the support operative particulars like loadout, stats, etc. */
  description: string;
  baseAtk: number;
  baseHp: number;
  weaponType: WeaponType;

  /** Optional name of the support gun they're using, in order to show a picture. */
  weaponName?: string;
  rarity: Rarity;

  /** May include modifiers for a particular support weapon too. */
  modifiers: Array<Modifier>;
  skillDamage?: Array<Skill>;
}

@jsonObject
class SupportOperative implements SupportOperativeModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(String)
  description!: string;

  @jsonMember(Number)
  baseAtk!: number;

  @jsonMember(Number)
  baseHp!: number;

  @jsonMember(String)
  weaponType!: WeaponType;

  @jsonMember(String)
  weaponName?: string;

  @jsonMember(String)
  rarity!: Rarity;

  @jsonArrayMember(Modifier)
  modifiers!: Array<Modifier>;

  @jsonArrayMember(Skill)
  skillDamage?: Array<Skill>;
}

const supportOperativeSerializer = new TypedJSON(SupportOperative);

function buildOperativeLoadout(
  operative: SupportOperative,
  modifiers: Array<Modifier>,
  description: string,
  weaponName?: string,
): SupportOperative {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  // Make copies of everything so modifications won't change the actual values.
  const operativeCopy = supportOperativeSerializer.parse(operative)!;
  operativeCopy.modifiers = operativeCopy.modifiers.concat(
    modifiers.map((modifier) => modifierSerializer.parse(modifier)!),
  );
  operativeCopy.description = description;
  operativeCopy.weaponName = weaponName;
  /* eslint-enable */
  return operativeCopy;
}

const SHADOW_KA_BASE: SupportOperative = {
  name: 'Mauxir - Shadow Ka',
  description: '',
  baseAtk: 1472,
  baseHp: 27375,
  weaponType: WeaponType.SMG,
  rarity: Rarity.Orange,
  modifiers: [
    {
      active: true,
      name: 'Shadow Ka - support skill',
      description: 'Shooting Kebechet transfers 110% of damage dealt.',
      type: ModifierType.FinalDamage,
      value: 10,
    },
    {
      active: false,
      name: 'Shadow Ka - support skill (M5)',
      description: 'Shooting Kebechet transfers 120% of damage dealt.',
      type: ModifierType.FinalDamage,
      value: 20,
    },
    {
      active: false,
      name: 'Shadow Ka - deiwos',
      description:
        '1 shot every 10 seconds is a guaranteed crit and gains 140% crit DMG amp (300 index)',
      type: ModifierType.CritDmgAmp,
      value: 140,
    },
    {
      active: false,
      name: 'Shadow Ka - deiwos (max alignment)',
      description:
        '1 shot every 10 seconds is a guaranteed crit and gains 203.6% crit DMG amp (300 index + 3 max rolls)',
      type: ModifierType.CritDmgAmp,
      value: 80 + 20 * 6.18,
    },
  ],
};
/**
 * No HP parts, +0 logis, no HP talents, M2
 * Loadout HP = (27375+210)*(1+.54+.04+.04) = 44688
 */
const alloyTruthLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Alloy Truth - passive',
    description: 'Using support skill grants 15% crit dmg amp for 15s.',
    type: ModifierType.CritDmgAmp,
    value: 15,
  },
  {
    active: true,
    name: 'Alloy Truth - passive',
    description:
      'Using support skill grants 1.8% loadout HP of ATK for 15s. Based on 44688 loadout HP.',
    type: ModifierType.FlatAtk,
    value: Math.round(44688 * 0.018),
  },
  {
    active: false,
    name: 'Alloy Truth - passive (T2)',
    description:
      'Using support skill grants 3% loadout HP of ATK for 15s. Based on 44688 loadout HP.',
    type: ModifierType.FlatAtk,
    value: Math.round(44688 * 0.03),
  },
];
/**
 * Full HP parts, +15 logis, 3x10% HP talents, M5
 * Loadout HP = (27375+113+89+106+75+3164)*(1+.54+.3+.2+.1) = 66173
 */
const alloyTruthMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Alloy Truth - passive',
    description: 'Using support skill grants 15% crit dmg amp for 15s.',
    type: ModifierType.CritDmgAmp,
    value: 15,
  },
  {
    active: true,
    name: 'Alloy Truth - passive',
    description:
      'Using support skill grants 1.8% loadout HP of ATK for 15s. Based on 66173 loadout HP.',
    type: ModifierType.FlatAtk,
    value: Math.round(66173 * 0.018),
  },
  {
    active: false,
    name: 'Alloy Truth - passive',
    description:
      'Using support skill grants 3% loadout HP of ATK for 15s. Based on 66173 loadout HP.',
    type: ModifierType.FlatAtk,
    value: Math.round(66173 * 0.03),
  },
];
/**
 * No HP parts, +0 logis, no HP talents, M2
 * Loadout HP = (27375+210)*(1+.33+.04+.04) = 38894
 */
const waveLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Wave - passive (T5)',
    description:
      'Grants 0.2% loadout HP of ATK every time support skill does damage, max 10 stacks. Based on 38894 loadout HP and half effectiveness due to very slow stacking w/ Mauxir.',
    type: ModifierType.FlatAtk,
    value: Math.round(38894 * 0.02 * 0.5),
  },
];
/**
 * Full HP parts, +15 logis, 3x10% HP talents, M5
 * Loadout HP = (27375+113+89+106+75+3164)*(1+.33+.3+.2+.1) = 59679
 */
const waveMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Wave - passive (T5)',
    description:
      'Grants 0.2% loadout HP of ATK every time support skill does damage, max 10 stacks. Based on 59679 loadout HP and 2/3 due to slow stacking w/ Mauxir but also M3 duration boost.',
    type: ModifierType.FlatAtk,
    value: Math.round(((59679 * 0.02) / 3) * 2),
  },
];
/**
 * No ATK parts, +0 logis, no ATK talents, M2
 * ATK = (1472+646+14)*(1+.4+.04+.04) = 3155
 */
const frigateLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Frigatebird - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 3155 Mauxir ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3155 * 0.132),
  },
  {
    active: false,
    name: 'Frigatebird - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 3155 Mauxir ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3155 * 0.22),
  },
];
/**
 * Full ATK parts, +15 logis, 3x10% ATK talents, M5
 * ATK = (1472+646+200+14+14+11+11)*(1+.4+.2+.3+.1) = 4736
 */
const frigateMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Frigatebird - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 4736 Mauxir ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4736 * 0.132),
  },
  {
    active: false,
    name: 'Frigatebird - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 4736 Mauxir ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4736 * 0.22),
  },
];

// Keep in order of SMG, Sniper, Shotgun, Pistol, AR to match weapon sorting.
const supportOperativeList: Array<SupportOperative> = [
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    alloyTruthLowInvestment,
    'Low investment: Alloy Truth with no HP gun parts, +0 logistics, no HP talents, and M2 (44688 loadout HP)',
    'Alloy Truth',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    alloyTruthMaxBuild,
    'Max investment: Alloy Truth with full HP gun parts, +15 logis, 3x10% HP talents, M5 (66173 loadout HP)',
    'Alloy Truth',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    waveLowInvestment,
    'Low investment: Wave with no HP gun parts, +0 logistics, no HP talents, and M2 (44688 loadout HP)',
    'Wave',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    waveMaxBuild,
    'Max investment: Wave with full HP gun parts, +15 logis, 3x10% HP talents, M5 (66173 loadout HP)',
    'Wave',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    frigateLowInvestment,
    'Low investment: Frigatebird with no ATK gun parts, +0 logistics, no ATK talents, and M2 (3155 ATK)',
    'Frigatebird',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    frigateMaxBuild,
    'Max investment: Frigatebird with full ATK gun parts, +15 logis, 3x10% ATK talents, M5 (4736 ATK)',
    'Frigatebird',
  ),
];

const SUPPORT_OPERATIVES: Array<SupportOperative> =
  deepFreeze(supportOperativeList);

export { SupportOperative, supportOperativeSerializer, SUPPORT_OPERATIVES };
