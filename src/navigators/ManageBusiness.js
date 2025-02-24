import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderRight from '../components/header/HeaderRight';
import BusinessManage from '../components/ManageBusiness/businessManage';
import PendingClaim from '../components/SetupBusiness/pendingClaim';
import BusinessPlaceProfile from './BusinessPlaceProfileNav';
import * as NavigationService from './NavigationService';

const ManageBusiness = createStackNavigator(
  {
    BusinessManage: {
      screen: BusinessManage,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft
            onAction={() => {
              NavigationService.goBack();
            }}
          />
        ),
        headerTitle: () => <HeaderTitle title="Manage Business" />,
        headerRight: () => (
          <HeaderRight
            icon="add"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    PendingClaim: {
      screen: PendingClaim,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Qongfu Business" />,
        headerRight: null,
      },
    },
    BusinessPlaceProfile: {
      screen: BusinessPlaceProfile,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'BusinessManage',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(ManageBusiness);
