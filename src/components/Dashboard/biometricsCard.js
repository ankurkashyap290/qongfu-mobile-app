import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/dashboard.style';
import DashboardBMIIcon32 from '../../assets/img/dashboard/dashboard-bmi-icon-32.svg';
import DashboardBodyFatIcon32 from '../../assets/img/dashboard/dashboard-bodyfat-icon-32.svg';
import DashboardStepsIcon32 from '../../assets/img/dashboard/dashboard-steps-icon-32.svg';
import DashboardWaterIcon32 from '../../assets/img/dashboard/dashboard-water-icon-32.svg';
import DashboardWeightIcon32 from '../../assets/img/dashboard/dashboard-weight-icon-32.svg';
import DashboardWalkIcon32 from '../../assets/img/dashboard/dashboard-walk-run-icon-32.svg';
import DashboardWaterIcon from '../../assets/img/dashboard-water-icon.svg';
import DashboardMinusIcon from '../../assets/img/dashboard-water-minus-icon.svg';
import DashboardPlusIcon from '../../assets/img/dashboard-water-plus-icon.svg';
import * as NavigationService from '../../navigators/NavigationService';
import {getUserBioMetrics} from '../../../redux/user/actions';

const BiometricsCard = ({
  getUserBioMetrics,
  userBiometrics,
  token,
  globalConfig,
  biometricsSettings,
}) => {
  const [type, setType] = useState(null);
  const [dashboardConfig, setDashboardConfig] = useState(null);
  const [dashboardStatus, setDashboardStatus] = useState(null);
  const [configData, setConfigData] = useState(null);

  useEffect(() => {
    if (userBiometrics) {
      NavigationService.navigate('BiometricsDetail', {type: type});
    }
  }, [userBiometrics]);

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
    if (dashboardStatus) {
      const newConfig = dashboardStatus.navigations.map(item => {
        let temp = {...item};
        biometricsSettings.map(settings => {
          if (settings.id === item.id) {
            temp = {...item, ...JSON.parse(JSON.stringify(settings))};
          }
        });

        return temp;
      });
      setConfigData(newConfig);
    }
  }, [dashboardStatus]);

  const handleBiometricsIcon = value => {
    setType(value);
    getUserBioMetrics({}, token);
  };

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

  const renderBiometricsTopRow = data => {
    return (
      <TouchableOpacity onPress={() => handleBiometricsIcon(data.name)}>
        <View style={styles.metricsContainer}>
          {getIcon(data.icon)}
          <Text style={styles.metricsValue}>8000</Text>
          <Text style={styles.metricsLabel}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderBiometricsSecondRow = data => {
    return (
      <TouchableOpacity onPress={() => handleBiometricsIcon(data.name)}>
        <View style={styles.metricsContainer}>
          {getIcon(data.icon)}
          <Text style={styles.metricsValue}>3.452 km</Text>
          <Text style={styles.metricsLabel}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Card style={styles.metricsCard}>
      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {configData && configData.length > 0
            ? configData.map(
                data => data.position < 3 && renderBiometricsTopRow(data),
              )
            : null}
          <TouchableOpacity onPress={() => handleBiometricsIcon('Water')}>
            <View style={styles.metricsContainer}>
              <Surface style={styles.waterContainer}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text style={styles.glassCount}>0/6</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 15,
                    justifyContent: 'space-between',
                  }}>
                  <DashboardMinusIcon />
                  <DashboardWaterIcon />
                  <DashboardPlusIcon />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text style={styles.water}>Water</Text>
                </View>
              </Surface>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',

            marginTop: 35,
          }}>
          {configData && configData.length > 0
            ? configData.map(
                data => data.position > 3 && renderBiometricsSecondRow(data),
              )
            : null}
        </View>
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    userBiometrics: state.user.userBiometrics,
    globalConfig: state.app.globalConfig,
    biometricsSettings: state.user.biometricsSettings,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserBioMetrics,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BiometricsCard);
