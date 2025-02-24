import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {QONGFU_USER_TOKEN_KEY} from '../../../config';

const AuthLoading = (props) => {
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem(QONGFU_USER_TOKEN_KEY);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(token ? 'Home' : 'Welcome');
  };

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoading;
