import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SuccessModal from '../auth/mobileConfirmSuccess';
import CountDown from 'react-native-countdown-component';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import {getViewportHeight} from '../../../utils/helper';

const UserOnBoardingSuccess = props => {
  const handleTimeCount = () => {
    NavigationService.navigate('AppMain');
  };
  return (
    <View
      style={{backgroundColor: '#fff', minHeight: getViewportHeight(false)}}>
      <SuccessModal
        title="Welcome to Qongfu!"
        subTitle="You are now a member of Qongfu Community. Feel free to Explore."
        hideBtn={true}
        mode="onboardingSuccess"
      />
      <View style={{marginBottom: 120}}>
        <Text style={styles.redirectText}>Taking you to Qongfu shortly in</Text>
        <CountDown
          size={30}
          until={5}
          onFinish={() => handleTimeCount()}
          digitStyle={styles.counterDigitStyle}
          digitTxtStyle={styles.activeDigitStyle}
          timeLabelStyle={styles.labelTimeStyle}
          timeToShow={['S']}
          timeLabels={{s: 'Seconds'}}
          showSeparator
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counterDigitStyle: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderColor: theme.PRIMARY_COLOR,
  },
  activeDigitStyle: {
    color: '#0fa016',
  },
  redirectText: {
    color: theme.SECONDARY_COLOR,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  labelTimeStyle: {
    color: theme.SECONDARY_COLOR,
    fontSize: 12,
  },
});

export default UserOnBoardingSuccess;
