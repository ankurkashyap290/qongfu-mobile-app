import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Surface, Card, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import styles from '../../styles/dashboard.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {
  createUserBioMetrics,
  updateUserBioMetrics,
  resetUserDetailsUpdatedFlag,
  getUserBioMetrics,
} from '../../../redux/user/actions';
import DashboardBMIIcon32 from '../../assets/img/dashboard/dashboard-bmi-icon-32.svg';
import DashboardBodyFatIcon32 from '../../assets/img/dashboard/dashboard-bodyfat-icon-32.svg';
import DashboardStepsIcon32 from '../../assets/img/dashboard/dashboard-steps-icon-32.svg';
import DashboardWaterIcon32 from '../../assets/img/dashboard/dashboard-water-icon-32.svg';
import DashboardWeightIcon32 from '../../assets/img/dashboard/dashboard-weight-icon-32.svg';
import DashboardWalkIcon32 from '../../assets/img/dashboard/dashboard-walk-run-icon-32.svg';
import BiometricsManageView from './biometricsManageView';
import BiometricsTrendsView from './biometricsTrendsView';

import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const BiometricsDetail = ({
  globalConfig,
  createUserBioMetrics,
  updateUserBioMetrics,
  navigation,
  profile,
  token,
  getUserBioMetrics,
  userBiometrics,
}) => {
  const [dashboardConfig, setDashboardConfig] = useState(null);
  const [dashboardStatus, setDashboardStatus] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [viewMode, setViewMode] = useState('manage');

  const type = navigation.getParam('type');

  useEffect(() => {
    if (globalConfig) {
      setDashboardConfig(
        globalConfig.data.find(item => item.name === 'dashboard-config'),
      );
    } else {
      setDashboardConfig(null);
    }
  }, [globalConfig]);

  useEffect(() => {
    if (dashboardConfig) {
      let formConfig = null;
      try {
        const tmpData = JSON.parse(dashboardConfig.configuration);
        formConfig = tmpData.data.find(item => item.type === 'dashboard-main');
        formConfig = formConfig['form-configuration'][0];
      } catch (ex) {
        console.log('Error while parsing configuration');
      }
      setDashboardStatus(formConfig);
    } else {
      setDashboardStatus(null);
    }
  }, [dashboardConfig]);

  useEffect(() => {
    if (type && dashboardStatus) {
      setConfigData(
        dashboardStatus.navigations.find(item => item.name === type),
      );
    }
  }, [type, dashboardStatus]);

  const getIcon = icon => {
    switch (icon) {
      case 'steps':
        return <DashboardStepsIcon32 />;

      case 'distance':
        return <DashboardWalkIcon32 />;

      case 'water':
        return <DashboardWaterIcon32 />;

      case 'weight':
        return <DashboardWeightIcon32 />;

      case 'bmi':
        return <DashboardBMIIcon32 />;

      case 'body-fat':
        return <DashboardBodyFatIcon32 />;

      default:
        break;
    }
  };

  return configData ? (
    <View
      style={[
        styles.fakeSheetCt,
        {height: screenHeight - 108},
        {
          ...ifIphoneX(
            {
              marginBottom: getBottomSpace(),
            },
            {
              marginBottom: 0,
            },
          ),
        },
      ]}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.targetHeader}>
          <View style={{width: 35}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {getIcon(configData.icon)}
            <Text style={styles.targetText}>
              {' '}
              {configData.name === 'Body Fat'
                ? `${configData.name} %`
                : configData.name === 'BMI'
                ? 'Body Mass Index (BMI)'
                : configData.name}
            </Text>
          </View>
          <TouchableOpacity
            // onPress={() => handleNext()}
            style={{marginRight: 10}}>
            <Icon name="setting" size={21} style={{color: '#858585'}} />
          </TouchableOpacity>
        </View>
      </View>
      {viewMode === 'manage' ? (
        <BiometricsManageView
          configData={configData}
          userBiometrics={userBiometrics}
        />
      ) : (
        <BiometricsTrendsView
          configData={configData}
          userBiometrics={userBiometrics}
        />
      )}

      <View
        style={[
          styles.fakeSheetButtons,
          {width: screenWidth},
          {
            ...ifIphoneX(
              {
                marginBottom: getBottomSpace(),
              },
              {
                marginBottom: 0,
              },
            ),
          },
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            mode={viewMode === 'manage' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('manage')}
            style={
              viewMode === 'manage' ? styles.manageButton : styles.trendsButton
            }
            labelStyle={styles.manageButtonLabel}>
            Manage
          </Button>
          <Button
            mode={viewMode === 'trends' ? 'contained' : 'outlined'}
            onPress={() => setViewMode('trends')}
            style={
              viewMode === 'trends' ? styles.manageButton : styles.trendsButton
            }
            labelStyle={styles.manageButtonLabel}>
            Trends
          </Button>
        </View>
      </View>
    </View>
  ) : (
    <GlobalOverlayLoading loading={true} textContent="" />
  );
};

const mapStateToProps = state => {
  return {
    globalConfig: state.app.globalConfig,
    profile: state.user.profile,
    token: state.user.token,
    userBiometrics: state.user.userBiometrics,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserBioMetrics, createUserBioMetrics, getUserBioMetrics},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BiometricsDetail);
