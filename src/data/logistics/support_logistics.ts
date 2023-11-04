import { Logistic } from '../../models/logistic';
import { ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import { deepFreeze } from '../util';

const logisticList: Array<Logistic> = [
  {
    name: 'Twilight',
    rarity: Rarity.Orange,
    maxAtk: 198,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers: [
      {
        active: true,
        name: 'Twilight 2-set',
        description: 'Skill DMG +24%',
        type: ModifierType.SkillDamage,
        value: 24,
      },
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
