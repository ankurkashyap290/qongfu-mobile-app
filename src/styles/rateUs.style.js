import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  rateUsHeader: {
    flexDirection: 'row',
  },
  rateHeaderTitle: {
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  rateHeaderTitleCon: {width: 330},
  rateContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  rateTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  ratingComponent: {
    marginTop: 20,
  },
  reviewHeading: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  reviewTextBox: {
    backgroundColor: '#fff',
    borderColor: theme.SECONDARY_COLOR,
  },
  submitBtnContain: {
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtn: {
    width: 200,
    borderRadius: 30,
  },
  submitBtnInactive: {
    backgroundColor: theme.SECONDARY_COLOR,
  },
  submitBtnLabel: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
  },
  submitBtnActive: {
    backgroundColor: theme.PRIMARY_COLOR,
  },
  rateFooter: {
    marginTop: 20,
  },
  footerDullText: {
    fontSize: 20,
    color: '#ababab',
    textAlign: 'center',
  },
  footerActiveText: {
    fontSize: 24,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
  },
  successHeading: {
    fontSize: 20,
    textAlign: 'center',
  },
  successMsg: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.SECONDARY_COLOR,
    marginTop: 10,
  },
  rateUsModalAlreadySubmit: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
  },
  counterDigitStyle: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderColor: theme.PRIMARY_COLOR,
  },
  activeDigitStyle: {
    color: '#0fa016',
  },

  labelTimeStyle: {
    color: theme.SECONDARY_COLOR,
    fontSize: 12,
  },
});

export default styles;
