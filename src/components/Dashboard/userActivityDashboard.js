import React, {useEffect, useState} from 'react';
import {View, Text, Appearance} from 'react-native';
import {Card, Surface} from 'react-native-paper';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/dashboard.style';
import DashboardSunIcon from '../../assets/img/dashboard/dashboard-sun-icon.svg';
import DashboardMoonIcon from '../../assets/img/dashboard/dashboard-moon-icon.svg';
import LifestyleIcon from '../../assets/img/lifestyle-colored.svg';
import DashboardActivityDoneIcon from '../../assets/img/dashboard-activity-done-icon.svg';
import {getTodaySessions} from '../../../redux/user/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import DashboardCompletedIcon from '../../assets/img/dashboard/dashboard-completed-icon.svg';
import DashboardMissedIcon from '../../assets/img/dashboard/dashboard-missed-icon.svg';
import DashboardSessionsIcon from '../../assets/img/dashboard/dashboard-sessions-icon.svg';
import DashboardRingIcon from '../../assets/img/dashboard/dashboard-activity-ring-icon.svg';
import DashboardActivityMissedIcon from '../../assets/img/dashboard/dashboard-activity-missed-icon.svg';

import {getTimeToAmPmFormat} from '../../../utils';
const UserActivityDashboard = ({
  loading,
  sessions,
  getTodaySessions,
  token,
  profile,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    if (sessions.length === 0) {
      const date = moment().format('YYYY-MM-DD');
      getTodaySessions({date}, {}, token);
    }
  }, []);

  useEffect(() => {
    setDarkMode(colorScheme === 'light' ? false : true);
  }, [colorScheme]);

  const getTasksStatus = () => {
    let isParticipant = {};
    let completedCount = 0;
    let missedCount = 0;
    sessions.length > 0 &&
      sessions.map(session => {
        if (session && session.participants.length > 0) {
          isParticipant = session.participants.find(
            item => item.user_id === profile.id,
          );

          isParticipant.active
            ? null
            : isParticipant.checked_in
            ? (completedCount = completedCount + 1)
            : (missedCount = missedCount + 1);
        }
      });

    return {completedCount, missedCount};
  };

  const getUserCheckedIn = session => {
    let isParticipant = {};
    if (session && session.participants.length > 0) {
      isParticipant = session.participants.find(
        item => item.user_id === profile.id,
      );
    }
    return isParticipant.checked_in ? true : false;
  };

  const renderSessionsCard = () => {
    return (
      <Card style={styles.sessionsCard}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.metricsContainer}>
              <DashboardSessionsIcon />
              <Text style={styles.sessionsValue}>{sessions.length}</Text>
              <Text style={styles.sessionsLabel}>Sessions</Text>
            </View>

            <View style={styles.metricsContainer}>
              <DashboardCompletedIcon />
              <Text style={styles.sessionsValue}>
                {getTasksStatus().completedCount}
              </Text>
              <Text style={styles.sessionsLabel}>Completed</Text>
            </View>

            <View style={styles.metricsContainer}>
              <DashboardMissedIcon />
              <Text style={styles.sessionsValue}>
                {getTasksStatus().missedCount}
              </Text>
              <Text style={styles.sessionsLabel}>Missed</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderScheduledSessions = () => {
    return (
      <Card style={styles.activitiesCard}>
        <View style={styles.activitiesHeader}>
          <Text style={styles.activitiesHeading}>Activities</Text>
          <Text style={styles.activitiesHeading}>Time</Text>
        </View>
        <View style={styles.ringContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <DashboardRingIcon />
            <DashboardRingIcon />
            <DashboardRingIcon />
          </View>
        </View>
        {sessions.length > 0
          ? sessions.map(session => (
              <View
                style={{
                  flexDirection: 'row',

                  paddingLeft: 16,
                  paddingRight: 16,
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Surface style={styles.activitiesIconContainer}>
                  {session.attachment.qongfu ? (
                    session.attachment.qongfu.qongfu_icon
                  ) : (
                    <LifestyleIcon />
                  )}
                  {/* <FitnessIcon /> */}
                </Surface>
                <Text
                  style={
                    getUserCheckedIn(session) || !session.active
                      ? styles.doneActivityName
                      : styles.pendingActivityName
                  }>
                  {session.title}
                </Text>
                <Text
                  style={
                    getUserCheckedIn(session) || !session.active
                      ? styles.doneActivityTime
                      : styles.pendingActivityTime
                  }>
                  {getTimeToAmPmFormat(session.from)} -
                  {getTimeToAmPmFormat(session.to)}
                </Text>

                {getUserCheckedIn(session) ? (
                  <DashboardActivityDoneIcon />
                ) : !session.active && !getUserCheckedIn(session) ? (
                  <DashboardActivityMissedIcon />
                ) : null}
              </View>
            ))
          : null}
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
      </View>
      <View style={{marginTop: 15}}>{renderSessionsCard()}</View>
      <View style={{marginTop: 40}}>{renderScheduledSessions()}</View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    loading: state.user.loading || false,
    sessions: state.user.sessions,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTodaySessions,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserActivityDashboard);
