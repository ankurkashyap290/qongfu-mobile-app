import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    width: 105,
    // height: 126,
    elevation: 2,
    margin: 10,
  },
  cardActionStyle: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  lifestyleActionBtnLabel: {
    fontSize: 14,
    color: '#000',
    textTransform: 'capitalize',
  },
  lifeStyleActionBtn: {
    // height: 50,
  },
  lifeStyleCardCover: {
    width: 105,
    height: 70,
  },
  placeCardContainer: {
    margin: 10,
    position: 'relative',
    elevation: 3,
    borderRadius: 10,
  },
  placeCardCover: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 155,
  },
  placeCardDesc: {
    flexDirection: 'row',
    marginTop: 5,
  },
  placeName: {
    fontSize: 20,
    color: theme.PRIMARY_COLOR,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    overflow: 'hidden',
  },
  textLabelMargin: {
    marginLeft: 8,
  },
  placeOpen: {
    fontSize: 16,
    color: '#54b948',
    textAlignVertical: 'center',
  },
  placeClose: {
    fontSize: 16,
    color: 'red',
  },
  time: {
    fontWeight: '400',
    fontSize: 14,
    color: '#5d5d5d',
  },
  location: {
    fontWeight: '400',
    fontSize: 14,
    color: '#5d5d5d',
  },
  city: {
    fontWeight: '400',
    fontSize: 14,
    color: '#ababab',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '75%',
    overflow: 'hidden',
  },
  ratingStyle: {
    color: '#efefef',
    fontSize: 18,
    paddingLeft: 3,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    height: 26,
    backgroundColor: '#4f4d4b82',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  shieldIcon: {
    marginTop: 5,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 108,
    right: 0,
    zIndex: 9,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  starRatingContain: {
    backgroundColor: '#4f4d4b82',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    paddingRight: 3,
  },
  cloudStorageHeading: {
    color: '#4F4F4F',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  cloudStorageText: {
    color: '#858585',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Roboto',
    marginTop: 8,
  },
  storageText: {
    color: theme.PRIMARY_COLOR,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textAlign: 'center',
    marginTop: 15,
  },
  freeText: {
    color: '#4F4F4F',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginTop: 5,
  },
  currentButton: {
    borderRadius: 20,
    width: '48%',
    marginTop: 10,
  },
  currentButtonLabel: {
    color: '#B5B5B5',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontFamily: 'Roboto',
    textTransform: 'none',
  },
});

export default styles;
