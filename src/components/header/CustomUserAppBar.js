import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {Appbar, Surface, Avatar, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

import styles from '../../styles/mainLayout.style';
import theme from '../../styles/theme.style';
import {toggleAccountDrawer} from '../../../redux/user/actions';
import {IMAGE_URL_PREFIX} from '../../../config';
import * as NavigationService from '../../navigators/NavigationService';
import EditIcon from '../../assets/img/edit-gray.svg';
import LocationPrimary from '../../assets/img/location-primary-color.svg';
import {getUserPlace} from '../../../redux/business/actions';
import NotificationIcon from '../../assets/img/dashboard-notifications-icon.svg';

const screenWidth = Math.round(Dimensions.get('window').width);
const CustomUserAppBar = ({
  profile,
  isAccountDrawerOpen,
  toggleAccountDrawer,
  navigation,
  selectedBusiness,
  pageName,
  businessPlace,
  getUserPlace,
  token,
}) => {
  const handleLogoClick = () => {
    if (!isAccountDrawerOpen) {
      toggleAccountDrawer(true);
    }
  };

  const getMainLogo = () => {
    if (selectedBusiness) {
      return selectedBusiness.place_logo_url
        ? `${IMAGE_URL_PREFIX}${selectedBusiness.place_logo_url}`
        : `https://via.placeholder.com/728.png?text=${selectedBusiness.place_name}`;
    } else {
      return profile.avatar_url
        ? `${IMAGE_URL_PREFIX}${profile.avatar_url}`
        : `https://via.placeholder.com/728.png?text=${profile.display_name}`;
    }
  };

  const renderPlaceName = () => {
    return businessPlace ? (
      <View
        style={[
          {
            flexDirection: 'row',
            width: screenWidth - 180,
          },
        ]}>
        <LocationPrimary style={styles.locationIcon} />
        <Text style={styles.topBarTitle} ellipsizeMode="tail" numberOfLines={1}>
          {businessPlace.place_name}
        </Text>
      </View>
    ) : null;
  };

  return (
    <View
      style={[
        {backgroundColor: '#fff'},
        {paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight()},
      ]}>
      <Appbar
        style={[
          styles.pageLayoutHeader,
          {
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            justifyContent:
              pageName === 'Home' ? 'space-between' : 'flex-start',
          },
        ]}>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <TouchableOpacity onPress={() => handleLogoClick()}>
            <Surface
              style={{
                elevation: 1,
                borderRadius: 30,
                borderColor: '#fff',
                borderWidth: 2,
                height: 40,
                width: 40,
              }}>
              <Avatar.Image size={36} source={{uri: getMainLogo()}} />
            </Surface>
          </TouchableOpacity>
        </View>
        {pageName === 'BusinessHome' ? (
          <View
            style={[
              {
                flexDirection: 'row',
                width: screenWidth - 80,
                marginRight: 10,
                justifyContent: 'space-between',
              },
            ]}>
            {renderPlaceName()}
            <TouchableOpacity
              onPress={() => {
                getUserPlace({
                  placeId: businessPlace.id,
                  token,
                  ratings_page: 1,
                  gallery_page: 1,
                });
                NavigationService.navigate('EditMenu');
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#474747'}}>Edit </Text>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </View>
        ) : pageName === 'Home' ? (
          <Text style={styles.topBarTitle}>Dashboard</Text>
        ) : null}
        {pageName === 'Home' ? (
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => {
              getUserPlace({
                placeId: businessPlace.id,
                token,
                ratings_page: 1,
                gallery_page: 1,
              });
              NavigationService.navigate('EditMenu');
            }}>
            <NotificationIcon />
            <Badge style={styles.notificationBadge} size={15}>
              <Text style={styles.badgeText}>2+</Text>
            </Badge>
          </TouchableOpacity>
        ) : null}
      </Appbar>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    isAccountDrawerOpen: state.user.isAccountDrawerOpen,
    selectedBusiness: state.business.selectedBusiness,
    businessPlace: state.business.place,
    token: state.user.token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleAccountDrawer,
      getUserPlace,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomUserAppBar);
