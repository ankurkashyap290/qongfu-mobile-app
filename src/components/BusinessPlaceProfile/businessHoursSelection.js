import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Card, Button, Checkbox, TextInput} from 'react-native-paper';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import {TouchableOpacity} from 'react-native';
import SettingsIcon from '../../assets/img/business_hrs_settings.svg';
import AddCircleIcon from '../../assets/img/add_circle.svg';
import PageLayout from '../../layout/PageLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LabelField from '../custom/LabelField';
import TextField from '../custom/textField';

const BusinessHoursSelection = props => {
  const {day} = props;
  const [checkboxVisibility, setCheckboxVisibility] = useState([]);
  const [addSchedule, setAddSchedule] = useState([
    {
      day: 'Sunday',
      startTime: '8:00 Am',
      endTime: '10:00 Pm',
    },
  ]);

  const handleCheckbox = value => {
    let newCheckboxVisibility = [...checkboxVisibility];

    if (checkboxVisibility.includes(value)) {
      newCheckboxVisibility.splice(newCheckboxVisibility.indexOf(value), 1);
    } else {
      newCheckboxVisibility.push(value);
    }
    setCheckboxVisibility(newCheckboxVisibility);
  };

  const addAnotherSchedule = value => {
    setAddSchedule([
      ...addSchedule,
      {
        day: `${value}2`,
        startTime: '8:00 Am',
        endTime: '10:00 Pm',
      },
    ]);
  };

  const getDayValue = () => {
    const tempSchedule = [...addSchedule];
    const foundIndex = tempSchedule.findIndex(item => item.day === 'Sunday2');
    if (foundIndex < 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleDeleteSchedule = value => {
    let newAddSchedule = [...addSchedule];
    const day = newAddSchedule.map(item => item.day);

    if (day.includes(`${value}2`)) {
      newAddSchedule.splice(newAddSchedule.indexOf(day), 1);
    }

    setAddSchedule([...newAddSchedule]);
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {/* <Checkbox.Android
          status={
            checkboxVisibility.includes('Sunday') ? 'checked' : 'unchecked'
          }
          color="#54B948"
          uncheckedColor="#707070"
          onPress={() => handleCheckbox('Sunday')}
        /> */}
        <Text style={styles.dayName}>{day}</Text>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={{width: 80}}>
              <TextField
                editable={false}
                theme={{
                  roundness: 25,
                }}
                value="00:00 Am"
                // onPress={handleDobModalOpen}
              />
            </View>
            <View style={{width: 80}}>
              <TextField
                editable={false}
                theme={{
                  roundness: 25,
                }}
                value="00:00 Pm"

                // onPress={handleDobModalOpen}
              />
            </View>
          </View>
          <View style={{marginTop: 5, marginBottom: 10}}>
            {getDayValue() ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 80}}>
                  <TextField
                    editable={false}
                    theme={{
                      roundness: 25,
                    }}
                    value="00:00 Am"
                    // onPress={handleDobModalOpen}
                  />
                </View>
                <View style={{width: 80}}>
                  <TextField
                    editable={false}
                    theme={{
                      roundness: 25,
                    }}
                    value="00:00 Pm"

                    // onPress={handleDobModalOpen}
                  />
                </View>
              </View>
            ) : (
              <Button
                mode="text"
                onPress={() => addAnotherSchedule('Sunday')}
                disabled={checkboxVisibility.includes('Sunday')}
                labelStyle={
                  checkboxVisibility.includes('Sunday')
                    ? styles.addScheduleButtonDisableLabel
                    : styles.addScheduleButtonLabel
                }>
                + Add another Schedule
              </Button>
            )}
          </View>
        </View>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: '#dedede',
            height: 50,
            marginRight: 10,
            marginLeft: 10,
          }}
        />
        <View style={{flexDirection: 'column'}}>
          <Checkbox.Android
            status={
              checkboxVisibility.includes('Sunday') ? 'checked' : 'unchecked'
            }
            color="#54B948"
            uncheckedColor="#707070"
            onPress={() => handleCheckbox('Sunday')}
          />
          <Text
            style={
              checkboxVisibility.includes('Sunday')
                ? styles.closedRedText
                : styles.closedText
            }>
            Closed
          </Text>
          {getDayValue() ? (
            <View style={{alignItems: 'center'}}>
              <Icon
                name="delete"
                onPress={() => handleDeleteSchedule('Sunday')}
                size={20}
                color="#b5b5b5"
                style={{marginTop: 5}}
              />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default BusinessHoursSelection;
