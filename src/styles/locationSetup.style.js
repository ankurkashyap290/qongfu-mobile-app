import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  locationHeading: {
    fontSize: 15,
    fontWeight: '500',
    color: '#a3a3a3',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },

  locateButtonLable: {
    fontSize: 18,
    textTransform: 'none',
    color: theme.PRIMARY_COLOR,
  },
  locateButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    margin: 10,
  },
  locateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    marginRight: 20,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textFieldLabels: {
    fontSize: 13,
    color: '#939393',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  textInputField: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#efefef',
    borderWidth: 1,
    textAlign: 'center',
  },
  markerStyle: {
    color: 'red',
    fontSize: 20,
  },
  locationConfirmButton: {
    position: 'absolute',
    bottom: 40,
    left: 70,
  },
  confirmButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 250,
  },
  confirmButtonDisable: {
    backgroundColor: theme.SECONDARY_COLOR,
    borderRadius: 10,
    width: 250,
  },
  confirmButtonLable: {
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 5,
    textTransform: 'none',
  },
  confirmButtonLableDisable: {
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 5,
    color: '#fff',
    textTransform: 'none',
  },
  searchField: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  searchFieldText: {
    backgroundColor: '#fff',
    // borderRadius: 30,
  },
  updateButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  successDialogHeading: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
  },
  successButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 200,
    marginBottom: 20,
  },
  successButtonLable: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    textTransform: 'none',
  },
  countryFlag: {
    position: 'absolute',
    right: -50,
    top: 6,
    zIndex: 99,
    backgroundColor: '#fff',
    height: 55,
    width: 55,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
