import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  manageBusinessCard: {
    borderRadius: 8,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    padding: 10,
  },
  manageBusinessPendingCard: {
    borderRadius: 8,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    padding: 10,
    backgroundColor: '#F7F7F7',
  },
  manageBusinessPlaceName: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    lineHeight: 21,
    color: '#4f4f4f',
  },
  manageBusinessPlaceLocation: {
    fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 19,
    color: '#858585',
  },
  claimButton: {
    marginTop: -15,
  },
  claimButtonLabel: {
    fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 19,
    color: '#EA8D21',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  swipeRightActions: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    marginRight: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginLeft: -20,
    elevation: 2,
  },
  swipeText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 21,
    color: '#fff',
  },
  swipeLeftActions: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    marginLeft: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: -20,
    elevation: 2,
  },
});

export default styles;
