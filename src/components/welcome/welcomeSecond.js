import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../styles/welcome';

const welcomeSecond = () => {
  return (
    <View style={[styles.innerContainer]}>
      <Text style={styles.headingTitleStyle}>Welcome to</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.welcomeImg}
          source={require('../../assets/img/QongfuLogo.png')}
        />
        <Image
          style={styles.qongfuImg}
          source={require('../../assets/img/Qongfu.png')}
        />
      </View>
      <View style={[styles.welcomeOneHelpText]}>
        <Text style={styles.yourHelp}>Your Ultimate Guide to</Text>
        <Text style={styles.healthAndFitness}>Health & Fitness!</Text>
      </View>
    </View>
  );
};

export default welcomeSecond;
