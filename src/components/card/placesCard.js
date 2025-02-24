import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {AirbnbRating, Rating} from 'react-native-ratings';
import styles from '../../styles/card.style';
import Shield from '../../assets/img/authenticated_seal.svg';
import Clock from '../../assets/img/schedule.svg';
import Location from '../../assets/img/location.svg';
import {getTimeToAmPmFormat} from '../../../utils';
import * as NavigationService from '../../navigators/NavigationService';
import {IMAGE_URL_PREFIX} from '../../../config';

const PlacesCard = (props) => {
  const {data} = props;
  const navigateToScreen = (slug) => {
    NavigationService.navigate('PlaceDetails', {
      slug,
    });
  };

  return (
    <View>
      <Card
        style={[styles.placeCardContainer]}
        onPress={() => navigateToScreen(data.slug)}>
        <Card.Cover
          style={styles.placeCardCover}
          source={{
            uri: data.place_cover_url
              ? `${IMAGE_URL_PREFIX}${data.place_cover_url}`
              : `https://via.placeholder.com/728.png?text=${data.place_name}`,
          }}
        />
        <View style={styles.ratingContainer}>
          <AirbnbRating
            showRating={false}
            count={5}
            reviews={[]}
            defaultRating={data.stars || 0}
            isDisabled
            size={20}
            selectedColor="#fff"
            starContainerStyle={styles.starRatingContain}
          />
          {/* <Text style={styles.ratingStyle}>{data.ratings_count || 0}</Text> */}
        </View>
        <Card.Content>
          <View style={styles.placeCardDesc}>
            <Shield style={styles.shieldIcon} />
            <Text
              style={[styles.placeName, styles.textLabelMargin]}
              numberOfLines={1}>
              {data.place_name}
            </Text>
          </View>
          <View style={styles.placeCardDesc}>
            <Clock />
            <Text
              style={[
                data.open_now ? styles.placeOpen : styles.placeClose,
                styles.textLabelMargin,
              ]}>
              {data.open_now ? 'OPEN' : 'CLOSED'}
            </Text>
            <Text style={[styles.time, styles.textLabelMargin]}>
              {data.open_now
                ? `| ${getTimeToAmPmFormat(data.start)}-${getTimeToAmPmFormat(
                    data.close,
                  )}`
                : '| Today'}
            </Text>
          </View>
          <View style={styles.placeCardDesc}>
            <Location />
            <Text style={[styles.location, styles.textLabelMargin]}>
              {data.distance_formatted}
            </Text>
            <Text style={styles.city} numberOfLines={1}>
              {' '}
              - {data.location}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default PlacesCard;
