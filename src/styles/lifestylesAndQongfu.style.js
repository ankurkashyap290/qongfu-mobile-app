import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  lifestyleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  lifestyleChip: {
    borderRadius: 8,
    marginRight: 10,
    marginTop: 10,
    padding: 9,
  },
  lifestyleChipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qongfuChip: {
    marginRight: 10,
    marginTop: 10,
    padding: 2,
  },
  suggestionChip: {
    marginRight: 10,
    marginTop: 10,
    padding: 2,
    borderColor: '#474747',
    backgroundColor: '#fff',
  },
  qongfuChipText: {
    color: '#fff',
    fontSize: 14,
    borderRadius: 10,
  },
  // qongfusContainer:{

  // },
  qongfusContainer: {
    // flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  moreButton: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  addQongfuContainer: {
    marginTop: 20,
  },
  addQongfuHeadText: {
    color: '#0065ab',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  addQongfuSubtext: {
    marginTop: 20,
    color: '#474747',
    fontSize: 15,
    textAlign: 'center',
  },
  textInputField: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: theme.PRIMARY_COLOR,
    borderWidth: 1,
    textAlign: 'center',
  },
  helpText: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 18,
    color: '#474747',
  },
  helpLinks: {
    marginLeft: 40,
    marginTop: 20,
    fontSize: 15,
    color: theme.PRIMARY_COLOR,
  },

  successAddButton: {
    backgroundColor: '#5ab949',
    borderRadius: 30,
    width: 200,
    marginBottom: 20,
  },
  successAddButtonLable: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    textTransform: 'none',
  },
  successButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  successAddDialogText: {
    fontSize: 13,
    color: '#474747',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  successAddDialogHeading: {
    fontSize: 13,
    color: '#474747',
    textAlign: 'center',
    margin: 20,
  },
  qongfuHelpContainer: {
    margin: 20,
  },
  qongfuHelpText: {
    color: '#0065ab',
    fontSize: 24,
  },
  qongfuHelpSubtext: {
    marginTop: 20,
    color: '#474747',
    fontSize: 15,
  },
  lifestyleInfoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  suggestionText: {
    color: '#474747',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 20,
  },
  languageDivider: {
    margin: 10,
  },
  addQongfuText: {
    color: theme.PRIMARY_COLOR,
    fontSize: 18,
    textAlign: 'right',
    marginTop: -22,
    marginRight: 20,
  },
  updateButtonContainer: {
    alignItems: 'center',
    // marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
  updateButtonLable: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    paddingBottom: 8,
    paddingTop: 8,
    textTransform: 'none',
  },
  updateButton: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 10,
    width: 250,
  },
  updateButtonOnboarding: {
    backgroundColor: theme.PRIMARY_COLOR,
    width: '100%',
  },
  updateButtonDisable: {
    backgroundColor: '#a4a4a4',
    color: '#fff',
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
  suggestionChipText: {
    color: '#474747',
    fontSize: 14,
    borderRadius: 10,
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,.1)',
  },
  drawerHandler: {
    alignItems: 'center',
  },
  collapseButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  closeIcon: {
    textAlign: 'right',
  },
  imageUploadHeading: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
    marginTop: 10,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  addLifestyleSubHeading: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333333',
    // marginTop: 20,
    marginBottom: 20,
    // paddingRight: 40,
    // paddingLeft: 40,
    fontFamily: 'Roboto',
  },
  fakeSheetCt: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    // marginBottom: 10,
    // paddingBottom: 10,
  },
  addNewDataText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4f4f4f',
    marginLeft: 5,
  },
});

export default styles;
