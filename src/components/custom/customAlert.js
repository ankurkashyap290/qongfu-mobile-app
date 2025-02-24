import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NavigationService from '../../navigators/NavigationService';

const CustomAlert = (props) => {
  const {error} = props;

  return (
    <View
      style={{
        minHeight: 48,
        backgroundColor: '#fdecea',
        borderRadius: 4,
        flexDirection: 'column',
        // flex: 1,
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Icon
          name="alert-circle-outline"
          color="#f04d49"
          size={22}
          style={{textAlignVertical: 'center', marginLeft: 10, marginRight: 10}}
        />

        {error === '401' ? (
          <Text style={{color: '#611a15', fontSize: 14}}>
            Login session expired. Please{' '}
            <Text
              style={{color: '#0092dd', fontSize: 14}}
              onPress={() => NavigationService.navigate('SignIn')}>
              Sign in
            </Text>{' '}
            again.
          </Text>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginRight: 30,
            }}>
            <Text style={{color: '#611a15', fontSize: 14, flexWrap: 'wrap'}}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomAlert;
