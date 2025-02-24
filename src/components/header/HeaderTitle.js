import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles/theme.style';

const HeaderTitle = ({title}) => {
  return (
    <View>
      {title && (
        <Text
          style={{color: theme.PRIMARY_COLOR, fontSize: 18, fontWeight: '500'}}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default HeaderTitle;
