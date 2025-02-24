import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
  },
  itemSpace: {
    marginTop: 20,
  },
  itemSpaceBottom: {
    marginBottom: 20,
  },
  countryListItem: {
    backgroundColor: '#fff',
  },
  countryListTitle: {},
  countryHeader: {
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  notAvailabelText: {
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  descriptionHeading: {
    marginBottom: 10,
    fontSize: 20,
    color: '#474747',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#474747',
  },
  descriptionBoldText: {
    fontSize: 16,
    color: '#474747',
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: 10,
    marginTop: 10,
  },
  aboutUsHeading: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 20,
    color: '#474747',
    fontWeight: 'bold',
  },
  descriptionLinkText: {
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
    textDecorationLine: 'underline',
  },
  listAccordian: {
    backgroundColor: '#fff',
    elevation: 2,
    padding: 0,
    marginBottom: 1,
  },
  listAccordianLabel: {
    color: '#474747',
    marginLeft: 16,
  },
  accountStatusText: {
    color: theme.PRIMARY_COLOR,
    marginLeft: 54,
  },
});

export default styles;
