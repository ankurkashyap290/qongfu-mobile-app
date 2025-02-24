import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {
  fetchFirebaseToken,
  fetchFirebaseTokenReceive,
} from '../../../redux/app/actions';
import {View} from 'react-native';
import {QONGFU_FCM_TOKEN_KEY} from '../../../config';

const RegisterPush = ({
  fcmInit,
  fetchFirebaseToken,
  fetchFirebaseTokenReceive,
}) => {
  useEffect(() => {
    _hydrateOrFetchToken();
  }, []);
  useEffect(() => {
    if (fcmInit) {
      initNotifications();
    }
  }, [fcmInit]);

  const _hydrateOrFetchToken = async () => {
    console.log('push notifications');
    const fcmToken = await AsyncStorage.getItem(QONGFU_FCM_TOKEN_KEY);
    if (fcmToken) {
      // HYDRATE REDUX
      fetchFirebaseTokenReceive({token: fcmToken});
    } else {
      fetchFirebaseToken();
    }
  };

  const initNotifications = () => {
    console.log('init notifications');
    // messaging().onTokenRefresh((fcmToken) => {
    //   // fetchFirebaseTokenReceive({token: fcmToken});
    // });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  };
  return <View />;
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    fcmInit: state.app.fcmInit,
    fcmToken: state.app.fcmToken,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchFirebaseToken,
      fetchFirebaseTokenReceive,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPush);
