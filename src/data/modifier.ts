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
  // FlatDefenseReduction = 'Flat defense reduction',
  // DefensePenetration = 'Defense penetration',
}

interface ModifierModel {
  active: boolean;
  name: string;
  description: string;
  type: ModifierType;
  value: number;
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

  @jsonMember(String)
  element?: ElementType;

  constructor(
    active: boolean,
    name: string,
    description: string,
    type: ModifierType,
    value: number,
    element?: ElementType
  ) {
    this.active = active;
    this.name = name;
    this.description = description;
    this.type = type;
    this.value = value;
    this.element = element;
  }

  // static fromModel(model: ModifierModel): Modifier {
  //   return new Modifier(
  //     model.active,
  //     model.name,
  //     model.description,
  //     model.type,
  //     model.value
  //   );
  // }
}

const modifierSerializer = new TypedJSON(Modifier);
// const yolo = modifierSerializer.parse({
//   active: true,
//   name: 'Amano-Iwato 2-set',
//   description: 'Ballistic DMG +24%',
//   type: ModifierType.BallisticDamage,
//   value: 24,
// });

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
    element?: ElementType,
    id?: number
  ) {
    super(active, name, description, type, value, element);
    this.id = id || Math.random();
  }

  static fromModifier(modifier: Modifier) {
    return new UniqueModifier(
      modifier.active,
      modifier.name,
      modifier.description,
      modifier.type,
      modifier.value,
      modifier.element
    );
  }
}

export { ModifierType, Modifier, UniqueModifier, modifierSerializer };
