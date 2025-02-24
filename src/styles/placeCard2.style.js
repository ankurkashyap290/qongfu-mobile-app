import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  placeCardDesc: {
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  textLabelMargin: {
    marginLeft: 5,
  },
  newPlaceCardCover: {
    borderRadius: 4,
    height: 72,
    width: 96,
    justifyContent: 'center',
  },
  newRatingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 9,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  newStarRatingContain: {
    backgroundColor: '#4f4d4b82',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 96,
  },
  newPlaceCardContainer: {
    // margin: 10,
    elevation: 2,
    borderRadius: 10,
    padding: 8,
    margin: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  newPlaceName: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    color: '#3E3E3E',
    flexDirection: 'row',
    flexShrink: 1,
  },
  newCity: {
    fontWeight: '400',
    fontSize: 12,
    color: '#9B9B9B',
    flexDirection: 'row',
    flexShrink: 1,
  },
  newTime: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
  newLocation: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#9B9B9B',
  },
  newPlaceOpen: {
    fontSize: 10,
    color: '#54B948',
  },
  newPlaceClose: {
    fontSize: 10,
    color: 'red',
  },
  cardContent: {
    height: 88,
    padding: 0,
  },
  lifestyleCardContainer: {
    borderRadius: 8,
    width: 96,
    height: 72,
    elevation: 2,
    marginRight: 8,
    marginBottom: 10,
  },
  lifestyleActionBtnLabel: {
    fontSize: 12,
    color: '#3D3D3D',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: -1,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    // fontFamily: 'Roboto',
  },
  lifeStyleCardCover: {
    width: 96,
    height: 48,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default styles;
