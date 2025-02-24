import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
// import {DrawerItems} from 'react-navigation-drawer';
import {
  List,
  Avatar,
  Divider,
  Button,
  Portal,
  Dialog,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/customDrawer.style';
import theme from '../../styles/theme.style';
import LifeStyleActive from '../../assets/img/drawer-lifestyle.svg';
import LifeStyleInactive from '../../assets/img/filter_lifestyles.svg';
import * as NavigationService from '../../navigators/NavigationService';
import UserDetails from '../header/UserDetails';
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import TextField from '../custom/textField';

const CustomDrawerContentComponent = props => {
  const {activeItemKey, navigation, profile} = props;
  const [helpDeskVisibility, setHelpDeskVisibility] = useState(false);
  const [helpdeskReview, setHelpdeskReview] = React.useState('');
  const [helpdeskSuccess, setHelpdeskSuccess] = React.useState(false);
  const [helpdeskError, setHelpdeskError] = React.useState(false);

  const handleHelpDeskModal = () => {
    navigation.closeDrawer();
    setHelpDeskVisibility(true);
  };

  const handleHelpDeskModalClose = () => {
    setHelpDeskVisibility(false);
    setHelpdeskSuccess(false);
  };

  const handleHelpdeskReviewChange = value => {
    setHelpdeskReview(value);
  };

  const handleSubmit = () => {
    if (helpdeskReview !== '') {
      setHelpdeskError(false);
      const payload = {
        text: `(id:${profile && profile.id}) ${profile &&
          profile.fullname} - ${helpdeskReview}`,
      };
      axios
        .post(
          `https://hooks.slack.com/services/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`,
          {...payload},
          {
            headers: {
              'Content-type': 'application/json',
            },
          },
        )
        .then(response => {
          setHelpdeskReview('');
          setHelpdeskSuccess(true);
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      setHelpdeskError(true);
    }
  };

  return (
    <ScrollView>
      {/* <SafeAreaView
        style={{flex: 1}}
        forceInset={{top: 'always', horizontal: 'never'}}> */}
      {/* <Text>sss</Text> */}
      <UserDetails />
      <View style={styles.listItemSpace}>
        <List.Item
          title="Explore"
          left={props =>
            activeItemKey === 'App' ? (
              <LifeStyleActive style={styles.lifestyleIcon} />
            ) : (
              <LifeStyleInactive style={styles.lifestyleIcon} />
            )
          }
          titleStyle={[
            styles.listItemLabel,
            {marginTop: 5},
            activeItemKey === 'App' ? styles.listItemActive : '',
          ]}
          onPress={() => NavigationService.navigate('App')}
        />

        <List.Item
          title="Maps"
          left={props => <List.Icon {...props} icon="map-outline" />}
          titleStyle={[
            styles.listItemLabel,
            activeItemKey === 'Maps' ? styles.listItemActive : '',
          ]}
          color={
            activeItemKey === 'Maps'
              ? theme.PRIMARY_COLOR
              : theme.SECONDARY_COLOR
          }
          onPress={() => {
            if (activeItemKey !== 'Maps') {
              NavigationService.navigate('MapView', {
                suppressGeoLocation: true,
              });
            }
          }}
        />
      </View>
      <Divider />
      <View style={styles.listItemSpace}>
        <List.Item
          title="Notifications"
          left={props => (
            <List.Icon
              {...props}
              icon="bell-outline"
              color={
                activeItemKey === 'Notifications'
                  ? theme.PRIMARY_COLOR
                  : theme.SECONDARY_COLOR
              }
            />
          )}
          titleStyle={[
            styles.listItemLabel,
            activeItemKey === 'Notifications' ? styles.listItemActive : '',
          ]}
          onPress={() => NavigationService.navigate('AppNotifications')}
        />
        <List.Item
          title="Settings"
          left={props => (
            <List.Icon
              {...props}
              icon="settings-outline"
              color={
                activeItemKey === 'Settings'
                  ? theme.PRIMARY_COLOR
                  : theme.SECONDARY_COLOR
              }
            />
          )}
          titleStyle={[
            styles.listItemLabel,
            activeItemKey === 'Settings' ? styles.listItemActive : '',
          ]}
          onPress={() => NavigationService.navigate('Settings')}
        />
      </View>
      <Divider />
      <View style={styles.listItemSpace}>
        <List.Item
          title="Help Desk"
          left={props => (
            <List.Icon
              {...props}
              icon="headset"
              color={
                activeItemKey === 'Help'
                  ? theme.PRIMARY_COLOR
                  : theme.SECONDARY_COLOR
              }
            />
          )}
          titleStyle={[
            styles.listItemLabel,
            activeItemKey === 'Help' ? styles.listItemActive : '',
          ]}
          onPress={() => handleHelpDeskModal()}
        />
      </View>
      <View style={styles.listItemSpace}>
        <List.Item
          title="Business Place Profile"
          left={props => (
            <List.Icon
              {...props}
              icon="headset"
              color={
                activeItemKey === 'Help'
                  ? theme.PRIMARY_COLOR
                  : theme.SECONDARY_COLOR
              }
            />
          )}
          titleStyle={[
            styles.listItemLabel,
            activeItemKey === 'Help' ? styles.listItemActive : '',
          ]}
          onPress={() => NavigationService.navigate('BusinessPlaceProfile')}
        />
      </View>
      {/* </SafeAreaView> */}
      <Portal>
        <Dialog
          visible={helpDeskVisibility}
          onDismiss={handleHelpDeskModalClose}
          style={styles.helpDeskDialog}>
          {helpdeskSuccess ? (
            <View>
              <Text style={[styles.modalTitle, {marginTop: 40}]}>Success!</Text>
              <Icon
                name="checkcircle"
                size={90}
                color={theme.PRIMARY_COLOR}
                style={{textAlign: 'center', marginTop: 10}}
              />
              <Text style={styles.modalDescription}>
                Your query has been submitted.
              </Text>
              <Text style={styles.successModalDescription}>
                We will get back to you soon!
              </Text>
              <View style={styles.updateButtonContainer}>
                <Button
                  mode="contained"
                  style={styles.updateButton}
                  labelStyle={styles.updateButtonLable}
                  onPress={handleHelpDeskModalClose}>
                  OK
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <Icon
                name="close"
                color={theme.PRIMARY_COLOR}
                size={25}
                style={styles.closeIcon}
                onPress={() => handleHelpDeskModalClose()}
              />
              <Text style={styles.modalTitle}>Help Desk</Text>
              <Text style={styles.label}>How can we help you?</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  onChangeText={value => handleHelpdeskReviewChange(value)}
                  value={helpdeskReview}
                  placeholder="Write your query here"
                  multiline={true}
                  style={{minHeight: 70}}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    helpdeskError ? 'Please write your query message.' : ''
                  }
                />
              </View>
              <View style={styles.updateButtonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.updateButton}
                  labelStyle={styles.updateButtonLable}>
                  Submit
                </Button>
              </View>
            </View>
          )}
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContentComponent);
