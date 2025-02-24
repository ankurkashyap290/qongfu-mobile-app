import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Surface, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import styles from '../../styles/dashboard.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import DashboardCurrentIcon from '../../assets/img/dashboard/dashboard-current-icon.svg';
import DashboardTargetIcon from '../../assets/img/dashboard/dashboard-target-icon.svg';
import DashboardBMIIcon64 from '../../assets/img/dashboard/dashboard-bmi-icon-64.svg';
import DashboardBodyFatIcon64 from '../../assets/img/dashboard/dashboard-bodyfat-icon-64.svg';
import DashboardStepsIcon64 from '../../assets/img/dashboard/dashboard-steps-icon-64.svg';
import DashboardWaterIcon64 from '../../assets/img/dashboard/dashboard-water-icon-64.svg';
import DashboardWeightIcon64 from '../../assets/img/dashboard/dashboard-weight-icon-64.svg';
import DashboardWalkIcon64 from '../../assets/img/dashboard/dashboard-walk-run-icon-64.svg';
import {calculateBMI} from '../../../utils';

const BiometricsManageView = ({configData, userBiometrics}) => {
  const getIcon = icon => {
    switch (icon) {
      case 'steps':
        return <DashboardStepsIcon64 />;

      case 'distance':
        return <DashboardWalkIcon64 />;

      case 'water':
        return <DashboardWaterIcon64 />;

      case 'weight':
        return <DashboardWeightIcon64 />;
      case 'bmi':
        return <DashboardBMIIcon64 />;

      case 'body-fat':
        return <DashboardBodyFatIcon64 />;

      default:
        break;
    }
  };

  const getFieldLabel = value => {
    if (value === 'Walk + Run') {
      return 'walkRun';
    } else if (value === 'Body_fat') {
      return 'bodyFat';
    } else {
      return value.toLowerCase();
    }
  };

  const renderDataCard = cardType => {
    return (
      <Card style={styles.targetCard}>
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              {cardType === 'Target' ? (
                <DashboardTargetIcon />
              ) : (
                <DashboardCurrentIcon />
              )}
              <Text style={styles.cardType}>{cardType}</Text>
            </View>
            <View
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              {configData.show_target ? (
                <Text
                  style={
                    cardType === 'Target'
                      ? styles.targetValue
                      : styles.currentValue
                  }>
                  {cardType === 'Target'
                    ? userBiometrics.data[getFieldLabel(configData.name)]
                      ? userBiometrics.data[getFieldLabel(configData.name)]
                          .target
                      : 0
                    : userBiometrics.data[getFieldLabel(configData.name)]
                    ? userBiometrics.data[getFieldLabel(configData.name)].value
                    : 0}{' '}
                </Text>
              ) : (
                <Text style={styles.currentValue}>
                  {calculateBMI(
                    userBiometrics.data.height,
                    userBiometrics.data.weight,
                  )}{' '}
                </Text>
              )}
              {configData.show_target ? (
                <Text
                  style={
                    cardType === 'Target'
                      ? styles.targetUnit
                      : styles.currentUnit
                  }>
                  {userBiometrics.data[getFieldLabel(configData.name)]
                    ? userBiometrics.data[getFieldLabel(configData.name)].unit
                    : ''}
                </Text>
              ) : (
                <Text style={styles.targetUnit}>kg/m2</Text>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderDescriptionCard = () => {
    return (
      <Card style={styles.descriptionCard}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {getIcon(configData.icon)}
            <View
              style={{
                marginLeft: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
                alignItems: 'center',
              }}>
              <Text style={styles.biometricsDescription}>
                {configData.target_description}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderSliderCard = () => {
    return (
      <Card style={styles.descriptionCard}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={configData.target_range_from}
              maximumValue={configData.target_range_to}
              minimumTrackTintColor="red"
              maximumTrackTintColor="#000000"
              value={Math.round(
                calculateBMI(
                  userBiometrics.data.height,
                  userBiometrics.data.weight,
                ),
              )}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };
  return (
    <View>
      {configData.show_target ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Surface style={styles.iconSurface}>
            <Icon name="left" size={16} style={{color: theme.PRIMARY_COLOR}} />
          </Surface>
          <Surface style={styles.daySurface}>
            <Text style={styles.targetText}>Today</Text>
          </Surface>
          <Surface style={styles.iconSurface}>
            <Icon name="right" size={16} style={{color: theme.PRIMARY_COLOR}} />
          </Surface>
        </View>
      ) : null}
      {configData.show_target ? (
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() =>
            NavigationService.navigate('FastTrackSetup', {
              mode: configData.name,
              userBiometrics:
                userBiometrics.data[getFieldLabel(configData.name)],
            })
          }>
          {renderDataCard('Target')}
        </TouchableOpacity>
      ) : (
        <View style={{marginTop: 20}}>{renderSliderCard()}</View>
      )}
      <View style={{marginTop: 20}}>{renderDataCard('Current')}</View>
      <View style={{marginTop: 20}}>{renderDescriptionCard()}</View>
    </View>
  );
};

export default BiometricsManageView;
