import { Modifier, modifierSerializer } from 'app/src/data/modifier';
import { TypedJSON, jsonArrayMember, jsonMember, jsonObject } from 'typedjson';
import { Rarity } from '../data/rarity';
import { Skill } from '../data/skill';
import { WeaponSubtype, WeaponType } from '../data/weapons';
import { maxAtkParts } from 'src/data/weapon-parts';

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

const LOW_INVEST_ATK_PURPLE_DESCRIPTION =
  'Low investment: no ATK gun parts, +0 logistics, no ATK talents, M5';
const LOW_INVEST_ATK_ORANGE_DESCRIPTION =
  'Low investment: no ATK gun parts, +0 logistics, no ATK talents, M2';
const MAX_INVEST_ATK_DESCRIPTION =
  'Max investment: full ATK gun parts, +15 logis, 3x10% ATK talents, M5';

/**
 * Calculates the loadout ATK of a low investment support operative.
 *
 * Low investment is defined as max level, no ATK weapon parts, level 0 logistics, no talents, and
 * manifest 5 for 4* operatives or manifest 2 for 5* operatives.
 */
function lowInvestmentAtk(
  operative: SupportOperative,
  weaponAtk: number,
  weaponAtkMult: number,
): number {
  // 14 ATK from logistics flat ATK.
  const baseAtk = operative.baseAtk + weaponAtk + 14;

  // 5* assumes M2, 4* assumes M5.
  const manifestAtkPercent = operative.rarity === Rarity.Purple ? 0.1 : 0.04;

  // 4% from logistics ATK% at level 0.
  const atkPercent = 1 + weaponAtkMult + manifestAtkPercent + 0.04;
  return baseAtk * atkPercent;
}

/**
 * Calculates the loadout ATK of a max investment support operative.
 *
 * Max investment is defined as max level, full ATK weapon parts, level 15 logistics, 3x 10%
 * talents, and manifest 5.
 */
function maxInvestmentAtk(
  operative: SupportOperative,
  weaponAtk: number,
  weaponAtkMult: number,
  weaponSubtype?: WeaponSubtype,
): number {
  // Assuming 200 ATK from logistics flat ATK.
  const baseAtk =
    operative.baseAtk +
    weaponAtk +
    maxAtkParts(operative.weaponType, weaponSubtype) +
    200;

  // All rarities assume M5.
  const manifestAtkPercent = 0.1;

  // 20% from logistics ATK% at level 15, 30% from logistics talents
  const atkPercent = 1 + weaponAtkMult + manifestAtkPercent + 0.2 + 0.3;
  return baseAtk * atkPercent;
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

export {
  SupportOperative,
  buildOperativeLoadout,
  lowInvestmentAtk,
  maxInvestmentAtk,
  LOW_INVEST_ATK_PURPLE_DESCRIPTION,
  LOW_INVEST_ATK_ORANGE_DESCRIPTION,
  MAX_INVEST_ATK_DESCRIPTION,
  supportOperativeSerializer,
};
