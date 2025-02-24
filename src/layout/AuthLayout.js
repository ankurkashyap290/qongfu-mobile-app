import React from 'react';
import {View, Text, Image} from 'react-native';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';
import Footer from '../components/auth/footer';
import styles from '../styles/auth.style';
import * as NavigationService from '../navigators/NavigationService';
import {getViewportHeight} from '../../utils/helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AuthLayout = props => {
  const {page} = props;
  const isSignIn = page === 'sign-in';

  const _handleNavigation = () => {
    if (isSignIn) {
      NavigationService.navigate('SignUp');
    } else {
      NavigationService.navigate('SignIn');
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View
        style={[styles.authContainer, {minHeight: getViewportHeight(false)}]}>
        <GlobalOverlayLoading loading={props.loading} textContent="" />
        <View style={styles.alignHeaderImage}>
          <Image
            source={require('../assets/img/Qongfu_Logo_and_Name_Color_updated.png')}
            style={styles.authHeaderImage}
          />
          <Text
            style={
              isSignIn ? styles.signInHeaderText : styles.signUpHeaderText
            }>
            {props.title}
          </Text>
        </View>
        {props.children}
        <Footer
          title={isSignIn ? 'or sign in with' : 'or sign up with'}
          footerBottom={
            <Text style={[styles.alreadyMember]}>
              {isSignIn
                ? "Don't have an account yet? "
                : 'Already have an account? '}
              <Text
                style={[styles.signInText]}
                onPress={() => _handleNavigation()}>
                {isSignIn ? 'Sign up!' : 'Sign in.'}
              </Text>
            </Text>
          }
          runMode={page}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AuthLayout;
