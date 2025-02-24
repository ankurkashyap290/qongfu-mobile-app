import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Success from '../../assets/img/success.svg';

const BusinessSetupSuccess = (props) => {
  return (
    <PageLayout>
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
        <Success style={{marginTop: 40}} />
        <Text style={[styles.setupHeadings, {marginTop: 30}]}>
          Your verification request
          {'\n'} is under process
        </Text>

        <Text style={styles.setupSubHeadings}>
          Please allow upto 48hrs for our{'\n'}
          team to verify your business.
        </Text>
        <Text style={[styles.plusTextStep6, {marginTop: 30}]}>
          In the meantime, you may complete your{'\n'} profile while waiting.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          marginBottom: 56,
        }}>
        <Button
          mode="contained"
          onPress={() =>
            NavigationService.navigate('BusinessManage', {reset: true})
          }
          style={styles.nextButton}
          labelStyle={styles.nextButtonLabel}>
          Got it!
        </Button>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.app.countries,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessSetupSuccess);
