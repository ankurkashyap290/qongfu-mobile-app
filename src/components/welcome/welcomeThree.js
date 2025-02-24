import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../styles/welcome';

const welcomeThree = () => {
  return (
    <View style={[styles.innerContainer]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.welcomeImg}
          source={require('../../assets/img/Second_Page.png')}
        />
      </View>
      <Text style={styles.discoverText}>Discover</Text>
      <Text style={styles.healthAndFitnessFreelancer}>
        the best Health & Fitness
      </Text>
      <Text style={styles.healthAndFitnessFreelancer}>
        freelancers near you!
      </Text>
    </View>
  );
};

export default welcomeThree;
