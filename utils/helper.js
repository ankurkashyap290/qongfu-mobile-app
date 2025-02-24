import React from 'react';
import {Dimensions, Platform} from 'react-native';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

export const getViewportHeight = isHeader => {
  const screenHeight = Math.round(Dimensions.get('window').height);
  const viewPortHeight = ifIphoneX(
    isHeader ? screenHeight - 70 : screenHeight,
    Platform.OS === 'android'
      ? isHeader
        ? screenHeight - 56
        : screenHeight
      : isHeader
      ? screenHeight - 65
      : screenHeight,
  );
  return viewPortHeight;
};
