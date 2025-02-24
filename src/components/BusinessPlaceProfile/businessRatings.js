import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/businessPlaceProfile.style';
import {getViewportHeight} from '../../../utils/helper';

const BusinessRatings = props => {
  return (
    <View style={{backgroundColor: '#fff', minHeight: getViewportHeight(true)}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={styles.noRatingText}>You have no ratings yet</Text>
      </View>
    </View>
  );
};

export default BusinessRatings;
