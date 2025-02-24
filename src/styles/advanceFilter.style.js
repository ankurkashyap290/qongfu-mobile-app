import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  countryFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  countryInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryListHeader: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  countryListHeaderIconCon: {
    flexDirection: 'row',
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryList: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  countryName: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
  },
  backBtnLabel: {
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
    fontWeight: '100',
    textTransform: 'capitalize',
  },
  countryLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  countryIcon: {
    marginLeft: 10,
  },
  areaCitiesNote: {
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  areaCitiesSearchBox: {
    backgroundColor: '#fff',
  },
  filterListTitle: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
    fontWeight: '500',
  },
  filterListItemContain: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  filterListSelected: {
    marginRight: 10,
    color: '#4F4F4F',
    textTransform: 'capitalize',
  },
  filterListRightIcon: {
    marginRight: 10,
    marginTop: 5,
  },
  filterListName: {
    fontSize: 16,
    marginLeft: 0,
    color: '#858585',
  },
  filterListNearByContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  nearbyIcon: {
    marginTop: 0,
    marginLeft: 10,
  },
  nearbyLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
  },
  nearbySwitch: {marginRight: 10},
  nearbyDesc: {
    marginTop: 8,
    marginLeft: 13,
    fontSize: 16,
    marginBottom: 8,
    color: theme.SECONDARY_COLOR,
  },
  resetButtonContain: {
    alignItems: 'center',
  },
  resetBtnLabel: {
    color: theme.PRIMARY_COLOR,
    textTransform: 'none',
    fontSize: 16,
  },
  areaCitiesLabel: {
    fontSize: 20,
    fontWeight: '900',
  },
  areaCitiesRegionLabel: {
    fontSize: 18,
  },
  filterListItems: {
    paddingTop: 13,
    paddingBottom: 13,
  },
  inputField: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    height: 28,
    borderColor: '#f1f1f1',
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
  },
  lifestyleFilterList: {
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
