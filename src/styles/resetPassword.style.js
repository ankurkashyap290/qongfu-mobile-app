import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  textInputField: {
    backgroundColor: '#ffffff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#eeeeee',
    width: '85%',
  },
  resetPasswordRoot: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  resetPasswordTitle: {
    fontSize: 24,
    color: theme.PRIMARY_COLOR,
  },
  textFieldContainer: {
    marginTop: 30,
    position: 'relative',
  },
  submitBtnContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  submitBtn: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
    width: 250,
  },
  submitBtnLabel: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    textTransform: 'none',
  },
  checkIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  checkIconInactive: {
    color: theme.SECONDARY_COLOR,
  },
  checkIconActive: {
    color: '#54b948',
  },
});

export default styles;
