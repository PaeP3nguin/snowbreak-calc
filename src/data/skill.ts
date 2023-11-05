import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';

/**
 * Special modifiers for a skill's damage calculation.
 *
 * Not common enough to be made into a field and only used for pre-filled effects.
 */
enum SkillBehaviorModifiers {
  /**
   * Indicates that the skill can crit based on the operative's crit rate.
   *
   * Lucky Times, Fury, and Mauxir ult execution are all examples of this.
   */
  CanCrit = 'Can crit',

  /**
   * Indicates that the skill can guarantee a crit when hitting a weakspot. This is separate from
   * CanCrit and does not mean it's affected by crit rate.
   *
   * Cloud Shot is an example of this.
   */
  CanCritWeakspot = 'Can crit on weakspot',

  /**
   * Indicates that the skill's damagePercent is a percentage of the damage the bullet dealt, not a
   * percentage of the operative ATK.
   *
   * Currently these effects are all not affected by anything but skill DMG.
   *
   * Sweet Soul passive and Ethereal Cloud chain damage are examples of this.
   */
  BasedOnBulletDamage = 'Based on bullet damage',

  /**
   * Skill is BasedOnBulletDamage, but still goes through defense calculation again.
   *
   * Sweet Soul passive is the only example of this.
   */
  RecalculateDefense = 'No defense calculation',

  /**
   * Support skill effects are not affected by the on-field operative's buffs. Only full team damage
   * affects them.
   */
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

/**
 * Skill that's been added to the calculator.
 *
 * Comes with a random ID for identification and an optional lock source name, which if present,
 * indicates that the modifier should be locked and not be deletable by the user. Lock source name
 * can be anything, but is intended to be a weapon, operative, or logistic name.
 */
class UniqueSkill extends Skill {
  id: number;
  lockSource?: string;

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
    lockSource?: string,
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
    this.lockSource = lockSource;
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
