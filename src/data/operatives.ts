import { Modifier, ModifierType } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { deepFreeze } from './util';
import { WeaponType } from './weapons';
import { Rarity } from './rarity';
import { ElementType } from './element';
import { Skill, SkillBehaviorModifiers } from './skill';

interface OperativeModel {
  name: string;
  baseAtk: number;
  alignmentIndex: number;
  weaponType: WeaponType;
  rarity: Rarity;
  manifestLevel: number;
  manifestStep: number;
  modifiers: Array<Modifier>;
  skillDamage?: Array<Skill>;
}

@jsonObject
class Operative implements OperativeModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(Number)
  baseAtk!: number;

  @jsonMember(Number)
  alignmentIndex!: number;

  @jsonMember(String)
  weaponType!: WeaponType;

  @jsonMember(String)
  rarity!: Rarity;

  @jsonMember(Number)
  manifestLevel!: number;

  @jsonMember(Number)
  manifestStep!: number;

  @jsonArrayMember(Modifier)
  modifiers!: Array<Modifier>;

  @jsonArrayMember(Skill)
  skillDamage?: Array<Skill>;
}

const operativeSerializer = new TypedJSON(Operative);

// Separated for nicer type-hinting, allows individual classes to be highlighted instead of the variable.
// Keep in order of SMG, Sniper, Shotgun, Pistol, AR to match weapon sorting.
const operativeList: Array<Operative> = [
  {
    name: 'Lyfe - Wednesday',
    baseAtk: 1435,
    alignmentIndex: 300,
    weaponType: WeaponType.SMG,
    rarity: Rarity.Purple,
    manifestLevel: 5,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Wednesday Deiwos',
        description:
          'Auxiliary unit strength increases by 36%. +5% per 100 alignment.',
        type: ModifierType.AuxiliaryDamage,
        value: 36,
        alignmentIncrease: 5,
      },
    ],
    skillDamage: [
      {
        name: "Wednesday skill - Raven's Command",
        description:
          'Each Raven drone shoots 9 missiles. Since each additional missile on each Raven deals 50% less damage when hitting the same part, the multiplier is 2x the base. Assumes 5 drones with 100% uptime. Frequency based on 30 S-energy cost (cooldown is 25s but costs 30 S-energy).',
        active: true,
        element: ElementType.Electrical,
        damagePercent: 52 * 5,
        damageFlat: 14 * 5,
        isAptitude: false,
        frequency: 0.5,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven ballistic attack',
        description:
          'Drones attack once every ~1.1s. Assumes 5 drones with 100% uptime.',
        active: false,
        element: ElementType.Electrical,
        damagePercent: 7 * 5,
        damageFlat: 7 * 5,
        isAptitude: false,
        frequency: 60 / 1.1,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven ballistic attack (M4)',
        description:
          'Drones attack once every ~1.1s. Assumes 5 drones with 100% uptime.',
        active: true,
        element: ElementType.Electrical,
        damagePercent: 7.7 * 5,
        damageFlat: 7 * 5,
        isAptitude: false,
        frequency: 60 / 1.1,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven ballistic attack (M2+M4)',
        description:
          'Drones attack once every ~0.55s. Assumes 5 drones with 100% uptime and max M2 buff.',
        active: false,
        element: ElementType.Electrical,
        damagePercent: 7.7 * 5,
        damageFlat: 7 * 5,
        isAptitude: false,
        frequency: 60 / 0.55,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven Whispering Arrows attack (M1)',
        description:
          'Drones have a 10% chance of shooting a laser when attacking. Assumes 5 drones with 100% uptime.',
        active: false,
        element: ElementType.Electrical,
        damagePercent: 15 * 5,
        damageFlat: 0,
        isAptitude: false,
        frequency: (60 / 1.1) * 0.1,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven Whispering Arrows attack (M3)',
        description:
          'Shooting a weakspot with an electrical weapon procs Whispering Arrows, 5s CD. Assumes 5 drones with 100% uptime.',
        active: true,
        element: ElementType.Electrical,
        damagePercent: 15 * 5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 60 / 5,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven Whispering Arrows attack (M5)',
        description:
          'Drones have a 30% chance of shooting a laser when attacking. Assumes 5 drones with 100% uptime.',
        active: true,
        element: ElementType.Electrical,
        damagePercent: 15 * 5,
        damageFlat: 0,
        isAptitude: false,
        frequency: (60 / 1.1) * 0.3,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
      {
        name: 'Wednesday summon - Raven Whispering Arrows attack (M2+M5)',
        description:
          'Drones have a 30% chance of shooting a laser when attacking. Assumes 5 drones with 100% uptime and max M2 buff.',
        active: false,
        element: ElementType.Electrical,
        damagePercent: 15 * 5,
        damageFlat: 0,
        isAptitude: false,
        frequency: (60 / 0.55) * 0.3,
        specialModifiers: [SkillBehaviorModifiers.Auxiliary],
      },
    ],
  },
  {
    name: 'Lyfe - Wild Hunt',
    baseAtk: 1325,
    alignmentIndex: 300,
    weaponType: WeaponType.SMG,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Wild Hunt Deiwos',
        description: 'Skill DMG increases by 10.5%. +3% per 100 alignment.',
        type: ModifierType.SkillDamage,
        value: 10.5,
        alignmentIncrease: 3,
      },
      {
        active: false,
        name: 'Wild Hunt Deiwos (vs frozen)',
        description:
          'Skill DMG increases by 10.5%. +3% per 100 alignment. This buff is 1.5x stronger vs frozen enemies.',
        type: ModifierType.SkillDamage,
        value: 15.75,
        alignmentIncrease: 4.5,
      },
      {
        active: true,
        name: 'Wild Hunt skill neuronic',
        description:
          'Increases final DMG of skill by 20% if triggered when meter is full.',
        type: ModifierType.FinalSkillDamage,
        value: 20,
      },
      {
        active: false,
        name: 'Wild Hunt M2 passive',
        description: 'Increases final DMG of skill by 5%, max 5 stacks.',
        type: ModifierType.FinalSkillDamage,
        value: 25,
      },
    ],
    skillDamage: [
      {
        name: 'Wild Hunt skill - Frost Wolves',
        description:
          'Icicles from her skill. This assumes 100% uptime. Frequency based on firing rate of ~4.2 per second.',
        active: true,
        element: ElementType.Frost,
        damagePercent: 35,
        damageFlat: 31,
        isAptitude: false,
        frequency: 252,
      },
      {
        name: 'Wild Hunt skill - Frost Wolves (M4)',
        description:
          'Icicles from her skill. This assumes 100% uptime. Frequency based on firing rate of ~4.2 per second.',
        active: false,
        element: ElementType.Frost,
        damagePercent: 38.5,
        damageFlat: 43,
        isAptitude: false,
        frequency: 252,
      },
    ],
  },
  {
    name: 'Fenny - Coronet',
    baseAtk: 1250,
    alignmentIndex: 300,
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Orange,
    manifestLevel: 1,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Coronet standard skill',
        description:
          'Increases rate of fire by 1% per mercy stack, max 80 stacks. Adjust based on your projected average mercy.',
        type: ModifierType.RateOfFire,
        value: 60,
      },
      {
        active: true,
        name: 'Coronet standard skill neuronic',
        description: 'Increases electrical DMG by 10% when in Crown of Thorns.',
        type: ModifierType.ElementalDamage,
        element: ElementType.Electrical,
        value: 10,
      },
      {
        active: true,
        name: 'Coronet Deiwos',
        description: '+28% crit rate. +4% per 100 alignment.',
        type: ModifierType.CritRate,
        alignmentIncrease: 4,
        value: 28,
      },
      {
        active: true,
        name: 'Coronet Deiwos',
        description:
          'Each shot has a 25% chance to fire 1 extra pellet. Calculated as (9/8-1)*.25',
        type: ModifierType.FinalDamage,
        value: 3.125,
      },
      {
        active: false,
        name: 'Coronet M5',
        description:
          'Increases electrical DMG by 15% when mercy exceeds the original limit.',
        type: ModifierType.ElementalDamage,
        element: ElementType.Electrical,
        value: 15,
      },
    ],
  },
  {
    name: 'Fenny - Lionheart',
    baseAtk: 1668,
    alignmentIndex: 300,
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Purple,
    manifestLevel: 5,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Lionheart Deiwos',
        description:
          'Increases damage by 16% when within 5m from the target. +4% per 100 alignment.',
        type: ModifierType.Generic,
        value: 16,
        alignmentIncrease: 4,
      },
    ],
  },
  {
    name: 'Marian - Swift',
    baseAtk: 1467,
    alignmentIndex: 300,
    weaponType: WeaponType.Sniper,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Swift Deiwos',
        description:
          'When hitting weakspot, ignore 300 DEF. +30 per 100 alignment.',
        type: ModifierType.FlatDefenseReduction,
        value: 300,
        alignmentIncrease: 30,
      },
      {
        active: true,
        name: 'Swift Deiwos',
        description: '+1 mag capacity',
        type: ModifierType.MagSizeBoost,
        value: 1,
      },
      {
        active: true,
        name: 'Swift M2',
        description:
          'Increases ballistic DMG of standard shots that hit the Cloud Shot mark by 25%. Pick a value based on the % of shots you expect to be buffed based on your weapon RPM and rotation. 5% here assumes 1 in 5 bullets is buffed. This also applies to Cloud Shot so its being generous.',
        type: ModifierType.BallisticDamage,
        value: 5,
      },
      {
        active: false,
        name: 'Swift ult passive',
        description:
          "After using ult, Cloud Shot and shots ignore 20% of the target's DEF for 10 sec.",
        type: ModifierType.DefensePenetration,
        value: 20,
      },
    ],
    skillDamage: [
      {
        name: 'Swift skill - Cloud Shot',
        description:
          'Damage calculation will automatically include ballistic DMG boosts and crits. Frequency based on cooldown of 5 seconds.',
        active: true,
        element: ElementType.Kinetic,
        damagePercent: 80,
        damageFlat: 216,
        isAptitude: false,
        frequency: 12,
        specialModifiers: [
          SkillBehaviorModifiers.CloudShot,
          SkillBehaviorModifiers.CanCrit,
        ],
      },
      {
        name: 'Swift skill - Cloud Shot (M3)',
        description:
          'Damage calculation will automatically include ballistic DMG boosts and crits. Frequency based on cooldown of 4 seconds.',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 80,
        damageFlat: 216,
        isAptitude: false,
        frequency: 15,
        specialModifiers: [
          SkillBehaviorModifiers.CloudShot,
          SkillBehaviorModifiers.CanCrit,
        ],
      },
      {
        name: 'Swift skill - Cloud Shot (M4)',
        description:
          'Damage calculation will automatically include ballistic DMG boosts and crits. Frequency based on cooldown of 4 seconds.',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 88,
        damageFlat: 244,
        isAptitude: false,
        frequency: 15,
        specialModifiers: [
          SkillBehaviorModifiers.CloudShot,
          SkillBehaviorModifiers.CanCrit,
        ],
      },
    ],
  },
  {
    name: 'Yao - Winter Solstice',
    baseAtk: 1792,
    alignmentIndex: 300,
    weaponType: WeaponType.Sniper,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Winter Solstice Deiwos',
        description:
          'Increases damage when further from the target, up to 16%. +3% per 100 alignment.',
        type: ModifierType.Generic,
        value: 16,
        alignmentIncrease: 3,
      },
      {
        active: false,
        name: 'Winter Solstice ult neuronic 1',
        description:
          'During ult: increases crit DMG amp by 10% if equipped with Thermal weapon',
        type: ModifierType.CritDmgAmp,
        value: 10,
      },
      {
        active: false,
        name: 'Winter Solstice ult neuronic 2',
        description:
          'During ult: hitting the same part increases final ballistic DMG by 4%, max 5 stacks.',
        type: ModifierType.FinalBallisticDamage,
        value: 20,
      },
    ],
    skillDamage: [
      {
        name: 'Winter Solstice skill - Scorching Sun Bullet',
        description: 'The damage from the skill blast',
        active: false,
        element: ElementType.Thermal,
        damagePercent: 47,
        damageFlat: 124,
        isAptitude: true,
        frequency: 0,
      },
      {
        name: 'Winter Solstice skill - Scorching Sun Bullet neuronic',
        description:
          'Deal an extra 30% of ATK when hitting a weakspot with skill. This takes buffs a bit weird, so the DPS calculation here is a bit off.',
        active: false,
        element: ElementType.Thermal,
        damagePercent: 30,
        damageFlat: 0,
        isAptitude: true,
        frequency: 0,
      },
    ],
  },
  {
    name: 'Acacia - Redacted',
    baseAtk: 960,
    alignmentIndex: 300,
    weaponType: WeaponType.Pistol,
    rarity: Rarity.Purple,
    manifestLevel: 5,
    manifestStep: 0,
    modifiers: [
      {
        active: false,
        name: 'Redacted ult',
        description: 'Operatives within range of ult 10% ATK%.',
        type: ModifierType.AtkPercent,
        value: 10,
      },
      {
        active: true,
        name: 'Redacted M3 passive',
        description:
          'Redacted skill gains 1% final DMG for each bullet remaining. Adjust based on chosen pistol.',
        type: ModifierType.FinalSkillDamage,
        value: 6,
      },
    ],
    skillDamage: [
      {
        name: 'Redacted skill - Spokes of the Wheel',
        description:
          'Assumes 3 ricochets (single target). Frequency based on cooldown of 2.2 seconds.',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 81.3,
        damageFlat: 853.65,
        isAptitude: false,
        frequency: 27.2,
      },
      {
        name: 'Redacted skill - Spokes of the Wheel (M4)',
        description:
          'Assumes 3 ricochets (single target). Frequency based on cooldown of 2 seconds.',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 81.3,
        damageFlat: 1113.81,
        isAptitude: false,
        frequency: 30,
      },
      {
        name: 'Redacted M1 passive - Ripple in Time',
        description:
          'Redacted skill marks target. Skill hits detonate the mark for 2.5% ATK of damage. Use same frequency as skill.',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 2.5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 27.2,
      },
      {
        name: 'Redacted M1 passive - Ripple in Time (M2)',
        description:
          'Redacted skill marks target. Skill hits detonate the mark for 2.5% ATK of damage, up to 5 stacks. Use same frequency as skill.',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 12.5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 27.2,
      },
      {
        name: 'Redacted M1 passive - Ripple in Time (M4)',
        description:
          'Redacted skill marks target. Skill hits detonate the mark for 2.5% ATK of damage, up to 5 stacks. Use same frequency as skill.',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 12.5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 30,
      },
    ],
  },
  {
    name: 'Haru - Absconditus',
    baseAtk: 1778,
    alignmentIndex: 300,
    weaponType: WeaponType.Pistol,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Absconditus standard skill neuronic 1',
        description:
          'When equipped with a Kinetic weapon, increases final DMG of standard skill Compensatory Justice by 20%.',
        type: ModifierType.FinalSkillDamage,
        value: 20,
        target: 'Compensatory Justice',
      },
      {
        active: true,
        name: 'Absconditus M2 passive',
        description: 'Increases ATK by 5% when using skill, max 5 stacks.',
        type: ModifierType.AtkPercent,
        value: 25,
      },
      {
        active: false,
        name: 'Absconditus M5 passive',
        description:
          "In ult state, deals more damage the lower the target's current HP, up to 30%",
        type: ModifierType.Generic,
        value: 30,
      },
    ],
    skillDamage: [
      {
        name: 'Absconditus standard skill - Compensatory Justice',
        description: '',
        active: true,
        element: ElementType.Kinetic,
        damagePercent: 111,
        damageFlat: 27,
        isAptitude: false,
        frequency: 125,
      },
      {
        name: 'Absconditus standard skill - Compensatory Justice (during ult)',
        description: '',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 148,
        damageFlat: 36,
        isAptitude: false,
        frequency: 125,
      },
      {
        name: 'Absconditus - Extra standard skill damage from T1 Star Ocean procs',
        description: '',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 27,
        damageFlat: 0,
        isAptitude: false,
        frequency: 125,
      },
      {
        name: 'Absconditus - Extra standard skill damage from T1 Star Ocean procs (during ult)',
        description: '',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 36,
        damageFlat: 0,
        isAptitude: false,
        frequency: 125,
      },
      {
        name: 'Absconditus ult skill - initial hit',
        description: '',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 200,
        damageFlat: 27,
        isAptitude: false,
        frequency: 0,
      },
      {
        name: 'Absconditus ult skill - final blow',
        description: '',
        active: false,
        element: ElementType.Kinetic,
        damagePercent: 360,
        damageFlat: 105,
        isAptitude: false,
        frequency: 43,
      },
    ],
  },
  {
    name: 'Chenxing - Ethereal Cloud',
    baseAtk: 1400,
    alignmentIndex: 300,
    weaponType: WeaponType.AssaultRifle,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Ethereal Cloud Deiwos',
        description:
          '50% chance to increase shot damage by 32% when using electrical weapon. +8% per 100 alignment.',
        type: ModifierType.BallisticDamage,
        element: ElementType.Electrical,
        value: 16,
        alignmentIncrease: 4,
      },
      {
        active: true,
        name: 'Ethereal Cloud slip detonation damage',
        description:
          "Slip detonation damage is a % of bullet damage so can be calculated of as a final damage multiplier. Note that it's affected by skill damage as well. 1 target: 40, 2 targets: 68, 3 targets: 87.6, 4 targets: 101.32, 5 targets: 110.924, 6 targets: 117.6468, 7 targets: 122.35276, 8 targets: 125.64693",
        type: ModifierType.FinalBallisticDamage,
        value: 40,
      },
      {
        active: false,
        name: 'Ethereal Cloud M1',
        description:
          'Ballistics DMG increases by 1% for 3s when hitting a weakspot, max 15 stacks.',
        type: ModifierType.BallisticDamage,
        value: 15,
      },
      {
        active: false,
        name: 'Ethereal Cloud M3',
        description: 'Increases Crit DMG against targets marked with skill.',
        type: ModifierType.CritDmgAmp,
        value: 30,
      },
    ],
  },
];

const OPERATIVES: Array<Operative> = deepFreeze(operativeList);

export { Operative, operativeSerializer, OPERATIVES };
