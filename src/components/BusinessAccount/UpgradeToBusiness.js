import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/businessAccount.style';
import PageLayout from '../../layout/PageLayout';
import * as NavigationService from '../../navigators/NavigationService';

const UpgradeToBusiness = ({navigation}) => {
  const resetScreen = navigation.getParam('reset') || false;

  useEffect(() => {
    if (resetScreen) {
      navigation.setParams({reset: false});
    }
  }, [resetScreen]);

  const handleProceedPressed = () => {
    NavigationService.navigate('BusinessUserVerify', {
      reset: true,
      documentsRequired: false,
    });
  };

  return (
    <PageLayout>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginLeft: 30,
          marginRight: 30,
        }}>
        <Image
          source={{uri: 'https://via.placeholder.com/222.png?text=Image'}}
          style={styles.imageContainer}
        />
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.accountStatusTitle}>Qongfu Business</Text>
          <Text style={styles.accountStatusSubTitle}>
            Manage your place on-the-go!
          </Text>
          <View style={{flexDirection: 'row', marginTop: 16}}>
            <Text style={[styles.accountStatusContent, {textAlign: 'left'}]}>
              For quality and security purposes, business users on Qongfu must
              undergo a minor screening process to ensure credibility of our
              services to our members.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          marginBottom: 40,
        }}>
        <Button
          mode="contained"
          onPress={handleProceedPressed}
          style={[styles.nextButton, {width: '55%'}]}
          labelStyle={styles.nextButtonLabel}>
          Proceed
        </Button>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    accountStatus: state.business.accountStatus,
    globalConfig: state.app.globalConfig,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeToBusiness);
