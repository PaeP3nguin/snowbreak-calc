import { ElementType } from '../element';
import { Logistic } from '../../models/logistic';
import { ModifierType } from '../modifier';
import { Rarity } from '../rarity';
import { deepFreeze } from '../util';

const logisticList: Array<Logistic> = [
  {
    name: 'Amano-Iwato',
    rarity: Rarity.Orange,
    maxAtk: 200,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers2: [
      {
        active: true,
        name: 'Amano-Iwato 2-set',
        description: 'Ballistic DMG +24%',
        type: ModifierType.BallisticDamage,
        value: 24,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Amano-Iwato 3-set',
        description:
          'ADS ballistic DMG +10% on crit, max 5 stacks. Cleared when operative leaves the field.',
        type: ModifierType.BallisticDamage,
        value: 50,
      },
    ],
  },
  {
    name: 'Mingyi',
    rarity: Rarity.Orange,
    maxAtk: 194,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers2: [
      {
        active: true,
        name: 'Mingyi 2-set',
        description: 'Ballistic DMG +24%',
        type: ModifierType.BallisticDamage,
        value: 24,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Mingyi 3-set',
        description:
          'Increases ATK by 1% for 3s when dealing electrical damage. Max 45 stacks.',
        type: ModifierType.AtkPercent,
        value: 45,
      },
    ],
  },
  {
    name: 'Mizuho',
    rarity: Rarity.Orange,
    maxAtk: 206,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers2: [
      {
        active: true,
        name: 'Mizuho 2-set',
        description: 'Ballistic DMG +24%',
        type: ModifierType.BallisticDamage,
        value: 24,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Mizuho 3-set',
        description:
          'When shooting continuously, +3% ballistic DMG per shot. Max 20 stacks.',
        type: ModifierType.BallisticDamage,
        value: 60,
      },
    ],
  },
  {
    name: 'Dharma',
    rarity: Rarity.Orange,
    maxAtk: 196,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers2: [
      {
        active: true,
        name: 'Dharma 2-set',
        description: 'Ballistic DMG +24%',
        type: ModifierType.BallisticDamage,
        value: 24,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Dharma 3-set',
        description:
          'After using standard skill, hipfire ballistic DMG +46% for 5s.',
        type: ModifierType.BallisticDamage,
        value: 46,
      },
    ],
  },
  {
    name: 'Thebes',
    rarity: Rarity.Orange,
    maxAtk: 212,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers2: [
      {
        active: true,
        name: 'Thebes 2-set',
        description: 'Skill DMG +24%',
        type: ModifierType.SkillDamage,
        value: 24,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Thebes 3-set',
        description:
          'Each time a Standard/Support/Ultimate skill hits the target, increases own ATK +2% for 5s. Max 20 stacks.',
        type: ModifierType.AtkPercent,
        value: 40,
      },
    ],
  },
  {
    name: 'Akitsu',
    rarity: Rarity.Orange,
    maxAtk: 198,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers2: [
      {
        active: true,
        name: 'Akitsu 2-set',
        description: 'Skill DMG +24%',
        type: ModifierType.SkillDamage,
        value: 24,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Akitsu 3-set',
        description:
          'Using standard skill grants 1 stack, defeating enemy 5 stacks, ult 10 stacks. At 15 stacks, increase ATK by 25% for 10s.',
        type: ModifierType.AtkPercent,
        value: 25,
      },
      {
        active: true,
        name: 'Akitsu 3-set',
        description:
          'At 30 stacks, increase kinetic DMG by 20% for 10s. Stacks cleared upon hitting 30.',
        type: ModifierType.ElementalDamage,
        element: ElementType.Kinetic,
        value: 20,
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
    modifiers2: [
      {
        active: true,
        name: 'Twilight 2-set',
        description: 'Skill DMG +24%',
        type: ModifierType.SkillDamage,
        value: 24,
      },
    ],
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
  {
    name: 'Troubadour',
    rarity: Rarity.Purple,
    maxAtk: 148,
    levelL: 12,
    levelM: 12,
    levelR: 12,
    modifiers2: [
      {
        active: true,
        name: 'Troubadour 2-set',
        description: 'Ballistic DMG +16%',
        type: ModifierType.BallisticDamage,
        value: 16,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Troubadour 3-set',
        description: 'Thermal/frost/electrical ballistic DMG + 32%',
        type: ModifierType.BallisticDamage,
        value: 32,
      },
    ],
  },
  {
    name: 'Argo',
    rarity: Rarity.Purple,
    maxAtk: 148,
    levelL: 12,
    levelM: 12,
    levelR: 12,
    modifiers2: [
      {
        active: true,
        name: 'Argo 2-set',
        description: 'Ballistic DMG +16%',
        type: ModifierType.BallisticDamage,
        value: 16,
      },
    ],
    modifiers3: [
      {
        active: true,
        name: 'Argo 3-set',
        description: 'Kinetic/Chaos ballistic DMG + 32%',
        type: ModifierType.BallisticDamage,
        value: 32,
      },
    ],
  },
];

const DPS_LOGISTICS: Array<Logistic> = deepFreeze(logisticList);

export { DPS_LOGISTICS };
