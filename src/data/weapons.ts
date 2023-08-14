import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { ElementType } from './element';
import { Modifier, ModifierType } from './modifier';
import { deepFreeze } from './util';

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

  // constructor(
  //   name: string,
  //   type: WeaponType,
  //   atk: number,
  //   rateOfFire: number,
  //   ammoCapacity: number,
  //   reloadSpeed: number,
  //   compatibility: number,
  //   critDamage: number,
  //   atkPercent: number,
  //   modifiers: Array<Modifier>
  // ) {
  //   this.name = name;
  //   this.type = type;
  //   this.atk = atk;
  //   this.rateOfFire = rateOfFire;
  //   this.ammoCapacity = ammoCapacity;
  //   this.reloadSpeed = reloadSpeed;
  //   this.compatibility = compatibility;
  //   this.critDamage = critDamage;
  //   this.atkPercent = atkPercent;
  //   this.modifiers = modifiers;
  // }
}

const weaponSerializer = new TypedJSON(Weapon);
// const yolo = weaponSerializer.parse({
//   name: 'Sunny Payback',
//   type: WeaponType.Shotgun,
//   atk: 781,
//   rateOfFire: 950,
//   compatibility: 29.52,
//   ammoCapacity: 50,
//   critDamage: 30,
//   reloadSpeed: 1.35,
//   atkPercent: 42,
//   modifiers: [
//     new Modifier(
//       true,
//       'Amano-Iwato 2-set',
//       'Ballistic DMG +24%',
//       ModifierType.BallisticDamage,
//       24
//     ),
//   ],
// });
// const result = weaponSerializer.toPlainJson(yolo);
// const result2 = weaponSerializer.stringify(yolo);

// Separated for nicer type-hinting, allows individual classes to be highlighted instead of the variable.
const weaponList: Record<WeaponType, Array<Weapon>> = {
  [WeaponType.Shotgun]: [
    {
      name: 'Sunny Payback (T1)',
      type: WeaponType.Shotgun,
      element: ElementType.Electric,
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
          element: ElementType.Electric,
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
  ],
  [WeaponType.SMG]: [
    {
      name: 'Stardust Memory (T1)',
      type: WeaponType.SMG,
      element: ElementType.Frost,
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
  ],
  [WeaponType.Sniper]: [
    {
      name: 'Space Cowboy (T1)',
      type: WeaponType.Sniper,
      element: ElementType.Thermal,
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
          name: 'Space Cowboy passive',
          description: '',
          type: ModifierType.ElementalDamage,
          element: ElementType.Thermal,
          value: 18,
        },
        {
          active: false,
          name: 'Space Cowboy passive',
          description: 'Boost on next shot after reload',
          type: ModifierType.BallisticDamage,
          value: 60,
        },
      ],
    },
  ],
  [WeaponType.AssaultRifle]: [
    {
      name: 'Anti-Evil Ward (T1)',
      type: WeaponType.AssaultRifle,
      element: ElementType.Electric,
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
          element: ElementType.Electric,
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
  ],
  [WeaponType.Pistol]: [
    {
      name: 'Pine Aurora (T1)',
      type: WeaponType.Pistol,
      element: ElementType.Frost,
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
