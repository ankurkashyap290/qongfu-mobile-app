import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AccountSettings from '../pages/AccountSettings';
import AccountInfoNav from './AccountInfoNav';
import PersonalInfoNav from './PersonalInfoNav';
// import LifestyleAndQongfuUpdate from '../components/LifestyleAndQongfus/LifestyleAndQongfuUpdate';
import LocationSetup from '../pages/LocationSetup';
import LifestylesAndQongfu from '../pages/LifestylesAndQongfu';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderRight from '../components/header/HeaderRight';
import * as NavigationService from './NavigationService';

const EditProfileNav = createStackNavigator(
  {
    AccountSettings: {
      screen: AccountSettings,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Edit" />,
        // headerRight: () => <HeaderRight />,
      },
    },
    AccountInfo: {
      screen: AccountInfoNav,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    ProfileInfo: {
      screen: PersonalInfoNav,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    LocationSetup: {
      screen: LocationSetup,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft
            onAction={() => {
              const isLocateMe = navigation.getParam('isLocateMe') || false;
              if (isLocateMe) {
                navigation.setParams({isLocateMe: false});
              } else {
                NavigationService.goBack();
              }
            }}
          />
        ),
        headerTitle: () => <HeaderTitle title="Location Setup" />,
        headerRight: () => {
          const isLocateMe = navigation.getParam('isLocateMe') || false;
          const isLocationChanged =
            navigation.getParam('isLocationChanged') || false;
          return isLocateMe ? null : (
            <HeaderRight
              title={isLocationChanged ? 'Update' : 'Done'}
              onAction={() => {
                if (isLocationChanged) {
                  navigation.setParams({
                    runDone: true,
                  });
                } else {
                  NavigationService.goBack();
                }
              }}
            />
          );
        },
      }),
    },

    LifestylesAndQongfuUpdate: {
      screen: LifestylesAndQongfu,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Lifestyles & Qongfu" />,
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
    initialRouteName: 'AccountSettings',
    headerMode: 'screen',

    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(EditProfileNav);
