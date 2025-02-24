import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AccountInfo from '../pages/AccountInfo';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderRight from '../components/header/HeaderRight';
import UserNameUpdate from '../components/AccountInfoUpdate/UserNameUpdate';
import EmailUpdate from '../components/AccountInfoUpdate/EmailUpdate';
import MobileUpdate from '../components/AccountInfoUpdate/MobileUpdate';
import PasswordUpdate from '../components/AccountInfoUpdate/PasswordUpdate';
import * as NavigationService from './NavigationService';
const AccountInfoNav = createStackNavigator(
  {
    AccountInfo: {
      screen: AccountInfo,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Account Info" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => NavigationService.goBack()}
          />
        ),
      },
    },
    UserNameUpdate: {
      screen: UserNameUpdate,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="First and Last Name" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    EmailUpdate: {
      screen: EmailUpdate,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Change Email" />,
      },
    },
    PasswordUpdate: {
      screen: PasswordUpdate,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Change Password" />,
      },
    },

    MobileUpdate: {
      screen: MobileUpdate,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Change Mobile Number" />,
      },
    },
  },
  {
    initialRouteName: 'AccountInfo',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(AccountInfoNav);
