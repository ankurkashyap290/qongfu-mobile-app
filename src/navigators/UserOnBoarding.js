import React from 'react';
import {View, Text, Platform} from 'react-native';
import {Button, Surface, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUpSuccess from '../components/userOnBoarding/SignupSuccess';
import BasicInfo from '../components/userOnBoarding/BasicInfoStyle2';
import AvatarUpload from '../components/userOnBoarding/AvatarUploadStyle2';
import * as NavigationService from './NavigationService';
import UserOnBoardingSuccess from '../components/userOnBoarding/UserOnboardingSuccess';
import theme from '../styles/theme.style';
// import LifestyleAndQongfuUpdate from '../components/LifestyleAndQongfus/LifestyleAndQongfuUpdate';
import LifestylesAndQongfu from '../pages/LifestylesAndQongfu';
import FitnessInfo from '../components/userOnBoarding/FitnessInfo';
import HeaderLeft from '../components/header/HeaderLeft';

const HeaderSteps = ({currentStep}) => {
  const getFillColor = step => {
    return currentStep === step ? theme.PRIMARY_COLOR : '#CACACA';
  };
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        // backgroundColor: 'red',
      }}>
      <Surface
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: getFillColor(1),
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          elevation: 0,
        }}>
        <Text style={{color: getFillColor(1)}}>{1}</Text>
      </Surface>
      <Divider style={{width: 20}} />
      <Surface
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: getFillColor(2),
          justifyContent: 'center',
          width: 24,
          height: 24,
          alignItems: 'center',
          elevation: 0,
        }}>
        <Text style={{color: getFillColor(2)}}>{2}</Text>
      </Surface>
      <Divider style={{width: 20}} />
      <Surface
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: getFillColor(3),
          justifyContent: 'center',
          width: 24,
          height: 24,
          alignItems: 'center',
          elevation: 0,
        }}>
        <Text style={{color: getFillColor(3)}}>{3}</Text>
      </Surface>
      <Divider style={{width: 20}} />
      <Surface
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: getFillColor(4),
          justifyContent: 'center',
          width: 24,
          height: 24,
          alignItems: 'center',
          elevation: 0,
        }}>
        <Text style={{color: getFillColor(4)}}>{4}</Text>
      </Surface>
    </View>
  );
};

// const HeaderLeft = ({title}) => {
//   return (
//     <View>
//       <Button
//         mode="text"
//         compact={true}
//         uppercase={false}
//         icon="chevron-left"
//         onPress={() => NavigationService.goBack()}>
//         {title}
//       </Button>
//     </View>
//   );
// };

const HeaderRight = ({title, onAction}) => {
  return (
    <View style={{marginRight: 5}}>
      <Button
        mode="text"
        compact={true}
        uppercase={false}
        labelStyle={{
          color: theme.PRIMARY_COLOR,
          fontSize: 16,
          lineHeight: 40,
          fontFamily: 'Roboto',
        }}
        onPress={() => onAction()}>
        {title}
      </Button>
    </View>
  );
};

const getAndroidTitleStyle = () => {
  const titleStyle =
    Platform.OS === 'android'
      ? {
          headerTitleContainerStyle: {
            left: 120,
          },
        }
      : {};
  return titleStyle;
};

const UserOnBoarding = createStackNavigator(
  {
    SignUpSuccess: {
      screen: SignUpSuccess,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    Step1: {
      screen: BasicInfo,
      navigationOptions: {
        title: 'Info',
        ...getAndroidTitleStyle(),
        headerLeft: null,
        headerTitle: <HeaderSteps currentStep={1} />,
        headerRight: null,
        gestureEnabled: true,
      },
    },
    Step2: {
      screen: FitnessInfo,
      navigationOptions: {
        title: 'Fitness',
        headerStyle: {
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        ...getAndroidTitleStyle(),
        headerLeft: <HeaderLeft />,
        headerTitle: <HeaderSteps currentStep={2} />,

        gestureEnabled: false,
      },
    },
    Step3: {
      screen: AvatarUpload,
      navigationOptions: {
        title: 'Avatar',
        headerStyle: {
          flex: 1,
          // backgroundColor: 'blue',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        ...getAndroidTitleStyle(),
        headerLeft: <HeaderLeft />,
        headerTitle: <HeaderSteps currentStep={3} />,
        headerRight: (
          <HeaderRight
            title="Skip"
            onAction={() => {
              NavigationService.navigate('Step4', {
                buttonText: 'Complete Signup',
                pageName: 'onboarding',
              });
            }}
          />
        ),
        gestureEnabled: false,
      },
    },
    Step4: {
      screen: LifestylesAndQongfu,
      navigationOptions: {
        ...getAndroidTitleStyle(),
        headerLeft: <HeaderLeft />,
        headerTitle: <HeaderSteps currentStep={4} />,

        gestureEnabled: false,
      },
    },
    UserOnBoardingSuccess: {
      screen: UserOnBoardingSuccess,
      navigationOptions: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'SignUpSuccess',
    headerMode: 'screen',
    navigationOptions: {
      headerShown: false,
      cardStyle: {backgroundColor: '#ffffff'},
    },
  },
);

export default createAppContainer(UserOnBoarding);
