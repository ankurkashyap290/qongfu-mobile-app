import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../styles/theme.style';

const TextField = (props) => {
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (props.errorMessage) {
      setShowSuccess(true);
    }
  }, [showSuccess, props.errorMessage]);
  return (
    <View>
      <View style={styles.container}>
        <TextInput {...props} />
        {props.icon ? (
          <Icon
            style={[
              styles.icon,
              props.iconActive ? styles.iconActive : styles.iconInActive,
            ]}
            name={props.icon}
            onPress={props.onIconClick}
            size={25}
          />
        ) : null}
      </View>
      {props.errorMessage ? (
        <Text style={styles.textError}>
          <Text style={styles.starColor}>* </Text>
          {props.errorMessage}
        </Text>
      ) : showSuccess ? (
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
  },
  icon: {
    position: 'absolute',
    right: 16,
    bottom: 18,
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
  },
  starColor: {
    color: '#ff2121',
  },
  textSuccess: {
    color: theme.SECONDARY_COLOR,
  },
});

export default TextField;
