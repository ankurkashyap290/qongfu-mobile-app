import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/myProfile.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.style';
import LifestyleIcon from '../../assets/img/lifestyle-colored.svg';

const MoreInfo = props => {
  const {amenities} = props;
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

  const getListItem = (slug, index) => {
    const item = amenities.find(val => val.label === slug);

    return (
      item && (
        <View key={`${item.slug}-${index}`} style={styles.moreInfoSection}>
          {getIcon(item.icon)}
          <Text style={[styles.amenityLabel]}> {item.label}</Text>
          <View style={{width: 200}}>
            <Text
              style={[
                styles.amenityLabel,
                {
                  marginTop: 2,
                  color: theme.SECONDARY_COLOR,
                },
              ]}>
              {item.value}
            </Text>
          </View>
        </View>
      )
    );
  };
  return (
    <View>
      <Text style={styles.profileHeadings}>More info</Text>
      {amenitiesOrder.length &&
        amenitiesOrder.map((item, index) => {
          return getListItem(item, index);
        })}
    </View>
  );
};

export default MoreInfo;
