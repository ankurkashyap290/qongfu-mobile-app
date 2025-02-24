import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderRight from '../components/header/HeaderRight';
import AddBusiness from '../components/SetupBusiness/addBusiness';
import CountrySelectionStep1 from '../components/SetupBusiness/countrySelectionStep1';
import BusinessNameSelectionStep2 from '../components/SetupBusiness/businessNameSelectionStep2';
import LogoSelectionStep3 from '../components/SetupBusiness/logoSelectionStep3';
import LocationSetupStep4 from '../components/SetupBusiness/locationSetupStep4';
import OwnBusinessStep5 from '../components/SetupBusiness/ownBusinessStep5';
import BusinessVerificationStep6 from '../components/SetupBusiness/businessVerificationStep6';
import DocumentUploadStep6 from '../components/SetupBusiness/documentUploadStep6';
import BusinessSetupSuccess from '../components/SetupBusiness/businessSetupSuccess';
import ManageBusiness from './ManageBusiness';

import * as NavigationService from './NavigationService';

const BusinessSetup = createStackNavigator(
  {
    AddBusiness: {
      screen: AddBusiness,
      navigationOptions: ({navigation}) => ({
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft
            onAction={() => {
              NavigationService.navigate('UserHome');
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
    BusinessSetupStep1: {
      screen: CountrySelectionStep1,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Setup Business" />,
        headerRight: () => <HeaderRight title="(1/6)" />,
      },
    },
    BusinessSetupStep2: {
      screen: BusinessNameSelectionStep2,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Setup Business" />,
        headerRight: () => <HeaderRight title="(2/6)" />,
      },
    },
    BusinessSetupStep3: {
      screen: LogoSelectionStep3,
      navigationOptions: ({navigation}) => {
        return {
          gestureEnabled: false,
          headerLeft: () => (
            <HeaderLeft
              onAction={() => {
                NavigationService.goBack();
              }}
            />
          ),
          headerTitle: () => <HeaderTitle title="Setup Business" />,
          headerRight: () => <HeaderRight title="(3/6)" />,
        };
      },
    },
    BusinessSetupStep4: {
      screen: LocationSetupStep4,
      navigationOptions: ({navigation}) => {
        return {
          gestureEnabled: false,
          headerLeft: () => (
            <HeaderLeft
              onAction={() => {
                if (navigation.getParam('isLocateMe')) {
                  navigation.setParams({isLocateMe: false});
                } else {
                  NavigationService.goBack();
                }
              }}
            />
          ),
          headerTitle: () => <HeaderTitle title="Setup Business" />,
          headerRight: () => <HeaderRight title="(4/6)" />,
        };
      },
    },
    BusinessSetupStep5: {
      screen: OwnBusinessStep5,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Setup Business" />,
        headerRight: () => <HeaderRight title="(5/6)" />,
      },
    },
    BusinessSetupStep6: {
      screen: BusinessVerificationStep6,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Setup Business" />,
        headerRight: () => <HeaderRight title="(6/6)" />,
      },
    },
    DocumentUploadStep6: {
      screen: (props) => <DocumentUploadStep6 {...props} mode="add-business" />,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Setup Business" />,
        headerRight: () => <HeaderRight title="(6/6)" />,
      },
    },
    BusinessSetupSuccess: {
      screen: BusinessSetupSuccess,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Setup Complete" />,
        headerRight: null,
      },
    },
    ManageBusiness: {
      screen: ManageBusiness,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ManageBusiness',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(BusinessSetup);
