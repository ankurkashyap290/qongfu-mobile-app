import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Explorer from '../pages/Dashboard';
import ExplorerSearch from '../pages/ExplorerSearch';
import PlaceDetailsNav from './PlaceDetails';
import CustomAppBar from '../components/header/CustomAppBar';
import MapsNav from './Maps';

const AppHeader = (page) => {
  return {
    header: (props) => <CustomAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const Dashboard = createStackNavigator(
  {
    Explorer: {
      screen: Explorer,
      navigationOptions: {
        ...AppHeader('Home'),
        gestureEnabled: false,
        title: '',
      },
    },
    ExplorerSearch: {
      screen: ExplorerSearch,
      navigationOptions: {
        ...AppHeader('Search'),
        gestureEnabled: false,
        title: '',
      },
    },
    PlaceDetails: {
      screen: PlaceDetailsNav,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    Maps: {
      screen: MapsNav,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'Explorer',
    headerMode: 'screen',
    navigationOptions: {
      cardStyle: {backgroundColor: '#fff'},
      headerShown: false,
    },
  },
);

export default createAppContainer(Dashboard);
