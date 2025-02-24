import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HelperText} from 'react-native-paper';
import styles from '../../styles/dashboard.style';
import theme from '../../styles/theme.style';
import TextField from '../custom/textField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardBodyFatIcon32 from '../../assets/img/dashboard/dashboard-bodyfat-icon-32.svg';
import DashboardStepsIcon32 from '../../assets/img/dashboard/dashboard-steps-icon-32.svg';
import DashboardWaterIcon32 from '../../assets/img/dashboard/dashboard-water-icon-32.svg';
import DashboardWeightIcon32 from '../../assets/img/dashboard/dashboard-weight-icon-32.svg';
import DashboardWalkIcon32 from '../../assets/img/dashboard/dashboard-walk-run-icon-32.svg';

const StepsTarget = ({onAction, data, mode, userBiometrics}) => {
  const [stepsTarget, setStepsTarget] = useState(
    userBiometrics ? userBiometrics.target : null,
  );
  const [targetRangeError, setTargetRangeError] = useState(false);

  const handleSetTarget = value => {
    setStepsTarget(value);
  };

  const handleNext = () => {
    if (
      stepsTarget >= data.target_range_from &&
      stepsTarget <= data.target_range_to
    ) {
      const position = data.fast_track_position;
      let payload = {};
      if (mode === 'setupTrack') {
        payload = {
          data: [
            {
              type: data.name.toLowerCase(),
              value: 0,
              unit: data.unit,
              target: stepsTarget,
            },
          ],
        };
        onAction(position, payload);
      } else {
        payload = {
          data: [
            {
              id: userBiometrics.id,
              type: userBiometrics.type,
              value: userBiometrics.value,
              unit: userBiometrics.unit,
              target: stepsTarget,
            },
          ],
        };
        onAction(position, payload);
      }

      setTargetRangeError(false);
    } else {
      setTargetRangeError(true);
    }
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

      case 'body-fat':
        return <DashboardBodyFatIcon32 />;

      default:
        break;
    }
  };
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      {mode === 'setupTrack' ? (
        <View style={styles.targetHeader}>
          <Text style={styles.stepNumber}>{data.fast_track_position}/5</Text>
          <Text style={styles.targetText}>Set your targets</Text>
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.doneButtonLabel}>Next</Text>
            <Icon
              name="chevron-right"
              color={theme.PRIMARY_COLOR}
              size={26}
              style={{marginLeft: -4}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.targetHeader}>
          <View style={{width: 35}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {getIcon(data.icon, 32)}
            <Text style={styles.targetText}> {data.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleNext()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={styles.doneButtonLabel}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{width: 120, marginTop: 40}}>
        <TextField
          mode="outlined"
          name="firstName"
          value={stepsTarget}
          // placeholder="10"
          keyboardType="number-pad"
          onChangeText={value => handleSetTarget(value)}
          style={styles.targetTextField}
          theme={{
            roundness: 28,
            colors: {
              primary: theme.SECONDARY_COLOR,
              underlineColor: theme.SECONDARY_COLOR,
            },
          }}
          containerStyle={{
            elevation: 0,
            borderWidth: 1,
            borderColor: '#DEDEDE',
          }}
        />
      </View>
      <HelperText
        type="error"
        visible={targetRangeError}
        style={styles.errorText}>
        * Set your target range between {data.target_range_from} and{' '}
        {data.target_range_to}
      </HelperText>
      <View style={{marginTop: 50}}>
        <Text style={styles.heading}>
          {mode === 'setupTrack' ? data.target_title : 'Set your target'}
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <Text style={styles.description}>{data.target_description}</Text>
      </View>
    </View>
  );
};

export default StepsTarget;
