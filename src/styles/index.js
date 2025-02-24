import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  signUpEnable: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
    padding: 5,
    width: '100%',
  },
  signUpDisable: {
    borderRadius: 30,
    padding: 5,
    width: '100%',
    backgroundColor: '#dedede',
  },
  signUpLabel: {
    fontSize: 18,
    fontWeight: '500',
    // paddingBottom: 5,
    // paddingTop: 5,
    textTransform: 'none',
    color: '#fff',
  },
  forgotBtn: {
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  forgotBtnLabel: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  inputSelectionColor: {
    color: theme.PRIMARY_COLOR,
    borderColor: theme.PRIMARY_COLOR,
  },
  textInputField: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    height: 28,
    borderColor: '#f1f1f1',
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
  },
  singInPassword: {
    // marginTop: 10,
  },
  signInForgotPassword: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  inputLabel: {
    fontSize: 12,
    color: theme.SECONDARY_COLOR,
  },
  textSignUpInputField: {
    backgroundColor: '#ffffff',
  },
  signUpEmailContainer: {
    marginTop: 20,
  },
  acceptConditionText: {
    fontSize: theme.FONT_SIZE_EXTRA_SMALL,
    color: theme.SECONDARY_COLOR,
  },
  acceptConditionSubText: {
    color: '#0fa016',
    textDecorationLine: 'none',
  },
  signUpBtnContainer: {
    alignItems: 'center',
    marginTop: 10,
    // marginBottom: 10,
  },
  passwordDialogHeading: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  passwordDialogSubHeading: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  passwordDialogBtn: {
    borderTopWidth: 1,
    borderTopColor: '#d1d2d4',
    paddingTop: 6,
    paddingBottom: 6,
  },
  passwordDialogBtnLabel: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    textTransform: 'capitalize',
  },
  passwordDialogBtnCancelLabel: {
    fontWeight: '900',
    color: theme.PRIMARY_COLOR,
    fontSize: 18,
    textTransform: 'capitalize',
  },
  passwordDialog: {
    zIndex: 9999,
    padding: 0,
    borderRadius: 15,
  },
  successModalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#fff',
  },
  successModalHeading: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
    color: theme.PRIMARY_COLOR,
  },
  successCheckIcon: {
    color: theme.PRIMARY_COLOR,
  },
  successCheckIconContainer: {
    alignItems: 'center',
  },
  submitBtn: {
    width: 200,
    marginBottom: 30,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
  },
  submitBtnLabel: {
    fontSize: 18,
  },
  mobileSubmitBtn: {
    width: 200,
    marginBottom: 30,
    borderRadius: 30,
    borderColor: theme.PRIMARY_COLOR,
  },
  mobileSubmitBtnLabel: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
  },
  mobileSuccessIconCheck: {
    color: '#0fa016',
  },
  mobileSuccessHeading: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
    color: theme.PRIMARY_COLOR,
  },
  mobileSuccessDiscretion: {
    color: theme.SECONDARY_COLOR,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  mobileSuccessCheckIconContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  userOnboardingContainer: {
    flex: 1,
  },
  userOnboardingTopBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  onBoardingNextLabel: {
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
  },
  onBoardingSkipLabel: {
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
    textAlign: 'right',
  },
  mobileSubSuccessHeading: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    textAlign: 'center',
    marginTop: 40,
  },
  formFieldLabel: {
    textTransform: 'uppercase',
    color: theme.SECONDARY_COLOR,
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
  },
  passwordSuccessIcon: {
    color: theme.PRIMARY_COLOR,
    marginTop: 150,
  },
  passwordUpdateButton: {
    fontSize: 18,
  },
  onboardingSuccessHeading: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
    marginTop: 30,
    color: theme.PRIMARY_COLOR,
  },
  onboardingSuccessSubHeading: {
    fontSize: 14,
    lineHeight: 24,
    color: '#858585',
    textAlign: 'center',
    marginTop: 40,
  },
  checkIcon: {
    color: '#0fa016',
    marginTop: 40,
  },
});

export default styles;
