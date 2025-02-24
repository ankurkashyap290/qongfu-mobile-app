import React from 'react';
import {View, Text} from 'react-native';
import {List, Divider} from 'react-native-paper';
import styles from '../../styles/placeDetails.style';
import theme from '../../styles/theme.style';
import {Week_Day} from '../../../config';
import {getTimeToAmPmFormat} from '../../../utils';

const WeeklySchedule = (props) => {
  const {data, openToday, dayNumber} = props;

  const renderWeekDay = (day, index) => {
    const item = data.find((val) => val.weekday === day);
    if (!item) return null;
    return (
      <View
        key={`${item.weekday}-${index}`}
        style={[styles.weekScheduleListContain]}>
        <List.Item
          title={item.weekday}
          right={() => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {dayNumber === item.day ? (
                !openToday ? (
                  <View style={styles.closeDayStyle2}>
                    <Text style={styles.closeDayTextStyle2}>Closed</Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: theme.FONT_WEIGHT_MEDIUM,
                      color: '#474747',
                    }}>{`${getTimeToAmPmFormat(
                    item.start,
                  )} - ${getTimeToAmPmFormat(item.close)}`}</Text>
                )
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    color: '#858585',
                    fontFamily: 'Roboto',
                    fontWeight: theme.FONT_WEIGHT_LIGHT,
                  }}>{`${getTimeToAmPmFormat(
                  item.start,
                )} - ${getTimeToAmPmFormat(item.close)}`}</Text>
              )}
            </View>
          )}
          titleStyle={{fontSize: 16, color: '#4F4F4F', fontFamily: 'Roboto'}}
          style={[
            {padding: 3},
            dayNumber === item.day ? styles.weekScheduleListContainActive : {},
          ]}
        />
        {Week_Day.length - 1 !== index ? <Divider /> : null}
      </View>
    );
  };
  return (
    <View style={{marginBottom: 16, marginTop: 16}}>
      {Week_Day.map((item, index) => {
        return renderWeekDay(item, index);
      })}
    </View>
  );
};

export default WeeklySchedule;
