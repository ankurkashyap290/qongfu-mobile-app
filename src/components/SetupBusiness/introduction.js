import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import {businessSetupSteps} from '../../../config';
import BusinessSetup from '../../assets/img/business_setup.svg';
import * as NavigationService from '../../navigators/NavigationService';

const Introduction = ({toggleModalClose}) => {
  const handleStartClick = () => {
    toggleModalClose(false);
    NavigationService.navigate('AddBusiness');
  };
  return (
    <View style={styles.rootContainer}>
      <View style={{alignItems: 'center'}}>
        <BusinessSetup />
        <Text style={styles.modalTitle}>
          Setup your business in 3{'\n'} easy steps!
        </Text>
      </View>
      {businessSetupSteps.map((item, index) => (
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepLabel}>{index + 1}</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.stepTitle}>{item.title}</Text>
            <View>
              <Text style={styles.stepDescription}>{item.description}</Text>
            </View>
          </View>
        </View>
      ))}
      <View style={{alignItems: 'center'}}>
        <Button
          mode="contained"
          onPress={() => handleStartClick()}
          style={styles.setupStartButton}
          labelStyle={styles.setupStartButtonLabel}>
          Let's Start
        </Button>
      </View>
    </View>
  );
};

export default Introduction;
