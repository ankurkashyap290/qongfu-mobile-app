import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  headerPhoneIcon: {
    // position: 'absolute',
    // right: -140,
    // marginTop: 10,
  },
  headerStartIcon: {
    // marginRight: 20,
    // marginTop: 10,
  },
  callDialogTitle: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  callDialogAction: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  callDialogBtnLabel: {
    fontSize: 17,
    color: theme.PRIMARY_COLOR,
    textTransform: 'none',
  },
  headerLogoTab: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  headerLogoContain: {
    position: 'absolute',
    bottom: -15,
    left: 20,
    zIndex: 1,
  },
  headerLogo: {
    backgroundColor: '#fff',
  },
  cameraLogoContainer: {
    position: 'absolute',
    left: 60,
    bottom: 0,
    alignItems: 'center',
    zIndex: 99,
  },
  cameraIcon: {
    backgroundColor: 'rgba(0,0,0,.6)',
    opacity: 0.4,
    borderRadius: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default styles;
