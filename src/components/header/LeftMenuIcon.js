import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/mainLayout.style';

const LeftMenuIcon = ({onAction}) => {
  return (
    <TouchableOpacity onPress={() => onAction && onAction()}>
      <Image
        source={require('../../assets/img/Qongfu_Logo_Small.png')}
        style={styles.siteLogo}
      />
    </TouchableOpacity>
  );
};

export default LeftMenuIcon;
