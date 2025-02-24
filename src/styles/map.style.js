import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeCarousel: {
    position: 'absolute',
    left: 0,
    bottom: 50,
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
  },
  placeCarouselBtn: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 30,
    backgroundColor: 'green',
  },
  hideBtnContainer: {
    position: 'absolute',
    bottom: 165,
  },
  showBtnContainer: {
    position: 'absolute',
    bottom: 50,
  },
  showHideBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    color: theme.PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  showHideBtnLabel: {
    color: theme.PRIMARY_COLOR,
    fontSize: 14,
    textTransform: 'none',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  showHideBtnContent: {
    flexDirection: 'row-reverse',
    marginLeft: 10,
    color: theme.PRIMARY_COLOR,
  },
  showHideBtnIcon: {
    marginTop: 10,
    marginRight: 20,
    color: theme.PRIMARY_COLOR,
  },
  hideLocationContainer: {
    position: 'absolute',
    bottom: 370,
    right: 60,
  },
  showLocationContainer: {
    position: 'absolute',
    bottom: 100,
    right: 60,
  },
});

export default styles;
