import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  settingsCard: {
    minHeight: 48,
    borderRadius: 8,
    marginLeft: 1,
    marginRight: 1,
  },
  biometricName: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4F4F4F',
    marginLeft: 14,
  },
  fakeSheetCt: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
    elevation: 5,
  },
  updateButton: {
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
  },
  updateButtonLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textTransform: 'capitalize',
    letterSpacing: 0,
  },
});

export default styles;
