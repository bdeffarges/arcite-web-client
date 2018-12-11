import chroma from 'chroma-js';

// -----------------------------------------------------------------------------
// VARIABLES
// -----------------------------------------------------------------------------


const variables = {
  type: {
    baseSize: 16,
    baseFont: 'Roboto, sans-serif',
    alternateFont: 'Roboto Slab, sans-serif',
    baseBackgroundColor: '#fff',
    baseColor: '#333',
    scale: [48, 32, 24, 20, 16, 14, 12, 10, 9, 8],
    bold: 500,
    thin: 300,
  },
  color: {
    primaryColor: '#3FC96C',
    secondaryColor: '#2D99DC',
    alertColor: '#BB3D2B',
    warningColor: '#F49B00',
    transparent: 'rgba(0,0,0,0)',
  },
  space: {
    scale: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80,
      84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124],
    borderRadius: '.125rem',
    gridGutter: 3, // == scale[3] = 12px
    footerHeight: 8,
  },
};


// -----------------------------------------------------------------------------
// SPACE METHODS
// -----------------------------------------------------------------------------


const createScaledProperty = myScale => (prop, factor = 1) => (x) => {
  if (typeof x === 'number') {
    const signX = x < 0 ? -1 : 1;
    const absX = signX * x;
    let value;
    if (!myScale) {
      if (typeof x === 'number') {
        value = 4 * x;
      } else {
        value = x;
      }
    } else {
      value = signX * myScale[absX];
    }
    if (typeof value === 'number') {
      return { [prop]: `${(factor * value) / variables.type.baseSize}rem` };
    }
  } else if (Array.isArray(x)) {
    const arr = [];
    for (const a of x) {
      const sign = a < 0 ? -1 : 1;
      const abs = sign * a;
      let value;
      if (!myScale) {
        if (typeof a === 'number') {
          value = 4 * a;
        } else {
          value = a;
        }
      } else {
        value = sign * myScale[abs];
      }
      if (typeof value === 'number') {
        arr.push(`${(factor * value) / variables.type.baseSize}rem`);
      } else {
        arr.push(a);
      }
    }
    return { [prop]: arr.join(' ') };
  }
  return null;
};

const getScaledProperty = createScaledProperty();
const getScaledTypeProperty = createScaledProperty(variables.type.scale);

const getMargin = getScaledProperty('margin');
const getMarginTop = getScaledProperty('marginTop');
const getMarginBottom = getScaledProperty('marginBottom');
const getMarginLeft = getScaledProperty('marginLeft');
const getMarginRight = getScaledProperty('marginRight');

const getPadding = getScaledProperty('padding');
const getPaddingTop = getScaledProperty('paddingTop');
const getPaddingBottom = getScaledProperty('paddingBottom');
const getPaddingLeft = getScaledProperty('paddingLeft');
const getPaddingRight = getScaledProperty('paddingRight');

const getFontSize = getScaledTypeProperty('fontSize');

const getFontScaleFor = (size) => {
  if (size === 'small') {
    return 6;
  } else if (size === 'large') {
    return 2;
  }
  return 4;
};
const getSmallFontScaleFor = (size) => {
  if (size === 'small') {
    return 9;
  } else if (size === 'large') {
    return 5;
  }
  return 7;
};

const getFooterHeight = (size = variables.space.footerHeight) => `${size}rem`;

const getLineHeight = getScaledTypeProperty('lineHeight', 1.625);
const getSingleLineHeight = getScaledTypeProperty('lineHeight', 1.0);


// -----------------------------------------------------------------------------
// BOXSHADOW
// -----------------------------------------------------------------------------
const getBoxShadow = (height) => {
  if (height === 0) {
    return { boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' };
  }
  if (height === 1) {
    return { boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px' };
  }
  if (height === 2) {
    return { boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px' };
  }
  if (height === 3) {
    return { boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px' };
  }
  if (height === 4) {
    return { boxShadow: 'rgba(0, 0, 0, 0.298039) 0px 19px 60px, rgba(0, 0, 0, 0.219608) 0px 15px 20px' };
  }
  return null;
};

// -----------------------------------------------------------------------------
// COLOR METHODS
// -----------------------------------------------------------------------------

const alpha = color => a => chroma(color).alpha(a).css();

const darken = (color, amount) => chroma(color).darken(amount).css();
const brighten = (color, amount) => chroma(color).brighten(amount).css();
const dim = color => alpha(color)(1 / 2);

const shade = [
  alpha('#000')(1 / 8),
  alpha('#000')(1 / 4),
  alpha('#000')(1 / 2),
  alpha('#000')(3 / 4),
  alpha('#000')(1),
];

const getBaseColor =
  invert => (invert ? variables.type.baseBackgroundColor : variables.type.baseColor);

const getForegroundFor = (color) => {
  const color01 = getBaseColor(true);
  const color02 = getBaseColor(false);
  const contrast01 = chroma.contrast(color, color01);
  const contrast02 = chroma.contrast(color, color02);
  if (contrast01 > contrast02) {
    return color01;
  }
  return color02;
};
// -----------------------------------------------------------------------------
// TRANSITIONS
// -----------------------------------------------------------------------------

const getStandardTransition = factor => (
  `all ${factor * 450}ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`
);

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export default {
  variables,
  getScaledProperty,
  getMargin,
  getMarginTop,
  getMarginBottom,
  getMarginLeft,
  getMarginRight,
  getPadding,
  getPaddingTop,
  getPaddingBottom,
  getPaddingLeft,
  getPaddingRight,
  getScaledTypeProperty,
  getFontSize,
  getFontScaleFor,
  getSmallFontScaleFor,
  getLineHeight,
  getSingleLineHeight,
  getFooterHeight,
  getBoxShadow,
  alpha,
  brighten,
  darken,
  dim,
  shade,
  getBaseColor,
  getForegroundFor,
  getStandardTransition,
};
