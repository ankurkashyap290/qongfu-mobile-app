import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import * as NavigationService from './NavigationService';
import AppNotifications from '../pages/AppNotifications';
import AppNotificationDetails from '../pages/AppNotificationDetails';

const AppNotificationsNav = createStackNavigator(
  {
    AppNotifications: {
      screen: AppNotifications,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Notifications" />,
      },
    },
    AppNotificationDetails: {
      screen: AppNotificationDetails,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Notifications" />,
      },
    },
  },
  {
    initialRouteName: 'AppNotifications',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(AppNotificationsNav);
