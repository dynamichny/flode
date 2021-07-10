import { scaleFont } from './mixins';

// FONT FAMILY
export const FONT_FAMILY_EXTRALIGHT = 'Poppins-ExtraLight';
export const FONT_FAMILY_LIGHT = 'Poppins-Light';
export const FONT_FAMILY_REGULAR = 'Poppins-Regular';
export const FONT_FAMILY_MEDIUM = 'Poppins-Medium';
export const FONT_FAMILY_SEMIBOLD = 'Poppins-SemiBold';
export const FONT_FAMILY_BOLD = 'Poppins-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_EXTRALIGHT = '200';
export const FONT_WEIGHT_LIGHT = '300';
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_MEDIUM = '500';
export const FONT_WEIGHT_SEMIBOLD = '600';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

export const FONT_SIZE_HEADER = scaleFont(32);
export const FONT_SIZE_SEMIHEADER = scaleFont(24);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_EXTRALIGHT = {
  fontFamily: FONT_FAMILY_EXTRALIGHT,
  fontWeight: FONT_WEIGHT_EXTRALIGHT,
};

export const FONT_LIGHT = {
  fontFamily: FONT_FAMILY_LIGHT,
  fontWeight: FONT_WEIGHT_LIGHT,
};

export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_MEDIUM = {
  fontFamily: FONT_FAMILY_MEDIUM,
  fontWeight: FONT_WEIGHT_MEDIUM,
};

export const FONT_SEMIBOLD = {
  fontFamily: FONT_FAMILY_SEMIBOLD,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};
