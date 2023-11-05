import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import {
  SupportOperative,
  buildOperativeLoadout,
} from '../../models/support-operative';
import { WeaponType } from '../weapons';

const OBSERVER_BASE: SupportOperative = {
  name: 'Chenxing - The Observer',
  description: '',
  baseAtk: 1554,
  baseHp: 19800,
  weaponType: WeaponType.AssaultRifle,
  weaponName: '',
  rarity: Rarity.Purple,
  modifiers: [
    {
      active: true,
      name: 'Observer support skill',
      description: 'Heal items grant 10% skill DMG for 3s.',
      type: ModifierType.SkillDamage,
      value: 10,
    },
    {
      active: false,
      name: 'Observer support skill (M1)',
      description: 'Drop pod aura increases skill DMG by 15%.',
      type: ModifierType.SkillDamage,
      value: 15,
    },
    {
      active: true,
      name: 'Observer support skill (M3)',
      description: 'Drop pod aura increases skill DMG by 30%.',
      type: ModifierType.SkillDamage,
      value: 30,
    },
  ],
};
/**
 * No ATK parts, +0 logis, no ATK talents, M5
 * ATK = (1554+646+14)*(1+.4+.04+.1) = 3410
 */
const shortcakeLowInvestment: Array<Modifier> = [
  {
    active: true,
    name: 'Strawberry Shortcake - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 3410 Observer ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3410 * 0.132),
  },
  {
    active: false,
    name: 'Strawberry Shortcake - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 3410 Observer ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(3410 * 0.22),
  },
];
/**
 * Full ATK parts, +15 logis, 3x10% ATK talents, M5
 * ATK = (1554+646+200+11+11+9+15)*(1+.4+.2+.3+.1) = 4892
 */
const shortcakeMaxBuild: Array<Modifier> = [
  {
    active: true,
    name: 'Strawberry Shortcake - passive (T1)',
    description: 'Grants 13.2% of ATK for 15s. Based on 4892 Observer ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4892 * 0.132),
  },
  {
    active: false,
    name: 'Strawberry Shortcake - passive (T5)',
    description: 'Grants 22% of ATK for 15s. Based on 4892 Observer ATK.',
    type: ModifierType.FlatAtk,
    value: Math.round(4892 * 0.22),
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(
    OBSERVER_BASE,
    shortcakeLowInvestment,
    'Low investment: no ATK gun parts, +0 logistics, no ATK talents, and M5 (3410 ATK)',
    'Strawberry Shortcake',
  ),
  buildOperativeLoadout(
    OBSERVER_BASE,
    shortcakeMaxBuild,
    'Max investment: full ATK gun parts, +15 logis, 3x10% ATK talents, M5 (4892 ATK)',
    'Strawberry Shortcake',
  ),
];

export { builds as OBSERVER_BUILDS };
