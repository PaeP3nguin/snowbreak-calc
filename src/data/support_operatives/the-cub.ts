import {
  LOW_INVEST_ATK_ORANGE_DESCRIPTION,
  MAX_INVEST_ATK_DESCRIPTION,
  SupportOperative,
  buildOperativeLoadout,
  lowInvestmentAtk,
  maxInvestmentAtk,
} from '../../models/support-operative';
import { Modifier, ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import { WeaponSubtype, WeaponType } from '../weapons';

const THE_CUB_BASE: SupportOperative = {
  name: 'Eatchel - The Cub',
  description: '',
  baseAtk: 1328,
  baseHp: 22382,
  weaponType: WeaponType.Shotgun,
  weaponName: '',
  rarity: Rarity.Orange,
  modifiers: [],
};

/**
 * Lapis Lazuli low investment.
 */
const lapisLowInvestAtk = Math.round(lowInvestmentAtk(THE_CUB_BASE, 646, 0.4));
const lapisLowInvest: Array<Modifier> = [
  {
    active: false,
    name: 'Lapis Lazuli - passive (T1)',
    description: `Grants 13.2% of ATK for 15s. Based on ${lapisLowInvestAtk} The Cub ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(lapisLowInvestAtk * 0.132),
  },
  {
    active: true,
    name: 'Lapis Lazuli - passive (T5)',
    description: `Grants 22% of ATK for 15s. Based on ${lapisLowInvestAtk} The Cub ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(lapisLowInvestAtk * 0.22),
  },
];

/**
 * Lapis Lazuli max investment.
 */
const lapisMaxInvestAtk = Math.round(
  maxInvestmentAtk(THE_CUB_BASE, 646, 0.4, WeaponSubtype.ShotgunPump),
);
const lapisMaxInvest: Array<Modifier> = [
  {
    active: false,
    name: 'Lapis Lazuli - passive (T1)',
    description: `Grants 13.2% of ATK for 15s. Based on ${lapisMaxInvestAtk} The Cub ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(lapisMaxInvestAtk * 0.132),
  },
  {
    active: true,
    name: 'Lapis Lazuli - passive (T5)',
    description: `Grants 22% of ATK for 15s. Based on ${lapisMaxInvestAtk} The Cub ATK.`,
    type: ModifierType.FlatAtk,
    value: Math.round(lapisMaxInvestAtk * 0.22),
  },
];

/**
 * Blitzing Fangs (signature weapon)
 */
const blitzingFangs: Array<Modifier> = [
  {
    active: true,
    name: 'Blitzing Fangs - passive (T1)',
    description: 'Converts 10.8% of up to 10k stored healing into ATK',
    type: ModifierType.FlatAtk,
    value: 1080,
  },
  {
    active: false,
    name: 'Blitzing Fangs - passive (T2)',
    description: 'Converts 18% of up to 10k stored healing into ATK',
    type: ModifierType.FlatAtk,
    value: 1800,
  },
];

const builds: Array<SupportOperative> = [
  buildOperativeLoadout(
    THE_CUB_BASE,
    lapisLowInvest,
    `${LOW_INVEST_ATK_ORANGE_DESCRIPTION} (${lapisLowInvestAtk} ATK)`,
    'Lapis Lazuli',
  ),
  buildOperativeLoadout(
    THE_CUB_BASE,
    lapisMaxInvest,
    `${MAX_INVEST_ATK_DESCRIPTION} (${lapisMaxInvestAtk} ATK)`,
    'Lapis Lazuli',
  ),
  buildOperativeLoadout(
    THE_CUB_BASE,
    blitzingFangs,
    'Max investment: signature weapon',
    'Blitzing Fangs',
  ),
];

export { builds as THE_CUB_BUILDS };
