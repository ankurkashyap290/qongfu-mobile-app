import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Dashboard from './Dashboard';
import BookingsTab from './BookingsTab';
import HomeTab from './HomeTab';
import ChatsTab from './ChatsTab';
import WalletTab from './WalletTab';
import TabBarComponent from '../components/custom/TabBarComponent';
// import * as NavigationService from './NavigationService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../styles/theme.style';
import BusinessHomeTab from './BusinessHomeTab';
import {Alert} from 'react-native';
import ExploreIconGray from '../assets/icons/sprint1/explore-icon-gray.svg';
import ExploreIconColor from '../assets/icons/sprint1/explore-icon-color.svg';
import ChatIconGray from '../assets/icons/sprint1/chat-icon-gray.svg';
import ChatIconColor from '../assets/icons/sprint1/chat-icon-color.svg';
import HomeIconGray from '../assets/icons/sprint1/home-icon-gray.svg';
import HomeIconColor from '../assets/icons/sprint1/home-icon-color.svg';
import ClientsIconGray from '../assets/icons/sprint1/clients-icon-gray.svg';
import ClientsIconColor from '../assets/icons/sprint1/clients-icon-color.svg';
import ActivityIconColor from '../assets/icons/sprint1/calendar-icon-color.svg';
import ActivityIconGray from '../assets/icons/sprint1/calendar-icon-gray.svg';
import WalletIconGray from '../assets/icons/sprint1/wallet-icon-gray.svg';
import WalletIconColor from '../assets/icons/sprint1/wallet-icon-color.svg';

const MainBottomTabs = createBottomTabNavigator(
  {
    ExploreTab: {
      screen: Dashboard,
      navigationOptions: ({navigation}) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        } else if (
          navigation.state.index === 0 &&
          navigation.state.isDrawerOpen
        ) {
          tabBarVisible = false;
        }
        return {
          headerShown: false,
          tabBarLabel: 'Explore',
          tabBarVisible,
          tabBarIcon: ({focused}) =>
            focused ? (
              <ExploreIconColor fill="#0099DD" />
            ) : (
              <ExploreIconGray fill="#919191" />
            ),
        };
      },
    },
    ChatsTab: {
      screen: ChatsTab,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: 'Chats',
        tabBarOnPress: (props) => {
          Alert.alert('Information', 'Implementation under process');
        },
        tabBarOnLongPress: (props) => {},
        tabBarIcon: ({focused}) =>
          focused ? (
            <ChatIconColor fill="#0099DD" />
          ) : (
            <ChatIconGray fill="#919191" />
          ),
      },
    },
    HomeTab: {
      screen: HomeTab,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarOnLongPress: ({navigation, defaultHandler}) => {
          // need to open account drawer
        },
        tabBarIcon: ({focused}) =>
          focused ? (
            <HomeIconColor fill="#0099DD" />
          ) : (
            <HomeIconGray fill="#919191" />
          ),
      },
    },
    BookingsTab: {
      screen: BookingsTab,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: 'Activities',
        tabBarOnPress: (props) => {
          Alert.alert('Information', 'Implementation under process');
        },
        tabBarOnLongPress: (props) => {},
        tabBarIcon: ({focused}) =>
          focused ? (
            <ActivityIconColor fill="#0099DD" />
          ) : (
            <ActivityIconGray fill="#919191" />
          ),
      },
    },
    WalletTab: {
      screen: WalletTab,
      navigationOptions: {
        headerShown: false,
        tabBarLabel: 'Wallet',
        tabBarOnPress: (props) => {
          Alert.alert('Information', 'Implementation under process');
        },
        tabBarOnLongPress: (props) => {},
        tabBarIcon: ({focused}) =>
          focused ? (
            <WalletIconColor fill="#0099DD" />
          ) : (
            <WalletIconGray fill="#919191" />
          ),
      },
    },
    BusinessClientsTab: {
      screen: BookingsTab,
      navigationOptions: ({navigation}) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        } else if (
          navigation.state.index === 0 &&
          navigation.state.isDrawerOpen
        ) {
          tabBarVisible = false;
        }
        return {
          headerShown: false,
          tabBarLabel: 'Clients',
          tabBarVisible,
          tabBarOnPress: (props) => {
            Alert.alert('Information', 'Implementation under process');
          },
          tabBarOnLongPress: (props) => {},
          tabBarIcon: ({focused}) =>
            focused ? (
              <ClientsIconColor fill="#0099DD" />
            ) : (
              <ClientsIconGray fill="#919191" />
            ),
        };
      },
    },
    BusinessHomeTab: {
      screen: BusinessHomeTab,
      navigationOptions: ({navigation}) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        } else if (
          navigation.state.index === 0 &&
          navigation.state.isDrawerOpen
        ) {
          tabBarVisible = false;
        }
        return {
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarVisible,
          tabBarIcon: ({focused}) =>
            focused ? (
              <HomeIconColor fill="#0099DD" />
            ) : (
              <HomeIconGray fill="#919191" />
            ),
        };
      },
    },
    BusinessChatsTab: {
      screen: BookingsTab,
      navigationOptions: ({navigation}) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        } else if (
          navigation.state.index === 0 &&
          navigation.state.isDrawerOpen
        ) {
          tabBarVisible = false;
        }
        return {
          headerShown: false,
          tabBarLabel: 'Chats',
          tabBarVisible,
          tabBarOnPress: (props) => {
            Alert.alert('Information', 'Implementation under process');
          },
          tabBarOnLongPress: (props) => {},
          tabBarIcon: ({focused}) =>
            focused ? (
              <ChatIconColor fill="#0099DD" />
            ) : (
              <ChatIconGray fill="#919191" />
            ),
        };
      },
    },
  },
  {
    // order: ['ExploreTab', 'BookingsTab', 'HomeTab', 'ChatsTab', 'WalletTab'],
    initialRouteName: 'HomeTab',
    tabBarComponent: TabBarComponent,
    backBehavior: 'none',
    tabBarOptions: {
      activeTintColor: theme.PRIMARY_COLOR,
      inactiveTintColor: theme.SECONDARY_COLOR,
      iconStyle: {
        width: '100%',
        height: 32,
      },
      labelStyle: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: theme.FONT_WEIGHT_MEDIUM,
      },
      tabStyle: {
        // backgroundColor: 'green',
        // fontWeight: '600',
        // elevation: 1,
        // height: 56,
      },
      style: {
        backgroundColor: '#fff',
        height: 56,
      },
    },
  },
);

export default createAppContainer(MainBottomTabs);
