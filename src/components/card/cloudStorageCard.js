import React from 'react';
import {View, Text} from 'react-native';
import {Card, Button} from 'react-native-paper';
import styles from '../../styles/card.style';
import * as NavigationService from '../../navigators/NavigationService';
import {TouchableOpacity} from 'react-native';
import CloudStoragIcon from '../../assets/img/cloud_storage.svg';
const CloudStorageCard = props => {
  const {imageUrl, name, onSelect} = props;

  const handleLifestyleItem = name => {
    onSelect(name);
  };

  return (
    <TouchableOpacity>
      <Card>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{width: '80%'}}>
              <Text style={styles.cloudStorageHeading}>Cloud Storage</Text>
              <Text style={styles.cloudStorageText}>
                For your videos and images. Lorem ipsum dolor sit amet,
                cosectetur
              </Text>
            </View>
            <View>
              <CloudStoragIcon />
            </View>
          </View>
          <Text style={styles.storageText}>5GB</Text>
          <Text style={styles.freeText}>Free</Text>
          <View style={{alignItems: 'center'}}>
            <Button
              mode="outlined"
              //   onPress={handleSubmit}
              style={styles.currentButton}
              labelStyle={styles.currentButtonLabel}>
              Current
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default CloudStorageCard;
