import { WeaponSubtype, WeaponType } from './weapons';

function maxAtkParts(
  weaponType: WeaponType,
  weaponSubtype?: WeaponSubtype,
): number {
  switch (weaponType) {
    case WeaponType.SMG:
      return 14 + 14 + 11 + 11;
    case WeaponType.Sniper:
      return 11 + 11 + 11 + 14;
    case WeaponType.Shotgun:
      if (weaponSubtype === WeaponSubtype.ShotgunDoubleBarrel) {
        // Double barrels only have 2 parts.
        return 20 + 17;
      } else {
        // Most shotguns have 3 parts.
        return 20 + 17 + 17;
      }
    case WeaponType.Pistol:
      return 10;
    case WeaponType.AssaultRifle:
      return 10;
    case WeaponType.Crossbow:
      return 10;
  }
  return 0;
}

/**
 * Returns 0 for now for anything that's not an SMG since it's not relevant.
 */
function maxHpParts(weaponType: WeaponType): number {
  switch (weaponType) {
    case WeaponType.SMG:
      return 113 + 89 + 106 + 75;
    case WeaponType.Sniper:
      return 0;
    case WeaponType.Shotgun:
      return 0;
    case WeaponType.Pistol:
      return 0;
    case WeaponType.AssaultRifle:
      return 0;
    case WeaponType.Crossbow:
      return 0;
  }
  return 0;
}

export { maxAtkParts, maxHpParts };
