import { Modifier, ModifierType } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';
import { WeaponType } from './weapons';
import { Rarity } from './rarity';
import { ElementType } from './element';

interface OperativeModel {
  name: string;
  baseAtk: number;
  alignmentIndex: number;
  weaponType: WeaponType;
  rarity: Rarity;
  manifestLevel: number;
  manifestStep: number;
  modifiers: Array<Modifier>;
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
    modifiers: [],
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
          "Slip detonation damage is a % of bullet damage so can be calculated of as a final damage multiplier. Note that it's affected by skill damage as well.",
        type: ModifierType.FinalDamage,
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
