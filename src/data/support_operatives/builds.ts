import { SupportOperative } from '../../models/support-operative';
import { deepFreeze } from '../util';
import { KAGUYA_BUILDS } from './kaguya';
import { OBSERVER_BUILDS } from './observer';
import { REDACTED_BUILDS } from './redacted';
import { SHADOW_KA_BUILDS } from './shadow-ka';
import { SUNSHINE_BUILDS } from './sunshine';

// Keep in order of SMG, Sniper, Shotgun, Pistol, AR to match weapon sorting.
const supportOperativeList: Array<SupportOperative> = [
  ...SHADOW_KA_BUILDS,
  ...KAGUYA_BUILDS,
  ...REDACTED_BUILDS,
  ...OBSERVER_BUILDS,
  ...SUNSHINE_BUILDS,
];

const SUPPORT_OPERATIVES: Array<SupportOperative> =
  deepFreeze(supportOperativeList);

export { SUPPORT_OPERATIVES };
