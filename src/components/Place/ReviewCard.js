import React from 'react';
import {View, Text} from 'react-native';
import {Surface, Avatar} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import moment from 'moment';
import styles from '../../styles/businessPlaceProfile.style';
import {IMAGE_URL_PREFIX} from '../../../config';

const ReviewCard = ({isAdmin, review}) => {
  return (
    <Surface style={styles.ratingsCard}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <AirbnbRating
          showRating={false}
          count={5}
          reviews={[]}
          defaultRating={review.stars || 0}
          isDisabled
          size={14}
          selectedColor="#FFD300"
        />
        <Text style={styles.time}>
          {review.updated_at
            ? moment(review.updated_at, 'YYYYMMDD').fromNow()
            : ''}
        </Text>
        {isAdmin && review.report !== null ? (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Text style={styles.reportedRedText}>Reported</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.reviewContent}>{review.review || 'No Comment'}</Text>
      <View style={{flexDirection: 'row'}}>
        <Avatar.Image
          size={24}
          style={{marginTop: 20}}
          source={{
            uri:
              review.user && review.user.avatar_url
                ? `${IMAGE_URL_PREFIX}${review.user.avatar_url}`
                : `https://via.placeholder.com/728.png?`,
          }}
        />
        <Text style={styles.username}>
          {review.user ? review.user.fullname : ''}
        </Text>
      </View>
    </Surface>
  );
};

export default ReviewCard;
