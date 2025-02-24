import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Dimensions, Image} from 'react-native';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../styles/locationSetup.style';
import theme from '../styles/theme.style';
import TextField from '../components/custom/textField';
import UserLocation from '../components/UserLocation';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../redux/user/actions';
import {getViewportHeight} from '../../utils/helper';
import {Map_Key, defaultCountry} from '../../config';
import * as NavigationService from '../navigators/NavigationService';
import PageLayout from '../layout/PageLayout';
import LifestyleAndQongfuUpdate from '../components/LifestyleAndQongfus/LifestyleAndQongfuUpdate';

const LifestylesAndQongfu = ({
  profile,
  navigation,
  userDetailsUpdated,
  qongfusUpdateError,
  qongfusUpdateLoading,
}) => {
  const runDone = navigation.getParam('runDone') || false;
  const buttonText = navigation.getParam('buttonText');
  const pageName = navigation.getParam('pageName');

  return (
    <View>
      <LifestyleAndQongfuUpdate
        selectedLifestylesData={profile.lifestyles}
        selectedQongfusData={profile.qongfus}
        runDone={runDone}
        buttonText={buttonText}
        pageName={pageName}
        error={qongfusUpdateError}
        updateStatus={userDetailsUpdated}
        loading={qongfusUpdateLoading}
      />
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-lifestyles-qongfus-update'
      ] || null,
    qongfusUpdateError:
      state.user.error['update-details-lifestyles-qongfus-update'] || null,
    qongfusUpdateLoading:
      state.user.userDetailsUpdated[
        'update-details-lifestyles-qongfus-update'
      ] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LifestylesAndQongfu);
