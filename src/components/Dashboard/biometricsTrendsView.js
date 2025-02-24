import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Surface, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import moment from 'moment';

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

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryLabel,
  VictoryPie,
  VictoryAxis,
} from 'victory-native';
import Svg from 'react-native-svg';
import DayChart from './dayChart';
import WeekChart from './weekChart';
import MonthChart from './monthChart';
import YearChart from './yearChart';
const screenWidth = Math.round(Dimensions.get('window').width);
const data = [
  {hour: '6', biometricValue: 300},
  {hour: '7', biometricValue: 400},
  {hour: '8', biometricValue: 100},
  {hour: '9', biometricValue: 40},
  {hour: '10', biometricValue: 40},
  {hour: '11', biometricValue: 120},
  // {hour: '12', biometricValue: 230},
  // {hour: '13', biometricValue: 440},
  // {hour: '14', biometricValue: 500},
  // {hour: '15', biometricValue: 430},
  // {hour: '16', biometricValue: 280},
  // {hour: '17', biometricValue: 390},
  // {hour: '18', biometricValue: 20},
  // {hour: '19', biometricValue: 0},
  // {hour: '20', biometricValue: 10},
  // {hour: '21', biometricValue: 400},
  // {hour: '22', biometricValue: 430},
  // {hour: '23', biometricValue: 300},
  // {hour: '00', biometricValue: 100},
];

const BiometricsTrendsView = ({configData, userBiometrics}) => {
  const [displayMode, setDisplayMode] = useState('day');

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

  const renderCharts = () => {
    switch (displayMode) {
      case 'day':
        return <DayChart configData={configData} />;
      case 'week':
        return <WeekChart configData={configData} />;
      case 'month':
        return <MonthChart configData={configData} />;
      case 'year':
        return <YearChart configData={configData} />;
      default:
        break;
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() => setDisplayMode('day')}>
          <Text style={styles.targetText}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDisplayMode('week')}>
          <Text style={styles.targetText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDisplayMode('month')}>
          <Text style={styles.targetText}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDisplayMode('year')}>
          <Text style={styles.targetText}>Year</Text>
        </TouchableOpacity>
      </View>

      {renderCharts()}
      {/* {displayMode === 'day' ? <DayChart configData={configData} /> : displayMode==='week'?<WeekChart/>} */}
      {/* <View style={{marginTop: 20}}>{renderTodayDataCard()}</View>
      <View style={{marginTop: 20}}>{renderChart()}</View> */}
    </View>
  );
};

export default BiometricsTrendsView;
