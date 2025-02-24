import React, {useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import {Divider, List, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/businessAccount.style';
import PageLayout from '../../layout/PageLayout';
import BusinessSetupIcon from '../../assets/img/business_setup.svg';
import DocumentsRequiredIcon from '../../assets/img/sad_smiley.svg';
import * as NavigationService from '../../navigators/NavigationService';

const BusinessAccount = ({accountStatus, navigation}) => {
  // TODO: temp static logic after api fixed it will be removed
  const statusData = navigation.getParam('data') || accountStatus;

  const renderIcon = (icon) => {
    if (icon === 'business' || icon === 'review') {
      return (
        <React.Fragment>
          <Image
            source={require('../../assets/img/Qongfu_Logo_Small.png')}
            style={styles.qongfuLogo}
          />
          <BusinessSetupIcon />
        </React.Fragment>
      );
    } else if (icon === 'documents') {
      return <DocumentsRequiredIcon />;
    }
  };

  const handleAction = (action) => {
    if (action === 'upgrade') {
      NavigationService.navigate('UpgradeToBusiness', {reset: true});
    } else if (action === 'documents') {
      NavigationService.navigate('BusinessUserVerify', {
        reset: true,
        configLoaded: false,
        documentsRequired: true,
      });
    } else if (action === 'deactivate') {
      NavigationService.navigate('DeactivateBusinessAccount', {reset: true});
    } else if (action === 'documents-claim') {
      console.log('documents-claim');
    } else if (action === 'archive') {
      console.log('archive');
    } else if (action === 'deactivate-user') {
      console.log('deactivate-user');
      NavigationService.navigate('UpgradeToBusiness');
    }
  };

  const isDanderButton = (item) => {
    return item.action === 'deactivate';
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
        <Text style={styles.accountStatusTitle}>{statusData.title}</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {renderIcon(statusData.icon)}
        </View>
        <Text style={styles.accountStatusContent}>{statusData.content}</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          marginBottom: 40,
        }}>
        {statusData.actions.map((item) => (
          <Button
            mode={isDanderButton(item) ? 'outlined' : 'contained'}
            onPress={() => handleAction(item.action)}
            style={[
              styles.nextButton,
              isDanderButton(item) ? styles.nextButtonDanger : null,
            ]}
            labelStyle={[
              styles.nextButtonLabel,
              isDanderButton(item) ? styles.nextButtonLabelDanger : null,
            ]}>
            {item.label}
          </Button>
        ))}
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    accountStatus: state.business.accountStatus,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BusinessAccount);
