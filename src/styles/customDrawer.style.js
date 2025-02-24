import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  sideDrawerContain: {
    flexDirection: 'column',
    flex: 1,
  },
  sideDrawerHead: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: theme.PRIMARY_COLOR,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  userName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    width: '70%',
    // backgroundColor: 'red',
  },
  address: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    width: '70%',
  },
  viewProfileBtnLabel: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
  },
  listItemLabel: {
    fontSize: 16,
  },
  listItemActive: {
    color: theme.PRIMARY_COLOR,
  },
  lifestyleIcon: {marginTop: 10, marginRight: 20, marginLeft: 10},
  listItemSpace: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  sideDrawerAvatarContain: {
    marginRight: 20,
  },
  shieldIcon: {
    position: 'absolute',
    bottom: 0,
    left: -5,
  },
  helpDeskDialog: {
    borderRadius: 10,
  },
  closeIcon: {
    textAlign: 'right',
    paddingRight: 10,
    paddingTop: 10,
  },
  modalTitle: {
    color: theme.PRIMARY_COLOR,
    fontSize: 24,
    textAlign: 'center',
  },
  modalDescription: {
    color: theme.SECONDARY_COLOR,
    fontSize: 14,
    textAlign: 'center',
    margin: 20,
  },
  label: {
    color: theme.SECONDARY_COLOR,
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 2,
    marginTop: 15,
  },
  updateButtonLable: {
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 5,
    textTransform: 'none',
  },
  updateButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  successModalDescription: {
    color: theme.SECONDARY_COLOR,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
