import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PlaceDetails from '../pages/PlaceDetails';
import RateUs from '../pages/RateUs';
import PlaceGallery from '../pages/PlaceGallery';
import CustomAppBar from '../components/header/CustomAppBar';
import HeaderTitle from '../components/header/HeaderTitle';
import RateUsHeader from '../components/header/RateUsHeader';

const AppHeader = (page) => {
  return {
    header: (props) => <CustomAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const PlaceDetailsNav = createStackNavigator(
  {
    Place: {
      screen: PlaceDetails,
      navigationOptions: {
        ...AppHeader('place'),
      },
    },
    RateUs: {
      screen: RateUs,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <RateUsHeader navigation={navigation} />,
        headerTitle: () => <HeaderTitle title="Rate" />,
      }),
    },
    PlaceGallery: {
      screen: PlaceGallery,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <RateUsHeader navigation={navigation} />,
        headerTitle: () => <HeaderTitle title="Media Gallery" />,
      }),
    },
  },
  {
    initialRouteName: 'Place',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(PlaceDetailsNav);
