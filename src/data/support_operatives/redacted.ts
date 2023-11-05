import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import {
  SupportOperative,
  buildOperativeLoadout,
} from '../../models/support-operative';
import { WeaponType } from '../weapons';

const REDACTED_BASE: SupportOperative = {
  name: 'Acacia - Redacted',
  description: '',
  baseAtk: 960,
  baseHp: 19572,
  weaponType: WeaponType.Pistol,
  weaponName: '',
  rarity: Rarity.Purple,
  modifiers: [
    {
      active: false,
      name: 'Redacted ult',
      description: 'Operatives within range of ult 10% ATK%.',
      type: ModifierType.AtkPercent,
      value: 10,
    },
  ],
};
/**
 * No ATK parts, +0 logis, no ATK talents, M5
 * ATK = (960+646+14)*(1+.4+.04+.1) = 2495
 */
const igniterLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Prismatic Igniter - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 2495 Redacted ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(2495 * 0.132),
  },
  {
    active: false,
    name: 'Prismatic Igniter - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 2495 Redacted ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(2495 * 0.22),
  },
];
/**
 * Full ATK parts, +15 logis, 3x10% ATK talents, M5
 * ATK = (960+646+200+11+14+11+11)*(1+.4+.2+.3+.1) = 3706
 */
const igniterMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Prismatic Igniter - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 3706 Redacted ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3706 * 0.132),
  },
  {
    active: false,
    name: 'Prismatic Igniter - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 3706 Redacted ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3706 * 0.22),
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(
    REDACTED_BASE,
    igniterLowInvestment,
    'Low investment: no ATK gun parts, +0 logistics, no ATK talents, and M5 (2495 ATK)',
    'Prismatic Igniter',
  ),
  buildOperativeLoadout(
    REDACTED_BASE,
    igniterMaxBuild,
    'Max investment: full ATK gun parts, +15 logis, 3x10% ATK talents, M5 (3706 ATK)',
    'Prismatic Igniter',
  ),
];

export { builds as REDACTED_BUILDS };
