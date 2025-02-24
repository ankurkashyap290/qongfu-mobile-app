import React, {useState} from 'react';
import {View, ScrollView, Dimensions, Platform, Linking} from 'react-native';
import {List} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/settings.style';
import {userLogout} from '../../redux/user/actions';
import {fetchAccountStatus} from '../../redux/business/actions';
import * as NavigationService from '../navigators/NavigationService';
import {GOOGLE_PACKAGE_NAME, APPLE_STORE_ID} from '../../config';

import SettingsNotificationIcon from '../assets/icons/sprint1/settings-notification-icon.svg';
import SettingsCountryIcon from '../assets/icons/sprint1/settings-country-icon.svg';
import SettingsRateIcon from '../assets/icons/sprint1/settings-rate-us-icon.svg';
import SettingsInviteIcon from '../assets/icons/sprint1/settings-invite-icon.svg';
import SettingsBusinessIcon from '../assets/icons/sprint1/settings-business-icon.svg';
import SettingsAboutIcon from '../assets/icons/sprint1/settings-info-icon.svg';
import SettingsTermsIcon from '../assets/icons/sprint1/settings-terms-icon.svg';
import SettingsPrivacyIcon from '../assets/icons/sprint1/settings-privacy-icon.svg';
import SettingsInfoIcon from '../assets/icons/sprint1/settings-info-icon.svg';
import SettingsLogoutIcon from '../assets/icons/sprint1/settings-logout-icon.svg';

const screenHeight = Math.round(Dimensions.get('window').height);

const accountStatusUpgrade = {
  status: false,
  message: 'Upgrade to Business Account',
  title: 'Welcome to Qongfu Business',
  icon: 'business', // this is only a tag for handling front end logic
  content:
    'Do you own a Health & Fitness Business? Get it listed today for Free!',
  actions: [
    {
      action: 'upgrade',
      label: 'Yes, get it listed!',
      message: 'Some data maybe be lost permanently by continuing this action.',
    },
  ],
};

const accountStatusPending = {
  status: false,
  message: 'Pending application approval',
  title: 'Welcome to Qongfu Business',
  icon: 'review', // this is only a tag for handling front end logic
  content:
    'Your application is currently being reviewed by Your application is currently being reviewed by...',
  actions: [],
};

const accountStatusDeactivate = {
  status: true,
  message: 'Business Account',
  title: 'Welcome back to Qongfu Business',
  icon: 'business', // this is only a tag for handling front end logic
  content: 'Your Business Account is now Active!',
  actions: [
    {
      action: 'deactivate',
      label: 'Deactivate Business', // this will call Deactivate Form in front end
      message: '',
    },
  ],
};

const accountStatusDocumentRevision = {
  status: false,
  message: '* Documents Required',
  title: 'Qongfu Business',
  icon: 'documents', // this is only a tag for handling front end logic
  content:
    'We have reviewed your application, and our team seem to require you to...',
  actions: [
    {
      action: 'documents',
      label: 'Let’s sort it out!',
      message: '',
    },
  ],
};

const Settings = ({
  token,
  accountStatusLoading,
  accountStatus,
  accountStatusError,
  fetchAccountStatus,
  userLogout,
}) => {
  const [qongfuBusinessExpanded, toggleQongfuBusinessExpanded] = useState(
    false,
  );

  const handleLogout = () => {
    userLogout(token);
  };

  const openStoreForRating = () => {
    if (Platform.OS !== 'ios') {
      Linking.openURL(
        `market://details?id=${GOOGLE_PACKAGE_NAME}`,
      ).catch((err) => alert('Please check for the Google Play Store'));
    } else {
      Linking.openURL(
        `itms-apps://itunes.apple.com/us/app/id${APPLE_STORE_ID}?mt=8`,
      ).catch((err) => alert('Please check for the App Store'));
    }
  };

  const handleQongfuBusiness = () => {
    if (!qongfuBusinessExpanded) {
      if (accountStatus === null) {
        fetchAccountStatus(token);
      }
    }
    toggleQongfuBusinessExpanded(!qongfuBusinessExpanded);
  };

  const getAccountStatusColor = () => {
    return accountStatus && accountStatus.message_color
      ? accountStatus.message_color
      : '#0092dd';
  };

  return (
    <View>
      <ScrollView style={{height: screenHeight - 40}}>
        <View>
          <List.Item
            title="Notifications"
            left={(props) => (
              <SettingsNotificationIcon {...props} fill="#b5b5b5" />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => NavigationService.navigate('Notifications')}
            style={styles.listItem}
          />
          <List.Item
            title="Country"
            left={(props) => <SettingsCountryIcon {...props} fill="#b5b5b5" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => NavigationService.navigate('CountrySettings')}
            style={[styles.listItem, {marginTop: 2}]}
          />
        </View>
        <View style={styles.itemSpace}>
          <List.Item
            title="Rate Qongfu"
            left={(props) => <SettingsRateIcon {...props} fill="#b5b5b5" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
            onPress={() => openStoreForRating()}
          />
          <List.Item
            title="Invite Friends"
            left={(props) => <SettingsInviteIcon {...props} fill="#b5b5b5" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, {marginTop: 2}]}
            onPress={() => NavigationService.navigate('InviteFriends')}
          />
        </View>
        <View style={styles.itemSpace}>
          <List.Accordion
            expanded={qongfuBusinessExpanded}
            title="Qongfu Business"
            left={(props) => (
              <SettingsBusinessIcon
                {...props}
                fill="#b5b5b5"
                style={{marginLeft: 12}}
              />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listAccordian}
            titleStyle={styles.listAccordianLabel}
            onPress={() => handleQongfuBusiness()}>
            <List.Item
              title={
                accountStatusLoading || !accountStatus
                  ? 'Loading...'
                  : accountStatus.message
              }
              style={[styles.listItem]}
              titleStyle={[
                styles.accountStatusText,
                {
                  color: getAccountStatusColor(),
                },
              ]}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => NavigationService.navigate('BusinessAccount')}
            />
            {/* <List.Item
              title={accountStatusUpgrade.message}
              style={[styles.listItem]}
              titleStyle={[
                styles.accountStatusText,
                {
                  color: getAccountStatusColor(),
                },
              ]}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() =>
                NavigationService.navigate('BusinessAccount', {
                  data: accountStatusUpgrade,
                })
              }
            />
            <List.Item
              title={accountStatusPending.message}
              style={[styles.listItem]}
              titleStyle={[
                styles.accountStatusText,
                {
                  color: getAccountStatusColor(),
                },
              ]}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() =>
                NavigationService.navigate('BusinessAccount', {
                  data: accountStatusPending,
                })
              }
            />

            <List.Item
              title={accountStatusDeactivate.message}
              style={[styles.listItem]}
              titleStyle={[
                styles.accountStatusText,
                {
                  color: getAccountStatusColor(),
                },
              ]}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() =>
                NavigationService.navigate('BusinessAccount', {
                  data: accountStatusDeactivate,
                })
              }
            />

            <List.Item
              title={accountStatusDocumentRevision.message}
              style={[styles.listItem]}
              titleStyle={[
                styles.accountStatusText,
                {
                  color: getAccountStatusColor(),
                },
              ]}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() =>
                NavigationService.navigate('BusinessAccount', {
                  data: accountStatusDocumentRevision,
                })
              }
            /> */}
          </List.Accordion>
        </View>
        <View style={styles.itemSpace}>
          <List.Item
            title="About"
            left={(props) => <SettingsAboutIcon {...props} fill="#b5b5b5" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={styles.listItem}
            onPress={() => NavigationService.navigate('About')}
          />
          <List.Item
            title="Terms of Service"
            left={(props) => <SettingsTermsIcon {...props} fill="#b5b5b5" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, {marginTop: 2}]}
            onPress={() => NavigationService.navigate('TermsOfService')}
          />
          <List.Item
            title="Privacy Policy"
            left={(props) => <SettingsPrivacyIcon {...props} fill="#b5b5b5" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            style={[styles.listItem, {marginTop: 2}]}
            onPress={() => NavigationService.navigate('PrivacyPolicy')}
          />
          <List.Item
            title="Version 1.0"
            left={(props) => <SettingsInfoIcon {...props} fill="#b5b5b5" />}
            style={[styles.listItem, {marginTop: 2}]}
          />
        </View>
        <View style={[styles.itemSpace, styles.itemSpaceBottom]}>
          <List.Item
            title="Logout"
            onPress={() => handleLogout()}
            left={(props) => <SettingsLogoutIcon {...props} fill="#b5b5b5" />}
            style={[styles.listItem, {marginTop: 2}]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    accountStatusLoading: state.business.loading['accountStatus'],
    accountStatus: state.business.accountStatus,
    accountStatusError: state.business.error['accountStatus'],
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userLogout,
      fetchAccountStatus,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
