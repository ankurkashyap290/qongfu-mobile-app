import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Appearance,
  Platform,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Button, Card, Surface} from 'react-native-paper';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/dashboard.style';
import DashboardSunIcon from '../../assets/img/dashboard/dashboard-sun-icon.svg';
import DashboardMoonIcon from '../../assets/img/dashboard/dashboard-moon-icon.svg';
import FitnessIcon from '../../assets/img/inner_filter_sports.svg';
import DashboardActivityDoneIcon from '../../assets/img/dashboard-activity-done-icon.svg';
import BiometricsCard from './biometricsCard';
import * as NavigationService from '../../navigators/NavigationService';
import {
  getUserDetails,
  getBiometricsSettings,
} from '../../../redux/user/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/AntDesign';

const HEALTHKIT_STATUS = {
  NONE: -1,
  UNAVAILABLE: 0,
  REQUEST_PENDING: 1,
  GRANTED: 2,
  BLOCKED: 3,
  ERROR: 9,
};

const UserDashboard = ({
  loading,
  showSettings,
  getBiometricsSettings,
  biometricsSettings,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = Appearance.getColorScheme();
  const [healthkitAccessStatus, setHealthkitAccessStatus] = useState(
    HEALTHKIT_STATUS.NONE,
  );

  useEffect(() => {
    updateHealthKitStatus();
  }, []);

  useEffect(() => {
    setDarkMode(colorScheme === 'light' ? false : true);
  }, [colorScheme]);

  useEffect(() => {
    getBiometricsSettings();
  }, []);

  const updateHealthKitStatus = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
        // ios: PERMISSIONS.IOS.ACTIVITY_RECOGNITION,
      }),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            setHealthkitAccessStatus(HEALTHKIT_STATUS.UNAVAILABLE);
            break;
          case RESULTS.DENIED:
            setHealthkitAccessStatus(HEALTHKIT_STATUS.REQUEST_PENDING);
            break;
          case RESULTS.GRANTED:
            setHealthkitAccessStatus(HEALTHKIT_STATUS.GRANTED);
            break;
          case RESULTS.BLOCKED:
            setHealthkitAccessStatus(HEALTHKIT_STATUS.BLOCKED);
            break;
        }
      })
      .catch(error => {
        console.log('error', error);
        setHealthkitAccessStatus(HEALTHKIT_STATUS.ERROR);
      });
  };

  const renderLastSessionCard = () => {
    return (
      <Card style={styles.sessionCard}>
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <FitnessIcon />
              <DashboardActivityDoneIcon style={{marginTop: 10}} />
              <Text style={styles.done}>Done</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={styles.lastActivityName}>Running</Text>
              <Text style={styles.lastActivityDay}>Yesterday</Text>
              <Text style={styles.lastActivityTime}>8:00AM - 9:00AM</Text>
            </View>
          </View>
          <Text style={styles.lastSessionText}>Last Session</Text>
        </Card.Content>
      </Card>
    );
  };
  const renderNextSessionCard = () => {
    return (
      <Card style={styles.sessionCard}>
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <FitnessIcon />

              <View style={{height: 25}} />
              <View style={{height: 25}} />
            </View>
            <View
              style={{
                marginLeft: 10,
              }}>
              <Text style={styles.activityName}>Running</Text>
              <Text style={styles.activityDay}>Yesterday</Text>
              <Text style={styles.activityTime}>8:00AM - 9:00AM</Text>
            </View>
          </View>
          <Text style={styles.nextSessionText}>Next Session</Text>
        </Card.Content>
      </Card>
    );
  };
  return (
    <View style={styles.carouselContainer}>
      <GlobalOverlayLoading loading={loading} textContent="" />
      <View style={{flexDirection: 'row', alignItems: 'center', height: '20%'}}>
        {!darkMode ? <DashboardSunIcon /> : <DashboardMoonIcon />}

        <View style={{marginLeft: 5}}>
          <Text style={styles.dayText}>{moment().format('dddd')}</Text>
          <Text style={styles.dateText}>{moment().format('DD MMM YYYY')}</Text>
        </View>
        {healthkitAccessStatus === HEALTHKIT_STATUS.GRANTED ? (
          <View
            style={{
              justifyContent: 'flex-end',
              flex: 1,
              flexDirection: 'row',
            }}>
            {showSettings ? (
              <TouchableOpacity
                onPress={() => NavigationService.navigate('DashboardSettings')}>
                <Icon name="setting" size={21} style={{color: '#858585'}} />
              </TouchableOpacity>
            ) : (
              <Button
                mode="outlined"
                style={styles.setupButton}
                labelStyle={styles.setupButtonLabel}
                onPress={() => NavigationService.navigate('FastTrackSetup')}>
                Fast-track Setup
              </Button>
            )}
          </View>
        ) : null}
      </View>
      <View style={{marginTop: 15, height: '48%'}}>
        {healthkitAccessStatus === HEALTHKIT_STATUS.GRANTED ? (
          <BiometricsCard />
        ) : (
          <Card style={styles.metricsCard}>
            <Card.Content style={{alignItems: 'center'}}>
              <Text style={styles.biometricsEmptyCardHeading}>
                Your biodata dashboard is{'\n'} not available.
              </Text>
              <Text style={styles.biometricsEmptyCardDesc}>
                You need to grant permission to Qongfu to{'\n'} access your{' '}
                {Platform.OS === 'android' ? 'Google' : 'Apple'} HealthKit.
              </Text>
              <Button
                mode="text"
                style={{marginTop: 20}}
                labelStyle={styles.nextButtonLabel}
                onPress={() => {
                  updateLocationStatus();
                  Linking.openSettings();
                }}>
                Tap here to change settings
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
      <View
        style={{
          marginTop: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '22%',
        }}>
        {renderLastSessionCard()}
        {renderNextSessionCard()}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    loading: state.user.loading || false,
    biometricsSettings: state.user.biometricsSettings,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserDetails,
      getBiometricsSettings,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
