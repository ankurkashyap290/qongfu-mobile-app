import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import UserHome from '../pages/UserHome';
import CustomUserAppBar from '../components/header/CustomUserAppBar';
import FastTrackSetup from '../components/Dashboard/fastTrackSetup';
import BiometricsDetail from '../components/Dashboard/biometricsDetail';
import DashboardSettings from '../components/Dashboard/dashboardSettings';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';

const AppHeader = page => {
  return {
    header: props => <CustomUserAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const HomeTab = createStackNavigator(
  {
    UserHome: {
      screen: UserHome,
      navigationOptions: {
        ...AppHeader('Home'),
        gestureEnabled: false,
        title: '',
      },
    },
    FastTrackSetup: {
      screen: FastTrackSetup,
      navigationOptions: {
        ...AppHeader('Home'),
        gestureEnabled: false,
        title: '',
      },
    },
    BiometricsDetail: {
      screen: BiometricsDetail,
      navigationOptions: {
        ...AppHeader('Home'),
        gestureEnabled: false,
        title: '',
      },
    },
    DashboardSettings: {
      screen: DashboardSettings,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Dashboard Settings" />,
      },
    },
  },
  {
    initialRouteName: 'UserHome',
    headerMode: 'screen',
    navigationOptions: {
      cardStyle: {backgroundColor: '#fff'},
      headerShown: false,
    },
  },
);

export default createAppContainer(HomeTab);
