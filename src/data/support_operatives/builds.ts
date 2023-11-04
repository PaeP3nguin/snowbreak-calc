import { SupportOperative } from '../support-operative';
import { deepFreeze } from '../util';
import { KAGUYA_BUILDS } from './kaguya';
import { SHADOW_KA_BUILDS } from './shadow-ka';

// Keep in order of SMG, Sniper, Shotgun, Pistol, AR to match weapon sorting.
const supportOperativeList: Array<SupportOperative> = [
  ...SHADOW_KA_BUILDS,
  ...KAGUYA_BUILDS,
];

const SUPPORT_OPERATIVES: Array<SupportOperative> =
  deepFreeze(supportOperativeList);

export { SUPPORT_OPERATIVES, supportOperativeList };
