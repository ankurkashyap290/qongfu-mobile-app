import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NotificationsDashboard from '../pages/Notifications';
import * as NavigationService from './NavigationService';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';

const Notifications = createStackNavigator(
  {
    NotificationsDashboard: {
      screen: NotificationsDashboard,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'NotificationsDashboard',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(Notifications);
