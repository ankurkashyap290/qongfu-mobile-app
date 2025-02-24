import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  deactivateAccountTitle: {
    fontSize: 28,
    color: '#0065AB',
    lineHeight: 32,
    marginBottom: 10,
  },
  deactivateAccountContent: {
    fontSize: 14,
    color: '#858585',
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  radioButtonText: {
    fontSize: 14,
    color: '#4f4f4f',
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  deactivateAccountItalicContent: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 24,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    // marginTop: 30,
  },
  deactivateButton: {
    borderRadius: 25,
    // height: 48,
    borderColor: '#FF0000',
    paddingLeft: 10,
    paddingRight: 10,
  },
  deactivateButtonLabel: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
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
  listTitle: {
    color: '#0065AB',
    fontSize: 14,
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  listStyle: {
    padding: 0,
  },
  disableDeactivateButton: {
    borderRadius: 25,
    // height: 48,
    borderColor: '#dedede',
    paddingLeft: 10,
    paddingRight: 10,
  },
  disableDeactivateButtonLabel: {
    color: '#dedede',
    fontSize: 16,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  reasonField: {
    borderRadius: 8,
    borderColor: '#b5b5b5',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  confirmationModal: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  deactivateAccountModalTitle: {
    fontSize: 24,
    color: '#0065AB',
    lineHeight: 35,
    marginBottom: 10,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  deactivateAccountModalContent: {
    fontSize: 16,
    color: '#4f4f4f',
    lineHeight: 24,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 35,
  },
  deactivateAccountSuccessTitle: {
    fontSize: 24,
    color: '#4f4f4f',
    lineHeight: 35,
    marginBottom: 10,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  deactivateSuccessButton: {
    borderRadius: 25,
    backgroundColor: '#54B948',
    paddingLeft: 10,
    paddingRight: 10,
    // marginBottom: 40,
    // marginTop: 20,
  },
  deactivateSuccessButtonLabel: {
    fontSize: 17,
    color: '#fff',
    // lineHeight: 26,
    // marginBottom: 10,
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
