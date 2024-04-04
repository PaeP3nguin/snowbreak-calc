import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import {
  SupportOperative,
  buildOperativeLoadout,
} from '../../models/support-operative';
import { WeaponType } from '../weapons';
import { maxHpParts } from '../weapon-parts';

const SHADOW_KA_BASE: SupportOperative = {
  name: 'Mauxir - Shadow Ka',
  description: '',
  baseAtk: 1472,
  baseHp: 27375,
  weaponType: WeaponType.SMG,
  weaponName: '',
  rarity: Rarity.Orange,
  modifiers: [
    {
      active: true,
      name: 'Shadow Ka support skill',
      description: 'Shooting Kebechet transfers 110% of damage dealt.',
      type: ModifierType.FinalDamage,
      value: 10,
    },
    {
      active: false,
      name: 'Shadow Ka support skill (M5)',
      description: 'Shooting Kebechet transfers 120% of damage dealt.',
      type: ModifierType.FinalDamage,
      value: 20,
    },
    {
      active: false,
      name: 'Shadow Ka deiwos',
      description:
        '1 shot every 10 seconds is a guaranteed crit and gains 140% crit DMG amp (300 index)',
      type: ModifierType.CritDmgAmp,
      value: 140,
    },
    {
      active: false,
      name: 'Shadow Ka deiwos (max alignment)',
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
    name: 'Alloy Truth passive (T1)',
    description: 'Using support skill grants 15% crit dmg amp for 15s.',
    type: ModifierType.CritDmgAmp,
    value: 15,
  },
  {
    active: false,
    name: 'Alloy Truth passive (T2)',
    description: 'Using support skill grants 25% crit dmg amp for 15s.',
    type: ModifierType.CritDmgAmp,
    value: 25,
  },
  {
    active: true,
    name: 'Alloy Truth passive (T1)',
    description:
      'Using support skill grants 1.8% loadout HP of ATK for 15s. Based on 44688 loadout HP.',
    type: ModifierType.FlatAtk,
    value: Math.round(44688 * 0.018),
  },
  {
    active: false,
    name: 'Alloy Truth passive (T2)',
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
    name: 'Alloy Truth passive (T1)',
    description: 'Using support skill grants 15% crit dmg amp for 15s.',
    type: ModifierType.CritDmgAmp,
    value: 15,
  },
  {
    active: false,
    name: 'Alloy Truth passive (T2)',
    description: 'Using support skill grants 25% crit dmg amp for 15s.',
    type: ModifierType.CritDmgAmp,
    value: 25,
  },
  {
    active: true,
    name: 'Alloy Truth passive (T1)',
    description:
      'Using support skill grants 1.8% loadout HP of ATK for 15s. Based on 66173 loadout HP.',
    type: ModifierType.FlatAtk,
    value: Math.round(66173 * 0.018),
  },
  {
    active: false,
    name: 'Alloy Truth passive (T2)',
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
    name: 'Wave passive (T5)',
    description:
      'Grants 0.2% loadout HP of ATK every time support skill does damage, max 10 stacks. Based on 38894 loadout HP and half effectiveness due to very slow stacking w/ Mauxir.',
    type: ModifierType.FlatAtk,
    value: Math.round(38894 * 0.02 * 0.5),
  },
];
/**
 * Full HP parts, +15 logis, 3x10% HP talents, M5
 * Loadout HP = (27375+<383 from weapon parts>+3164)*(1+.33+.3+.2+.1) = 59679
 */
const waveMaxBuildHp =
  (27375 + maxHpParts(WeaponType.SMG) + 3164) * (1 + 0.33 + 0.3 + 0.2 + 0.1);
const waveMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Wave passive (T5)',
    description:
      'Grants 0.2% loadout HP of ATK every time support skill does damage, max 10 stacks. Based on 59679 loadout HP and 2/3 due to slow stacking w/ Mauxir but also M3 duration boost.',
    type: ModifierType.FlatAtk,
    value: Math.round(((waveMaxBuildHp * 0.02) / 3) * 2),
  },
];
/**
 * No ATK parts, +0 logis, no ATK talents, M2
 * ATK = (1472+646+14)*(1+.4+.04+.04) = 3155
 */
const frigateLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Frigatebird passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 3155 Shadow Ka ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3155 * 0.132),
  },
  {
    active: false,
    name: 'Frigatebird passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 3155 Shadow Ka ATK.',
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
    name: 'Frigatebird passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 4736 Shadow Ka ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4736 * 0.132),
  },
  {
    active: false,
    name: 'Frigatebird passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 4736 Shadow Ka ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4736 * 0.22),
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    alloyTruthLowInvestment,
    'Low investment: no HP gun parts, +0 logistics, no HP talents, and M2 (44688 loadout HP)',
    'Alloy Truth',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    alloyTruthMaxBuild,
    'Max investment: full HP gun parts, +15 logis, 3x10% HP talents, M5 (66173 loadout HP)',
    'Alloy Truth',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    waveLowInvestment,
    'Low investment: no HP gun parts, +0 logistics, no HP talents, and M2 (38894 loadout HP)',
    'Wave',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    waveMaxBuild,
    'Max investment: full HP gun parts, +15 logis, 3x10% HP talents, M5 (59679 loadout HP)',
    'Wave',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    frigateLowInvestment,
    'Low investment: no ATK gun parts, +0 logistics, no ATK talents, and M2 (3155 ATK)',
    'Frigatebird',
  ),
  buildOperativeLoadout(
    SHADOW_KA_BASE,
    frigateMaxBuild,
    'Max investment: full ATK gun parts, +15 logis, 3x10% ATK talents, M5 (4736 ATK)',
    'Frigatebird',
  ),
];

export { builds as SHADOW_KA_BUILDS };
