import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as NavigationService from './NavigationService';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderRight from '../components/header/HeaderRight';
import HeaderTitle from '../components/header/HeaderTitle';
import Settings from '../pages/Settings';
import NotificationsNav from './Notifications';
import CountrySettings from '../components/Settings/Country';
import Logout from '../pages/Logout';
import PrivacyPolicy from '../components/Settings/PrivacyPolicy';
import AboutUs from '../components/Settings/AboutUs';
import TermsAndService from '../components/Settings/TermsAndService';
import BusinessAccountNav from './BusinessAccountNav';
import InviteFriends from '../components/Settings/InviteFriends';
const SettingsDashboard = createStackNavigator(
  {
    SettingsDashboard: {
      screen: Settings,
      navigationOptions: ({navigation}) => {
        return {
          headerLeft: () => (
            <HeaderLeft
              onAction={() => {
                NavigationService.goBack();
              }}
            />
          ),
          headerTitle: () => <HeaderTitle title="Settings" />,
          gestureEnabled: false,
          headerStyle: {backgroundColor: '#fff'},
          headerTintColor: '#000',
        };
      },
    },
    Notifications: {
      screen: NotificationsNav,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Notification Settings" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    CountrySettings: {
      screen: CountrySettings,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Settings" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    About: {
      screen: AboutUs,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="About Qongfu" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Privacy Policy" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    TermsOfService: {
      screen: TermsAndService,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Terms of Service" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    InviteFriends: {
      screen: InviteFriends,
      navigationOptions: ({navigation}) => {
        return {
          headerLeft: () => (
            <HeaderLeft onAction={() => NavigationService.goBack()} />
          ),
          headerTitle: () => <HeaderTitle title="Contacts" />,
          gestureEnabled: false,
          headerRight: () => (
            <HeaderRight
              title={!navigation.getParam('selectMode') ? 'Select' : 'Cancel'}
              onAction={() =>
                navigation.setParams({
                  selectMode: !navigation.getParam('selectMode'),
                })
              }
            />
          ),
        };
      },
    },
    BusinessAccount: {
      screen: BusinessAccountNav,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        headerTintColor: '#000',
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'SettingsDashboard',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

SettingsDashboard.navigationOptions = ({navigation}) => {
  let tabBarVisible = false;
  return {
    tabBarVisible,
  };
};

export default createAppContainer(SettingsDashboard);
