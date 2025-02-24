import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, List, TextInput} from 'react-native';
import {Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../styles/theme.style';

const MobileNumber = props => {
  const {mode, style, label, theme, errorMessage, ...inputProps} = props;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (errorMessage) {
      setShowSuccess(true);
    }
  }, [showSuccess, errorMessage]);

  const _handleIconClick = () => {
    props.onIconClick();
  };
  return (
    <View>
      <Surface
        style={[
          {
            borderRadius: theme.roundness,
            elevation: 1,
          },
          styles.container,
        ]}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {props.icon ? (
            <View
              style={
                props.pageName === 'accountSettingsMobileUpdate'
                  ? styles.iconMobile
                  : styles.icon
              }
              onPress={_handleIconClick}>
              <Text style={{fontSize: 28}} onPress={() => _handleIconClick()}>
                {props.icon}
              </Text>
            </View>
          ) : null}
          <View style={styles.countryCodeContainer}>
            <Text
              style={{
                fontSize: 16,
                color: '#919191',
              }}>
              {props.countryCode ? `+${props.countryCode}` : ''}
            </Text>
          </View>
          <TextInput {...inputProps} style={[styles.input, {...style}]} />
        </View>
      </Surface>
      {props.errorMessage ? (
        <Text style={styles.textError}>
          <Text style={styles.starColor}>* </Text>
          {props.errorMessage}
        </Text>
      ) : showSuccess && props.validFieldMessage ? (
        <Text style={styles.textSuccess}>
          <Icon style={styles.successIcon} name="check" size={8} />
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
    // position: 'absolute',
    // left: 10,
    // bottom: 8,
    marginLeft: 10,
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
    marginLeft: 20,
  },
  starColor: {
    color: '#ff2121',
  },
  textSuccess: {
    color: theme.SECONDARY_COLOR,
  },
  countryCode: {
    fontSize: 12,
    color: theme.SECONDARY_COLOR,
    marginLeft: 80,
    marginTop: 10,
  },
  countryCodeContainer: {
    // position: 'absolute',
    // left: 40,
    // bottom: 15,
    width: 50,
    borderRightWidth: 1,
    borderRightColor: '#f1f1f1',
  },
  mobileTextField: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#efefef',
    borderWidth: 1,
  },
  iconMobile: {
    // position: 'absolute',
    // left: 30,
    // bottom: 12,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    textAlign: 'left',
    height: 28,
    borderColor: '#f1f1f1',
    flex: 1,
    alignSelf: 'stretch',
    margin: 10,
    padding: 0,
    color: '#000',
  },
});

export default MobileNumber;
