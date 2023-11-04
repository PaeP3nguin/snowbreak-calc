import { Modifier } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { Rarity } from '../data/rarity';

interface LogisticModel {
  name: string;
  rarity: Rarity;

  /**
   * Total flat ATK of all pices.
   */
  maxAtk: number;
  levelL: number;
  levelM: number;
  levelR: number;

  /**
   * Modifiers on the 2-set effect.
   */
  modifiers2?: Array<Modifier>;

  /**
   * Modifiers on the 3-set effect.
   */
  modifiers3?: Array<Modifier>;
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
  modifiers2?: Array<Modifier>;

  @jsonArrayMember(Modifier)
  modifiers3?: Array<Modifier>;
}

const logisticSerializer = new TypedJSON(Logistic);

export { Logistic, logisticSerializer };
