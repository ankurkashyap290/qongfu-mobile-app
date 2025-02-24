import React from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
import styles from '../styles/notifications.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PromotionIcon from '../assets/img/promotions_notification.svg';
import * as NavigationService from '../navigators/NavigationService';

const screenHeight = Math.round(Dimensions.get('window').height);

const Notifications = (props) => {
  const RightContent = (props) => (
    <Avatar.Icon {...props} icon="close" style={styles.closeIcon} />
  );

  return (
    <View style={{backgroundColor: '#fff'}}>
      <ScrollView style={{height: screenHeight - 40}}>
        <View>
          <View style={styles.nameSection}>
            <Text style={[styles.listHeadings, {width: 150}]}>New</Text>
            <View>
              <Icon {...props} icon="close" />
            </View>
          </View>

          <Card
            elevation={4}
            style={styles.notificationsCard}
            onPress={() =>
              NavigationService.navigate('AppNotificationDetails', {
                title: 'Reminder',
                content: 'Are you ready for your afternoon run?',
              })
            }>
            <Card.Title
              title="Reminder"
              subtitle="Are you ready for your afternoon run?"
              left={() => (
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/img/reminder.png')}
                    style={styles.notificationIcon}
                  />
                </View>
              )}
              right={RightContent}
            />
          </Card>
          <Card
            elevation={4}
            style={styles.notificationsCard}
            onPress={() =>
              NavigationService.navigate('AppNotificationDetails', {
                title: 'New Promotion!',
                content:
                  'You can buy the new Tri Valley Shirts and Shoes at 30% off only @ Nakheel Fitness Gym!',
              })
            }>
            <Card.Title
              title="New Promotion!"
              subtitle="You can buy the new Tri Valley Shirts and Shoes at 30% off only @ Nakheel Fitness Gym!"
              left={() => <PromotionIcon />}
              right={RightContent}
            />
          </Card>
          <Text style={styles.listHeadings}>Today</Text>
          <Card
            elevation={4}
            style={styles.notificationsCard}
            onPress={() =>
              NavigationService.navigate('AppNotificationDetails', {
                title: 'Daily Motivation',
                content: "You haven't logged your Dinner for today. do it now?",
              })
            }>
            <Card.Title
              title="Daily Motivation"
              subtitle="You haven't logged your Dinner for today. do it now?"
              left={() => (
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/img/running.png')}
                    style={styles.notificationIcon}
                  />
                </View>
              )}
              right={RightContent}
            />
          </Card>
          <Card
            elevation={4}
            style={styles.notificationsCard}
            onPress={() =>
              NavigationService.navigate('AppNotificationDetails', {
                title: 'Event Tickets on Sale!',
                content:
                  'Impossible is Nothing! Even the word itself says I’m Possible!',
              })
            }>
            <Card.Title
              title="Event Tickets on Sale!"
              subtitle="You haven't logged your Dinner for today. do it now?"
              left={() => (
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/img/reminder.png')}
                    style={styles.notificationIcon}
                  />
                </View>
              )}
              right={RightContent}
            />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
