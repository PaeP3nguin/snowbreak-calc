import { TypedJSON, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';

interface SkillModel {
  name: string;
  description: string;
  element: ElementType;
  damagePercent: number;
  damageFlat: number;
  frequency: number;
  active: boolean;
  isAptitude: boolean;
  canCrit: boolean;
  calculateDefenseAgain: boolean;
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

  @jsonMember(Boolean)
  canCrit!: boolean;

  @jsonMember(Boolean)
  calculateDefenseAgain!: boolean;

  constructor(
    name: string,
    description: string,
    element: ElementType,
    damagePercent: number,
    damageFlat: number,
    frequency: number,
    active: boolean,
    isAptitude: boolean,
    canCrit: boolean,
    calculateDefenseAgain: boolean,
  ) {
    this.name = name;
    this.description = description;
    this.element = element;
    this.damagePercent = damagePercent;
    this.damageFlat = damageFlat;
    this.frequency = frequency;
    this.active = active;
    this.isAptitude = isAptitude;
    this.canCrit = canCrit;
    this.calculateDefenseAgain = calculateDefenseAgain;
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
    canCrit: boolean,
    calculateDefenseAgain: boolean,
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
      canCrit,
      calculateDefenseAgain,
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
      skill.canCrit,
      skill.calculateDefenseAgain,
    );
  }
}

export { Skill, UniqueSkill, skillSerializer };
