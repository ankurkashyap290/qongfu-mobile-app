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
import styles from '../../styles/businessPlaceProfile.style';

const screenWidth = Math.round(Dimensions.get('window').width);

const Location = ({place, geoLocation}) => {
  const handleMapDirections = () => {
    const userAddress = geoLocation.userAllowed ? geoLocation.address : '';
    if (Platform.OS !== 'ios') {
      Linking.openURL(`google.navigation:q=${place.address}`).catch(err =>
        console.log('An error occurred', err),
      );
    } else {
      Linking.openURL(
        `comgooglemaps://?saddr=${userAddress}&daddr=${place.address}&directionsmode=transit`,
      ).catch(err => console.log('An error occurred', err));
    }
  };

  const imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
    place.location_lat
  },${place.location_lng}&zoom=12&size=${screenWidth - 40}x208&maptype=roadmap
  &markers=color:red|${place.location_lat},${
    place.location_lng
  }&key=${Map_Key}`;

  return (
    <View style={styles.sections}>
      <Text style={[styles.placeProfileTitle]}>Location</Text>
      {place.location_lat && place.location_lng ? (
        <View style={{marginTop: 16}}>
          <TouchableOpacity onPress={() => handleMapDirections()}>
            <Image source={{uri: imgUrl}} style={styles.mapImage} />
          </TouchableOpacity>
          {place.address ? (
            <View style={{flexDirection: 'row', marginTop: 11}}>
              <Text style={styles.aboutUsDesc}>{place.address}</Text>
            </View>
          ) : null}
          {place.location ? (
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text style={styles.aboutUsDesc}>{place.location}</Text>
            </View>
          ) : null}
        </View>
      ) : (
        <Text style={styles.emptySection}>- SECTION EMPTY -</Text>
      )}
    </View>
  );
};

export default Location;
