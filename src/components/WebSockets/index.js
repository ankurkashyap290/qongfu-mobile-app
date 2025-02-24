import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Echo from 'laravel-echo/dist/echo';
import Socketio from 'socket.io-client';
import {API_URL} from '../../../config';
import {getUserDetails} from '../../../redux/user/actions';
import {
  fetchBusinesses,
  updateAccountStatus,
} from '../../../redux/business/actions';
import {
  updateGlobalConfig,
  addNotificationToQueue,
} from '../../../redux/app/actions';

const EVENT_CLAIM_UPDATES = 1;
const EVENT_PROFILE_UPDATES = 2;
const EVENT_MESSAGE_RECEIVED = 3;
const EVENT_USER_BLOCKED = 4;
const EVENT_USER_UN_BLOCKED = 5;
const EVENT_ADDED_IN_CHATROOM = 6;
const EVENT_LEAVE_FROM_CHATROOM = 7;
const EVENT_REMOVED_FROM_CHATROOM = 8;
const NOTIFICATION_RECEIVED = 9;

const WebSockets = ({
  token,
  profile,
  getUserDetails,
  fetchBusinesses,
  updateGlobalConfig,
  updateAccountStatus,
  addNotificationToQueue,
}) => {
  const [echo, setEchoObject] = useState(null);
  useEffect(() => {
    if (token && profile) {
      initSockets();
    }
  }, [token, profile]);

  const initSockets = () => {
    console.log('initSockets');
    if (echo) {
      console.log(
        'disconnect from older object to avoid multi listener subscription',
      );
      echo.disconnect();
    }
    let echoObj = new Echo({
      broadcaster: 'socket.io',
      host: API_URL,
      client: Socketio,
      auth: {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    });

    echoObj.private('account-status').listen('AccountStatus', (event) => {
      console.log('Account Status Event', event);
      updateAccountStatus(event);
    });

    // these are for super admin if required then enable them
    // echoObj.private('claim-created').listen('ClaimCreated', (event) => {
    //   console.log('ClaimCreated', event);
    // });

    // echoObj
    //   .private('documents-uploaded')
    //   .listen('DocumentsUploaded', (event) => {
    //     console.log('DocumentsUploaded', event);
    //   });

    echoObj
      .private('configuration-updates')
      .listen('ConfigurationUpdates', (event) => {
        console.log('ConfigurationUpdates Event', event);
        updateGlobalConfig(event);
      });

    echoObj
      .private(`user.${profile.id}`)
      .listen('UserUpdatesEvent', (event) => {
        console.log('UpdateUpdatesEvent', event.data);
        if (event.type === EVENT_CLAIM_UPDATES) {
          //claim update received
          getUserDetails({token: token});
          fetchBusinesses(token);
        } else if (event.type === EVENT_PROFILE_UPDATES) {
          //user documents approved/rejected
          getUserDetails({token: token});
        } else if (event.type === EVENT_MESSAGE_RECEIVED) {
          //chat new message received
        } else if (event.type === EVENT_USER_BLOCKED) {
          //chat blocked user
        } else if (event.type === EVENT_USER_UN_BLOCKED) {
          //chat un-blocked user
        } else if (event.type === EVENT_ADDED_IN_CHATROOM) {
          //chatroom created or user is added in chatroom
        } else if (event.type === EVENT_LEAVE_FROM_CHATROOM) {
          //leave chatroom
        } else if (event.type === EVENT_REMOVED_FROM_CHATROOM) {
          // remove from chatroom
        } else if (event.type === NOTIFICATION_RECEIVED) {
          //show any notifications including activities and sessions
          addNotificationToQueue(event.data);
        }
      });
    setEchoObject(echoObj);
  };
  return <View style={{width: 0, height: 0}} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserDetails,
      fetchBusinesses,
      updateGlobalConfig,
      updateAccountStatus,
      addNotificationToQueue,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(WebSockets);
