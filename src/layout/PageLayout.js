import React from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getViewportHeight} from '../../utils/helper';

const PageLayout = ({bgColor, children, scrollDisabled}) => {
  return (
    <KeyboardAwareScrollView scrollEnabled={!scrollDisabled}>
      <View
        style={{
          backgroundColor: bgColor ? bgColor : '#f8fcff',
          minHeight: getViewportHeight(true),
          paddingBottom: 80,
        }}>
        {children}
      </View>
      {/* <View style={{height: 20, backgroundColor: '#fff'}} /> */}
    </KeyboardAwareScrollView>
  );
};

export default PageLayout;
