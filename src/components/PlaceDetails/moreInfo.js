import React from 'react';
import {View, Text} from 'react-native';
import {List} from 'react-native-paper';
import styles from '../../styles/placeDetails.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.style';

const MoreInfo = ({amenities}) => {
  const amenitiesIcons = {
    client_type: (
      <Icon
        name="account"
        size={24}
        style={{marginRight: 5, color: theme.SECONDARY_COLOR}}
      />
    ),
    kids: (
      <Icon
        name="human-child"
        size={24}
        style={{marginRight: 5, color: theme.SECONDARY_COLOR}}
      />
    ),
    parking: (
      <Icon
        name="car-sports"
        size={24}
        style={{marginRight: 5, color: theme.SECONDARY_COLOR}}
      />
    ),
    payments: (
      <Icon
        name="credit-card"
        size={24}
        style={{marginRight: 5, color: theme.SECONDARY_COLOR}}
      />
    ),
    wifi: (
      <Icon
        name="wifi"
        size={24}
        style={{marginRight: 5, color: theme.SECONDARY_COLOR}}
      />
    ),
  };

  const getIcon = (icon) => {
    if (amenitiesIcons[icon]) {
      return amenitiesIcons[icon];
    }
    return null;
  };

  const renderAmenity = (item) => {
    return (
      <View
        key={item.id}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        {getIcon(item.icon)}
        <Text
          style={[
            styles.amenityLabel,
            {
              // marginTop: 5,
              marginLeft: 5,
              width: 150,
              textTransform: 'capitalize',
            },
          ]}>
          {item.label}
        </Text>
        <Text
          style={[
            styles.amenityLabel,
            {
              flex: 1,
              // marginTop: 5,
              color: '#4F4F4F',
              flexWrap: 'wrap',
            },
          ]}>
          {item.info}
        </Text>
        {/* </View> */}
      </View>
    );
  };

  return amenities.length ? (
    <View>
      <Text style={styles.aboutUsTitle}>More Info</Text>
      {amenities.map((item) => renderAmenity(item))}
    </View>
  ) : null;
};

export default MoreInfo;
