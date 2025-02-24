import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/businessPlaceProfile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.style';
import LifestyleIcon from '../../assets/img/lifestyle-colored.svg';

const MoreInfo = props => {
  const {
    place: {amenities},
  } = props;
  const amenitiesOrder = [
    'Lifestyle',
    'Birth Date',
    'Gender',
    'Home Town',
    'Nationality',
    'Languages',
  ];
  const amenitiesIcons = {
    lifestyle: <LifestyleIcon />,
    birthdate: <Icon name="gift-outline" size={24} />,
    gender: <Icon name="account" size={24} />,
    hometown: <Icon name="home-city" size={24} />,
    nationality: <Icon name="gift-outline" size={24} />,
    languages: <Icon name="account" size={24} />,
  };

  const getIcon = icon => {
    if (amenitiesIcons[icon]) {
      return amenitiesIcons[icon];
    }
    return null;
  };

  const renderAmenity = item => {
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
            styles.amenityValue,
            {
              flex: 1,
              // marginTop: 5,
              color: '#4F4F4F',
              flexWrap: 'wrap',
            },
          ]}>
          {item.info}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.sections}>
      <Text style={styles.placeProfileTitle}>More info</Text>
      {amenities && amenities.length > 0 ? (
        <View style={{marginTop: 16}}>
          {amenities.map(item => renderAmenity(item))}
        </View>
      ) : (
        <Text style={styles.emptySection}>- SECTION EMPTY -</Text>
      )}
    </View>
  );
};

export default MoreInfo;
