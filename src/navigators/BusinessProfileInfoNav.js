import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CustomAppBar from '../components/header/CustomAppBar';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderRight from '../components/header/HeaderRight';
import BusinessProfileInfo from '../components/BusinessPlaceProfile/businessProfileInfo';
import ClientTypeUpdate from '../components/BusinessPlaceProfile/clientTypeUpdate';
import BusinessContactUpdate from '../components/BusinessPlaceProfile/businessContactUpdateStyle2';
import BusinessLanguagesUpdate from '../components/BusinessPlaceProfile/moreInfoLanguage';
import * as NavigationService from './NavigationService';

const AppHeader = page => {
  return {
    header: props => <CustomAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const BusinessProfileInfoNav = createStackNavigator(
  {
    BusinessProfileInfo: {
      screen: BusinessProfileInfo,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Business Info" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    BusinessContactUpdate: {
      screen: BusinessContactUpdate,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Contact No" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    ClientTypeUpdate: {
      screen: ClientTypeUpdate,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Client Type" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },

    BusinessLanguagesUpdate: {
      screen: BusinessLanguagesUpdate,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="More Info" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'BusinessProfileInfo',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(BusinessProfileInfoNav);
