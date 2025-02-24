import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignIn from '../pages/SignIn';
import RecoverPasswordByPhone from '../pages/RecoverPasswordByPhone';
import RecoverPasswordByEmail from '../pages/RecoverPasswordByEmail';
import VerifyResetPasswordByPhone from '../pages/VerifyResetPasswordByPhone';
import VerifyResetPasswordByEmail from '../pages/VerifyResetPasswordByEmail';
import ResetPassword from '../components/auth/ResetPassword';
import ResetPasswordSuccess from '../components/auth/ResetPasswordSuccess';
const SignInNav = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
        title: 'Sign In',
      },
    },
    RecoverPasswordByPhone: {
      screen: RecoverPasswordByPhone,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    RecoverPasswordByEmail: {
      screen: RecoverPasswordByEmail,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    VerifyResetPasswordByPhone: {
      screen: VerifyResetPasswordByPhone,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: true,
      },
    },
    VerifyResetPasswordByEmail: {
      screen: VerifyResetPasswordByEmail,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: true,
      },
    },
    PasswordReset: {
      screen: ResetPassword,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: true,
      },
    },
    PasswordResetSuccess: {
      screen: ResetPasswordSuccess,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: true,
      },
    },
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
      containerStyle: {
        backgroundColor: 'white',
      },
    },
  },
);

export default createAppContainer(SignInNav);
