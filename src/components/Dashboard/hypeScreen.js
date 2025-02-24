import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/dashboard.style';

const HypeScreen = ({
  heading,
  subHeading,
  description,
  buttonText,
  onAction,
  pageName,
  onCancel,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <View style={styles.hypeScreenIcon}></View>
      <View style={{marginTop: 50}}>
        <Text style={styles.heading}>{heading}</Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.hypeDescription}>{description}</Text>
      </View>
      <View style={{marginTop: 120}}>
        <Button
          mode="contained"
          onPress={() => onAction('Steps')}
          style={styles.nextButton}
          labelStyle={styles.nextButtonLabel}>
          {buttonText}
        </Button>
        {pageName === 'start' ? (
          <Button
            mode="text"
            onPress={() => onCancel()}
            style={{marginTop: 20}}
            labelStyle={styles.cancelButtonLabel}>
            Cancel
          </Button>
        ) : null}
      </View>
    </View>
  );
};

export default HypeScreen;
