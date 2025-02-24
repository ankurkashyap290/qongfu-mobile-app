import React from 'react';
import {Card, Button} from 'react-native-paper';
import styles from '../../styles/card.style';
import * as NavigationService from '../../navigators/NavigationService';
import {TouchableOpacity} from 'react-native';

const LifestyleCard = (props) => {
  const {imageUrl, name, onSelect} = props;

  const handleLifestyleItem = (name) => {
    onSelect(name);
  };

  return (
    <TouchableOpacity onPress={() => handleLifestyleItem(name)}>
      <Card style={styles.cardContainer}>
        <Card.Cover source={imageUrl} style={styles.lifeStyleCardCover} />
        <Card.Actions style={styles.cardActionStyle}>
          <Button mode="text" labelStyle={styles.lifestyleActionBtnLabel}>
            {name}
          </Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

export default LifestyleCard;
