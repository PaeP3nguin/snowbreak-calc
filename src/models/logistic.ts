import { Modifier, ModifierType } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { Rarity } from '../data/rarity';
import { deepFreeze } from '../data/util';
import { ElementType } from '../data/element';

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
}

const logisticSerializer = new TypedJSON(Logistic);

export { Logistic, logisticSerializer };
