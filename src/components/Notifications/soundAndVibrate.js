import React, {useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme.style';
import styles from '../../styles/notifications.style';

const SoundAndVibrate = () => {
  return (
    <>
      <View style={[styles.firstSectionHeader, {marginTop: 2}]}>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <Text style={{fontSize: 20, marginTop: 0}}>Sound</Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: theme.SECONDARY_COLOR,
              marginTop: 3,
            }}>
            Note
          </Text>
          <Icon name="chevron-right" size={32} color={theme.SECONDARY_COLOR} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 2,
        }}>
        <View style={{paddingTop: 10, paddingBottom: 10}}>
          <Text style={{fontSize: 20, marginTop: 0}}>Vibrate</Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: theme.SECONDARY_COLOR,
              marginTop: 3,
              marginRight: 15,
            }}>
            ON
          </Text>
        </View>
      </View>
    </>
  );
};

export default SoundAndVibrate;
