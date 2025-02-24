import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../styles/theme.style';

const TextField = props => {
  const {
    mode,
    style,
    label,
    theme,
    containerStyle,
    errorMessage,
    ...inputProps
  } = props;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (errorMessage) {
      setShowSuccess(true);
    }
  }, [showSuccess, errorMessage]);
  return (
    <View style={mode === 'outlined' ? {marginBottom: 10} : {}}>
      <Surface
        style={[
          {
            borderRadius: theme.roundness,
            elevation: 1,
          },
          styles.container,
          containerStyle ? containerStyle : {},
        ]}>
        <TextInput
          placeholderTextColor="#919191"
          {...inputProps}
          style={[styles.input, {...style}]}
        />
        {mode === 'outlined' && label && (
          <Text style={styles.inputLabel}>{label}</Text>
        )}
        {props.icon ? (
          <Icon
            style={[
              props.iconAlign === 'left' ? styles.iconLeft : styles.icon,
              props.iconActive ? styles.iconActive : styles.iconInActive,
            ]}
            name={props.icon}
            onPress={props.onIconClick}
            size={20}
          />
        ) : null}
      </Surface>
      {props.errorMessage ? (
        <Text style={styles.textError}>
          <Text style={styles.starColor}>* </Text>
          {props.errorMessage}
        </Text>
      ) : showSuccess && props.validFieldMessage ? (
        <Text style={styles.textSuccess}>
          <Icon style={styles.successIcon} name="check" size={8} />{' '}
          {props.validFieldMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 23,
    bottom: 10,
  },
  iconInActive: {
    color: '#c9c9c9',
  },
  iconActive: {
    color: theme.PRIMARY_COLOR,
  },
  successIcon: {
    color: 'green',
    textAlignVertical: 'top',
  },
  textError: {
    color: '#ff2121',
    // marginLeft: 20,
  },
  starColor: {
    color: '#ff2121',
  },
  textSuccess: {
    color: theme.SECONDARY_COLOR,
  },
  iconLeft: {
    position: 'absolute',
    left: 16,
    bottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    minHeight: 28,
    borderColor: '#f1f1f1',
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
    color: '#000',
  },
  inputLabel: {
    position: 'absolute',
    top: -9,
    left: 15,
    backgroundColor: '#fff',
    fontSize: 12,
    // paddingLeft: 2,
    // paddingRight: 2,
    color: '#919191',
  },
});

export default TextField;
