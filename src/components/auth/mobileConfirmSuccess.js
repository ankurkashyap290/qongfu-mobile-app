import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../styles';

const SuccessModal = props => {
  return (
    <View style={styles.successModalContainer}>
      {props.mode === 'passwordUpdate' ? (
        <View style={styles.mobileSuccessCheckIconContainer}>
          <Text style={styles.mobileSuccessHeading}>{props.title}</Text>
          <Icon
            name="checkcircle"
            size={180}
            style={styles.passwordSuccessIcon}
          />
        </View>
      ) : (
        <View style={styles.mobileSuccessCheckIconContainer}>
          <Icon
            name="checkcircleo"
            size={props.mode === 'onboardingSuccess' ? 120 : 180}
            style={
              props.mode === 'onboardingSuccess'
                ? styles.checkIcon
                : styles.mobileSuccessIconCheck
            }
          />
          <Text
            style={
              props.mode === 'onboardingSuccess'
                ? styles.onboardingSuccessHeading
                : styles.mobileSuccessHeading
            }>
            {props.title}
          </Text>
          {props.subTitle ? (
            <Text
              style={
                props.mode === 'onboardingSuccess'
                  ? styles.onboardingSuccessSubHeading
                  : styles.mobileSubSuccessHeading
              }>
              {props.subTitle}
            </Text>
          ) : null}
        </View>
      )}

      {!props.hideBtn ? (
        <View style={styles.successCheckIconContainer}>
          <Button
            mode={props.mode === 'passwordUpdate' ? 'contained' : 'outlined'}
            style={styles.mobileSubmitBtn}
            onPress={props.onDone}
            size="large"
            labelStyle={
              props.mode === 'passwordUpdate'
                ? styles.passwordUpdateButton
                : styles.mobileSubmitBtnLabel
            }>
            {props.mode === 'passwordUpdate' ? 'Done' : 'Next'}
          </Button>
        </View>
      ) : null}
    </View>
  );
};

export default SuccessModal;
