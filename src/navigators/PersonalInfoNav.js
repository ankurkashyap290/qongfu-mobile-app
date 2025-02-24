import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import PersonalInfo from '../pages/PersonalInfo';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import GenderUpdate from '../components/PersonalInfoUpdate/GenderUpdate';
import HomeTownUpdate from '../components/PersonalInfoUpdate/HomeTownUpdate';
import LanguagesUpdate from '../components/PersonalInfoUpdate/LanguagesUpdate';
import NationalityUpdate from '../components/PersonalInfoUpdate/NationalityUpdate';
import HeaderRight from '../components/header/HeaderRight';
import * as NavigationService from './NavigationService';

const PersonalInfoNav = createStackNavigator(
  {
    PersonalInfo: {
      screen: PersonalInfo,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Edit Info" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    GenderUpdate: {
      screen: GenderUpdate,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Gender" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    HomeTownUpdate: {
      screen: HomeTownUpdate,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Home Town" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    LanguagesUpdate: {
      screen: LanguagesUpdate,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Languages" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },

    NationalityUpdate: {
      screen: NationalityUpdate,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Nationality" />,
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
    initialRouteName: 'PersonalInfo',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(PersonalInfoNav);
