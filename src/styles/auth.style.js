import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    // paddingTop: 20,
  },
  authHeaderImage: {
    width: 120,
    height: 79,
  },
  alignHeaderImage: {
    alignItems: 'center',
  },
  signInHeaderText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#000',
    marginTop: 8,
  },
  signUpHeaderText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 70,
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  footerTitle: {
    color: theme.SECONDARY_COLOR,
    fontSize: 16,
    textAlign: 'center',
  },
  alreadyMember: {
    color: '#000',
    fontSize: theme.FONT_SIZE_SMALL,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  signInText: {
    color: theme.LIGHT_BLUE,
    fontSize: theme.FONT_SIZE_SMALL,
  },
  footerSvgIcon: {
    width: 60,
    height: 60,
  },
  footerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signUpHeadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  footerHeadingBorder: {
    width: 100,
    height: 2,
    borderColor: '#f3f3f3',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  footerTextContainer: {
    // marginBottom: 200,
  },
  signUpFooterTextContainer: {
    marginBottom: 0,
  },
  singUpSocialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default styles;
