import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';
import { Modifier, ModifierType } from './modifier';
import { deepFreeze } from './util';
import { Rarity } from './rarity';

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
          active: true,
          name: 'Tiny Brains passive',
          description: 'Increases enemy damage taken when taking damage',
          type: ModifierType.DamageTaken,
          value: 9.6,
        },
      ],
    },
    {
      name: 'Discordance (T5)',
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
      modifiers: [
        {
          active: true,
          name: 'Discordance passive',
          description:
            "Sorry, can't really model it well right now, making up arbitrary value",
          type: ModifierType.FinalDamage,
          value: 4,
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
      name: 'Stardust Memory (T1)',
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
          name: 'Stardust Memory passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 18,
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
      name: 'Horn of the Orca (T1)',
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
          active: false,
          name: 'Horn of the Orca passive',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 21,
        },
        {
          active: true,
          name: 'Horn of the Orca passive',
          description: '',
          type: ModifierType.BallisticDamage,
          value: 4,
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
      name: 'Wetland Park (T5)',
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
          name: 'Wetland Park passive',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 50,
        },
      ],
    },
    {
      name: 'Mark of Mesmer (T5)',
      type: WeaponType.Sniper,
      element: ElementType.Chaos,
      rarity: Rarity.Purple,
      atk: 639,
      rateOfFire: 40,
      compatibility: 181.26,
      ammoCapacity: 5,
      critDamage: 100,
      reloadSpeed: 1.8,
      atkPercent: 26,
      modifiers: [
        {
          active: true,
          name: 'Mark of Mesmer passive',
          description: 'Increases ADS Ballistic DMG',
          type: ModifierType.BallisticDamage,
          value: 16,
        },
        {
          active: true,
          name: 'Mark of Mesmer passive',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 30,
        },
      ],
    },
    {
      name: 'Steel Birch Forest (T5)',
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
          name: 'Steel Birch Forest passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Chaos,
          value: 25,
        },
      ],
    },
    {
      name: 'Raven Feather Tempest (T5)',
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
          name: 'Raven Feather Tempest passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 25,
        },
      ],
    },
    {
      name: 'Snowbound Valkyrie (T5)',
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
          name: 'Snowbound Valkyrie passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 25,
        },
      ],
    },
    {
      name: 'Mulberry (T5)',
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
          name: 'Mulberry passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 25,
        },
      ],
    },
    {
      name: 'The Wrench (T5)',
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
          name: 'The Wrench passive',
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
      name: 'Anti-Evil Ward (T1)',
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
          name: 'Anti-Evil passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 18,
        },
        {
          active: true,
          name: 'Anti-Evil passive',
          description: '',
          type: ModifierType.CritDmgAmp,
          value: 12,
        },
        {
          active: true,
          name: 'Anti-Evil passive',
          description:
            'Crimson Skyshield state (after 50 instances of electrical damage)',
          type: ModifierType.AtkPercent,
          value: 21,
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
      name: 'Wild Leer (T5)',
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
          name: 'Wild Leer passive',
          description: '',
          type: ModifierType.AtkPercent,
          value: 20,
        },
        {
          active: true,
          name: 'Wild Leer passive',
          description: 'Increases ATK% after hitting a weakspot',
          type: ModifierType.AtkPercent,
          value: 20,
        },
      ],
    },
    {
      name: 'Warhammer (T5)',
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
          name: 'Warhammer passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 25,
        },
      ],
    },
    {
      name: 'Ender (T5)',
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
          name: 'Ender passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Electrical,
          value: 25,
        },
      ],
    },
    {
      name: 'Icy Dunes (T5)',
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
          name: 'Icy Dunes passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Frost,
          value: 25,
        },
      ],
    },
    {
      name: 'Ashen Dog (T5)',
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
          name: 'Ashen Dog passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Chaos,
          value: 25,
        },
      ],
    },
    {
      name: 'Discipline (T5)',
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
          name: 'Discipline passive',
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
