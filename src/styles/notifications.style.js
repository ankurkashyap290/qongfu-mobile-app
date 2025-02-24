import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  titleHeader: {
    fontSize: 16,
    color: theme.SECONDARY_COLOR,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  firstSectionHeader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  tabItemTextContain: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabHeading: {
    fontSize: 20,
  },
  tabSubheading: {
    fontSize: 14,
    color: theme.SECONDARY_COLOR,
  },
  tabSwitchContain: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  notificationsCard: {
    margin: 15,
  },
  closeIcon: {
    marginRight: 10,
  },
  listHeadings: {
    color: '#707070',
    fontSize: 26,
    marginTop: 20,
    marginLeft: 20,
  },
  nameSection: {
    flexDirection: 'row',
    marginTop: 10,
  },
  notificationTitle: {
    color: '#404040',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
  },
  notificationContent: {
    color: '#404040',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 20,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 30,
    height: 50,
    width: 50,
    borderColor: '#ededed',
  },
  notificationIcon: {
    marginTop: 10,
    marginLeft: 15,
  },
});

export default styles;
