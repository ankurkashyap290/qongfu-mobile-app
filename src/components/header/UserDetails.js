import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {Avatar, Surface} from 'react-native-paper';
import styles from '../../styles/customDrawer.style';
import Authenticate from '../../assets/img/authenticatedWhiteBorder.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NavigationService from '../../navigators/NavigationService';
import {IMAGE_URL_PREFIX} from '../../../config';
import {isUserLoggedIn} from '../../../utils';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

const UserDetails = ({profile}) => {
  const getProfileLoc = () => {
    const loc = [];

    if (isUserLoggedIn(profile) && profile.city) {
      loc.push(profile.city);
    }

    if (isUserLoggedIn(profile) && profile.country) {
      loc.push(profile.country.country);
    }

    return loc.length ? loc.join(', ') : '';
  };

  return (
    <Surface style={[{elevation: 2}, styles.sideDrawerContain]}>
      <View
        style={[
          styles.sideDrawerHead,
          {
            paddingTop:
              Platform.OS === 'android' ? 10 : getStatusBarHeight() + 17,
          },
        ]}>
        <View>
          <Surface
            style={[
              {
                elevation: 1,
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 2,
              },
              styles.sideDrawerAvatarContain,
            ]}>
            {/* <View style={}> */}
            <Avatar.Image
              size={64}
              source={
                isUserLoggedIn(profile) && profile.avatar_url
                  ? {uri: `${IMAGE_URL_PREFIX}${profile.avatar_url}`}
                  : require('../../assets/img/Profile_avatar_placeholder_large.png')
              }
              style={{
                backgroundColor: '#f1f1f1',
              }}
            />

            <View style={styles.shieldIcon}>
              {isUserLoggedIn(profile) &&
              (profile.email_verified || profile.contact_number_verified) ? (
                <Authenticate />
              ) : null}
            </View>
            {/* </View> */}
          </Surface>
        </View>
        <View>
          <Text style={styles.userName} numberOfLines={1}>
            {isUserLoggedIn(profile) ? `${profile.display_name}` : ''}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {getProfileLoc()}
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('ViewProfile')}>
            <Text style={styles.viewProfileBtnLabel}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    userLoading: state.user.loading,
    profile: state.user.profile,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
