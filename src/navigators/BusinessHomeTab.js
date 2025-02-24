import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import BusinessHome from '../pages/BusinessPlaceProfile';
import CustomUserAppBar from '../components/header/CustomUserAppBar';

const AppHeader = (page) => {
  return {
    header: (props) => <CustomUserAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const BusinessHomeTab = createStackNavigator(
  {
    BusinessHome: {
      screen: BusinessHome,
      navigationOptions: {
        ...AppHeader('BusinessHome'),
        gestureEnabled: false,
        title: '',
      },
    },
  },
  {
    initialRouteName: 'BusinessHome',
    headerMode: 'screen',
    navigationOptions: {
      cardStyle: {backgroundColor: '#fff'},
      headerShown: false,
    },
  },
);

export default createAppContainer(BusinessHomeTab);
