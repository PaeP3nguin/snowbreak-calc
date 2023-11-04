import { TypedJSON, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';

enum ModifierType {
  AtkPercent = 'ATK% buff',
  FlatAtk = 'Flat ATK buff',
  CritDmgAmp = 'Critical damage amp',
  CritRate = 'Crit rate',
  ElementalDamage = 'Elemental damage',
  BallisticDamage = 'Ballistic damage',
  SkillDamage = 'Skill damage',
  AuxiliaryDamage = 'Auxiliary units strength',
  Generic = 'Generic buff',
  // FullTeam affects support damage too, like Fritia passive or other supports' skills.
  // FullTeam = 'Full team dmg buff',
  DamageTaken = 'Damage taken debuff',
  ElementalResist = 'Elemental resist debuff',
  FinalDamage = 'Final damage buff',
  FinalBallisticDamage = 'Final damage (ballistic)',
  FinalSkillDamage = 'Final damage (skill)',
  RateOfFire = 'Rate of fire increase',
  FlatDefenseReduction = 'Flat defense reduction',
  DefensePenetration = 'Defense penetration%',
  /**
   * Only used for Swift for now.
   */
  MagSizeBoost = 'Magazine size boost',
}

interface ModifierModel {
  active: boolean;
  name: string;
  description: string;
  type: ModifierType;
  value: number;
  alignmentIncrease?: number;
  element?: ElementType;

  /**
   * Name of a specific skill or weapon the modifier affects. Does not have the match the whole
   * string, just a substring. This is because many skill have multiple entries due to manifests or
   * other alternatives.
   */
  target?: string;
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

  @jsonMember(String)
  target?: string;

  constructor(
    active: boolean,
    name: string,
    description: string,
    type: ModifierType,
    value: number,
    alignmentIncrease?: number,
    element?: ElementType,
    target?: string,
  ) {
    this.active = active;
    this.name = name;
    this.description = description;
    this.type = type;
    this.value = value;
    this.alignmentIncrease = alignmentIncrease;
    this.element = element;
    this.target = target;
  }
}

const modifierSerializer = new TypedJSON(Modifier);

/**
 * Modifier that's been added to the calculator.
 *
 * Comes with a random ID for identification and an optional lock source name, which if present,
 * indicates that the modifier should be locked and not be deletable by the user. Lock source name
 * can be anything, but is intended to be a weapon, operative, or logistic name.
 */
class UniqueModifier extends Modifier {
  id: number;
  lockSource?: string;

  constructor(
    active: boolean,
    name: string,
    description: string,
    type: ModifierType,
    value: number,
    alignmentIncrease?: number,
    element?: ElementType,
    target?: string,
    id?: number,
    lockSource?: string,
  ) {
    super(
      active,
      name,
      description,
      type,
      value,
      alignmentIncrease,
      element,
      target,
    );
    this.id = id || Math.random();
    this.lockSource = lockSource;
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
      modifier.target,
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
