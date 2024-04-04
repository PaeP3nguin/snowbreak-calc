import { SupportOperative } from '../../models/support-operative';
import { deepFreeze } from '../util';
import { KAGUYA_BUILDS } from './kaguya';
import { OBSERVER_BUILDS } from './observer';
import { REDACTED_BUILDS } from './redacted';
import { SHADOW_KA_BUILDS } from './shadow-ka';
import { SUNSHINE_BUILDS } from './sunshine';
import { THE_CUB_BUILDS } from './the-cub';
import { THE_MAGICIAN_BUILDS } from './the-magician';

// Keep in order of SMG, Sniper, Shotgun, Pistol, AR, crossbow to match weapon sorting.
const supportOperativeList: Array<SupportOperative> = [
  ...SHADOW_KA_BUILDS,
  ...THE_MAGICIAN_BUILDS,
  ...THE_CUB_BUILDS,
  ...KAGUYA_BUILDS,
  ...REDACTED_BUILDS,
  ...OBSERVER_BUILDS,
  ...SUNSHINE_BUILDS,
];

const SUPPORT_OPERATIVES: Array<SupportOperative> =
  deepFreeze(supportOperativeList);

export { SUPPORT_OPERATIVES };
