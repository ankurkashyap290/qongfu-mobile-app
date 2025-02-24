import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/businessPlaceProfile.style';

const AboutUs = ({place}) => {
  return (
    <View style={styles.sections}>
      <Text style={styles.placeProfileTitle}>About Us</Text>
      {place && place.description ? (
        <Text style={[styles.aboutUsDesc, {marginTop: 16}]}>
          {place.description}
        </Text>
      ) : (
        <Text style={styles.emptySection}>- SECTION EMPTY -</Text>
      )}
    </View>
  );
};

export default AboutUs;
