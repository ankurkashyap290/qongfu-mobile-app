import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/auth.style';
import FacebookSvg from '../../assets/img/facebook.svg';
import GoogleSvg from '../../assets/img/google.svg';
import InstagramSvg from '../../assets/img/instagram.svg';

const Footer = props => {
  const isSignIn = props.runMode === 'sign-in';
  return (
    <View style={styles.footerContainer}>
      <View
        style={[
          isSignIn ? styles.headingContainer : styles.signUpHeadingContainer,
        ]}>
        {/* <View style={styles.footerHeadingBorder} />
        <View>
          <Text style={styles.footerTitle}>{props.title}</Text>
        </View>
        <View style={styles.footerHeadingBorder} /> */}
      </View>
      {/* <View
        style={[
          isSignIn ? styles.socialContainer : styles.singUpSocialContainer,
        ]}>
        <FacebookSvg height={48} width={48} />
        <GoogleSvg height={48} width={48} />
        <InstagramSvg height={48} width={48} />
      </View> */}
      <View style={isSignIn ? styles.footerTextContainer : ''}>
        {props.footerBottom}
      </View>
    </View>
  );
};

export default Footer;
