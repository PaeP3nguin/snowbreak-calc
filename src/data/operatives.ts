import { Modifier, ModifierType } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';
import { WeaponType } from './weapons';
import { Rarity } from './rarity';
import { ElementType } from './element';
import { Skill } from './skill';

interface OperativeModel {
  name: string;
  baseAtk: number;
  alignmentIndex: number;
  weaponType: WeaponType;
  rarity: Rarity;
  manifestLevel: number;
  manifestStep: number;
  modifiers: Array<Modifier>;
  skillDamage?: Array<Skill>;
}

@jsonObject
class Operative implements OperativeModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(Number)
  baseAtk!: number;

  @jsonMember(Number)
  alignmentIndex!: number;

  @jsonMember(String)
  weaponType!: WeaponType;

  @jsonMember(String)
  rarity!: Rarity;

  @jsonMember(Number)
  manifestLevel!: number;

  @jsonMember(Number)
  manifestStep!: number;

  @jsonArrayMember(Modifier)
  modifiers!: Array<Modifier>;

  @jsonArrayMember(Skill)
  skillDamage?: Array<Skill>;
}

const operativeSerializer = new TypedJSON(Operative);

// Separated for nicer type-hinting, allows individual classes to be highlighted instead of the variable.
const operativeList: Array<Operative> = [
  {
    name: 'Lyfe - Wild Hunt',
    baseAtk: 1325,
    alignmentIndex: 0,
    weaponType: WeaponType.SMG,
    rarity: Rarity.Orange,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Wild Hunt Deiwos',
        description: 'Skill DMG increases by 10.5%. +3% per 100 alignment.',
        type: ModifierType.SkillDamage,
        value: 10.5,
        alignmentIncrease: 3,
      },
      {
        active: false,
        name: 'Wild Hunt Deiwos (vs frozen)',
        description:
          'Skill DMG increases by 10.5%. +3% per 100 alignment. This buff is 1.5x stronger vs frozen enemies.',
        type: ModifierType.SkillDamage,
        value: 15.75,
        alignmentIncrease: 4.5,
      },
      {
        active: true,
        name: 'Wild Hunt skill neuronic',
        description:
          'Increases final DMG of skill by 20% if triggered when meter is full.',
        type: ModifierType.FinalSkillDamage,
        value: 20,
      },
      {
        active: false,
        name: 'Wild Hunt M2 passive',
        description: 'Increases final DMG of skill by 5%, max 5 stacks.',
        type: ModifierType.FinalSkillDamage,
        value: 25,
      },
    ],
    skillDamage: [
      {
        name: 'Wild Hunt skill - Frost Wolves',
        description: 'Icicles from her skill. This assumes 100% uptime.',
        active: true,
        element: ElementType.Frost,
        damagePercent: 35,
        damageFlat: 31,
        isAptitude: false,
        frequency: 180,
      },
      {
        name: 'Wild Hunt skill - Frost Wolves (M4)',
        description: 'Icicles from her skill. This assumes 100% uptime.',
        active: false,
        element: ElementType.Frost,
        damagePercent: 38.5,
        damageFlat: 43,
        isAptitude: false,
        frequency: 180,
      },
    ],
  },
  {
    name: 'Chenxing - Ethereal Cloud',
    baseAtk: 1400,
    alignmentIndex: 0,
    weaponType: WeaponType.AssaultRifle,
    rarity: Rarity.Orange,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Ethereal Cloud Deiwos',
        description:
          '50% chance to increase shot damage by 32% when using electrical weapon. +8% per 100 alignment.',
        type: ModifierType.BallisticDamage,
        element: ElementType.Electrical,
        value: 16,
        alignmentIncrease: 4,
      },
      {
        active: true,
        name: 'Ethereal Cloud slip detonation damage',
        description:
          "Slip detonation damage is a % of bullet damage so can be calculated of as a final damage multiplier. Note that it's affected by skill damage as well. 1 target: 40, 2 targets: 68, 3 targets: 87.6, 4 targets: 101.32, 5 targets: 110.924, 6 targets: 117.6468, 7 targets: 122.35276, 8 targets: 125.64693",
        type: ModifierType.FinalBallisticDamage,
        value: 40,
      },
      {
        active: false,
        name: 'Ethereal Cloud M1',
        description:
          'Ballistics DMG increases by 1% for 3s when hitting a weakspot, max 15 stacks.',
        type: ModifierType.BallisticDamage,
        value: 15,
      },
      {
        active: false,
        name: 'Ethereal Cloud M3',
        description: 'Increases Crit DMG against targets marked with skill.',
        type: ModifierType.CritDmgAmp,
        value: 30,
      },
    ],
  },
  {
    name: 'Fenny - Coronet',
    baseAtk: 1250,
    alignmentIndex: 0,
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Orange,
    manifestLevel: 1,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Coronet standard skill',
        description:
          'Increases rate of fire by 1% per mercy stack, max 80 stacks. Adjust based on your projected average mercy.',
        type: ModifierType.RateOfFire,
        value: 60,
      },
      {
        active: true,
        name: 'Coronet standard skill neuronic',
        description: 'Increases electrical DMG by 10% when in Crown of Thorns.',
        type: ModifierType.ElementalDamage,
        element: ElementType.Electrical,
        value: 10,
      },
      {
        active: true,
        name: 'Coronet Deiwos',
        description:
          'Each shot has a 25% chance to fire 1 extra pellet. Calculated as (9/8-1)*.25',
        type: ModifierType.FinalDamage,
        value: 3.125,
      },
      {
        active: false,
        name: 'Coronet M5',
        description:
          'Increases electrical DMG by 15% when mercy exceeds the original limit.',
        type: ModifierType.ElementalDamage,
        element: ElementType.Electrical,
        value: 15,
      },
    ],
  },
  {
    name: 'Fenny - Lionheart',
    baseAtk: 1668,
    alignmentIndex: 0,
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Purple,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Lionheart Deiwos',
        description:
          'Increases damage by 16% when within 5m from the target. +4% per 100 alignment.',
        type: ModifierType.Generic,
        value: 16,
        alignmentIncrease: 4,
      },
    ],
  },
  {
    name: 'Yao - Winter Solstice',
    baseAtk: 1792,
    alignmentIndex: 0,
    weaponType: WeaponType.Sniper,
    rarity: Rarity.Orange,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Winter Solstice Deiwos',
        description:
          'Increases damage when further from the target, up to 16%. +3% per 100 alignment.',
        type: ModifierType.Generic,
        value: 16,
        alignmentIncrease: 3,
      },
    ],
  },
];

const OPERATIVES: Array<Operative> = deepFreeze(operativeList);

export { Operative, operativeSerializer, OPERATIVES };
