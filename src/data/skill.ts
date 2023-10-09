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

  /** Sweet Soul damage is based not on ATK% but the actual damage of the bullet, though it goes through defense again.
   *
   * This only affects base damage calculation, make sure to add the CanCrit modifier separately.
   */
  SweetSoul = 'Sweet soul final damage',

  // Support skill effects are not affected by the on-field operative's buffs. Only full team damage affects them.
  SupportSkill = 'Support skill',

  /**
   * Swift's Cloud Shot standard skill is buffed by ballistic DMG boosts.
   */
  CloudShot = 'Cloud shot',

  /**
   * Damage from auxiliary units is only buffed by auxiliary strength and no other buffs.
   */
  Auxiliary = 'Auxiliary',
}

interface SkillModel {
  name: string;
  description: string;
  active: boolean;
  element: ElementType;
  damagePercent: number;
  damageFlat: number;

  /** Number of times the skill deals damage in a minute. */
  frequency: number;

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

  @jsonMember(Boolean)
  active: boolean;

  @jsonMember(String)
  element!: ElementType;

  @jsonMember(Number)
  damagePercent!: number;

  @jsonMember(Number)
  damageFlat!: number;

  @jsonMember(Number)
  frequency!: number;

  @jsonMember(Boolean)
  isAptitude!: boolean;

  @jsonArrayMember(String)
  specialModifiers?: Array<SkillBehaviorModifiers>;

  constructor(
    name: string,
    description: string,
    active: boolean,
    element: ElementType,
    damagePercent: number,
    damageFlat: number,
    frequency: number,
    isAptitude: boolean,
    specialModifiers?: Array<SkillBehaviorModifiers>,
  ) {
    this.name = name;
    this.description = description;
    this.active = active;
    this.element = element;
    this.damagePercent = damagePercent;
    this.damageFlat = damageFlat;
    this.frequency = frequency;
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
    active: boolean,
    element: ElementType,
    damagePercent: number,
    damageFlat: number,
    frequency: number,
    isAptitude: boolean,
    specialModifiers?: Array<SkillBehaviorModifiers>,
    id?: number,
  ) {
    super(
      name,
      description,
      active,
      element,
      damagePercent,
      damageFlat,
      frequency,
      isAptitude,
      specialModifiers,
    );
    this.id = id || Math.random();
  }

  static fromSkill(skill: Skill) {
    return new UniqueSkill(
      skill.name,
      skill.description,
      skill.active,
      skill.element,
      skill.damagePercent,
      skill.damageFlat,
      skill.frequency,
      skill.isAptitude,
      skill.specialModifiers,
    );
  }
}

export { Skill, UniqueSkill, SkillBehaviorModifiers, skillSerializer };
