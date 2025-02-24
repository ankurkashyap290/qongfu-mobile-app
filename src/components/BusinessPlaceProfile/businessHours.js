import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import {Card, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/businessPlaceProfile.style';
import * as NavigationService from '../../navigators/NavigationService';
import {TouchableOpacity} from 'react-native';
import SettingsIcon from '../../assets/img/business_hrs_settings.svg';
import AddCircleIcon from '../../assets/img/add_circle.svg';
import PageLayout from '../../layout/PageLayout';
import BusinessHoursSelection from './businessHoursSelection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BusinessTimings from './businessTimings';
import {Default_Timing, Week_Day} from '../../../config';
import CalendarSchedules from './calendarSchedules';
import {formatTimingToEdit, formatTimingToSave} from '../../../utils';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const BusinessHours = ({
  place,
  token,
  updatePlace,
  resetBusinessUpdateStatus,
  updateTimingLoading,
  updateTimingError,
  updateTimingStatus,
}) => {
  const [regularHoursVisibility, setRegularHoursVisibility] = useState(false);
  const [regularTiming, setRegularTiming] = useState([]);
  const regularTimingsRef = useRef(null);
  const handleSetupRegularHours = () => {
    setRegularHoursVisibility(true);
  };

  // useEffect(() => {
  //   if (regularHoursVisibility) {
  //     if (regularTimingsRef) {
  //       regularTimingsRef.current.setEditMode('update');
  //     }
  //   }
  // }, [regularHoursVisibility]);

  const handleTimingMode = (mode) => {
    // do nothing here
  };
  const handleTimingUpdate = (timing) => {
    // update place timing here with action
    updatePlace(
      {
        id: place.id,
        place_name: place.place_name,
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        location_data: place.location_data,
        timing: formatTimingToSave(timing),
      },
      token,
      'timings',
    );
  };

  useEffect(() => {
    if (updateTimingStatus) {
      resetBusinessUpdateStatus('update-place-timings');
      // show modal here updated regular timings
      if (regularTimingsRef) {
        regularTimingsRef.current.stopEdit();
      }
    }
  }, [updateTimingStatus]);

  useEffect(() => {
    const placeTiming =
      place && place.id && place.timing.length ? place.timing : [];
    setRegularTiming(
      placeTiming.length
        ? formatTimingToEdit(placeTiming, Week_Day)
        : Default_Timing,
    );
    setRegularHoursVisibility(placeTiming.length > 0);
  }, [place]);

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={updateTimingLoading} textContent="" />
      <View style={{margin: 20}}>
        {!regularHoursVisibility ? (
          <View>
            <Text style={styles.documentsListHeading}>
              Regular Business Hours
            </Text>
            <TouchableOpacity onPress={() => handleSetupRegularHours()}>
              <Card style={styles.businessHoursCard}>
                <Card.Content>
                  <View style={{alignItems: 'center'}}>
                    <SettingsIcon />
                    <Text style={styles.regularHoursText}>
                      Setup regular business hours
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </View>
        ) : (
          <BusinessTimings
            ref={regularTimingsRef}
            type="regular"
            title="REGULAR BUSINESS HOURS"
            timings={regularTiming}
            onEditTime={handleTimingMode}
            onUpdateTime={handleTimingUpdate}
            apiError={updateTimingError}
          />
        )}
        <View style={{marginTop: 10}}>
          <CalendarSchedules mode="edit" />
        </View>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    token: state.user.token,
    profile: state.user.profile,
    updateTimingLoading:
      state.business.loading['update-place-timings'] || false,
    updateTimingError: state.business.error['update-place-timings'] || '',
    updateTimingStatus:
      state.business.businessUpdateStatus['update-place-timings'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({updatePlace, resetBusinessUpdateStatus}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessHours);
