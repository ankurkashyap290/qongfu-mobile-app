import {StyleSheet} from 'react-native';
import theme from './theme.style';

const styles = StyleSheet.create({
  imageContainerStyle: {
    flexDirection: 'column',
    height: 221,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  starRatingContain: {
    backgroundColor: 'rgba(0,0,0,.6)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    paddingRight: 3,
  },
  ratingsStyle2: {
    color: '#56BAFF',
    fontSize: 16,
    paddingLeft: 3,
    paddingRight: 10,
    paddingTop: 2,
    height: 22,
    backgroundColor: 'rgba(0,0,0,.6)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  cameraCoverIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
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
