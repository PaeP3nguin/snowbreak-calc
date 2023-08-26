import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';

/**
 * Special modifiers for a skill's damage calculation.
 *
 * Not common enough to be made into a field and only used for pre-filled effects.
 */
enum SkillBehaviorModifiers {
  // Lucky Times, Fury, and Sweet Soul passives and Mauxir ult execution can crit.
  CanCrit = 'Can crit',

  // Sweet Soul damage is based not on ATK% but the actual damage of the bullet, though it goes through defense again.
  SweetSoul = 'Sweet soul final damage',

  // Support skill effects are not affected by the on-field operative's buffs. Only full team damage affects them.
  SupportSkill = 'Support skill',
}

interface SkillModel {
  name: string;
  description: string;
  element: ElementType;
  damagePercent: number;
  damageFlat: number;
  frequency: number;
  active: boolean;

  /** Aptitude effects are extra damage on each bullet. */
  isAptitude: boolean;
  specialModifiers?: Array<SkillBehaviorModifiers>;
}

@jsonObject
class Skill implements SkillModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(String)
  description!: string;

  @jsonMember(String)
  element!: ElementType;

  @jsonMember(Number)
  damagePercent!: number;

  @jsonMember(Number)
  damageFlat!: number;

  @jsonMember(Number)
  frequency!: number;

  @jsonMember(Boolean)
  active: boolean;

  @jsonMember(Boolean)
  isAptitude!: boolean;

  @jsonArrayMember(String)
  specialModifiers?: Array<SkillBehaviorModifiers>;

  constructor(
    name: string,
    description: string,
    element: ElementType,
    damagePercent: number,
    damageFlat: number,
    frequency: number,
    active: boolean,
    isAptitude: boolean,
    specialModifiers?: Array<SkillBehaviorModifiers>,
  ) {
    this.name = name;
    this.description = description;
    this.element = element;
    this.damagePercent = damagePercent;
    this.damageFlat = damageFlat;
    this.frequency = frequency;
    this.active = active;
    this.isAptitude = isAptitude;
    this.specialModifiers = specialModifiers;
  }
}

const skillSerializer = new TypedJSON(Skill);

class UniqueSkill extends Skill {
  id: number;

  constructor(
    name: string,
    description: string,
    element: ElementType,
    damagePercent: number,
    damageFlat: number,
    frequency: number,
    active: boolean,
    isAptitude: boolean,
    specialModifiers?: Array<SkillBehaviorModifiers>,
    id?: number,
  ) {
    super(
      name,
      description,
      element,
      damagePercent,
      damageFlat,
      frequency,
      active,
      isAptitude,
      specialModifiers,
    );
    this.id = id || Math.random();
  }

  static fromSkill(skill: Skill) {
    return new UniqueSkill(
      skill.name,
      skill.description,
      skill.element,
      skill.damagePercent,
      skill.damageFlat,
      skill.frequency,
      skill.active,
      skill.isAptitude,
      skill.specialModifiers,
    );
  }
}

export { Skill, UniqueSkill, SkillBehaviorModifiers, skillSerializer };
