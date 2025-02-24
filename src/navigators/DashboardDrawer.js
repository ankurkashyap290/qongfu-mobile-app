// import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import CustomDrawerContentComponent from '../components/customDrawer/CustomDrawer';
import SettingsNav from './Settings';
import MyProfileNav from './MyProfileNav';
import AppNotificationsNav from './AppNotificationsNav';
import CustomAppBar from '../components/header/CustomAppBar';
import MainBottomTabs from './MainBottomTabs';

import BusinessSetup from './BusinessSetup';

const AppHeader = (page) => {
  return {
    header: (props) => <CustomAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

// import * as NavigationService from './NavigationService';

// const DrawerNavigatorConfig = {
//   contentComponent: CustomDrawerContentComponent,
// };

const DashboardDrawer = createStackNavigator(
  {
    MainBottomTabs: {
      screen: MainBottomTabs,
      navigationOptions: {
        headerShown: false,
      },
    },
    ViewProfile: {
      screen: MyProfileNav,
      navigationOptions: {
        headerShown: false,
      },
    },
    AppNotifications: {
      screen: AppNotificationsNav,
      navigationOptions: {
        headerShown: false,
      },
    },
    Settings: {
      screen: SettingsNav,
      navigationOptions: {
        headerShown: false,
      },
    },
    BusinessSetup: {
      screen: BusinessSetup,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  // DrawerNavigatorConfig,
);
export default createAppContainer(DashboardDrawer);
