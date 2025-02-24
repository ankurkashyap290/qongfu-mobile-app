import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ShieldIcon from '../../assets/img/authenticated_seal_20x20.svg';
import ClockIcon from '../../assets/img/schedule_20x20.svg';
import LocationIcon from '../../assets/img/location_20x20.svg';
import {get24HoursTimeFormat} from '../../../utils';
import WeeklySchedule from '../PlaceDetails/weeklySchedule';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/placeInfo.style';
import * as NavigationService from '../../navigators/NavigationService';

const PlaceInfo = ({isAdmin, place}) => {
  const [scheduleOpened, toggleScheduleDialog] = useState(false);

  const renderFilledTimings = () => {
    return (
      <View style={styles.placeCardDesc}>
        <ClockIcon style={{marginLeft: 7}} />
        <View
          style={[
            place.open_now
              ? styles.placeOpenContainerStyle2
              : styles.placeClosedContainerStyle2,
            {marginLeft: 13},
          ]}>
          <Text style={styles.placeOpenStyle2}>
            {place.open_now ? 'OPEN' : 'CLOSED'}
          </Text>
        </View>
        <Text style={[styles.placeOpenTimeStyle2, styles.textLabelMargin]}>
          {place.open_now
            ? ` ${get24HoursTimeFormat(place.start)} - ${get24HoursTimeFormat(
                place.close,
              )}`
            : ' Today'}
        </Text>
        <MCIcon
          name="chevron-down"
          size={26}
          onPress={() => {
            toggleScheduleDialog(true);
          }}
        />
      </View>
    );
  };

  const renderEmptyTimings = () => {
    return (
      <View style={styles.placeCardDesc}>
        <ClockIcon style={{marginLeft: 7}} />
        <View style={styles.placeHrsContainer}>
          <TouchableOpacity
            onPress={() =>
              NavigationService.navigate('BusinessHours', {place: {...place}})
            }>
            <Text style={styles.placeHrs}>ADD</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.placeOpenTime}>Business Hrs</Text>
      </View>
    );
  };
  const hasAdminEmptyTimings = () => {
    if (isAdmin && place.timing_calculated.length === 0) {
      return true;
    }
    return false;
  };

  return place && place.id ? (
    <View
      style={{
        flex: 1,
        margin: 16,
      }}>
      <View style={[styles.placeCardDesc, {}]}>
        <ShieldIcon style={{marginTop: 7}} />
        <Text
          style={[
            styles.placeNameStyle2,
            {
              marginLeft: 4,
              flexDirection: 'row',
              flexShrink: 1,
            },
          ]}
          ellipsizeMode="tail"
          numberOfLines={2}>
          {place.place_name}
        </Text>
      </View>
      {hasAdminEmptyTimings() ? renderEmptyTimings() : renderFilledTimings()}
      <View style={[styles.placeCardDesc, {marginTop: 6}]}>
        <LocationIcon style={{marginLeft: 5}} />
        <Text
          style={[
            styles.placeCityStyle2,
            {marginLeft: 12, flexDirection: 'row', flexShrink: 1},
          ]}
          ellipsizeMode="tail"
          numberOfLines={3}>
          {place.location}
        </Text>
      </View>
      <Portal>
        <Dialog
          visible={scheduleOpened}
          onDismiss={() => {
            toggleScheduleDialog(false);
          }}>
          <WeeklySchedule
            data={place.timing_calculated}
            openToday={place.open_now}
            dayNumber={place.today_day_of_week}
          />
        </Dialog>
      </Portal>
    </View>
  ) : null;
};

export default PlaceInfo;
