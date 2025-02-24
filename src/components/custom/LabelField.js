import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Surface} from 'react-native-paper';

const LabelField = ({
  placeholder,
  label,
  value,
  onPress,
  roundness,
  containerStyle,
  inputStyle,
  icon,
  iconAlign,
  iconColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Surface
          style={[
            {
              borderRadius: roundness,
              elevation: 1,
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center',
            },
            {...(containerStyle || {})},
          ]}>
          <Text
            style={[
              {
                textAlign: 'left',
                height: 28,
                borderColor: '#f1f1f1',
                flex: 1,
                alignSelf: 'stretch',
                margin: 10,
                padding: 0,
                paddingLeft: iconAlign === 'left' ? 30 : 0,
                color: value ? '#000' : '#919191',
                lineHeight: 28,
              },
              {...(inputStyle || {})},
            ]}>
            {value ? value : placeholder}
          </Text>
          {label ? (
            <Text
              style={{
                position: 'absolute',
                top: -9,
                left: 15,
                backgroundColor: '#fff',
                color: '#919191',
                fontSize: 12,
              }}>
              {label}
            </Text>
          ) : null}
          {icon ? (
            <View
              style={
                iconAlign === 'left'
                  ? {position: 'absolute', left: 10, bottom: 10}
                  : {position: 'absolute', right: 10, bottom: 5}
              }>
              {icon}
            </View>
          ) : null}
        </Surface>
      </View>
    </TouchableOpacity>
  );
};

export default LabelField;
