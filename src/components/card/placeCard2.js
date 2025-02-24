import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import styles from '../../styles/placeCard2.style.js';
import Shield from '../../assets/img/authenticated_seal_16x16.svg';
import Clock from '../../assets/img/schedule_blue_16x16.svg';
import Location from '../../assets/img/location_blue_16x16.svg';
import {getTimeFormat} from '../../../utils';
import * as NavigationService from '../../navigators/NavigationService';
import {IMAGE_URL_PREFIX} from '../../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PlaceCard2 = (props) => {
  const {data} = props;
  const navigateToScreen = (slug) => {
    NavigationService.navigate('PlaceDetails', {
      slug,
    });
  };

  return (
    <TouchableOpacity onPress={() => navigateToScreen(data.slug)}>
      <Card style={styles.newPlaceCardContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Image
              style={styles.newPlaceCardCover}
              source={{
                uri: data.place_cover_url
                  ? `${IMAGE_URL_PREFIX}${data.place_cover_url}`
                  : `https://via.placeholder.com/728.png?text=${data.place_name}`,
              }}
            />
            <View style={styles.newRatingContainer}>
              <AirbnbRating
                showRating={false}
                count={5}
                reviews={[]}
                defaultRating={data.stars || 0}
                isDisabled
                size={12}
                selectedColor="#fff"
                starContainerStyle={styles.newStarRatingContain}
                starStyle={{margin: 2}}
              />
              {/* <Text style={styles.ratingStyle}>{data.ratings_count || 0}</Text> */}
            </View>
          </View>
          <View
            style={[
              {
                paddingLeft: 8,
                flex: 1,
              },
            ]}>
            <View style={styles.placeCardDesc}>
              <Shield />
              <Text
                style={[styles.newPlaceName, styles.textLabelMargin]}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {data.place_name}
              </Text>
            </View>
            <View style={styles.placeCardDesc}>
              <Clock />
              <Text
                style={[
                  data.open_now ? styles.newPlaceOpen : styles.newPlaceClose,
                  styles.textLabelMargin,
                ]}>
                <Icon name="circle" size={10} />{' '}
                {data.open_now ? 'OPEN' : 'CLOSED'} {'  '}
                <Text
                  style={[styles.newTime, styles.textLabelMargin]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {data.open_now
                    ? ` ${getTimeFormat(data.start)} - ${getTimeFormat(
                        data.close,
                      )}`
                    : 'Today'}
                </Text>
              </Text>
            </View>
            <View style={styles.placeCardDesc}>
              <Location />
              <Text style={[styles.newLocation, styles.textLabelMargin]}>
                {data.distance_formatted}
              </Text>
              <Text
                style={styles.newCity}
                numberOfLines={1}
                ellipsizeMode="tail">
                {' - '}
                {data.location}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default PlaceCard2;
