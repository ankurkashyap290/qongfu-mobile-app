import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import styles from '../styles/notifications.style';

const screenHeight = Math.round(Dimensions.get('window').height);

const NotificationDetails = ({navigation}) => {
  const title = navigation.getParam('title');
  const content = navigation.getParam('content');

  return (
    <View>
      <ScrollView style={{height: screenHeight - 40}}>
        <View>
          <Card elevation={0}>
            <Card.Cover
              source={{uri: 'https://picsum.photos/700'}}
              style={{margin: 10}}
            />
            <Card.Content>
              <Title style={styles.notificationTitle}>{title}</Title>
              <Paragraph style={styles.notificationContent}>
                {content}
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationDetails;
