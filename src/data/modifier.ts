import { TypedJSON, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';

enum ModifierType {
  AtkPercent = 'ATK% buff',
  FlatAtk = 'Flat ATK buff',
  CritDmgAmp = 'Critical damage amp',
  CritRate = 'Crit rate',
  ElementalDamage = 'Elemental damage',
  BallisticDamage = 'Ballistic damage',
  // SkillDamage = 'Skill damage',
  // AuxiliaryDamage = 'Auxiliary damage',
  Generic = 'Generic buff',
  DamageTaken = 'Damage taken debuff',
  ElementalResist = 'Elemental resist debuff',
  FinalDamage = 'Final damage buff',
  RateOfFire = 'Rate of fire increase',
  // FlatDefenseReduction = 'Flat defense reduction',
  // DefensePenetration = 'Defense penetration',
}

interface ModifierModel {
  active: boolean;
  name: string;
  description: string;
  type: ModifierType;
  value: number;
  alignmentIncrease?: number;
  element?: ElementType;
}

@jsonObject
class Modifier implements ModifierModel {
  @jsonMember(Boolean)
  active: boolean;

  @jsonMember(String)
  name: string;

  @jsonMember(String)
  description: string;

  @jsonMember(String)
  type: ModifierType;

  @jsonMember(Number)
  value: number;

  /**
   * Increase in value per 100 alignment index.
   */
  @jsonMember(Number)
  alignmentIncrease?: number;

  @jsonMember(String)
  element?: ElementType;

  constructor(
    active: boolean,
    name: string,
    description: string,
    type: ModifierType,
    value: number,
    alignmentIncrease?: number,
    element?: ElementType,
  ) {
    this.active = active;
    this.name = name;
    this.description = description;
    this.type = type;
    this.value = value;
    this.alignmentIncrease = alignmentIncrease;
    this.element = element;
  }
}

const modifierSerializer = new TypedJSON(Modifier);

/**
 * Modifier class with a random ID. Useful for situations where we need to uniquely identify a modifier, such as adding
 * to a table.
 */
class UniqueModifier extends Modifier {
  id: number;

  constructor(
    active: boolean,
    name: string,
    description: string,
    type: ModifierType,
    value: number,
    alignmentIncrease?: number,
    element?: ElementType,
    id?: number,
  ) {
    super(active, name, description, type, value, alignmentIncrease, element);
    this.id = id || Math.random();
  }

  static fromModifier(modifier: Modifier) {
    return new UniqueModifier(
      modifier.active,
      modifier.name,
      modifier.description,
      modifier.type,
      modifier.value,
      modifier.alignmentIncrease,
      modifier.element,
    );
  }
}

/**
 * Modifiers that can be specified for a specific element.
 */
const ELEMENT_ENABLED_MODIFIERS = [
  ModifierType.ElementalDamage,
  ModifierType.BallisticDamage,
  ModifierType.ElementalResist,
];

export {
  ModifierType,
  Modifier,
  UniqueModifier,
  modifierSerializer,
  ELEMENT_ENABLED_MODIFIERS,
};
