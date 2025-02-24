import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/businessPlaceProfile.style';
import TextReadMore from '../custom/TextReadMore';

const AboutUs = ({isAdmin, place}) => {
  return (
    <View>
      <Text style={styles.placeProfileTitle}>About Us</Text>
      {place.description ? (
        <TextReadMore
          textStyle={{...styles.aboutUsDesc, marginTop: 16}}
          numberOfLines={4}
          contentLength={place.description.length}>
          <Text>{place.description}</Text>
        </TextReadMore>
      ) : isAdmin ? (
        <Text style={styles.emptySection}>- SECTION EMPTY -</Text>
      ) : null}
    </View>
  );
};

export default AboutUs;
