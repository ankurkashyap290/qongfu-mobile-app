import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
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
