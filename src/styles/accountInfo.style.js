import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  fieldHeadings: {
    fontSize: 13,
    fontWeight: '600',
    color: '#5d5d5d',
    marginTop: 10,
    marginLeft: 20,
  },
  fieldValues: {
    marginLeft: 25,
    fontSize: 18,
    color: '#707070',
    marginBottom: 20,
    marginTop: 20,
  },
  nameSection: {
    flexDirection: 'row',
    // marginTop: 10,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  editIcon: {
    // color: '#474747',
    // fontSize: 55,
    // marginTop: 15,
  },
  verifiedIcon: {
    marginTop: -25,
    // height: 10,
    fontSize: 13,
    color: '#54b948',
  },
  verifiedText: {
    fontSize: 13,
    // color: '#54b948',
    textTransform: 'none',
  },
  textFieldLabels: {
    fontSize: 13,
    color: '#939393',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  textInputField: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#efefef',
    borderWidth: 1,
    textAlign: 'center',
  },

  updateButtonLable: {
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 5,
    textTransform: 'none',
  },
  updateButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  updateButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 250,
  },
  passwordCheckIcon: {
    fontSize: 30,
    color: '#bab7b7',
    marginTop: 15,
  },
  passwordCheckIconGreen: {
    fontSize: 30,
    color: '#5ab949',
    // marginTop: 15,
  },
  passwordCheckIconError: {
    fontSize: 30,
    color: '#d75a4a',
    marginTop: -25,
  },
  passwordTextInputField: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#efefef',
    borderWidth: 1,
    textAlign: 'center',
    width: 300,
  },
  successDialogHeading: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
  },
  successButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 200,
    marginBottom: 20,
  },
  successButtonLable: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    textTransform: 'none',
  },
  genderUpdateButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 250,
  },
  fieldContainer: {
    marginLeft: 20,
    marginRight: 20,
    width: '80%',
  },
  passwordSection: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default styles;
