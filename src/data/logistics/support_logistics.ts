import { Logistic } from '../../models/logistic';
import { ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import { deepFreeze } from '../util';

const logisticList: Array<Logistic> = [
  {
    name: 'Amarna',
    rarity: Rarity.Orange,
    maxAtk: 200,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers3: [
      {
        active: true,
        name: 'Amarna 3-set',
        description:
          'Increases Ballistic DMG by 30% for 15s when support skill used.',
        type: ModifierType.BallisticDamage,
        value: 30,
      },
      {
        active: true,
        name: 'Amarna 3-set',
        description:
          'After support skill used, dealing damage with support skill increases ATK by 20% for 1.5s.',
        type: ModifierType.AtkPercent,
        value: 20,
      },
    ],
  },
  {
    name: 'Navigator',
    rarity: Rarity.Orange,
    maxAtk: 190,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers3: [
      {
        active: true,
        name: 'Navigator 3-set',
        description:
          'Applying control effect increases target DMG taken by 14% for 10s.',
        type: ModifierType.DamageTaken,
        value: 14,
      },
    ],
  },
  {
    name: 'Twilight',
    rarity: Rarity.Orange,
    maxAtk: 198,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers3: [
      {
        active: true,
        name: 'Twilight 3-set',
        description:
          "Dealing DMG with active skill reduces target's resistance to that type of DMG -16% for 5s.",
        type: ModifierType.ElementalResist,
        value: 16,
      },
    ],
  },
];

const SUPPORT_LOGISTICS: Array<Logistic> = deepFreeze(logisticList);

export { SUPPORT_LOGISTICS };
