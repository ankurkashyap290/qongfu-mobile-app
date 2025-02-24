import React, {useState, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/dashboard.style';
import * as NavigationService from '../../navigators/NavigationService';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
import {
  createUserBioMetrics,
  updateUserBioMetrics,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import HypeScreen from './hypeScreen';
import TargetStep from './targetStep';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const screenHeight = Math.round(Dimensions.get('window').height);

const FastTrackSetup = ({
  globalConfig,
  createUserBioMetrics,
  updateUserBioMetrics,
  navigation,
  profile,
  token,
  userDetailsUpdated,
  resetUserDetailsUpdatedFlag,
  loading,
}) => {
  const mode = navigation.getParam('mode');
  const userBiometrics = navigation.getParam('userBiometrics');

  const [navStep, setNavStep] = useState(mode ? mode : 'Hype');
  const [dashboardConfig, setDashboardConfig] = useState(null);
  const [dashboardStatus, setDashboardStatus] = useState(null);
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
    if (userDetailsUpdated) {
      if (mode) {
        NavigationService.goBack();
      }
      resetUserDetailsUpdatedFlag('biometrics');
    }
  }, [userDetailsUpdated]);

  const getStepData = step => {
    return getFilteredData().find(item => item.name === step);
  };

  const getFilteredData = () => {
    return dashboardStatus.navigations.filter(
      item => item.show_target !== false && item.fast_track_position !== null,
    );
  };

  const handleNextStep = (position, payload) => {
    const record = getFilteredData().find(
      item => item.fast_track_position === position,
    );
    let data = {};
    if (record.name === 'Steps') {
      data = {steps: {...payload}};
    } else if (record.name === 'Walk + Run') {
      data = {'walk+run': {...payload}};
    } else if (record.name === 'Water') {
      data = {water: {...payload}};
    } else if (record.name === 'Weight') {
      data = {weight: {...payload}};
    } else if (record.name === 'Body Fat') {
      data = {body_fat: {...payload}};
    }
    if (!mode) {
      createUserBioMetrics(
        {
          ...data,
        },

        token,
        'fastTrackSetup',
      );
      const found = getFilteredData().find(
        item => item.fast_track_position === position + 1,
      );

      if (found) {
        setNavStep(found.name);
      } else {
        setNavStep('Success');
      }
    } else {
      updateUserBioMetrics(
        {
          ...data,
        },
        token,
        'fastTrackSetup',
      );
    }
  };

  const handleSubmit = payload => {
    updateUserBioMetrics(
      {
        ...payload,
      },
      token,
    );
  };

  return dashboardStatus ? (
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
      <GlobalOverlayLoading loading={loading} textContent="" />
      {navStep === 'Hype' ? (
        <HypeScreen
          heading={`Welcome ${profile.first_name}!`}
          subHeading="Let's get your dashboard setup!"
          description="We'll need you to setup your targets."
          buttonText="Get Started"
          onAction={setNavStep}
          onCancel={() => NavigationService.navigate('UserHome')}
          pageName="start"
        />
      ) : navStep === 'Success' ? (
        <HypeScreen
          heading="Perfect!"
          subHeading={`"The journey of a thousand miles begins with a single step"`}
          description="First step done!"
          buttonText="DONE"
          onAction={() =>
            NavigationService.navigate('UserHome', {showSettings: true})
          }
          pageName="last"
        />
      ) : (
        <TargetStep
          data={getStepData(navStep)}
          onAction={handleNextStep}
          mode={mode ? mode : 'setupTrack'}
          userBiometrics={userBiometrics}
        />
      )}
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
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-biometrics'] || null,
    loading: state.user.loading || false,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserBioMetrics, createUserBioMetrics, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FastTrackSetup);
