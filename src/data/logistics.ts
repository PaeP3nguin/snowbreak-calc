import { Modifier, ModifierType } from 'app/src/data/modifier';
import { Rarity } from './rarity';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';

interface LogisticModel {
  name: string;
  rarity: Rarity;
  maxAtk: number;
  levelL: number;
  levelM: number;
  levelR: number;
  modifiers: Array<Modifier>;
}

@jsonObject
class Logistic implements LogisticModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(String)
  rarity!: Rarity;

  @jsonMember(Number)
  maxAtk!: number;

  @jsonMember(Number)
  levelL!: number;

  @jsonMember(Number)
  levelM!: number;

  @jsonMember(Number)
  levelR!: number;

  @jsonArrayMember(Modifier)
  modifiers!: Array<Modifier>;

  // constructor(
  //   name: string,
  //   rarity: Rarity,
  //   maxAtk: number,
  //   levelL: number,
  //   levelM: number,
  //   levelR: number,
  //   modifiers: Array<Modifier>
  // ) {
  //   this.name = name;
  //   this.rarity = rarity;
  //   this.maxAtk = maxAtk;
  //   this.levelL = levelL;
  //   this.levelM = levelM;
  //   this.levelR = levelR;
  //   this.modifiers = modifiers;
  // }
}

const logisticSerializer = new TypedJSON(Logistic);

// Separated for nicer type-hinting, allows individual classes to be highlighted instead of the variable.
const logisticList: Array<Logistic> = [
  {
    name: 'Amano-Iwato',
    rarity: Rarity.Orange,
    maxAtk: 200,
    levelL: 15,
    levelM: 15,
    levelR: 15,
    modifiers: [
      {
        active: true,
        name: 'Amano-Iwato 2-set',
        description: '',
        type: ModifierType.BallisticDamage,
        value: 24,
      },
      {
        active: true,
        name: 'Amano-Iwato 3-set',
        description:
          'ADS Ballistic DMG +10% on critical hit, max 5 stacks. Cleared when operative leaves the field.',
        type: ModifierType.BallisticDamage,
        value: 50,
      },
    ],
  },
];

const LOGISTICS: Array<Logistic> = deepFreeze(logisticList);

export { Logistic, logisticSerializer, LOGISTICS };
