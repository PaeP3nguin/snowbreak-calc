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

// Separated from deepFreeze for nicer type-hinting, allows individual classes to be highlighted
// instead of the variable.
// Keep in order of SMG, Sniper, Shotgun, Pistol, AR, crossbow to match weapon sorting.
const operativeList: Array<Operative> = [
  {
    name: 'Cherno - Enigma',
    baseAtk: 1211,
    weaponType: WeaponType.SMG,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Enigma standard skill neuronic',
        description:
          'Detonation final damage increases by 20% when done at full stacks.',
        type: ModifierType.FinalSkillDamage,
        value: 20,
        target: 'Enigma - standard skill detonation',
      },
      {
        active: true,
        name: 'Enigma M2',
        description:
          'Detonation final damage increases by 30% when done with 3 voids on the field.',
        type: ModifierType.FinalSkillDamage,
        value: 30,
        target: 'Enigma - standard skill detonation',
      },
    ],
    skillDamage: [
      {
        name: 'Enigma - M2 rotation explanation',
        description: `Enigma skill DPS is based on a rotation of skill > shoot > skill > shoot > skill > detonate > reload.
With M2, this is enough to hit 300 stacks in one magazine.
The initial build up phase lasts 8s (though DoTs are only ticking for 7s as it takes ~1s for the first skill to animate), then the detonation takes 2s.
Then finally, reloading takes 1.35s.`,
        active: false,
        element: ElementType.Chaos,
        damagePercent: 0,
        damageFlat: 0,
        isAptitude: false,
        frequency: 1,
      },
      {
        name: 'Enigma - standard skill',
        description: 'Cherno uses her skill 3x during the rotation',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 50,
        damageFlat: 52,
        isAptitude: false,
        frequency: (60 / 11.35) * 3,
      },
      {
        name: 'Enigma - Enmity DoT (building phase)',
        description:
          'DoT damage during the build up phase (70% of the rotation), based on 150 average stacks.',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 30 + 0.1 * 150,
        alignmentIncrease: 5,
        damageFlat: 0,
        isAptitude: false,
        frequency: (120 * 7) / 11.35,
      },
      {
        name: 'Enigma - Enmity DoT (detonate phase)',
        description:
          'DoT damage while charging the detonation (2s or 20% of the rotation), with 300 stacks.',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 30 + 0.1 * 300,
        alignmentIncrease: 5,
        damageFlat: 0,
        isAptitude: false,
        // Frequency rises to one tick per .35s
        frequency: ((60 / 0.35) * 2) / 11.35,
      },
      {
        name: 'Enigma - M3 damage',
        description:
          'Does an extra hit every 60 stacks of enmity, so 5x during the rotation',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 150,
        damageFlat: 0,
        isAptitude: false,
        frequency: (60 / 11.35) * 5,
      },
      {
        name: 'Enigma - standard skill detonation (counts as DoT)',
        description: 'Detonation at 300 stacks. Assumes 10 second rotation.',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 9 * 300,
        damageFlat: 756,
        isAptitude: false,
        frequency: 60 / 11.35,
      },
      {
        name: 'Enigma - standard skill detonation (M4, counts as DoT)',
        description: 'Detonation at 300 stacks. Assumes 10 second rotation.',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 9.9 * 300,
        damageFlat: 986,
        isAptitude: false,
        frequency: 60 / 11.35,
      },
    ],
  },
  {
    name: 'Lyfe - Wednesday',
    baseAtk: 1435,
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
    weaponType: WeaponType.SMG,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Wild Hunt Deiwos',
        description: 'Skill DMG increases by 14%. +3% per 100 alignment.',
        type: ModifierType.SkillDamage,
        value: 14,
        alignmentIncrease: 3,
      },
      {
        active: false,
        name: 'Wild Hunt Deiwos (vs frozen)',
        description:
          'Skill DMG increases by 14%. +3% per 100 alignment. This buff is 1.5x stronger vs frozen enemies.',
        type: ModifierType.SkillDamage,
        value: 21,
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
        active: true,
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
    weaponType: WeaponType.Shotgun,
    rarity: Rarity.Orange,
    manifestLevel: 2,
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
          SkillBehaviorModifiers.CanCritWeakspot,
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
          SkillBehaviorModifiers.CanCritWeakspot,
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
          SkillBehaviorModifiers.CanCritWeakspot,
        ],
      },
    ],
  },
  {
    name: 'Yao - Winter Solstice',
    baseAtk: 1792,
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
          'Redacted skill marks target. Skill hits detonate the mark for 2.5% ATK of damage. Multiplied by 3 since skill is 3 hits.. Use same frequency as skill.',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 7.5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 27.2,
      },
      {
        name: 'Redacted M1 passive - Ripple in Time (M2)',
        description:
          'Redacted skill marks target. Skill hits detonate the mark for 2.5% ATK of damage, up to 5 stacks. Multiplied by 3 since skill is 3 hits. Use same frequency as skill.',
        active: false,
        element: ElementType.Chaos,
        damagePercent: 37.5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 27.2,
      },
      {
        name: 'Redacted M1 passive - Ripple in Time (M4)',
        description:
          'Redacted skill marks target. Skill hits detonate the mark for 2.5% ATK of damage, up to 5 stacks. Multiplied by 3 since skill is 3 hits.. Use same frequency as skill.',
        active: true,
        element: ElementType.Chaos,
        damagePercent: 37.5,
        damageFlat: 0,
        isAptitude: false,
        frequency: 30,
      },
    ],
  },
  {
    name: 'Enya - Big Sis',
    baseAtk: 1334,
    weaponType: WeaponType.Pistol,
    rarity: Rarity.Purple,
    manifestLevel: 5,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Big Sis deiwos',
        description: 'Increase thermal DMG by 14%. +2% per 100 index.',
        type: ModifierType.ElementalDamage,
        element: ElementType.Thermal,
        value: 14,
        alignmentIncrease: 2,
      },
    ],
    skillDamage: [
      {
        name: 'Big Sis skill - Flower of Youth',
        description:
          'Enya throws 10x Plump Buds, with damage reduced by 50% for each time a target is hit by extra blasts. Frequency based on 25 S-energy cost.',
        active: true,
        element: ElementType.Thermal,
        damagePercent: 80,
        damageFlat: 102,
        isAptitude: false,
        frequency: 60 / 25,
      },
      {
        name: 'Big Sis skill - Flower of Youth (multi-hit)',
        description:
          'Assumes all 10 Plump Buds hit the enemy, dealing 2x base damage.',
        active: false,
        element: ElementType.Thermal,
        damagePercent: 160,
        damageFlat: 204,
        isAptitude: false,
        frequency: 60 / 25,
      },
      {
        name: 'Big Sis passive - Snake Feathers',
        description:
          'Generates 1 Rich Lights every 5s that is consumed on hit to summon a Snake Feather to hit the target, max 10 stacks.',
        active: false,
        element: ElementType.Thermal,
        damagePercent: 20,
        damageFlat: 25,
        isAptitude: false,
        frequency: 60 / 5,
      },
      {
        name: 'Big Sis passive - Snake Feathers (M1)',
        description:
          'Shots that hit after a Snake Feather hits deal an extra 15% of ATK in Thermal DMG.',
        active: true,
        element: ElementType.Thermal,
        damagePercent: 15,
        damageFlat: 0,
        isAptitude: false,
        frequency: 60 / 5,
      },
      {
        name: 'Big Sis passive - Snake Feathers (M4)',
        description:
          'Generates 1 Rich Lights every 5s that is consumed on hit to summon a Snake Feather to hit the target, max 10 stacks.',
        active: true,
        element: ElementType.Thermal,
        damagePercent: 22,
        damageFlat: 26,
        isAptitude: false,
        frequency: 60 / 5,
      },
    ],
  },
  {
    name: 'Haru - Absconditus',
    baseAtk: 1778,
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
    skillDamage: [
      {
        active: true,
        name: 'Ethereal Cloud slip detonation damage (1 target)',
        description:
          "Slip detonation damage is a % of bullet damage. It's only affected by skill damage as well. 1 target: 40, 2 targets: 68, 3 targets: 87.6, 4 targets: 101.32, 5 targets: 110.924, 6 targets: 117.6468, 7 targets: 122.35276, 8 targets: 125.64693",
        element: ElementType.Electrical,
        damagePercent: 40,
        damageFlat: 0,
        isAptitude: true,
        frequency: 0,
        specialModifiers: [SkillBehaviorModifiers.BasedOnBulletDamage],
      },
      {
        active: false,
        name: 'Ethereal Cloud slip detonation damage (5 targets, ex. tank)',
        description:
          "Slip detonation damage is a % of bullet damage. It's only affected by skill damage as well. 1 target: 40, 2 targets: 68, 3 targets: 87.6, 4 targets: 101.32, 5 targets: 110.924, 6 targets: 117.6468, 7 targets: 122.35276, 8 targets: 125.64693",
        element: ElementType.Electrical,
        damagePercent: 110.924,
        damageFlat: 0,
        isAptitude: true,
        frequency: 0,
        specialModifiers: [SkillBehaviorModifiers.BasedOnBulletDamage],
      },
      {
        active: false,
        name: 'Ethereal Cloud slip detonation damage (7 targets, ex. Hela)',
        description:
          "Slip detonation damage is a % of bullet damage. It's only affected by skill damage as well. 1 target: 40, 2 targets: 68, 3 targets: 87.6, 4 targets: 101.32, 5 targets: 110.924, 6 targets: 117.6468, 7 targets: 122.35276, 8 targets: 125.64693",
        element: ElementType.Electrical,
        damagePercent: 122.35276,
        damageFlat: 0,
        isAptitude: true,
        frequency: 0,
        specialModifiers: [SkillBehaviorModifiers.BasedOnBulletDamage],
      },
    ],
  },
  {
    name: 'Katya - Blue Bolt',
    baseAtk: 1715,
    weaponType: WeaponType.Crossbow,
    rarity: Rarity.Orange,
    manifestLevel: 2,
    manifestStep: 0,
    modifiers: [
      {
        active: true,
        name: 'Blue Bolt standard skill neuronic 1',
        description: 'Tactical dodge increases ATK by 15% for 8s',
        type: ModifierType.AtkPercent,
        value: 15,
      },
      {
        active: false,
        // If changing this name, make sure to update the name in the calc code that toggles it when
        // toggling standard skill.
        name: 'Blue Bolt standard skill damage reduction',
        description:
          'Normal shots in standard skill deal 48% of their original damage',
        type: ModifierType.FinalBallisticDamage,
        value: -52,
      },
      {
        active: false,
        // If changing this name, make sure to update the name in the calc code that toggles it when
        // toggling standard skill.
        name: 'Blue Bolt standard skill damage reduction (M4)',
        description:
          'Normal shots in standard skill deal 50% of their original damage',
        type: ModifierType.FinalBallisticDamage,
        value: -50,
      },
      {
        active: false,
        // If changing this name, make sure to update the name in the calc code that toggles it when
        // toggling standard skill.
        name: 'Blue Bolt standard skill damage reduction (special fire)',
        description:
          'Special fire shots in standard skill deal 76% of their original damage',
        type: ModifierType.FinalBallisticDamage,
        value: -24,
      },
      {
        active: false,
        // If changing this name, make sure to update the name in the calc code that toggles it when
        // toggling standard skill.
        name: 'Blue Bolt standard skill damage reduction (special fire) (M4)',
        description:
          'Special fire shots in standard skill deal 80% of their original damage',
        type: ModifierType.FinalBallisticDamage,
        value: -20,
      },
      {
        active: true,
        name: 'Blue Bolt deiwos damage reduction',
        description:
          'Damage adjustment for the deiwos since it only procs 35% of the time',
        type: ModifierType.FinalSkillDamage,
        value: -65,
      },
      {
        active: false,
        name: 'Blue Bolt deiwos damage vs frozen',
        description: 'Deiwos procs deal 100% extra DMG to frozen targets',
        type: ModifierType.SkillDamage,
        value: 100,
      },
      {
        active: true,
        name: 'Blue Bolt M1',
        description:
          'Shots during standard skill add Soul Reader stacks. +1% fire rate per stack, 25 stacks max.',
        type: ModifierType.RateOfFire,
        value: 25,
      },
      {
        active: false,
        name: 'Blue Bolt M5',
        description: '+165 alignment index',
        type: ModifierType.AlignmentIndex,
        value: 165,
      },
    ],
    skillDamage: [
      {
        active: true,
        name: 'Blue bolt deiwos',
        description:
          'Shots have a 35% chance to deal an extra 35% + 200 ATK of Frost DMG of aptitude damage. +7% ATK damage multipler per 100 alignment.',
        element: ElementType.Frost,
        damagePercent: 35,
        alignmentIncrease: 7,
        damageFlat: 200,
        isAptitude: true,
        frequency: 0,
        specialModifiers: [],
      },
    ],
  },
];

const OPERATIVES: Array<Operative> = deepFreeze(operativeList);

export { Operative, operativeSerializer, OPERATIVES };
