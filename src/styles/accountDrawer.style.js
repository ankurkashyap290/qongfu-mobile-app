import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  drawerHandler: {
    alignItems: 'center',
  },
  fakeSheetCt: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 80,
    borderRadius: 32,
  },
  manageButtonContainer: {
    flexDirection: 'row',
  },
  manageButtonText: {
    color: theme.PRIMARY_COLOR,
    lineHeight: 24,
    fontSize: 16,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    paddingLeft: 5,
  },
  username: {
    color: '#4F4F4F',
    lineHeight: 24,
    fontSize: 16,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  userType: {
    color: '#858585',
    lineHeight: 24,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  userContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 8,
    flex: 1,
    backgroundColor: 'red',
  },
  manageBusinessButton: {
    borderRadius: 8,
    borderColor: '#b5b5b5',
    justifyContent: 'center',
  },
  manageBusinessButtonLabel: {
    color: '#4F4F4F',
    marginVertical: 3,
    fontSize: 14,
    fontFamily: 'Roboto',
    textTransform: 'capitalize',
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 1,
    borderRadius: 30,
  },
  avatarSection: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    margin: 16,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
  closeIcon: {
    textAlign: 'right',
    marginTop: 15,
    marginRight: 15,
  },
});

export default styles;
