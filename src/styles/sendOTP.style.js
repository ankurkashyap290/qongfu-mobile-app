import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  sendOTPContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 40,
    paddingLeft: 40,
  },
  sendOtpHeading: {
    fontSize: 32,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  sendOtpSubHeading: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 24,
  },
  sendOtpSubmitBtn: {
    backgroundColor: theme.PRIMARY_COLOR,
    marginTop: 40,
    borderRadius: 30,
  },
  sendOtpSubmitBtnLabel: {
    fontSize: 18,
    textTransform: 'none',
    paddingTop: 8,
    paddingBottom: 8,
  },
  cancelOtpLabel: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    textTransform: 'capitalize',
    paddingTop: 4,
    paddingBottom: 4,
  },
  resetPasswordSubLine: {
    fontSize: 12,
    color: theme.SECONDARY_COLOR,
    marginTop: 10,
  },
  emailRegisterText: {
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
    marginTop: 100,
    textAlign: 'center',
  },
  resetPasswordSubHeading: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  textFiledInput: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    height: 28,
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
    marginLeft: 95,
  },
  resetPasswordHeading: {
    marginTop: 10,
    fontSize: 32,
    color: theme.PRIMARY_COLOR,
    marginLeft: 20,
  },
  countryCodeContainer: {
    position: 'absolute',
    left: 60,
    bottom: 22,
  },
  icon: {
    position: 'absolute',
    left: 10,
    bottom: 18,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: theme.SECONDARY_COLOR,
    borderRadius: 30,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    marginTop: 30,
  },
  cancelBtnContainer: {
    marginBottom: 20,
  },
  countryDialogTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
    paddingTop: 10,
    paddingBottom: 10,
  },
  countryDialog: {
    borderRadius: 20,
  },
  selectedCountryListItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
  },
  countryListItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  countryListTitle: {
    fontSize: 17,
    color: theme.SECONDARY_COLOR,
  },
  emailRegisterTextAlign: {
    textAlign: 'center',
    paddingRight: 30,
    paddingLeft: 25,
  },
  emailTextInputField: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    height: 28,
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
  },
});

export default styles;
