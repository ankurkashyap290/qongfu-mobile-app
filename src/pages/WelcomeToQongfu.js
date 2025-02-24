import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import theme from '../styles/theme.style';

const WelcomeToQongfu = () => {
  return (
    <View style={[styles.innerContainer]}>
      <Text style={styles.headingTitleStyle}>Welcome to</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.welcomeImg}
          source={require('../assets/img/QongfuLogo.png')}
        />
        <Image
          style={styles.qongfuImg}
          source={require('../assets/img/Qongfu.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 70,
  },
  headingTitleStyle: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.PRIMARY_COLOR,
  },
  imageContainer: {
    alignItems: 'center',
  },
  qongfuImg: {
    width: 266,
    height: 64,
  },
  welcomeImg: {
    width: 326,
    height: 326,
  },
});

export default WelcomeToQongfu;
