import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles/welcome';
import WelcomeOne from '../components/welcome/welcomeOne';
import WelcomeSecond from '../components/welcome/welcomeSecond';
import WelcomeThree from '../components/welcome/welcomeThree';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import theme from '../styles/theme.style';
import {
  QONGFU_USER_TOKEN_KEY,
  QONGFU_USER_KEY,
  QONGFU_FCM_TOKEN_KEY,
} from '../../config';
import * as NavigationService from '../navigators/NavigationService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserDetails, setToken} from '../../redux/user/actions';
import {isUserLoggedIn} from '../../utils';

const WelcomeScreen = ({
  loading,
  isAppInitialized,
  getUserDetails,
  setToken,
}) => {
  const data = [1, 2, 3];
  const SLIDER_WIDTH = Dimensions.get('window').width - 60;
  const ITEM_WIDTH = SLIDER_WIDTH;
  const [activeSlide, setActiveSlide] = useState(0);
  const [authLoading, setAuthLoading] = useState('loading');

  useEffect(() => {
    if (isAppInitialized) {
      _fetchTokenAsync();
    }
  }, [isAppInitialized]);

  // Fetch the token from storage then navigate to our appropriate place
  const _fetchTokenAsync = async () => {
    const authToken = await AsyncStorage.getItem(QONGFU_USER_TOKEN_KEY);
    const profileString = await AsyncStorage.getItem(QONGFU_USER_KEY);
    if (authToken) {
      const profile = profileString ? JSON.parse(profileString) : null;
      //HYDRATE REDUX
      setToken(authToken, profile);
      // check whether user complete the signup process or not
      if (isUserLoggedIn(profile)) {
        NavigationService.navigate('AppMain');
      } else if (profile && !profile.contact_number_verified) {
        //if not logged in then reason is
        // mobile not verified then send to mobile verification step cause sign up process not yet completed
        NavigationService.navigate('ConfirmPhone');
      } else if (profile) {
        //else not logged in then reason is onboarding step1 not completed yet
        NavigationService.navigate('Step1');
      } else {
        setAuthLoading('welcome');
      }
    } else {
      setAuthLoading('welcome');
    }
  };

  const _renderItem = (item) => {
    if (item.item === 1) {
      return <WelcomeOne />;
    }
    if (item.item === 2) {
      return <WelcomeSecond />;
    }
    if (item.item === 3) {
      return <WelcomeThree />;
    }
  };

  const getPagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.sliderDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const handleGetStarted = () => {
    setAuthLoading('get-started');
  };

  const handleLogin = (route) => {
    NavigationService.navigate(route);
  };

  const renderWelcomeCarousal = () => {
    return (
      <View style={[styles.container]}>
        <View>
          <Carousel
            layout={'default'}
            data={data}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {getPagination()}
        </View>
        <View style={styles.welcomeFooter}>
          <Button
            mode="contained"
            style={[styles.getStartedBtn]}
            onPress={() => handleGetStarted()}
            labelStyle={styles.getStartedBtnLabel}>
            Get Started
          </Button>
          <Text style={[styles.alreadyMember]}>
            Already a member?{' '}
            <Text
              style={[styles.signInText]}
              onPress={() => handleLogin('SignIn')}>
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  const renderBackground = () => {
    return (
      <View style={[styles.bgWrapper]}>
        <Image
          source={require('../assets/img/Qongfu_Logo_and_Name_Color.png')}
        />
        <ActivityIndicator size="small" color={theme.PRIMARY_COLOR} />
      </View>
    );
  };

  const renderGetStarted = () => {
    return (
      <View style={[styles.authScreenContainer]}>
        <View style={styles.authImageContainer}>
          <Image
            style={styles.welcomeImg}
            source={require('../assets/img/QongfuLogo.png')}
          />
          <Image
            style={styles.qongfuImg}
            source={require('../assets/img/Qongfu.png')}
          />
        </View>
        <View style={[styles.welcomeOneHelpText]}>
          <Text style={{...styles.yourHelp, fontSize: 16}}>
            Make Health & Fitness a Lifestyle
          </Text>
        </View>
        <View style={styles.authSignUpBtnContainer}>
          <Button
            mode="contained"
            style={styles.authSingUpBtn}
            labelStyle={styles.authSignUpBtnLabel}
            onPress={() => handleLogin('SignUp')}>
            Create an Account
          </Button>
        </View>
        <View style={styles.authSignInBtnContainer}>
          <Button
            mode="text"
            labelStyle={styles.authSignInBtnLabel}
            onPress={() => handleLogin('SignIn')}>
            Sign in
          </Button>
        </View>
        <View style={styles.authTermContainer}>
          <Button mode="text" labelStyle={styles.authTermBtnLabel}>
            TERMS & CONDITIONS
          </Button>
        </View>
      </View>
    );
  };

  return authLoading === 'loading'
    ? renderBackground()
    : authLoading === 'get-started'
    ? renderGetStarted()
    : renderWelcomeCarousal();
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    profile: state.user.profile,
    token: state.user.token,
    isAppInitialized: state.app.isAppInitialized,
    fcmInit: state.app.fcmInit,
    fcmToken: state.app.fcmToken,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserDetails,
      setToken,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
