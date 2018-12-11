import distinctColors from 'distinct-colors';

import { getMD5 } from './md5_utils';

/* eslint no-bitwise: ["error", { "allow": ["&", "<<"] }] */
function hashCode(str) {
  const md5 = getMD5(str);
  let hash = 0;
  for (let i = 0; i < md5.length; i += 1) {
    hash = md5.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

export function stringToColor(s) {
  return `#${intToRGB(hashCode(s))}`;
}

export function getPalette(noOfColors) {
  const config = {
    count: noOfColors,
    hueMin: 0,
    hueMax: 360,
    chromaMin: 50,
    chromaMax: 80,
    lightMin: 20,
    lightMax: 50,
    quality: 50,
  };

  return distinctColors(config);
}
