import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/home.style';
import * as NavigationService from '../../navigators/NavigationService';
const DashboardNavBar = () => {
  return (
    <View style={styles.homePageTopBar}>
      {/* <Button
        mode="outlined"
        style={styles.topBarActiveBtn}
        labelStyle={styles.topBarActiveBtnLabel}
        // onPress={() => ()}
      >
        Places
      </Button> */}
      {/* <Button
        mode="outlined"
        style={styles.topBarBtnInactive}
        labelStyle={styles.topBarInactiveLabel}
        // onPress={() => NavigationService.navigate('OnBoarding')}
      >
        Specialists
      </Button>
      <Button
        mode="outlined"
        style={styles.topBarBtnInactive}
        labelStyle={styles.topBarInactiveLabel}>
        Promos
      </Button> */}
    </View>
  );
};

export default DashboardNavBar;
