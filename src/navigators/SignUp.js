import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUp from '../pages/SignUp';
import ConfirmPhone from '../pages/ConfirmPhone';
import VerifyPhoneOTP from '../pages/VerifyPhoneOTP';
import UserOnboardingNav from './UserOnBoarding';
import * as NavigationService from './NavigationService';

const SignUpNav = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    ConfirmPhone: {
      screen: ConfirmPhone,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    VerifyPhoneOTP: {
      screen: VerifyPhoneOTP,
      navigationOptions: {
        headerLeft: (
          <View>
            <Text onPress={() => NavigationService.goBack()}>{' < Back'}</Text>
          </View>
        ),
        headerRight: null,
        headerTitle: null,
        gestureEnabled: false,
      },
    },
    OnBoarding: {
      screen: UserOnboardingNav,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'SignUp',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(SignUpNav);
