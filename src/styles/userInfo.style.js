import {StyleSheet} from 'react-native';
import theme from '../styles/theme.style';

const styles = StyleSheet.create({
  rootContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  titleHeading: {
    fontSize: 24,
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
    marginTop: 10,
    paddingRight: 40,
    paddingLeft: 40,
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.SECONDARY_COLOR,
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 40,
    paddingLeft: 40,
  },
  textSignUpInputField: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    height: 28,
    borderColor: '#f1f1f1',
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
    color: '#000',
  },
  inputSelectionColor: {
    color: theme.PRIMARY_COLOR,
    borderColor: theme.PRIMARY_COLOR,
  },
  successCheckIconContainer: {
    alignItems: 'center',
    marginTop: 70,
  },
  mobileSubmitBtn: {
    width: 200,
    marginBottom: 30,
    borderRadius: 30,
    borderColor: theme.PRIMARY_COLOR,
  },
  mobileSubmitBtnLabel: {
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
  },
  userInfoInput: {
    marginTop: 20,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 30,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.SECONDARY_COLOR,
    borderRadius: 35,
    color: 'black',
    paddingRight: 30,
    marginTop: -10, // to ensure the text is never behind the icon
  },
  imageUploadHeading: {
    fontSize: 24,
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    elevation: 0,
  },
  imageUploadInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  imageProgressBarContainer: {
    margin: 20,
  },
  imageUploadBtnContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  imageUploadBtnInActive: {
    width: 300,
    borderRadius: 30,
    borderColor: theme.SECONDARY_COLOR,
  },
  imageUploadBtnLabelInActive: {
    paddingTop: 10,
    paddingBottom: 10,
    color: theme.SECONDARY_COLOR,
    textTransform: 'none',
    fontSize: 18,
  },
  imageUploadSelectBtn: {
    marginTop: 25,
    marginRight: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageUploadSelectBtnLabel: {
    textTransform: 'none',
    color: theme.PRIMARY_COLOR,
    width: 150,
    textAlign: 'right',
  },
  imageNameDownIcon: {
    marginTop: 30,
    textAlign: 'left',
  },
  imageUploadProgressBar: {
    // backgroundColor: theme.SECONDARY_COLOR,
    height: 7,
  },
  imageUploadBtnActive: {
    width: 300,
    borderRadius: 30,
    borderColor: theme.PRIMARY_COLOR,
  },
  imageUploadBtnLabelActive: {
    paddingTop: 10,
    paddingBottom: 10,
    color: theme.PRIMARY_COLOR,
    textTransform: 'none',
    fontSize: 18,
  },
  lifeStyleSubmitInactive: {
    backgroundColor: '#a5a5a5',
    width: '100%',
  },
  lifeStyleSubmitActive: {
    backgroundColor: theme.PRIMARY_COLOR,
    width: '100%',
  },
  lifeStyleSubmitLabelInactive: {
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    textTransform: 'none',
    borderRadius: 0,
  },
  lifestyleBottomIconContain: {
    alignItems: 'center',
  },
  textError: {
    color: '#ff2121',
    textAlign: 'center',
  },
  autoCompleteOuter: {
    position: 'relative',
    height: 40,
    zIndex: 1000,
  },
  autoCompleteInner: {
    flex: 1,
    // left: 10,
    // position: 'absolute',
    // right: 10,
    // top: 0,
    paddingLeft: 10,
    paddingRight: 10,
    // zIndex: 1,
    backgroundColor: '#fff',
  },
  addQongfuBottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    elevation: 2,
    borderTopWidth: 0,
  },
  suggestionsContainer: {
    flexDirection: 'row',
  },
  autoCompleteInputContainer: {
    borderRadius: 30,
  },
  suggestionHeading: {
    color: theme.SECONDARY_COLOR,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
  },
  suggestionBtn: {
    borderRadius: 30,
    color: theme.SECONDARY_COLOR,
    marginBottom: 10,
    marginRight: 10,
    borderBottomColor: theme.SECONDARY_COLOR,
  },
  suggestionBtnLabel: {
    color: theme.SECONDARY_COLOR,
    fontSize: 15,
    textTransform: 'capitalize',
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 10,
    fontWeight: '500',
  },
  chipContainer: {
    // flex: 1,
    marginRight: 10,
    marginTop: 10,
  },
  lifestyleChip: {
    borderRadius: 10,
    width: 120,
    height: 40,
  },
  qongfuChip: {
    borderRadius: 30,
    width: 130,
    height: 40,
  },
  lifestyleChipText: {
    color: '#fff',
  },
  qongfuChipText: {
    color: '#fff',
  },
  chipBtn: {
    padding: 6,
    fontSize: 12,
    marginRight: 8,
  },
  addLifestyleSubHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.SECONDARY_COLOR,
    marginTop: 20,
    marginBottom: 20,
    paddingRight: 30,
    paddingLeft: 30,
  },
  dobModalHeading: {
    fontSize: 24,
    color: theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 20,
  },
  dobModalSubHeading: {
    fontSize: 14,
    color: '#858585',
    textAlign: 'center',
    marginTop: 10,
  },
  updateButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
    width: 200,
    marginBottom: 20,
  },
  modalButtonLable: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    textTransform: 'none',
  },
  modalResetButton: {
    marginBottom: 20,
  },
  modalResetButtonLable: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    textTransform: 'none',
  },
});

export default styles;
