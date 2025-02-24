import React from 'react';
import {View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import styles from '../../styles/placeCard2.style.js';
import {IMAGE_URL_PREFIX} from '../../../config';

import {TouchableOpacity} from 'react-native';

const LifestyleCard2 = ({name, onSelect, imageUrl}) => {
  const handleLifestyleItem = (name) => {
    onSelect(name);
  };

  return (
    <TouchableOpacity onPress={() => handleLifestyleItem(name)}>
      <Card style={styles.lifestyleCardContainer}>
        <Card.Cover source={imageUrl} style={styles.lifeStyleCardCover} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Text style={styles.lifestyleActionBtnLabel}>{name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default LifestyleCard2;
