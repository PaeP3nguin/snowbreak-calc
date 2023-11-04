import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import { SupportOperative, buildOperativeLoadout } from '../support-operative';
import { WeaponType } from '../weapons';

const SUNSHINE_BASE: SupportOperative = {
  name: 'Fritia - Little Sunshine',
  description: '',
  baseAtk: 1219,
  baseHp: 20712,
  weaponType: WeaponType.AssaultRifle,
  weaponName: '',
  rarity: Rarity.Purple,
  modifiers: [
    {
      active: true,
      name: 'Sunshine Deiwos',
      description:
        'Increases team damage dealt towards burning targets by 8%. +1% per 100 alignment. Assumes 300 alignment index.',
      type: ModifierType.Generic,
      value: 11,
    },
  ],
};
/**
 * No ATK parts, +0 logis, no ATK talents, M2
 * ATK = (1219+646+14)*(1+.4+.04+.04) = 2781
 */
const shortcakeLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Strawberry Shortcake - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 2781 Sunshine ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(2781 * 0.132),
  },
  {
    active: false,
    name: 'Strawberry Shortcake - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 2781 Sunshine ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(2781 * 0.22),
  },
];
/**
 * Full ATK parts, +15 logis, 3x10% ATK talents, M5
 * ATK = (1219+646+200+11+14+11+11)*(1+.4+.2+.3+.1) = 4224
 */
const shortcakeMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Strawberry Shortcake - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 4224 Sunshine ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4224 * 0.132),
  },
  {
    active: false,
    name: 'Strawberry Shortcake - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 4224 Sunshine ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4224 * 0.22),
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(
    SUNSHINE_BASE,
    shortcakeLowInvestment,
    'Low investment: no ATK gun parts, +0 logistics, no ATK talents, and M2 (2781 ATK)',
    'Strawberry Shortcake',
  ),
  buildOperativeLoadout(
    SUNSHINE_BASE,
    shortcakeMaxBuild,
    'Max investment: full ATK gun parts, +15 logis, 3x10% ATK talents, M5 (4224 ATK)',
    'Strawberry Shortcake',
  ),
];

export { builds as SUNSHINE_BUILDS };
