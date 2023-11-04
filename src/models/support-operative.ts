import { Modifier, modifierSerializer } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { Rarity } from '../data/rarity';
import { Skill } from '../data/skill';
import { WeaponType } from '../data/weapons';

/**
 * Represents a support operative with a full loadout and all of their weapons. Not for
 * fine-grained calculation, more just a preset template with all of their info.
 */
interface SupportOperativeModel {
  name: string;
  /** Extra info on the support operative particulars like loadout, stats, etc. */
  description: string;
  baseAtk: number;
  baseHp: number;
  weaponType: WeaponType;

  /** Name of the support gun they're using, for text display or to show an image. */
  weaponName: string;
  rarity: Rarity;

  /** May include modifiers for a particular support weapon too. */
  modifiers: Array<Modifier>;
  skillDamage?: Array<Skill>;
}

@jsonObject
class SupportOperative implements SupportOperativeModel {
  @jsonMember(String)
  name!: string;

  @jsonMember(String)
  description!: string;

  @jsonMember(Number)
  baseAtk!: number;

  @jsonMember(Number)
  baseHp!: number;

  @jsonMember(String)
  weaponType!: WeaponType;

  @jsonMember(String)
  weaponName!: string;

  @jsonMember(String)
  rarity!: Rarity;

  @jsonArrayMember(Modifier)
  modifiers!: Array<Modifier>;

  @jsonArrayMember(Skill)
  skillDamage?: Array<Skill>;
}

const supportOperativeSerializer = new TypedJSON(SupportOperative);

function buildOperativeLoadout(
  operative: SupportOperative,
  modifiers: Array<Modifier>,
  description: string,
  weaponName: string,
): SupportOperative {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  // Make copies of everything so modifications won't change the actual values.
  const operativeCopy = supportOperativeSerializer.parse(operative)!;
  operativeCopy.modifiers = operativeCopy.modifiers.concat(
    modifiers.map((modifier) => modifierSerializer.parse(modifier)!),
  );
  operativeCopy.description = description;
  operativeCopy.weaponName = weaponName;
  /* eslint-enable */
  return operativeCopy;
}

export { SupportOperative, buildOperativeLoadout, supportOperativeSerializer };
