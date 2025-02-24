import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderRight from '../components/header/HeaderRight';
import BusinessUploadMedia from '../components/BusinessMediaGallery/uploadMedia';
import CreateMediaPost from '../components/BusinessMediaGallery/createMediaPost';
import UpdateMediaPost from '../components/BusinessMediaGallery/updateMediaPost';

import * as NavigationService from './NavigationService';

const BusinessMediaGalleryNav = createStackNavigator(
  {
    BusinessUploadMedia: {
      screen: BusinessUploadMedia,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Media Gallery" />,
        headerRight: () => (
          <HeaderRight
            icon="add"
            onAction={() => {
              navigation.setParams({runDone: true});
            }}
          />
        ),
      }),
    },
    CreateMediaPost: {
      screen: CreateMediaPost,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Create a Post" />,
      },
    },
    UpdateMediaPost: {
      screen: UpdateMediaPost,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Edit Post" />,
      },
    },
  },
  {
    initialRouteName: 'BusinessUploadMedia',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(BusinessMediaGalleryNav);
