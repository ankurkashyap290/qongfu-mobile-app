import {DefaultTheme} from 'react-native-paper';
// const darkBlue = "#0065AB";
const primaryColor = '#0092DD';
const lightBlue = '#0d97dd';
// const infoColor = "#61C2FF";
// const brightGreen = "#1DFF00";
// const successColor = "#54B948";
const dangerColor = '#FF0000';
const warningColor = '#DD9900';
const black100 = '#333333';
// const black86 = "#4F4F4F";
// const black60 = "#858585";
// const black36 = "#B5B5B5";
// const black16 = "#DEDEDE";
// const black4 = "#F7F7F7";
const offWhite = '#F8FCFF';
const secondaryColor = '#919191';

const theme = {
  ...DefaultTheme,
  colors: {
    primary: primaryColor,
    accent: lightBlue,
    background: '#ffffff',
    surface: '#ffffff',
    error: dangerColor,
    text: black100,
    onBackground: black100,
    onSurface: black100,
  },
  fonts: {
    ios: {
      regular: {
        fontFamily: 'Poppins',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Poppins',
        fontWeight: '500',
      },
      light: {
        fontFamily: 'Poppins',
        fontWeight: '300',
      },
      thin: {
        fontFamily: 'Poppins',
        fontWeight: '100',
      },
    },
    default: {
      regular: {
        fontFamily: 'Poppins',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'Poppins',
        fontWeight: '500',
      },
      light: {
        fontFamily: 'Poppins',
        fontWeight: '300',
      },
      thin: {
        fontFamily: 'Poppins',
        fontWeight: '100',
      },
    },
  },
};

export default {
  FONT_SIZE_EXTRA_SMALL: 13,
  FONT_SIZE_SMALL: 14,
  FONT_SIZE_MEDIUM: 16,
  FONT_SIZE_LARGE: 20,
  FONT_SIZE_EXTRA_LARGE: 40,
  PRIMARY_COLOR: primaryColor,
  SECONDARY_COLOR: secondaryColor,
  FONT_WEIGHT_LIGHT: '300',
  FONT_WEIGHT_MEDIUM: '600',
  FONT_WEIGHT_HEAVY: '800',
  APP_BACKGROUND: '#ffffff',
  ERROR_COLOR: warningColor,
  ACTIVE_COLOR: '#64bc46',
  INACTIVE_COLOR: '#000000',
  LIGHT_BLUE: lightBlue,
  DEFAULT_THEME: theme,
};
