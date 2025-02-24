import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    elevation: 2,
    borderTopWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  drawerHandler: {
    alignItems: 'center',
  },
  ourServicesButton: {
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
  },
  ourServicesButtonLabel: {
    fontSize: 18,
    lineHeight: 27,
    textTransform: 'capitalize',
  },
  fakeSheetCt: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
    elevation: 5,
  },
  servicesCardContainer: {
    // margin: 10,
    elevation: 2,
    borderRadius: 8,
    padding: 8,
    margin: 8,
    marginLeft: 16,
    marginRight: 16,
    height: 88,
  },
  serviceCardCover: {
    borderRadius: 4,
    height: 72,
    width: 96,
    justifyContent: 'center',
  },
  serviceCardTitle: {
    lineHeight: 21,
    fontSize: 16,
    color: '#4F4F4F',
    fontFamily: 'Roboto',
  },
  serviceCardContent: {
    lineHeight: 19,
    fontSize: 14,
    color: '#858585',
    fontFamily: 'Roboto',
    marginTop: 9,
  },
  cardViewButton: {
    borderRadius: 20,
    // height: 32,
    justifyContent: 'center',
    borderColor: theme.PRIMARY_COLOR,
  },
  cardViewButtonLabel: {
    textTransform: 'capitalize',
    fontSize: 14,
    marginVertical: 5,
    fontFamily: 'Roboto',
  },
  avaiableServicesButton: {
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    width: '93%',
    borderColor: theme.PRIMARY_COLOR,
    marginTop: 18,
    marginBottom: 20,
  },
  avaiableServicesButtonLabel: {
    fontSize: 18,
    lineHeight: 27,
    textTransform: 'capitalize',
  },
});

export default styles;
