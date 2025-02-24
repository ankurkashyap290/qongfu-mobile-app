import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MyProfile from '../pages/MyProfile';
import AccountSettings from '../pages/AccountSettings';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/Profile/HeaderTitle';
import HeaderRight from '../components/Profile/HeaderRight';
import * as NavigationService from './NavigationService';
import StaticHeaderTitle from '../components/header/HeaderTitle';
import EditProfileNav from './EditProfileNav';

const MyProfileNav = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <HeaderRight />,
      },
    },
    EditProfile: {
      screen: EditProfileNav,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'MyProfile',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(MyProfileNav);
