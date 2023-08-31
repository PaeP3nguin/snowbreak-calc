import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';
import { Modifier, ModifierType } from './modifier';
import { deepFreeze } from './util';
import { Rarity } from './rarity';
import { Skill, SkillBehaviorModifiers } from './skill';

enum WeaponType {
  Shotgun = 'Shotgun',
  SMG = 'SMG',
  Sniper = 'Sniper rifle',
  AssaultRifle = 'Assault rifle',
  Pistol = 'Pistol',
}

interface WeaponModel {
  name: string;
  type: WeaponType;
  element: ElementType;
  rarity: Rarity;
  atk: number;
  rateOfFire: number;
  ammoCapacity: number;
  reloadSpeed: number;
  compatibility: number;
  critDamage: number;
  atkPercent: number;
  modifiers: Array<Modifier>;
  skillDamage?: Array<Skill>;
}

@jsonObject
class Weapon implements WeaponModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(String)
  type!: WeaponType;

  @jsonMember(String)
  element!: ElementType;

  @jsonMember(String)
  rarity!: Rarity;

  @jsonMember(Number)
  atk!: number;

  @jsonMember(Number)
  rateOfFire!: number;

  @jsonMember(Number)
  ammoCapacity!: number;

  @jsonMember(Number)
  reloadSpeed!: number;

  @jsonMember(Number)
  compatibility!: number;

  @jsonMember(Number)
  critDamage!: number;

  @jsonMember(Number)
  atkPercent!: number;

  @jsonArrayMember(Modifier)
  modifiers!: Array<Modifier>;

  @jsonArrayMember(Skill)
  skillDamage?: Array<Skill>;
}

const weaponSerializer = new TypedJSON(Weapon);

// Separated for nicer type-hinting, allows individual classes to be highlighted instead of the variable.
const weaponList: Record<WeaponType, Array<Weapon>> = {
  [WeaponType.Shotgun]: [
    {
      name: 'Sunny Payback (T1)',
      type: WeaponType.Shotgun,
      element: ElementType.Electrical,
      rarity: Rarity.Orange,
      atk: 781,
      rateOfFire: 60,
      compatibility: 41,
      ammoCapacity: 7,
      critDamage: 30,
      reloadSpeed: 2.62,
      atkPercent: 46,
      modifiers: [
        {
          active: true,
          name: 'Sunny Payback passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 18,
        },
        {
          active: true,
          name: 'Sunny Payback passive',
          description:
            'Each shot has a 60% chance to fire extra 1 pellets (12.5 * .6)',
          type: ModifierType.FinalDamage,
          value: 7.5,
        },
      ],
    },
    {
      name: 'Tiny Brains (T1)',
      type: WeaponType.Shotgun,
      element: ElementType.Kinetic,
      rarity: Rarity.Orange,
      atk: 811,
      rateOfFire: 60,
      compatibility: 41,
      ammoCapacity: 7,
      critDamage: 30,
      reloadSpeed: 2.62,
      atkPercent: 52,
      modifiers: [
        {
          active: true,
          name: 'Tiny Brains passive',
          description: '',
          type: ModifierType.AtkPercent,
          value: 18,
        },
        {
          active: false,
          name: 'Tiny Brains passive',
          description: 'Increases enemy damage taken when taking damage',
          type: ModifierType.DamageTaken,
          value: 9.6,
        },
      ],
    },
    {
      name: 'Discordance',
      type: WeaponType.Shotgun,
      element: ElementType.Electrical,
      rarity: Rarity.Purple,
      atk: 642,
      rateOfFire: 75,
      compatibility: 35.6,
      ammoCapacity: 8,
      critDamage: 30,
      reloadSpeed: 2.89,
      atkPercent: 43,
      modifiers: [],
      skillDamage: [
        {
          name: 'Discordance passive (T5)',
          description:
            'Deals extra damage based on 1.2% of ATK times the number of bullets in the magazine before firing. 5.4 is average over 8 shots, use 9.6 if reloading and shooting only 1 bullet.',
          active: true,
          element: ElementType.Electrical,
          damagePercent: 5.4,
          damageFlat: 0,
          isAptitude: true,
          frequency: 0,
        },
        {
          name: 'Discordance passive (T1)',
          description:
            'Deals extra damage based on .72% of ATK times the number of bullets in the magazine before firing. 3.24 is average over 8 shots, use 5.76 if reloading and shooting only 1 bullet.',
          active: false,
          element: ElementType.Electrical,
          damagePercent: 3.24,
          damageFlat: 0,
          isAptitude: true,
          frequency: 0,
        },
      ],
    },
    {
      name: 'Mechanized Cope (T5)',
      type: WeaponType.Shotgun,
      element: ElementType.Kinetic,
      rarity: Rarity.Purple,
      atk: 661,
      rateOfFire: 120,
      compatibility: 59.72,
      ammoCapacity: 1,
      critDamage: 30,
      // Incorporating the 10% reload speed buff directly.
      reloadSpeed: 1.458,
      // reloadSpeed: 1.62,
      atkPercent: 45,
      modifiers: [],
    },
    {
      name: 'Full Alert',
      type: WeaponType.Shotgun,
      element: ElementType.Kinetic,
      rarity: Rarity.Purple,
      atk: 674,
      rateOfFire: 60,
      compatibility: 40.66,
      ammoCapacity: 7,
      critDamage: 30,
      reloadSpeed: 2.62,
      atkPercent: 37,
      modifiers: [
        {
          active: true,
          name: 'Full Alert passive (T1)',
          description:
            'When in battle, increases ATK by Operative Level x 1. Max 6 stacks',
          type: ModifierType.FlatAtk,
          value: 480,
        },
        {
          active: false,
          name: 'Full Alert passive (T5)',
          description:
            'When in battle, increases ATK by Operative Level x 1. Max 10 stacks',
          type: ModifierType.FlatAtk,
          value: 800,
        },
      ],
    },
    {
      name: 'Malbec (T5)',
      type: WeaponType.Shotgun,
      element: ElementType.Electrical,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 75,
      compatibility: 35.6,
      ammoCapacity: 8,
      critDamage: 30,
      reloadSpeed: 2.89,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Malbec passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 25,
        },
      ],
    },
    {
      name: 'Silenced Truth (T5)',
      type: WeaponType.Shotgun,
      element: ElementType.Chaos,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 75,
      compatibility: 35.6,
      ammoCapacity: 8,
      critDamage: 30,
      reloadSpeed: 2.89,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Silenced Truth passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Chaos,
          value: 25,
        },
      ],
    },
    {
      name: 'Flock of Birds (T5)',
      type: WeaponType.Shotgun,
      element: ElementType.Frost,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 120,
      compatibility: 59.72,
      ammoCapacity: 1,
      critDamage: 30,
      reloadSpeed: 1.62,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Flock of Birds passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 25,
        },
      ],
    },
    {
      name: 'Brutish Folk (T5)',
      type: WeaponType.Shotgun,
      element: ElementType.Thermal,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 60,
      compatibility: 41,
      ammoCapacity: 7,
      critDamage: 30,
      reloadSpeed: 2.62,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Brutish Folk passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 25,
        },
      ],
    },
    {
      name: 'Knock Knock (T5)',
      type: WeaponType.Shotgun,
      element: ElementType.Kinetic,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 75,
      compatibility: 36.01,
      ammoCapacity: 8,
      critDamage: 30,
      reloadSpeed: 2.62,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Knock Knock passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Kinetic,
          value: 25,
        },
      ],
    },
  ],
  [WeaponType.SMG]: [
    {
      name: 'Stardust Memory',
      type: WeaponType.SMG,
      element: ElementType.Frost,
      rarity: Rarity.Orange,
      atk: 781,
      rateOfFire: 950,
      compatibility: 29.52,
      ammoCapacity: 50,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 42,
      modifiers: [
        {
          active: true,
          name: 'Stardust Memory passive (T1)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 18,
        },
        {
          active: true,
          name: 'Stardust Memory passive (T1)',
          description:
            'Gain 6 stacks when using standard skill and 1 stack when standard skill deals DMG. Each stack increases skill DMG by 3%, max 12 stacks.',
          type: ModifierType.SkillDamage,
          value: 36,
        },
        {
          active: false,
          name: 'Stardust Memory passive (T2)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 30,
        },
        {
          active: false,
          name: 'Stardust Memory passive (T2)',
          description:
            'Gain 6 stacks when using standard skill and 1 stack when standard skill deals DMG. Each stack increases skill DMG by 5%, max 12 stacks.',
          type: ModifierType.SkillDamage,
          value: 60,
        },
      ],
    },
    {
      name: 'Atrium Frontline',
      type: WeaponType.SMG,
      element: ElementType.Kinetic,
      rarity: Rarity.Purple,
      atk: 674,
      rateOfFire: 850,
      compatibility: 33.9,
      ammoCapacity: 45,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 36,
      modifiers: [
        {
          active: true,
          name: 'Atrium Frontline passive (T1)',
          description:
            'When in battle, increase ATK by 1.5x operative level, max 6 stacks.',
          type: ModifierType.FlatAtk,
          value: 720,
        },
        {
          active: false,
          name: 'Atrium Frontline passive (T5)',
          description:
            'When in battle, increase ATK by 1.5x operative level, max 10 stacks.',
          type: ModifierType.FlatAtk,
          value: 1200,
        },
      ],
    },
    {
      name: 'Homecoming',
      type: WeaponType.SMG,
      element: ElementType.Kinetic,
      rarity: Rarity.Purple,
      atk: 626,
      rateOfFire: 950,
      compatibility: 33.3,
      ammoCapacity: 40,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 38,
      modifiers: [
        {
          active: true,
          name: 'Homecoming passive (T5)',
          description:
            'Upon entry, increases ATK by 4.5% per second. Max 10 stacks.',
          type: ModifierType.AtkPercent,
          value: 45,
        },
        {
          active: false,
          name: 'Homecoming passive (T1)',
          description:
            'Upon entry, increases ATK by 4.5% per second. Max 6 stacks.',
          type: ModifierType.AtkPercent,
          value: 27,
        },
      ],
    },
    {
      name: 'Safety Line (T5)',
      type: WeaponType.SMG,
      element: ElementType.Frost,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 950,
      compatibility: 30.66,
      ammoCapacity: 45,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Safety Line passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 25,
        },
      ],
    },
    {
      name: 'Napoleon in Black (T5)',
      type: WeaponType.SMG,
      element: ElementType.Electrical,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 900,
      compatibility: 32.83,
      ammoCapacity: 45,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Napoleon in Black passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 25,
        },
      ],
    },
    {
      name: 'Tension Headache (T5)',
      type: WeaponType.SMG,
      element: ElementType.Chaos,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 800,
      compatibility: 35.2,
      ammoCapacity: 45,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Tension Headache passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Chaos,
          value: 25,
        },
      ],
    },
    {
      name: 'Iron Guardian (T5)',
      type: WeaponType.SMG,
      element: ElementType.Thermal,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 950,
      compatibility: 33.33,
      ammoCapacity: 40,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Iron Guardian passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 25,
        },
      ],
    },
    {
      name: 'Quiet Lightning (T5)',
      type: WeaponType.SMG,
      element: ElementType.Kinetic,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 950,
      compatibility: 31.89,
      ammoCapacity: 40,
      critDamage: 30,
      reloadSpeed: 1.35,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Quiet Lightning passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Kinetic,
          value: 25,
        },
      ],
    },
  ],
  [WeaponType.Sniper]: [
    {
      name: 'Space Cowboy',
      type: WeaponType.Sniper,
      element: ElementType.Thermal,
      rarity: Rarity.Orange,
      atk: 792,
      rateOfFire: 40,
      compatibility: 163.13,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 46,
      modifiers: [
        {
          active: true,
          name: 'Space Cowboy passive (T1)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 18,
        },
        {
          active: false,
          name: 'Space Cowboy passive (T1)',
          description: 'Boost on next shot after reload',
          type: ModifierType.BallisticDamage,
          value: 60,
        },
        {
          active: false,
          name: 'Space Cowboy passive (T2)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 30,
        },
        {
          active: false,
          name: 'Space Cowboy passive (T2)',
          description: 'Boost on next shot after reload',
          type: ModifierType.BallisticDamage,
          value: 100,
        },
      ],
    },
    {
      name: 'Horn of the Orca',
      type: WeaponType.Sniper,
      element: ElementType.Kinetic,
      rarity: Rarity.Orange,
      atk: 797,
      rateOfFire: 40,
      compatibility: 181.26,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 45,
      modifiers: [
        {
          active: true,
          name: 'Horn of the Orca passive (T1)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 21,
        },
        {
          active: true,
          name: 'Horn of the Orca passive (T1)',
          description: '',
          type: ModifierType.BallisticDamage,
          value: 4,
        },
        {
          active: false,
          name: 'Horn of the Orca passive (T2)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 35,
        },
        {
          active: false,
          name: 'Horn of the Orca passive (T2)',
          description: '',
          type: ModifierType.BallisticDamage,
          value: 20,
        },
      ],
    },
    {
      name: 'Crystal Drill',
      type: WeaponType.Sniper,
      element: ElementType.Kinetic,
      rarity: Rarity.Purple,
      atk: 685,
      rateOfFire: 75,
      compatibility: 152.59,
      ammoCapacity: 8,
      critDamage: 60,
      reloadSpeed: 1.8,
      atkPercent: 41,
      modifiers: [
        {
          active: true,
          name: 'Crystal Drill passive (T5)',
          description: 'Increases ADS Ballistic DMG',
          type: ModifierType.BallisticDamage,
          value: 45,
        },
        {
          active: false,
          name: 'Crystal Drill passive (T1)',
          description: 'Increases ADS Ballistic DMG',
          type: ModifierType.BallisticDamage,
          value: 27,
        },
      ],
    },
    {
      name: 'Wetland Park',
      type: WeaponType.Sniper,
      element: ElementType.Electrical,
      rarity: Rarity.Purple,
      atk: 625,
      rateOfFire: 40,
      compatibility: 181.26,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 36,
      modifiers: [
        {
          active: true,
          name: 'Wetland Park passive (T5)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 50,
        },
        {
          active: false,
          name: 'Wetland Park passive (T1)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 30,
        },
      ],
    },
    {
      name: 'Mark of Mesmer',
      type: WeaponType.Sniper,
      element: ElementType.Chaos,
      rarity: Rarity.Purple,
      atk: 639,
      rateOfFire: 40,
      compatibility: 181.26,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 38,
      modifiers: [
        {
          active: true,
          name: 'Mark of Mesmer passive (same at all tiers)',
          description: 'Increases ADS Ballistic DMG',
          type: ModifierType.BallisticDamage,
          value: 16,
        },
        {
          active: true,
          name: 'Mark of Mesmer passive (T5)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 30,
        },
        {
          active: false,
          name: 'Mark of Mesmer passive (T1)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 10,
        },
      ],
    },
    {
      name: 'Sweet Soul',
      type: WeaponType.Sniper,
      element: ElementType.Kinetic,
      rarity: Rarity.Purple,
      atk: 643,
      rateOfFire: 75,
      compatibility: 152.59,
      ammoCapacity: 8,
      critDamage: 60,
      reloadSpeed: 1.8,
      atkPercent: 41,
      modifiers: [],
      skillDamage: [
        {
          name: 'Sweet Soul passive (T5)',
          description:
            'Deals 10-40% extra damage based on the damage of the shot (goes through defense again). Averages out to 25%.',
          active: true,
          element: ElementType.Kinetic,
          damagePercent: 25,
          damageFlat: 0,
          isAptitude: true,
          frequency: 0,
          specialModifiers: [
            SkillBehaviorModifiers.SweetSoul,
            SkillBehaviorModifiers.CanCrit,
          ],
        },
        {
          name: 'Sweet Soul passive (T1)',
          description:
            'Deals 10-24% extra damage based on the damage of the shot (goes through defense again). Averages out to 17%.',
          active: false,
          element: ElementType.Kinetic,
          damagePercent: 17,
          damageFlat: 0,
          isAptitude: true,
          frequency: 0,
          specialModifiers: [
            SkillBehaviorModifiers.SweetSoul,
            SkillBehaviorModifiers.CanCrit,
          ],
        },
      ],
    },
    {
      name: 'Steel Birch Forest',
      type: WeaponType.Sniper,
      element: ElementType.Chaos,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 75,
      compatibility: 152.59,
      ammoCapacity: 8,
      critDamage: 60,
      reloadSpeed: 1.8,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Steel Birch Forest passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Chaos,
          value: 25,
        },
      ],
    },
    {
      name: 'Raven Feather Tempest',
      type: WeaponType.Sniper,
      element: ElementType.Electrical,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 40,
      compatibility: 181.26,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Raven Feather Tempest passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 25,
        },
      ],
    },
    {
      name: 'Snowbound Valkyrie',
      type: WeaponType.Sniper,
      element: ElementType.Frost,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 75,
      compatibility: 152.59,
      ammoCapacity: 8,
      critDamage: 60,
      reloadSpeed: 1.8,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Snowbound Valkyrie passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 25,
        },
      ],
    },
    {
      name: 'Mulberry',
      type: WeaponType.Sniper,
      element: ElementType.Thermal,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 40,
      compatibility: 181.26,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Mulberry passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 25,
        },
      ],
    },
    {
      name: 'The Wrench',
      type: WeaponType.Sniper,
      element: ElementType.Kinetic,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 75,
      compatibility: 152.59,
      ammoCapacity: 8,
      critDamage: 60,
      reloadSpeed: 1.8,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'The Wrench passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Kinetic,
          value: 25,
        },
      ],
    },
  ],
  [WeaponType.AssaultRifle]: [
    {
      name: 'Anti-Evil Ward',
      type: WeaponType.AssaultRifle,
      element: ElementType.Electrical,
      rarity: Rarity.Orange,
      atk: 793,
      rateOfFire: 600,
      compatibility: 32.78,
      ammoCapacity: 30,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 45,
      modifiers: [
        {
          active: true,
          name: 'Anti-Evil passive (T1)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 18,
        },
        {
          active: true,
          name: 'Anti-Evil passive (T1)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 12,
        },
        {
          active: true,
          name: 'Anti-Evil passive (T1)',
          description:
            'Crimson Skyshield state (after 50 instances of electrical damage)',
          type: ModifierType.AtkPercent,
          value: 21,
        },
        {
          active: false,
          name: 'Anti-Evil passive (T2)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 30,
        },
        {
          active: false,
          name: 'Anti-Evil passive (T2)',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 20,
        },
        {
          active: false,
          name: 'Anti-Evil passive (T2)',
          description:
            'Crimson Skyshield state (after 50 instances of electrical damage)',
          type: ModifierType.AtkPercent,
          value: 35,
        },
      ],
    },
    {
      name: 'Indicator',
      type: WeaponType.AssaultRifle,
      element: ElementType.Chaos,
      rarity: Rarity.Purple,
      atk: 655,
      rateOfFire: 680,
      compatibility: 28.85,
      ammoCapacity: 30,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 36,
      modifiers: [
        {
          active: true,
          name: 'Indicator passive (T5)',
          description:
            'Upon entry, increases Ballistic DMG by 5% every second. Max 10 stacks.',
          type: ModifierType.BallisticDamage,
          value: 50,
        },
        {
          active: false,
          name: 'Indicator passive (T1)',
          description:
            'Upon entry, increases Ballistic DMG by 5% every second. Max 6 stacks.',
          type: ModifierType.BallisticDamage,
          value: 40,
        },
      ],
    },
    {
      name: 'Wild Leer',
      type: WeaponType.AssaultRifle,
      element: ElementType.Electrical,
      rarity: Rarity.Purple,
      atk: 600,
      rateOfFire: 600,
      compatibility: 34.9,
      ammoCapacity: 25,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 33,
      modifiers: [
        {
          active: true,
          name: 'Wild Leer passive (T5)',
          description: '',
          type: ModifierType.AtkPercent,
          value: 20,
        },
        {
          active: true,
          name: 'Wild Leer passive (T5)',
          description: 'Increases ATK% after hitting a weakspot',
          type: ModifierType.AtkPercent,
          value: 20,
        },
        {
          active: false,
          name: 'Wild Leer passive (T1)',
          description: '',
          type: ModifierType.AtkPercent,
          value: 12,
        },
        {
          active: false,
          name: 'Wild Leer passive (T1)',
          description: 'Increases ATK% after hitting a weakspot',
          type: ModifierType.AtkPercent,
          value: 12,
        },
      ],
    },
    {
      name: 'Fury',
      type: WeaponType.AssaultRifle,
      element: ElementType.Thermal,
      rarity: Rarity.Purple,
      atk: 642,
      rateOfFire: 600,
      compatibility: 34.9,
      ammoCapacity: 25,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 33,
      modifiers: [],
      skillDamage: [
        {
          name: 'Fury passive (T5)',
          description:
            'Bullets detonate and deal extra 7% of ATK thermal damage after 1-second.',
          active: true,
          element: ElementType.Thermal,
          damagePercent: 7,
          damageFlat: 0,
          isAptitude: true,
          frequency: 0,
          specialModifiers: [SkillBehaviorModifiers.CanCrit],
        },
        {
          name: 'Fury passive (T1)',
          description:
            'Bullets detonate and deal extra 4.2% of ATK thermal damage after 1-second.',
          active: false,
          element: ElementType.Thermal,
          damagePercent: 4.2,
          damageFlat: 0,
          isAptitude: true,
          frequency: 0,
          specialModifiers: [SkillBehaviorModifiers.CanCrit],
        },
      ],
    },
    {
      name: 'Warhammer',
      type: WeaponType.AssaultRifle,
      element: ElementType.Thermal,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 680,
      compatibility: 28.85,
      ammoCapacity: 30,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Warhammer passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 25,
        },
      ],
    },
    {
      name: 'Ender',
      type: WeaponType.AssaultRifle,
      element: ElementType.Electrical,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 680,
      compatibility: 32.78,
      ammoCapacity: 30,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Ender passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 25,
        },
      ],
    },
    {
      name: 'Icy Dunes',
      type: WeaponType.AssaultRifle,
      element: ElementType.Frost,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 600,
      compatibility: 34.9,
      ammoCapacity: 25,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Icy Dunes passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 25,
        },
      ],
    },
    {
      name: 'Ashen Dog',
      type: WeaponType.AssaultRifle,
      element: ElementType.Chaos,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 680,
      compatibility: 28.85,
      ammoCapacity: 30,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Ashen Dog passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Chaos,
          value: 25,
        },
      ],
    },
    {
      name: 'Discipline',
      type: WeaponType.AssaultRifle,
      element: ElementType.Kinetic,
      rarity: Rarity.Blue,
      atk: 528,
      rateOfFire: 600,
      compatibility: 34.9,
      ammoCapacity: 25,
      critDamage: 60,
      reloadSpeed: 1.5,
      atkPercent: 32.5,
      modifiers: [
        {
          active: true,
          name: 'Discipline passive (T5)',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Kinetic,
          value: 25,
        },
      ],
    },
  ],
  [WeaponType.Pistol]: [
    {
      name: 'Pine Aurora (T1)',
      type: WeaponType.Pistol,
      element: ElementType.Frost,
      rarity: Rarity.Orange,
      atk: 811,
      rateOfFire: 75,
      compatibility: 146.46,
      ammoCapacity: 6,
      critDamage: 60,
      reloadSpeed: 1,
      atkPercent: 0,
      modifiers: [
        {
          active: true,
          name: 'Pine Aurora passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 9,
        },
        {
          active: true,
          name: 'Pine Aurora passive',
          description:
            'Increases full squad dmg by 3% when support skill hits (max 5 stacks)',
          type: ModifierType.Generic,
          value: 15,
        },
      ],
    },
  ],
};

const WEAPONS: Record<WeaponType, Array<Weapon>> = deepFreeze(weaponList);

export { WEAPONS, Weapon, WeaponType, weaponSerializer };
