import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles/theme.style';

const HeaderRight = ({icon, title, iconColor, iconSize, onAction}) => {
  return (
    <View style={{marginRight: 10}}>
      {icon && (
        <TouchableOpacity onPress={() => onAction && onAction()}>
          <Icon
            name={icon}
            size={iconSize ? iconSize : 36}
            color={iconColor ? iconColor : theme.PRIMARY_COLOR}
          />
        </TouchableOpacity>
      )}
      {title && (
        <TouchableOpacity onPress={() => onAction && onAction()}>
          <Text style={{color: theme.PRIMARY_COLOR}}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderRight;
