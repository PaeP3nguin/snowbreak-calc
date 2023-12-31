import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import {
  SupportOperative,
  buildOperativeLoadout,
} from '../../models/support-operative';
import { WeaponType } from '../weapons';
import { ElementType } from '../element';

const KAGUYA_BASE: SupportOperative = {
  name: 'Acacia - Kaguya',
  description: '',
  baseAtk: 1259,
  baseHp: 22500,
  weaponType: WeaponType.Pistol,
  weaponName: '',
  rarity: Rarity.Orange,
  modifiers: [
    // Kaguya support skill depends on gun element, so the modifiers are put in the individual guns.
  ],
};
const pineAurora: Array<Modifier> = [
  {
    active: true,
    name: 'Kaguya support skill (M2 + frost gun)',
    description:
      'Reduces all elemental resistances by 24% * 1.4 for 10s when equipped with a frost gun.',
    type: ModifierType.ElementalResist,
    value: 33.6,
  },
  {
    active: false,
    name: 'Kaguya support skill (M4 + frost gun)',
    description:
      'Reduces all elemental resistances by 26.4% * 1.4 for 10s when equipped with a frost gun.',
    type: ModifierType.ElementalResist,
    value: 36.96,
  },
  {
    active: false,
    name: 'Kaguya deiwos',
    description:
      'Increases team DMG vs move slowed enemies by 10%. +1% per 100 index. Assumes 849 index with Pine.',
    type: ModifierType.Generic,
    value: 18.49,
  },
  {
    active: true,
    name: 'Pine Aurora passive (T1)',
    description:
      'Increases full squad dmg by 3.6% when support skill hits (max 5 stacks)',
    type: ModifierType.Generic,
    value: 18,
  },
  {
    active: true,
    name: 'Pine Aurora passive (T1)',
    description: "Increase deployed operative's Frost DMG by 5.4%",
    type: ModifierType.ElementalDamage,
    element: ElementType.Frost,
    value: 5.4,
  },
  {
    active: false,
    name: 'Pine Aurora passive (T2)',
    description:
      'Increases full squad dmg by 6% when support skill hits (max 5 stacks)',
    type: ModifierType.Generic,
    value: 30,
  },
  {
    active: false,
    name: 'Pine Aurora passive (T2)',
    description: "Increase deployed operative's Frost DMG by 9%",
    type: ModifierType.ElementalDamage,
    element: ElementType.Frost,
    value: 9,
  },
];
/**
 * No ATK parts, +0 logis, no ATK talents, M2
 * ATK = (1259+646+14)*(1+.4+.04+.04) = 2840
 */
const igniterLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Kaguya support skill',
    description: 'Reduces all elemental resistances by 24% for 10s.',
    type: ModifierType.ElementalResist,
    value: 24,
  },
  {
    active: false,
    name: 'Kaguya support skill (M4)',
    description: 'Reduces all elemental resistances by 26.4% for 10s.',
    type: ModifierType.ElementalResist,
    value: 26.4,
  },
  {
    active: false,
    name: 'Kaguya deiwos',
    description:
      'Increases team DMG vs move slowed enemies by 10%. +1% per 100 index. Assumes 300 index.',
    type: ModifierType.Generic,
    value: 13,
  },
  {
    active: true,
    name: 'Prismatic Igniter passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 2840 Kaguya ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(2840 * 0.132),
  },
  {
    active: false,
    name: 'Prismatic Igniter passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 2840 Kaguya ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(2840 * 0.22),
  },
];
/**
 * Full ATK parts, +15 logis, 3x10% ATK talents, M5
 * ATK = (1259+646+200+11+14+11+11)*(1+.4+.2+.3+.1) = 4304
 */
const igniterMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Kaguya support skill',
    description: 'Reduces all elemental resistances by 24% for 10s.',
    type: ModifierType.ElementalResist,
    value: 24,
  },
  {
    active: false,
    name: 'Kaguya support skill (M4)',
    description: 'Reduces all elemental resistances by 26.4% for 10s.',
    type: ModifierType.ElementalResist,
    value: 26.4,
  },
  {
    active: false,
    name: 'Kaguya deiwos',
    description:
      'Increases team DMG vs move slowed enemies by 10%. +1% per 100 index. Assumes 300 index.',
    type: ModifierType.Generic,
    value: 13,
  },
  {
    active: true,
    name: 'Prismatic Igniter passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 4304 Kaguya ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4304 * 0.132),
  },
  {
    active: false,
    name: 'Prismatic Igniter passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 4304 Kaguya ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4304 * 0.22),
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(KAGUYA_BASE, pineAurora, '', 'Pine Aurora'),
  buildOperativeLoadout(
    KAGUYA_BASE,
    igniterLowInvestment,
    'Low investment: no ATK gun parts, +0 logistics, no ATK talents, and M2 (2840 ATK)',
    'Prismatic Igniter',
  ),
  buildOperativeLoadout(
    KAGUYA_BASE,
    igniterMaxBuild,
    'Max investment: full ATK gun parts, +15 logis, 3x10% ATK talents, M5 (4304 ATK)',
    'Prismatic Igniter',
  ),
];

export { builds as KAGUYA_BUILDS };
