import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  pageLayoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'baseline',
    elevation: 2,
    backgroundColor: '#fff',
    height: 56,
  },
  textSignUpInputField: {
    backgroundColor: '#f7f7fa',
  },
  siteLogo: {
    width: 36,
    height: 36,
    // marginTop: 10,
  },
  filterIcon: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  searchListTitle: {
    fontSize: 16,
  },
  searchListDesc: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
  },
  personalInfoSerach: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  searchBoxCt: {
    position: 'relative',
    flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  searchOverlay: {
    flex: 1,
    position: 'absolute',
    left: -60,
    top: -56,
    opacity: 0.1,
    backgroundColor: '#fff',
  },
  searchListView: {
    flex: 1,
    position: 'absolute',
    top: 70,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    minHeight: 20,
    // zIndex: 999,
    // paddingTop: 48,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: 300,
    marginLeft: 20,
    marginRight: 20,
    elevation: 2,
  },
  topBarTitle: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  locationIcon: {
    // marginRight: 5,
    // marginTop: -5,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
  },
  groupDivider: {
    marginLeft: 20,
    marginRight: 20,
    height: 2,
  },
  searchButton: {
    width: 100,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  searchButtonText: {
    color: theme.SECONDARY_COLOR,
    // fontSize: 12,
    textTransform: 'capitalize',
  },
  searchButtonContainer: {
    position: 'absolute',
    right: 55,
    top: 0,
    zIndex: 2,
  },
  filterButtonContainer: {
    position: 'absolute',
    right: 62,
    top: 0,
    zIndex: 2,
  },
  appCountryFlagContainer: {
    position: 'absolute',
    right: 60,
    top: 21,
    zIndex: 2,
  },
  appCountryFlag: {
    fontSize: 24,
  },
  countryFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  countryInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 16,
  },
});

export default styles;
