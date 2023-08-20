import { Modifier, ModifierType } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';
import { WeaponType } from './weapons';
import { Rarity } from './rarity';
import { ElementType } from './element';

interface OperativeModel {
  name: string;
  baseAtk: number;
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
    weaponType: WeaponType.SMG,
    rarity: Rarity.Orange,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Chenxing - Ethereal Cloud',
    baseAtk: 1400,
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
        type: ModifierType.Generic,
        element: ElementType.Electrical,
        value: 30,
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
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Orange,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Fenny - Lionheart',
    baseAtk: 1668,
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Purple,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Yao - Winter Solstice',
    baseAtk: 1792,
    weaponType: WeaponType.Sniper,
    rarity: Rarity.Orange,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
];

const OPERATIVES: Array<Operative> = deepFreeze(operativeList);

export { Operative, operativeSerializer, OPERATIVES };
