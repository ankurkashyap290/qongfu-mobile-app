import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';

const HeaderLeft = ({title, onAction}) => {
  return (
    <View>
      <Icon
        name="chevron-left"
        size={36}
        color={theme.PRIMARY_COLOR}
        onPress={() => (onAction ? onAction() : NavigationService.goBack())}
      />
      {title && <Text>{title}</Text>}
    </View>
  );
};

export default HeaderLeft;
