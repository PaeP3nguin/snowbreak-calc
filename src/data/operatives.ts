import { Modifier } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';
import { WeaponType } from './weapons';

interface OperativeModel {
  name: string;
  baseAtk: number;
  weaponType: WeaponType;
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
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Chenxing - Ethereal Cloud',
    baseAtk: 1400,
    weaponType: WeaponType.SMG,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Fenny - Coronet',
    baseAtk: 1250,
    weaponType: WeaponType.Shotgun,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Fenny - Lionheart',
    baseAtk: 1668,
    weaponType: WeaponType.Shotgun,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
  {
    name: 'Yao - Space Cowboy',
    baseAtk: 1792,
    weaponType: WeaponType.Sniper,
    manifestLevel: 0,
    manifestStep: 0,
    modifiers: [],
  },
];

const OPERATIVES: Array<Operative> = deepFreeze(operativeList);

export { Operative, operativeSerializer, OPERATIVES };
