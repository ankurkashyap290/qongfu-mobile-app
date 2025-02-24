import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/placeDetails.style';
import LifestyleAndQongfus from './lifestyleAndQongfuStyle2';
import Location from './location';
import MoreInfo from './moreInfo';
import RatingAndReviews from './ratingAndReviews';
import AboutUs from '../Place/AboutUs';

const InfoTab = ({place, geoLocation}) => {
  return (
    <View>
      <View style={styles.contentSpace}>
        <AboutUs isAdmin={false} place={place} />
      </View>
      <View>
        <LifestyleAndQongfus
          lifestyles={place.lifestyles}
          qongfus={place.qongfus ? place.qongfus : []}
          qongfuMax={5}
        />
      </View>
      <View style={styles.contentSpace}>
        <MoreInfo amenities={place.amenities || []} />
      </View>
      <View style={styles.contentSpace}>
        <Location
          geoLocation={geoLocation}
          placeLocation={{
            lat: parseFloat(place.location_lat),
            lng: parseFloat(place.location_lng),
          }}
          zoom={14}
          address={place.address}
          location={place.location}
        />
      </View>

      <View style={styles.contentSpace}>
        <RatingAndReviews />
      </View>
    </View>
  );
};

export default InfoTab;
