import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, Card} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import {businessSetupSteps} from '../../../config';
import BusinessSetupStore from '../../assets/img/business_setup_store.svg';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';

const AddBusiness = (props) => {
  const runDone = props.navigation.getParam('runDone');
  useEffect(() => {
    if (runDone) {
      handleAddBusiness();
      props.navigation.setParams({runDone: false});
    }
  }, [runDone]);
  const handleAddBusiness = () => {
    NavigationService.navigate('BusinessSetupStep1');
  };

  return (
    <PageLayout>
      <Card style={styles.addBusinessCard} onPress={() => handleAddBusiness()}>
        <Card.Content style={{flexDirection: 'row', alignItems: 'center'}}>
          <BusinessSetupStore />
          <Text style={styles.addNewBusinessButtonText}>
            Add or Claim a Business
          </Text>
        </Card.Content>
      </Card>
      <View style={{marginTop: 150}}>
        <Text style={styles.addNewBusinessText}>
          Add new businesses to{'\n'}
          {'\n'} your Account here
        </Text>
      </View>
    </PageLayout>
  );
};

export default AddBusiness;
