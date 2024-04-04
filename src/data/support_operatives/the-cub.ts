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
  {
    active: true,
    name: 'The Cub Icebound Claws (M1)',
    description: `Two claws from M1. Based on ${lapisLowInvestAtk} ATK, Lux logistics, 300 AI.`,
    type: ModifierType.FlatAtk,
    // .24 from Lux 2-set, .38 from 300 AI Deiwos
    value: Math.round(
      (lapisLowInvestAtk * 0.5 + 240) * 0.05 * 2 * (1 + (0.24 + 0.38) / 2),
    ),
  },
];

// TODO: low/max invest for paws
// TODO: Rock Python

/**
 * Lapis Lazuli max investment.
 */
const lapisMaxInvestAtk = Math.round(
  maxInvestmentAtk(THE_CUB_BASE, 646, 0.4, WeaponSubtype.ShotgunPump, 198),
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
  {
    active: true,
    name: 'The Cub Icebound Claws (M1)',
    description: `Two claws from M1. Based on ${lapisMaxInvestAtk} ATK, Lux logistics, 3x 106 Alignment talents, 3x heal bonus talents.`,
    type: ModifierType.FlatAtk,
    // .24 from Lux 2-set, .5708 from 618 AI Deiwos, 3x heal bonus talents
    value: Math.round(
      (lapisMaxInvestAtk * 0.5 + 240) *
        0.05 *
        2 *
        (1 + (0.24 + 0.5708 + 0.106 * 3) / 2),
    ),
  },
];

/**
 * Blitzing Fangs (signature weapon)
 */
const fangsLowInvestAtk = Math.round(lowInvestmentAtk(THE_CUB_BASE, 789, 0.5));
const fangsMaxInvestAtk = Math.round(
  maxInvestmentAtk(THE_CUB_BASE, 789, 0.5, WeaponSubtype.ShotgunPump, 198),
);
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
  {
    active: true,
    name: 'The Cub Icebound Claws (M1, Fangs T1)',
    description: `Two claws from M1 with low investment. Based on ${fangsLowInvestAtk} ATK, T1 Fangs, Lux logistics, 300 AI.`,
    type: ModifierType.FlatAtk,
    // .18 from T1 Fangs, .24 from Lux 2-set, .38 from 300 AI Deiwos
    value: Math.round(
      (fangsLowInvestAtk * 0.5 + 240) *
        0.05 *
        2 *
        (1 + (0.24 + 0.18 + 0.38) / 2),
    ),
  },
  {
    active: false,
    name: 'The Cub Icebound Claws (M1, Fanges T2)',
    description: `Two claws from M1 with max investment. Based on ${fangsMaxInvestAtk} ATK, T2 Fangs, Lux logistics, 3x 106 Alignment talents, 3x heal bonus talents.`,
    type: ModifierType.FlatAtk,
    // .3 from T2 Fangs, .24 from Lux 2-set, .5708 from 618 AI Deiwos, 3x heal bonus talents
    value: Math.round(
      (fangsMaxInvestAtk * 0.5 + 240) *
        0.05 *
        2 *
        (1 + (0.24 + 0.3 + 0.5708 + 0.106 * 3) / 2),
    ),
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
    'Signature weapon',
    'Blitzing Fangs',
  ),
];

export { builds as THE_CUB_BUILDS };
