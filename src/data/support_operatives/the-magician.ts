import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import {
  LOW_INVEST_ATK_ORANGE_DESCRIPTION,
  SupportOperative,
  buildOperativeLoadout,
  maxInvestmentAtk,
  lowInvestmentAtk,
  MAX_INVEST_ATK_DESCRIPTION,
} from '../../models/support-operative';
import { WeaponType } from '../weapons';

const THE_MAGICIAN_BASE: SupportOperative = {
  name: 'Tess - The Magician',
  description: '',
  baseAtk: 1253,
  baseHp: 17975,
  weaponType: WeaponType.Sniper,
  weaponName: '',
  rarity: Rarity.Orange,
  modifiers: [
    {
      active: true,
      name: 'The Magician support',
      description:
        'Operatives gain 30% elemental damage boost for 10s, decreasing by 1% per second',
      type: ModifierType.ElementalDamage,
      value: 30,
    },
  ],
};

/**
 * Deep Sea's Call low investment.
 */
const deepSeaLowInvestAtk = Math.round(
  lowInvestmentAtk(THE_MAGICIAN_BASE, 646, 0.4),
);
const deepSeaLowInvest: Array<Modifier> = [
  {
    active: false,
    name: "Deep Sea's Call - passive (T1)",
    description: `Grants 13.2% of ATK for 15s. Based on ${deepSeaLowInvestAtk} The Magician ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(deepSeaLowInvestAtk * 0.132),
  },
  {
    active: true,
    name: "Deep Sea's Call - passive (T5)",
    description: `Grants 22% of ATK for 15s. Based on ${deepSeaLowInvestAtk} The Magician ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(deepSeaLowInvestAtk * 0.22),
  },
];

/**
 * Deep Sea's Call max investment.
 */
const deepSeaMaxInvestAtk = Math.round(
  maxInvestmentAtk(THE_MAGICIAN_BASE, 646, 0.4),
);
const deepSeaMaxInvest: Array<Modifier> = [
  {
    active: false,
    name: "Deep Sea's Call - passive (T1)",
    description: `Grants 13.2% of ATK for 15s. Based on ${deepSeaMaxInvestAtk} The Magician ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(deepSeaMaxInvestAtk * 0.132),
  },
  {
    active: true,
    name: "Deep Sea's Call - passive (T5)",
    description: `Grants 22% of ATK for 15s. Based on ${deepSeaMaxInvestAtk} The Magician ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(deepSeaMaxInvestAtk * 0.22),
  },
];

/**
 * Eccentric joker (signature weapon)
 */
const joker: Array<Modifier> = [
  {
    active: true,
    name: 'Eccentric Joker - passive (T1)',
    description:
      'After using ult, grants 24% damage boost to deployed operative',
    type: ModifierType.Generic,
    value: 24,
  },
  {
    active: false,
    name: 'Eccentric Joker - passive (T2)',
    description:
      'After using ult, grants 40% damage boost to deployed operative',
    type: ModifierType.Generic,
    value: 40,
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(
    THE_MAGICIAN_BASE,
    deepSeaLowInvest,
    `${LOW_INVEST_ATK_ORANGE_DESCRIPTION} (${deepSeaLowInvestAtk} ATK)`,
    "Deep Sea's Call",
  ),
  buildOperativeLoadout(
    THE_MAGICIAN_BASE,
    deepSeaMaxInvest,
    `${MAX_INVEST_ATK_DESCRIPTION} (${deepSeaMaxInvestAtk} ATK)`,
    "Deep Sea's Call",
  ),
  buildOperativeLoadout(
    THE_MAGICIAN_BASE,
    joker,
    'Max investment: signature weapon',
    'Eccentric Joker',
  ),
];

export { builds as THE_MAGICIAN_BUILDS };
