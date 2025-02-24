import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import * as NavigationService from './NavigationService';
import BusinessAccount from '../components/Settings/BusinessAccount';
import UpgradeToBusiness from '../components/BusinessAccount/UpgradeToBusiness';
import BusinessUserVerify from '../components/BusinessAccount/BusinessUserVerify';
import DeactivateBusinessAccount from '../components/BusinessAccount/DeactivateBusinessAccount';

const BusinessAccountNav = createStackNavigator(
  {
    BusinessAccount: {
      screen: BusinessAccount,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Qongfu Business" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    UpgradeToBusiness: {
      screen: UpgradeToBusiness,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Business User" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
    BusinessUserVerify: {
      screen: BusinessUserVerify,
      navigationOptions: ({navigation}) => {
        const documentsRequired =
          navigation.getParam('documentsRequired') || false;
        return {
          headerLeft: () => (
            <HeaderLeft onAction={() => NavigationService.goBack()} />
          ),
          headerTitle: () => (
            <HeaderTitle
              title={documentsRequired ? 'Qongfu Business' : 'Business User'}
            />
          ),
          gestureEnabled: false,
          headerStyle: {backgroundColor: '#fff'},
          headerTintColor: '#000',
        };
      },
    },
    DeactivateBusinessAccount: {
      screen: (props) => (
        <DeactivateBusinessAccount {...props} accountType={1} />
      ),
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Deactivate" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
  },
  {
    initialRouteName: 'BusinessAccount',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(BusinessAccountNav);
