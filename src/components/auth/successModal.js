import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../../styles';

const SuccessModal = (props) => {
  return (
    <View style={styles.successModalContainer}>
      <Text style={styles.successModalHeading}>{props.title}</Text>
      <View style={styles.successCheckIconContainer}>
        <Icon name="checkcircle" size={180} style={styles.successCheckIcon} />
      </View>
      <View style={styles.successCheckIconContainer}>
        <Button
          mode="contained"
          style={styles.submitBtn}
          labelStyle={styles.submitBtnLabel}
          onPress={() => props.onDone && props.onDone()}>
          DONE
        </Button>
      </View>
    </View>
  );
};

export default SuccessModal;
