import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  successDialogHeading: {
    fontSize: 28,
    lineHeight: 37,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Roboto',
  },
  successDialogText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4f4f4f',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Roboto',
    marginBottom: 20,
  },
  successButton: {
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  successButtonLabel: {
    fontSize: 16,
    lineHeight: 25,
    textTransform: 'none',
  },
});

export default styles;
