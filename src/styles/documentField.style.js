import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  documentUploadCard: {
    borderRadius: 8,
    elevation: 2,
  },
  documentFieldLabel: {
    lineHeight: 21,
    fontSize: 16,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
  },
  documentFieldDescription: {
    lineHeight: 16,
    fontSize: 12,
    color: '#858585',
    fontFamily: 'Roboto',
  },
  documentSubFieldLabel: {
    lineHeight: 16,
    fontSize: 14,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
  },
  documentConfirmText: {
    lineHeight: 24,
    fontSize: 14,
    color: '#474747',
    fontFamily: 'Roboto',
  },
  documentConfirmLinkText: {
    lineHeight: 21,
    fontSize: 14,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_COLOR,
    fontFamily: 'Roboto',
  },
  documentUploadButtonLabel: {
    color: theme.PRIMARY_COLOR,
    textTransform: 'none',
    fontSize: 14,
    letterSpacing: 0,
    marginVertical: 2,
  },
});

export default styles;
