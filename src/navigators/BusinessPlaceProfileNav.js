import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CustomAppBar from '../components/header/CustomAppBar';
import HeaderTitle from '../components/header/HeaderTitle';
import HeaderLeft from '../components/header/HeaderLeft';
import HeaderRight from '../components/header/HeaderRight';
import BusinessPlaceProfile from '../pages/BusinessPlaceProfile';
import EditMenu from '../components/BusinessPlaceProfile/editMenu';
import BusinessAccountInfo from '../components/BusinessPlaceProfile/businessAccountInfo';
import BusinessAccountAdmin from '../components/BusinessPlaceProfile/businessAccountAdmin';
import BusinessAccountSubscriptions from '../components/BusinessPlaceProfile/businessAccountSubscriptions';
// import EditBusinessAccountInfo from '../components/BusinessPlaceProfile/editBusinessAccountInfo';
import BusinessProfileInfoNav from './BusinessProfileInfoNav';
import BusinessAmentitiesUpdate from '../components/BusinessPlaceProfile/moreInfoAmenities';
import BusinessHours from '../components/BusinessPlaceProfile/businessHours';
import BusinessMediaGalleryNav from './BusinessMediaGalleryNav';
// import MediaGalleryPublicView from '../components/BusinessPlaceProfile/mediaGalleryPublicView';
import BusinessRatings from '../components/BusinessPlaceProfile/businessRatings';
import BusinessRatingsAndReviews from '../components/BusinessPlaceProfile/businessRatingsAndReviews';
import LocationSetupStep4 from '../components/SetupBusiness/locationSetupStep4';
import BusinessLifestylesAndQongfuUpdate from '../components/BusinessPlaceProfile/businessLifestylesAndQongfuUpdate';
import DeactivateBusinessAccount from '../components/BusinessAccount/DeactivateBusinessAccount';
import DocumentUploadStep6 from '../components/SetupBusiness/documentUploadStep6';
import * as NavigationService from './NavigationService';

const AppHeader = (page) => {
  return {
    header: (props) => <CustomAppBar {...props} pageName={page} />,
    headerStyle: {backgroundColor: '#fff'},
    headerTintColor: '#000',
  };
};

const BusinessPlaceProfileNav = createStackNavigator(
  {
    PlaceProfile: {
      screen: BusinessPlaceProfile,
      navigationOptions: {
        ...AppHeader('business-place'),
      },
    },
    EditMenu: {
      screen: EditMenu,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Edit" />,
      },
    },
    BusinessAccountInfo: {
      screen: BusinessAccountInfo,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Account Info" />,
        headerRight: () => (
          <HeaderRight
            title="Edit"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    BusinessAccountAdmin: {
      screen: BusinessAccountAdmin,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Admin" />,
      },
    },
    BusinessAccountSubscriptions: {
      screen: BusinessAccountSubscriptions,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Subscriptions" />,
      },
    },
    EditBusinessAccountInfo: {
      screen: (props) => (
        <DocumentUploadStep6 {...props} mode="edit-business" />
      ),
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Edit Account Info" />,
      },
    },
    BusinessAmentitiesUpdate: {
      screen: BusinessAmentitiesUpdate,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="More Info" />,
        headerRight: () => (
          <HeaderRight
            title="Done"
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    BusinessLocationUpdate: {
      screen: LocationSetupStep4,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Location Setup" />,
        // headerRight: () => (
        //   <HeaderRight
        //     title="Done"
        //     onAction={() => navigation.setParams({runDone: true})}
        //   />
        // ),
      }),
    },
    BusinessHours: {
      screen: BusinessHours,
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Business Hours" />,
      },
    },
    BusinessLifestylesAndQongfuUpdate: {
      screen: BusinessLifestylesAndQongfuUpdate,
      navigationOptions: ({navigation}) => ({
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
    BusinessProfileInfoNav: {
      screen: BusinessProfileInfoNav,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    BusinessMediaGalleryNav: {
      screen: BusinessMediaGalleryNav,
      navigationOptions: {
        gestureEnabled: false,
        headerShown: false,
      },
    },
    // MediaGalleryPublicView: {
    //   screen: MediaGalleryPublicView,
    //   navigationOptions: {
    //     headerLeft: () => (
    //       <HeaderLeft onAction={() => NavigationService.goBack()} />
    //     ),
    //     headerTitle: () => <HeaderTitle title="Media Gallery" />,
    //   },
    // },
    BusinessRatings: {
      screen: BusinessRatings,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Ratings" />,
        headerRight: () => (
          <HeaderRight
            icon="tune"
            iconColor="#E5E3E3"
            iconSize={24}
            onAction={() => navigation.setParams({runDone: true})}
          />
        ),
      }),
    },
    BusinessRatingsAndReviews: {
      screen: BusinessRatingsAndReviews,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Ratings and Reviews" />,
        headerRight: () => (
          <HeaderRight
            icon="tune"
            iconSize={24}
            onAction={() => {
              navigation.setParams({runDone: true});
            }}
          />
        ),
      }),
    },
    BusinessDeactivate: {
      screen: (props) => (
        <DeactivateBusinessAccount {...props} accountType={2} />
      ),
      navigationOptions: {
        headerLeft: () => (
          <HeaderLeft onAction={() => NavigationService.goBack()} />
        ),
        headerTitle: () => <HeaderTitle title="Deactivate" />,
        gestureEnabled: false,
        headerStyle: {backgroundColor: '#fff'},
        headerTintColor: '#000',
      },
    },
  },
  {
    initialRouteName: 'PlaceProfile',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(BusinessPlaceProfileNav);
