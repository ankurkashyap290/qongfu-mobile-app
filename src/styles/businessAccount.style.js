import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  accountStatusTitle: {
    fontSize: 32,
    // fontFamily: 'Poppins',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
  },
  qongfuLogo: {
    height: 42,
    width: 42,
  },
  accountStatusContent: {
    fontSize: 16,
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: '#4f4f4f',
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  nextButton: {
    borderRadius: 30,
    justifyContent: 'center',
    height: 48,
  },

  nextButtonLabel: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'none',
  },
  nextButtonDanger: {
    borderColor: '#FF0000',
  },
  nextButtonLabelDanger: {
    color: '#FF0000',
  },
  imageContainer: {
    width: '100%',
    height: 222,
    borderRadius: 22,
  },
  accountStatusSubTitle: {
    lineHeight: 30,
    fontSize: 20,
    color: theme.PRIMARY_COLOR,
  },
  accountStatusContent: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F4F4F',
    textAlign: 'center',
  },
  uploadText: {
    fontSize: 16,
    lineHeight: 21,
    color: '#2B2B2B',
    textAlign: 'left',
    fontFamily: 'Roboto',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
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
  documentUploadButtonLabel: {
    color: theme.PRIMARY_COLOR,
    textTransform: 'none',
    fontSize: 14,
    letterSpacing: 0,
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
  successModalHeading: {
    color: theme.PRIMARY_COLOR,
    lineHeight: 32,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  successModalText: {
    color: '#BAB7B7',
    lineHeight: 24,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginTop: 30,
  },
});

export default styles;
