import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  bgWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headingTitleStyle: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: '300',
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
  },
  getStartedBtn: {
    backgroundColor: theme.PRIMARY_COLOR,
    color: '#ffffff',
    borderRadius: 10,
  },
  getStartedBtnLabel: {
    textTransform: 'capitalize',
    fontSize: theme.FONT_SIZE_LARGE,
  },
  alreadyMember: {
    color: theme.SECONDARY_COLOR,
    fontSize: theme.FONT_SIZE_SMALL,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  signInText: {
    color: theme.LIGHT_BLUE,
    fontSize: theme.FONT_SIZE_SMALL,
    textDecorationLine: 'underline',
  },
  yourHelp: {
    color: theme.SECONDARY_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
    textAlign: 'center',
    fontWeight: '300',
  },
  healthAndFitness: {
    color: theme.PRIMARY_COLOR,
    fontSize: 29,
    textAlign: 'center',
  },
  welcomeOneHelpText: {
    textAlign: 'center',
    marginTop: 30,
  },
  welcomeImg: {
    width: 293,
    height: 293,
  },
  qongfuImg: {
    width: 266,
    height: 64,
  },
  imageContainer: {
    alignItems: 'center',
  },
  discoverText: {
    fontSize: 50,
    color: theme.PRIMARY_COLOR,
    // fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  healthAndFitnessFreelancer: {
    color: theme.PRIMARY_COLOR,
    fontSize: 26,
    marginBottom: 20,
    paddingLeft: 10,
    fontWeight: '300',
  },
  welcomeFooter: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 30,
  },
  sliderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#000000',
  },
  authScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  authImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  authSignUpBtnContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  authSingUpBtn: {
    backgroundColor: theme.PRIMARY_COLOR,
    width: 300,
    borderRadius: 30,
  },
  authSignUpBtnLabel: {
    textTransform: 'none',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  authSignInBtnLabel: {
    textTransform: 'none',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: theme.PRIMARY_COLOR,
  },
  authSignInBtnContainer: {
    alignItems: 'center',
  },
  authTermContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  authTermBtnLabel: {
    textTransform: 'none',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    color: theme.SECONDARY_COLOR,
  },
});

export default styles;
