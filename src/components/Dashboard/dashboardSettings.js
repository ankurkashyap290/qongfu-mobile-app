import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Surface, Card, Button, Switch} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/dashboardSettings.style';
import {
  updateBiometricsSettings,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import DashboardBMIIcon32 from '../../assets/img/dashboard/dashboard-bmi-icon-32.svg';
import DashboardBodyFatIcon32 from '../../assets/img/dashboard/dashboard-bodyfat-icon-32.svg';
import DashboardStepsIcon32 from '../../assets/img/dashboard/dashboard-steps-icon-32.svg';
import DashboardWaterIcon32 from '../../assets/img/dashboard/dashboard-water-icon-32.svg';
import DashboardWeightIcon32 from '../../assets/img/dashboard/dashboard-weight-icon-32.svg';
import DashboardWalkIcon32 from '../../assets/img/dashboard/dashboard-walk-run-icon-32.svg';
import {AutoDragSortableView} from 'react-native-drag-sort';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {getViewportHeight} from '../../../utils/helper';
import * as NavigationService from '../../navigators/NavigationService';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const parentWidth = screenWidth;
const childrenWidth = screenWidth - 10;
const childrenHeight = 60;
const marginChildrenTop = 16;
const marginChildrenBottom = 10;
const marginChildrenLeft = 0;
const marginChildrenRight = 7;

const DashboardSettings = ({
  globalConfig,
  biometricsSettings,
  updateBiometricsSettings,
  userDetailsUpdated,
  resetUserDetailsUpdatedFlag,
  loading,
}) => {
  const [dashboardConfig, setDashboardConfig] = useState(null);
  const [dashboardStatus, setDashboardStatus] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [hiddenBiometrics, setHiddenBiometrics] = useState([]);

  useEffect(() => {
    if (userDetailsUpdated) {
      resetUserDetailsUpdatedFlag('biometrics-settings');
      NavigationService.goBack();
    }
  }, [userDetailsUpdated]);

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
      const hiddenBiometrics = [];
      const newConfig = dashboardStatus.navigations.map(item => {
        let temp = {...item};
        biometricsSettings.map(settings => {
          if (settings.name === item.name) {
            temp = {...item, ...settings};
          }
          if (settings.visibility === false) {
            hiddenBiometrics.push(item.name);
          }
        });
        return temp;
      });
      const waterIndex = newConfig.findIndex(item => item.id === 3);
      const waterObj = newConfig.find(item => item.id === 3);
      if (waterIndex >= 0) {
        newConfig.splice(waterIndex, 1);
      }
      const sortedData = newConfig.sort((a, b) => a.position < b.position);
      setConfigData([waterObj, ...sortedData]);
      setHiddenBiometrics(hiddenBiometrics);
    }
  }, [dashboardStatus]);

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

  const handleSwitchChange = item => {
    const biometrics = [...hiddenBiometrics];
    if (biometrics.includes(item)) {
      const foundedIndex = biometrics.findIndex(elem => elem === item);
      if (foundedIndex >= 0) {
        biometrics.splice(foundedIndex, 1);
      }
      setHiddenBiometrics(biometrics);
    } else {
      setHiddenBiometrics([...biometrics, item]);
    }
  };

  const renderSettingsCard = item => {
    return (
      <Card style={[styles.settingsCard, {width: screenWidth - 32}]}>
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>{getIcon(item.icon)}</View>
            <Text style={styles.biometricName}>{item.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <Switch
                value={hiddenBiometrics.includes(item.name) ? false : true}
                color="#0065AB"
                onValueChange={() => handleSwitchChange(item.name)}
                style={{marginRight: 10}}
              />
              <Icon name="dots-vertical" size={33} color="#b5b5b5" />
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const handleUpdateSettings = () => {
    const payload = configData.map((item, index) => {
      const data = {
        id: item.id,
        name: item.name,
        position: item.id === 3 ? 3 : index + 1,
        visibility: hiddenBiometrics.includes(item.name) ? false : true,
      };
      return data;
    });
    updateBiometricsSettings(payload);
  };

  return (
    <View>
      <View
        style={{
          minHeight: getViewportHeight(true) - 50,
          backgroundColor: '#f8fcff',
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 16,
        }}>
        <GlobalOverlayLoading loading={loading} textContent="" />
        {configData ? (
          configData.length > 0 && (
            <ScrollView scrollEnabled={scrollEnabled} style={{flex: 1}}>
              <View style={{flex: 1}}>
                <View>
                  <AutoDragSortableView
                    // isDragFreely={true}
                    dataSource={configData}
                    parentWidth={parentWidth}
                    childrenWidth={childrenWidth}
                    childrenHeight={childrenHeight}
                    marginChildrenTop={marginChildrenTop}
                    marginChildrenBottom={marginChildrenBottom}
                    marginChildrenLeft={marginChildrenLeft}
                    marginChildrenRight={marginChildrenRight}
                    fixedItems={[0]}
                    onDragStart={(startIndex, endIndex) => {
                      setScrollEnabled(false);
                    }}
                    onDragEnd={(startIndex, endIndex) => {
                      setScrollEnabled(true);
                    }}
                    onDataChange={data => {
                      setConfigData(data);
                    }}
                    keyExtractor={(item, index) => item.position} // FlatList作用一样，优化
                    renderItem={(item, index) => {
                      return renderSettingsCard(item, index);
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          )
        ) : (
          <GlobalOverlayLoading loading={true} textContent="" />
        )}
      </View>
      <Surface style={[styles.fakeSheetCt]}>
        <Button
          mode="contained"
          onPress={() => handleUpdateSettings()}
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel}
          // disabled={!acceptCondition}
          size="small">
          Update Dashboard Settings
        </Button>
      </Surface>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    globalConfig: state.app.globalConfig,
    profile: state.user.profile,
    token: state.user.token,
    biometricsSettings: state.user.biometricsSettings,
    loading: state.user.loading,
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-biometrics-settings'] ||
      null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateBiometricsSettings, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettings);
