import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  placeCardDesc: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  placeNameStyle2: {
    fontSize: 24,
    color: '#4F4F4F',
    // lineHeight: 35,
    marginTop: 10,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  placeOpenContainerStyle2: {
    backgroundColor: '#54B948',
    textTransform: 'uppercase',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  placeClosedContainerStyle2: {
    backgroundColor: 'red',
    textTransform: 'uppercase',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  placeOpenStyle2: {
    fontSize: 15,
    color: '#fff',
    letterSpacing: 0,
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
  placeOpenTimeStyle2: {
    fontSize: 16,
    lineHeight: 25,
    color: '#474747',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
  textLabelMargin: {
    marginLeft: 8,
  },
  placeCityStyle2: {
    fontSize: 14,
    lineHeight: 19,

    color: '#474747',
    marginLeft: 3,
  },
  placeHrsContainer: {
    backgroundColor: '#E5E3E3',
    textTransform: 'uppercase',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 5,
  },
  placeHrs: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
  placeOpenTime: {
    fontSize: 16,
    lineHeight: 25,
    color: '#474747',
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
});

export default styles;
