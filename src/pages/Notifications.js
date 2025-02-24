import React, {useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLayout from '../layout/PageLayout';
import styles from '../styles/notifications.style';
import theme from '../styles/theme.style';
import SoundAndVirbate from '../components/Notifications/soundAndVibrate';

const screenHeight = Math.round(Dimensions.get('window').height);

const Notifications = props => {
  const [qongfuUpdate, setQongfuUpdate] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [bannerAlert, setBannerAlert] = useState(true);

  return (
    <View>
      <ScrollView style={{height: screenHeight - 40}}>
        <View>
          <View>
            <Text style={styles.titleHeader}>
              PUSH NOTIFICATIONS (Pops up on your device)
            </Text>
          </View>
          <View style={styles.firstSectionHeader}>
            <View style={styles.tabItemTextContain}>
              <Text style={styles.tabHeading}>Qongfu Updates</Text>
              <Text style={styles.tabSubheading}>New features, promotions</Text>
            </View>
            <View style={styles.tabSwitchContain}>
              <Switch
                value={qongfuUpdate}
                color={theme.PRIMARY_COLOR}
                onValueChange={() => setQongfuUpdate(!qongfuUpdate)}
              />
            </View>
          </View>
          {qongfuUpdate ? <SoundAndVirbate /> : null}
          <View style={[styles.firstSectionHeader, {marginTop: 2}]}>
            <View style={styles.tabItemTextContain}>
              <Text style={{fontSize: 20}}>Show Preview</Text>
              <Text style={{fontSize: 14, color: theme.SECONDARY_COLOR}}>
                Preview the text inside notifications
              </Text>
            </View>
            <View style={{paddingTop: 20, paddingBottom: 20}}>
              <Switch
                value={showPreview}
                color={theme.PRIMARY_COLOR}
                onValueChange={() => setShowPreview(!showPreview)}
              />
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.titleHeader}>IN-APP NOTIFICATIONS</Text>
          </View>
          <View style={styles.firstSectionHeader}>
            <View style={styles.tabItemTextContain}>
              <Text style={styles.tabHeading}>Banner Alert</Text>
              <Text style={styles.tabSubheading}>
                Notification banner slides from top
              </Text>
            </View>
            <View style={styles.tabSwitchContain}>
              <Switch
                value={bannerAlert}
                color={theme.PRIMARY_COLOR}
                onValueChange={() => setBannerAlert(!bannerAlert)}
              />
            </View>
          </View>
          {bannerAlert ? <SoundAndVirbate /> : null}
        </View>
        <View>
          <View>
            <Text style={styles.titleHeader}>RESET</Text>
          </View>
          <View style={styles.firstSectionHeader}>
            <View style={styles.tabItemTextContain}>
              <Text style={[styles.tabHeading, {color: '#f21414'}]}>
                Reset Notification Settings
              </Text>
              <Text style={styles.tabSubheading}>
                Reset all custom notification settings
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
