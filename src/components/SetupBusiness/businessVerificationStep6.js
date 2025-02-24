import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Card, List} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShopIcon from '../../assets/img/shop_verified.svg';
import AuthenticationIcon from '../../assets/img/business_authentication.svg';

const BusinessVerificationStep6 = (props) => {
  return (
    <PageLayout>
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.setupHeadings}>
          Almost done! Would you like to{'\n'}get your business verified?
        </Text>
        <ShopIcon style={{marginTop: 30}} />
        <Text style={styles.setupSubHeadings}>
          Verifying your business ensures Qongfu{'\n'}
          users that your business is legit. Your business {'\n'}will also get
          more exposure and long-term{'\n'}
          benefits from Qongfu.
        </Text>
        <Text style={styles.plusTextStep6}>Plus, you will be getting our</Text>
        <AuthenticationIcon style={{marginTop: 20}} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}>
        <Button
          mode="contained"
          // onPress={() => NavigationService.navigate('DocumentUploadStep6')}
          style={styles.verificationButton}
          labelStyle={styles.verificationButtonLabel}>
          Get Verified!
        </Button>
        <Button
          mode="text"
          onPress={() =>
            NavigationService.navigate('BusinessManage', {reset: true})
          }
          style={styles.exitButton}
          labelStyle={styles.exitButtonLabel}>
          I'll do it later
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
)(BusinessVerificationStep6);
