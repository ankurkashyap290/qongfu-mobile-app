import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import * as NavigationService from './NavigationService';
import Welcome from '../pages/Welcome';
import SignInNav from './SignIn';
import SignUpNav from './SignUp';
import DashboardDrawer from './DashboardDrawer';
import {fetchInitialData} from '../../redux/app/actions';
import WebSockets from '../components/WebSockets';
import AskLocation from '../components/Settings/AskLocation';
import RegisterPush from '../components/Notifications/RegisterPush';
import AccountDrawer from '../components/User/AccountDrawer';

const SwitchNavigator = createSwitchNavigator(
  {
    AuthNavigator: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUpNav,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignIn: {
      screen: SignInNav,
      navigationOptions: {
        headerShown: false,
      },
    },
    AppMain: {
      screen: DashboardDrawer,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'AuthNavigator',
    navigationOptions: {
      cardStyle: {backgroundColor: '#fff'},
    },
  },
);
const AppSwitchNavigator = createAppContainer(SwitchNavigator);

const AppNavigator = ({fetchInitialData, isAppInitialized, ...props}) => {
  const [navigator, setNavigator] = useState(null);

  useEffect(() => {
    NavigationService.setNavigator(navigator);
  }, [navigator]);

  useEffect(() => {
    if (!isAppInitialized) {
      fetchInitialData();
    }
  }, []);

  return (
    <React.Fragment>
      <AppSwitchNavigator
        ref={(ref) => setNavigator(ref)}
        screenProps={{...props}}
      />
      <RegisterPush />
      <AskLocation />
      <WebSockets />
      <AccountDrawer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAppInitialized: state.app.isAppInitialized,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchInitialData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
