import React from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {Map_Key} from '../../../config';
import styles from '../../styles/placeDetails.style';

const screenWidth = Math.round(Dimensions.get('window').width);
const Location = (props) => {
  const {geoLocation, address, zoom, placeLocation, location} = props;
  const handleMapDirections = () => {
    const userAddress = geoLocation.userAllowed ? geoLocation.address : '';
    if (Platform.OS !== 'ios') {
      Linking.openURL(`google.navigation:q=${address}`).catch((err) =>
        console.log('An error occurred', err),
      );
    } else {
      Linking.openURL(
        `comgooglemaps://?saddr=${userAddress}&daddr=${address}&directionsmode=transit`,
      ).catch((err) => console.log('An error occurred', err));
    }
  };
  const imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
    placeLocation.lat
  },${placeLocation.lng}&zoom=${zoom}&size=${
    screenWidth - 40
  }x208&maptype=roadmap
  &markers=color:red|${placeLocation.lat},${placeLocation.lng}&key=${Map_Key}`;
  return (
    <View>
      <Text style={[styles.aboutUsTitle]}>Come On Down</Text>
      <TouchableOpacity onPress={() => handleMapDirections()}>
        <Image source={{uri: imgUrl}} style={styles.mapImageSyle2} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 11}}>
        <Text style={styles.aboutUsDesc}>{address}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Text style={styles.aboutUsDesc}>{location}</Text>
      </View>
    </View>
  );
};

export default Location;
