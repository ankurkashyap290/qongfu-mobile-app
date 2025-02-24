import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  // root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 36,
    fontSize: 20,
    borderWidth: 2,
    borderColor: '#f1f1f1',
    textAlign: 'center',
    color: theme.SECONDARY_COLOR,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  focusCell: {
    borderColor: '#e7e7e7',
    color: theme.SECONDARY_COLOR,
  },
  confirmOtpContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#fff',
  },
  confirmOTPHeading: {
    fontSize: 32,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
  },
  confirmOTPHeadingMobileUpdate: {
    fontSize: 23,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
  },
  confirmOTPSubHeading: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitBtnContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  submitBtn: {
    width: 230,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
  },
  submitBtnLabel: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    textTransform: 'capitalize',
  },
  sendAgainBtn: {
    marginTop: 20,
  },
  sendAgainLabel: {
    color: theme.PRIMARY_COLOR,
    textTransform: 'none',
    fontSize: 16,
  },
  sendAgainLabelDisabled: {
    color: theme.SECONDARY_COLOR,
    textTransform: 'none',
    fontSize: 16,
  },
  cancelBtnLabel: {
    color: theme.SECONDARY_COLOR,
    fontSize: 14,
    textTransform: 'none',
  },
  cancelOtpLabel: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    textTransform: 'capitalize',
    paddingTop: 4,
    paddingBottom: 4,
  },
  cancelBtnContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: '48%',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    marginTop: 30,
  },
  backBtn: {
    fontSize: 18,
    color: theme.SECONDARY_COLOR,
  },
  timeRemaining: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    marginBottom: 0,
    marginTop: 28,
  },
  timeCount: {
    color: '#ff2626',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  counterDigitStyle: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderColor: '#ffffff',
    width: 20,
  },
  activeDigitStyle: {color: '#1CC625', fontSize: 12},
  activeSeparator: {color: '#1CC625', fontSize: 12},
  inactiveDigitStyle: {color: '#ff2626', fontSize: 12},
  inactiveSeparator: {color: '#ff2626', fontSize: 12},
  submitButtonMobileUpdate: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 250,
  },
  submitBtnDisableLabel: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    textTransform: 'capitalize',
    color: '#fff',
  },
  submitButtonDisable: {
    backgroundColor: '#acd7f3',
    width: 230,
    borderRadius: 30,
  },
});

export default styles;
