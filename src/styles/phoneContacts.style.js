import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  contactName: {
    fontSize: 16,
    lineHeight: 32,
    color: '#4f4f4f',
    fontFamily: 'Roboto',
    flexDirection: 'row',
    flexShrink: 1,
  },
  contactJobTitle: {
    lineHeight: 32,
    fontSize: 14,
    color: '#B5B5B5',
    textTransform: 'capitalize',
    // marginTop: -10,
  },
  contactButtonContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
    elevation: 5,
    marginTop: 10,
  },
  multiSelectButton: {
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
  },
  multiSelectDisableButton: {
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#B5B5B5',
  },
  multiSelectButtonLabel: {
    fontSize: 18,
    lineHeight: 27,
    textTransform: 'capitalize',
    color: '#fff',
  },
  selectAllButton: {
    lineHeight: 25,
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
    textTransform: 'capitalize',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
});

export default styles;
