import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  homePageTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  topBarActiveBtn: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
  },
  topBarActiveBtnLabel: {
    fontSize: 16,
    color: '#fff',
    textTransform: 'capitalize',
  },
  topBarBtnInactive: {
    backgroundColor: '#f7f7fa',
    borderRadius: 30,
  },
  topBarInactiveLabel: {
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
    textTransform: 'capitalize',
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    fontSize: 28,
    marginTop: 10,
  },
  subHeading: {
    fontSize: 24,
  },
  nearByContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 20,
  },
  nearByIcon: {
    marginTop: 11,
    marginLeft: 6,
  },
  nearByTitleStyle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  sortTitle: {
    fontSize: 18,
  },
  sortTitleActive: {
    color: theme.PRIMARY_COLOR,
  },
  sortCheckIcon: {
    color: theme.PRIMARY_COLOR,
    marginTop: 10,
    marginRight: 10,
  },
  floatingOuter: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  floatingAndroid: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 50,
  },
  floatingIos: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 50,
  },
  closeIcon: {
    textAlign: 'right',
  },
});

export default styles;
