import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // Primary Color
  primary1: '#009051',
  primary2: '#1a9b62',
  primary3: '#33a674',
  primary4: '#4db185',
  primary5: '#66bc97',
  primary6: '#80c8a8',
  primary7: '#99d3b9',
  primary8: '#b3decb',
  primary9: '#cce9dc',
  primary10: '#e6f4ee',

  //Secondary Color
  secondary1: '#FF6600',
  secondary2: '#ff751a',
  secondary3: '#ff8533',
  secondary4: '#ff944d',
  secondary5: '#ffa366',
  secondary6: '#ffb380',
  secondary7: '#ffc299',
  secondary8: '#ffd1b3',
  secondary9: '#ffe0cc',
  secondary10: '#fff0e6',

  // Yellow
  Yellow1: '#713f12',
  Yellow2: '#854d0e',
  Yellow3: '#a16207',
  Yellow4: '#ca8a04',
  Yellow5: '#eab308',
  Yellow6: '#facc15',
  Yellow7: '#fde047',
  Yellow8: '#f3f08a',
  Yellow9: '#fef9c3',
  Yellow10: '#fefce8',

  // Warning/ Red
  Rose1: '#881337',
  Rose2: '#9f1239',
  Rose3: '#be123c',
  Rose4: '#e11d48',
  Rose5: '#f43f5e',
  Rose6: '#fb7185',
  Rose7: '#fda4af',
  Rose8: '#fecdd3',
  Rose9: '#ffe4e6',
  Rose10: '#fff1f2',

  //Blue
  Blue1: '#0c4a6e',
  Blue2: '#075985',
  Blue3: '#0369a1',
  Blue4: '#0284c7',
  Blue5: '#0ea5e9',
  Blue6: '#38bdf8',
  Blue7: '#7dd3fc',
  Blue8: '#bae6fd',
  Blue9: '#e0f2fe',
  Blue10: '#f0f9ff',

  //Teal
  Teal1: '#134e4a',
  Teal2: '#115e59',
  Teal3: '#0f766e',
  Teal4: '#0d9488',
  Teal5: '#14b8a6',
  Teal6: '#2dd4bf',
  Teal7: '#5eead4',
  Teal8: '#99f6e4',
  Teal9: '#ccfbf1',
  Teal10: '#f0fdfa',

  // Neutral
  Neutral1: '#111827',
  Neutral2: '#1F2937',
  Neutral3: '#374151',
  Neutral4: '#4B5563',
  Neutral5: '#6B7280',
  Neutral6: '#9CA3AF',
  Neutral7: '#D1D5DB',
  Neutral8: '#E5E7EB',
  Neutral9: '#F3F4F6',
  Neutral10: '#F9FAFB',

  // Neutral Blue Gray
  NeutralBlue1: '#0F172A',
  NeutralBlue2: '#1E293B',
  NeutralBlue3: '#334155',
  NeutralBlue4: '#475569',
  NeutralBlue5: '#64748B',
  NeutralBlue6: '#94A3B8',
  NeutralBlue7: '#CBD5E1',
  NeutralBlue8: '#E2E8F0',
  NeutralBlue9: '#F1F5F9',
  NeutralBlue10: '#F8FAFC',

  // Off Colors
  gray: '#9CA3AF',
  lime: '#E7F5C5',
  white: '#FFFFFF',
  blueGray: '#94A3B8',
  lightYellow: '#F4F4F5',
  lightYellow1: '#FFC299',
  black: '#000000',

  // other color
  transparentNeutral12: 'rgba(0, 03, 0, 0.7)',
};

export const SIZES = {
  // global sizes
  small: 12,
  font: 14,
  base: 8,
  radius: 12,
  semi_margin: 16,
  margin: 20,
  padding: 24,

  // font sizes
  d1: 36,
  d2: 28,

  h1: 24,
  h2: 22,
  h3: 18,
  h4: 16,
  h5: 14,

  sh1: 18,
  sh2: 16,
  sh3: 14,

  body1: 18,
  body2: 16,
  body3: 14,

  cap1: 12,
  cap2: 10,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  d1: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.d1,
    lineHeight: 45,
    letterSpacing: 0,
  },
  d2: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.d2,
    lineHeight: 35,
    letterSpacing: 0,
  },

  h1: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h1,
    lineHeight: 30,
    letterSpacing: 0,
  },
  h2: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h2,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h3: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h3,
    lineHeight: 22.7,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h4,
    lineHeight: 20,
    letterSpacing: 0,
  },
  h5: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: SIZES.h5,
    lineHeight: 17.6,
    letterSpacing: 0,
  },

  sh1: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: SIZES.sh1,
    lineHeight: 22.7,
    letterSpacing: 0,
  },
  sh2: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: SIZES.sh2,
    lineHeight: 20,
    letterSpacing: 0,
  },
  sh3: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: SIZES.sh3,
    lineHeight: 17.6,
    letterSpacing: 0,
  },

  body1: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.body1,
    lineHeight: 23,
    letterSpacing: 0,
  },
  body2: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.body2,
    lineHeight: 20,
    letterSpacing: 0,
  },
  body3: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.body3,
    lineHeight: 18,
    letterSpacing: 0,
  },

  cap1: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.cap1,
    lineHeight: 15,
  },
  cap2: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: SIZES.cap2,
    lineHeight: 13,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
