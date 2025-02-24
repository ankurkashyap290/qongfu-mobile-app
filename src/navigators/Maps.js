import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Explorer from '../pages/Dashboard';
import PlaceDetails from '../pages/PlaceDetails';
import PlacesMapView from '../pages/PlacesMapView';
import CustomAppBar from '../components/header/CustomAppBar';

const AppHeader = (page) => {
  return {
    header: (props) => <CustomAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const Maps = createStackNavigator(
  {
    MapView: {
      screen: PlacesMapView,
      navigationOptions: {
        ...AppHeader('Maps'),
      },
    },
  },
  {
    initialRouteName: 'MapView',
    headerMode: 'screen',

    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(Maps);
